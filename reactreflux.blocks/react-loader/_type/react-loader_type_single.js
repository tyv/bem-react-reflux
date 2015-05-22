modules.define('react-loader_type_single', ['loader_type_js'], function(provide, loader) {

loader('https://fb.me/react-0.13.3.min.js', function() {
    provide(React);
});

});
