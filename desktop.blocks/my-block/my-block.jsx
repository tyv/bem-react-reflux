modules.define(
    'my-block',
    [
        'react-loader_type_with-addons',
        'reflux',
        'my-block__actions',
        'my-block__store'
    ],
    (provide, React, Reflux, Actions, Store) => {


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
            <div>
                <a onClick={ this.onIncrement }>Click Me!</a>
                <div>Clicks: { this.state.value }</div>
                <a onClick={ this.onClear }>Clear</a>
            </div>
        )
    }

}));

});

