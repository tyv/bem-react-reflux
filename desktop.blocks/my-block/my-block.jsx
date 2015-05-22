modules.define(
    'my-block',
    [
        'react-loader_type_with-addons',
        'reflux',
        'bem-cn',
        'my-block__actions',
        'my-block__store'
    ],
    (provide, React, Reflux, BEM, Actions, Store) => {

var b = BEM('my-block');

provide(React.createClass({

    getInitialState() {
        return {
            value: 0
        };
    },

    mixins: [Reflux.connect(Store)],

    onIncrement() {
        Actions.increment(this.state.value + 1)
    },

    onClear() {
        Actions.clear()
    },

    render() {

        return (
            <div className={ b() }>
                <div className={ b('counter') }>
                    Clicks: { this.state.value }
                </div>
                <span
                    className={ b('increment') }
                    onClick={ this.onIncrement }>
                        Click Me!
                </span>
                &nbsp; | &nbsp;
                <span
                    className={ b('clear', { disabled: this.state.value === 0 }) }
                    onClick={ this.onClear }>
                        Clear
                </span>
            </div>
        )
    }
}));

});

