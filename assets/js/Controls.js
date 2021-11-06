'use strict';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/TransformControls.js';
import HUD from "./HUD.js";

export default class Controls
{

    static focus = null;

    static transform;
    static orbit;

    static mouse     = new THREE.Vector2();
    static raycaster = new THREE.Raycaster();

    static raycasterIntersects = [];

    static init(scene, camera, renderer)
    {

        this.scene    = scene;
        this.camera   = camera;
        this.renderer = renderer;

        this.transform = new TransformControls(camera, renderer.domElement);
        this.orbit     = new OrbitControls(camera, renderer.domElement);

        /* Configure orbit controls */
        this.orbit.minDistance = 1;
        this.orbit.maxDistance = 1000;
        this.orbit.addEventListener('change', e => renderer.render(scene, camera) );

        /* Configure transform controls */
        this.transform.addEventListener( 'change', e => renderer.render(scene, camera) );
        this.transform.addEventListener( 'dragging-changed', e => this.orbit.enabled = ! e.value );
        scene.add(this.transform);

        this.render();
        this.listeners();

    }

    static listeners()
    {

        document.body.addEventListener('mousemove', e => {
            this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        });

        this.renderer.domElement.addEventListener('dblclick', e => {

            this.raycaster.setFromCamera( this.mouse, this.camera );
            this.raycasterIntersects = this.raycaster.intersectObjects( [...HUD.figureHelper.history, ...HUD.lightHelper.history] );

            if ( this.raycasterIntersects[0] ) this.updateFocus(this.raycasterIntersects[0].object);
            else this.updateFocus();

        });

        document.body.addEventListener('keydown', e => {

            switch (e.code) {
                case 'KeyT': // Switch transform controls to translate mode
                    Controls.transform.setMode('translate');
                    HUD.orientationMode = 'position'
                    break;
                case 'KeyR': // Switch transform controls to rotate mode
                    Controls.transform.setMode('rotate');
                    HUD.orientationMode = 'rotation'
                    break;
                case 'KeyS': // Switch transform controls to scale mode
                    Controls.transform.setMode('scale');
                    HUD.orientationMode = 'scale'
                    break;
                case 'KeyH': // Toggle HUD visible
                    HUD.toggle();
                    break;
                case 'Escape': // Remove focus
                case 'Enter':
                    this.updateFocus();
                    break;
                case 'Delete': // Remove mesh from scene
                    this.removeMesh(this.focus);
                    break;
            }

        });

    }

    static updateFocus(newFocus = null)
    {

        if (newFocus === null) this.transform.detach();
        else this.transform.attach(newFocus);

        HUD.transformHints.style.display = newFocus ? 'block' : 'none';
        HUD.propertiesForm.style.display = newFocus ? 'grid' : 'none';

        this.focus = newFocus;
        this.render();

    }

    static removeMesh(mesh)
    {
        if (!mesh) return false;

        this.transform.detach();
        this.scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();

        this.updateFocus();

        this.render();
    }

    static render()
    {
        this.renderer.render(this.scene, this.camera);
    }

}