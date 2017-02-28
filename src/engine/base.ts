import * as THREE from 'three';
import {Parser} from './parsers';

export abstract class X3dgBase extends HTMLElement {
    parentElement: X3dgBase;
    protected mesh: THREE.Mesh;

    public createdCallback() {
        console.log('created', this)
        this.__cachedStyles = {};
        this.add = (mesh: THREE.Mesh) => {
            this.mesh.add(mesh);
        }


        this.construct();
        this.__staticWathedStyles = this.constructor.watchedStyles;
    }

    // instead of "final" keyword
    public add(mesh: THREE.Mesh) {
        if (!this.mesh) {
            throw Error('mesh must be initialized');
        }

        this.mesh.add(mesh);
    }
    private attachedCallback() {
        // emulate constructor by strange reason
    
        console.log('static', this.constructor.watchedStyles);

        //this.construct();
 
        const parent = this.parentElement;
        console.log('attaching', this);
        //debugger;
        setTimeout(() => {
            parent.add(this.mesh);
        }, 0);

        // strange constructor bug
        const redrawingCycle = () => {
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

        window.requestAnimationFrame(redrawingCycle);
    }


        if (this.constructor.watchedStyles) {
            //this.redrawingCycle();
            redrawingCycle();
        }
    }

    constructor() {
        super();
    }

    redrawingCycle = () => {
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

        window.requestAnimationFrame(this.redrawingCycle);
    }

    // constructor doesn work
    abstract construct():void;
    abstract redraw(changed: {}):void;

    static watchedStyles: {};
    private __cachedStyles = {};
}