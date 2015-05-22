# BEM + React + Reflux
This is a simple demo of combining modern front-end technologies.

##BEM
  * BEM architecture throug all technologies: styl, stores, actions, jsx..
  * [ENB](https://github.com/enb-make/enb) as build system
  * [enb-babel](https://github.com/s-panferov/enb-babel) for transform JSX and ES6+ syntax
  * [@aristov talk on react + bem](https://events.yandex.ru/lib/talks/2132/)

##react-tools.blocks
  * react.js and reflux.js copy or React http loader, that provide React as a module in [ym](https://github.com/ymaps/modules)
  * [bem-cn](https://github.com/albburtsev/bem-cn) lib for bem class names

##Main Idea
To demonstrate technologies encapsulation in BEM architecture.

```
./desktop.blocks/my-block
|
|--_actions
|  |--my-block__actions.js
|
|--_store
|  |--my-block__store.js
|
|--my-block.styl
|--my-block.jsx
|--my-block.deps.js
|
```

##Install and run
Clone this repo and run
```bash
npm i && npm start
```

