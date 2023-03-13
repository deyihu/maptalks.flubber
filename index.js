
import { Polygon, Coordinate, Util, animation } from 'maptalks';
import { interpolate } from 'flubber';

function checkRing(ring) {
    if (!ring) {
        return null;
    }
    if (ring.getCoordinates) {
        ring = ring.getCoordinates();
    }
    if (ring.geometry) {
        ring = ring.geometry.coordinates;
    }
    if (Array.isArray(ring[0][0])) {
        ring = ring[0];
    }
    if (ring[0][0] instanceof Coordinate) {
        ring = ring[0];
    }
    const coordinates = ring.map(c => {
        if (c instanceof Coordinate) {
            return c.toArray();
        }
        return c;
    });
    return coordinates;
}

Polygon.prototype.transform = function (ring, options = {}, step) {
    const toCoordinates = checkRing(ring);
    if (!toCoordinates) {
        return this;
    }
    if (this._animPlayer) {
        this._animPlayer.finish();
    }
    if (Util.isFunction(options)) {
        step = options;
    }
    if (!options) {
        options = {};
    }
    const map = this.getMap();

    // geometry.animate can be called without map
    if (map) {
        // merge geometry animation framing into map's frame loop
        const renderer = map._getRenderer();
        const framer = function (fn) {
            renderer.callInNextFrame(fn);
        };
        options['framer'] = framer;
    }
    const fromCoordinates = checkRing(this.getCoordinates());
    const interpolator = interpolate(fromCoordinates, toCoordinates, { string: false });
    const player = animation.Animation.animate({ t: 1 }, options, frame => {
        if (map && map.isRemoved()) {
            player.finish();
            return;
        }
        const styles = frame.styles;
        const t = styles.t;
        const coordinates = interpolator(t);
        frame.coordinates = coordinates;
        this.setCoordinates([coordinates]);

        this._fireAnimateEvent(player.playState);
        if (step) {
            step.bind(this)(frame);
        }
    }, this);
    this._animPlayer = player;
    return this._animPlayer.play();
};
