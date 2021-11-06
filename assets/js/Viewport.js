'use strict';

export default class Viewport
{

    static scene;
    static camera;
    static renderer;

    /* Start options */
    static options = {
        background: new THREE.Color(.025, .025, .025),
        gridSize: 10000,
        gridDivisions: 5000,
        gridColor1: 0x442200,
        gridColor2: 0x222222,
        cameraPosition: [2, 5, 10]
    }

    static init(scene, camera, renderer)
    {

        this.scene    = scene;
        this.camera   = camera;
        this.renderer = renderer;

        /* Configure scene */
        this.scene.fog        = new THREE.Fog(this.options.background, 20, 200);
        this.scene.background = this.options.background;

        this.scene.add( new THREE.GridHelper(this.options.gridSize, this.options.gridDivisions, this.options.gridColor1, this.options.gridColor2) );

        /* Configure camera */
        this.camera.position.set(...this.options.cameraPosition);

        /* Configure renderer */
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render();

    }

    static render()
    {
        this.renderer.render(this.scene, this.camera);
    }

}