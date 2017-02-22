import * as THREE from 'three';
import {Parser} from './parsers';

export abstract class X3dgBase extends HTMLElement {
    parentElement: X3dgBase;
    protected mesh: THREE.Mesh;
    // instead of "final" keyword
    public add(mesh: THREE.Mesh) {
        throw Error('Dont implemented method');
    }
    private attachedCallback() {
        // emulate constructor by strange reason
        this.__cachedStyles = {};


        console.log('static', this.constructor.watchedStyles);
        this.__staticWathedStyles = this.constructor.watchedStyles;
        console.log('aaa');

        this.construct();
 
        const parent = this.parentElement;
        parent.add(this.mesh);

        if (this.constructor.watchedStyles) {
            this.redrawingCycle();
        }
    }

    constructor() {
        super();
    }

    private redrawingCycle() {
        console.log('recalculate colors');
        // TODO: don't forget a cleanup

        // hack for using static properties
        const watchedStyle = this.constructor.watchedStyles as {};
        const style = window.getComputedStyle(this);
        const changed = {};
        for (const styleName of Object.keys(watchedStyle)) {
            const computed = style[styleName];
            if (computed !== 'none' && computed !== this.__cachedStyles[styleName]) {
                this.__cachedStyles[styleName] = computed;
                changed[styleName] = watchedStyle[styleName](computed);
            }
        }

        this.redraw(changed);

        //window.requestAnimationFrame(this.redrawingCycle);
    }

    // constructor doesn work
    abstract construct():void;
    abstract redraw(changed: {}):void;

    static watchedStyles: {};
    private __cachedStyles = {};
}