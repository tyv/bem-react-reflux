modules.define('react-loader_type_with-addons', ['loader_type_js'], function(provide, loader) {

loader('https://fb.me/react-with-addons-0.13.3.js', function() {
    provide(React);
    delete window.React;
});

});
