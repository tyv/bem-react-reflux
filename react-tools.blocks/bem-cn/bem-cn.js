/**
 * bem-cn — friendly BEM class names generator
 * @author Alexander Burtsev, http://burtsev.me, 2015
 * @license MIT
 */

modules.define(
'bem-cn',
(provide) => {

    var is = 'is-',
    space = ' ',
    separators = {
        el: '__',
        mod: '_'
    };

    /**
     * Simplest mixin helper
     */
    function extend(target, obj) {
        return Object.keys(obj).reduce(function(target, key) {
            var value = obj[key];

            // Shallow copy of array
            if ( Array.isArray(value) ) {
                value = value.slice();
            }

            target[key] = value;
            return target;
        }, target);
    }

    /**
     * Shallow copy helper
     */
    function copy(obj) {
        return extend({}, obj);
    }

    /**
     * Converts object with modifiers to array of strings
     * Example: modObjectToArray({ color: 'red' }) -> ['', '_color_red']
     */
    function modObjectToArray(obj) {
        return Object.keys(obj).reduce(function(array, key) {
            var value = obj[key];

            if ( !value ) {
                return array;
            }

            if ( value === true ) {
                array.push(separators.mod + key);
            } else {
                array.push(separators.mod + key + separators.mod + value);
            }

            return array;
        }, []);
    }

    /**
     * Callable block instance
     */
    function callableInstance() {
        var args = Array.prototype.slice.call(arguments),
            context = copy(this);

        context = args.reduce(function(context, argv) {
            if ( argv && typeof argv === 'string' ) {
                context.name = context.name + separators.el + argv;
            }

            if ( argv && typeof argv === 'object' ) {
                context.mods.push(argv);
            }

            return context;
        }, context);

        return factory(context);
    }

    /**
     * Static method toString() for callable instance
     */
    function toString() {
        var name = this.name,
            classList = name;

        // Adds modifiers
        classList = this.mods.reduce(function(classList, modObject) {
            var modArray = modObjectToArray(modObject);

            if ( modArray.length ) {
                modArray.unshift('');
                classList += modArray.join(space + name);
            }

            return classList;
        }, classList);

        // Mix with another classes
        if ( this.mixes.length ) {
            classList += space + this.mixes.join(space);
        }

        // Add states
        var states = this.states;
        classList = Object.keys(states).reduce(function(classList, state) {
            return classList += states[state] ? space + is + state : '';
        }, classList);

        return classList;
    }

    function split() {
        var classNames = toString.bind(this)();
        return String.prototype.split.apply(classNames, arguments);
    }

    /**
     * Static method mix() for callable instance
     */
    function mix(className) {
        var context = copy(this);

        if ( className ) {
            context.mixes.push(className);
        }

        return factory(context);
    }

    /**
     * Adds SMACSS-states: https://smacss.com/book/type-state
     * @param {Object} obj State object
     * @return {[type]} [description]
     */
    function state(obj) {
        var context = copy(this),
            states = copy(context.states);

        extend(states, obj || {});
        context.states = states;

        return factory(context);
    }

    /**
     * Generator of block-functions
     * @param {Object} context Immutable context of current block
     * @return {Function}
     */
    function factory(context) {
        context = extend({
            name: '',
            mods: [],
            mixes: [],
            states: {}
        }, context || {});

        // Whilst JavaScript can't create callable objects with constructors
        var b = callableInstance.bind(context);
        b.toString = toString.bind(context);
        b.split = split.bind(context);
        b.mix = mix.bind(context);
        b.state = state.bind(context);

        return b;
    }

    /**
     * Entry point
     * @param {String} name Block name
     * @return {Function}
     */
    function Block(name) {
        return factory({ name: name });
    }

    /**
     * Setup separators
     */
    Block.setup = function(obj) {
        extend(separators, obj || {});
        return Block;
    };

    provide(Block);

});
