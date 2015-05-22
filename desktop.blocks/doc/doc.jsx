modules.require([
    'react-loader_type_with-addons',
    'my-block'
],
(React, Block) => {

    React.render(<Block />, document.querySelector('.app'));

})
