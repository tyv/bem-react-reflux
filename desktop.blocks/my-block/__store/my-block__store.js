modules.define(
    'my-block__store',
    [
        'reflux',
        'my-block__actions'
    ],
    (provide, Reflux, Actions) => {

    var value;

    provide(
        Reflux.createStore({
            listenables: Actions,

            onIncrement(newValue) {
                value = newValue;
                this.trigger({ value: value })
            },

            onClear() {
                value = 0;
                this.trigger({ value: value })
            }
        })
    );
});

