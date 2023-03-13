# maptalks.flubber

transform [maptalksjs](https://github.com/maptalks/maptalks.js) polygon by [flubber](https://github.com/veltman/flubber)

## Install

### NPM

```sh
npm i maptalks.flubber
# or
yarn add maptalks.flubber
```

### CDN

```html
<script type="text/javascript" src="https://unpkg.com/maptalks/dist/maptalks.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/maptalks.flubber/dist/maptalks.flubber.js"></script>
```

## API

polygon will auto mount `transform` method

```js
import * as maptalks from 'maptalks';
import 'maptalks.flubber';
```

### methods

- polygon.transform(polygon/coordinates/geojson, options, step) `It is similar to animate`

```js
const polygon1 = new Polygon();
const polygon2 = new Polygon();
//transfrom polygon shape to polygon2 shape
polygon1.transform(polygon2, {
    duration: 2000
}, function(frame) {
    //do somethings
});
```
