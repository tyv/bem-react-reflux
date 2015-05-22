modules.define(
    'my-block__actions',
    [
        'reflux'
    ],
    (provide, Reflux) => {

    provide(
        Reflux.createActions([
            'increment',
            'clear'
        ])
    );
});

