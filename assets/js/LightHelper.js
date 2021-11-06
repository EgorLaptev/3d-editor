'use strict';

import { RectAreaLightHelper } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/helpers/RectAreaLightHelper.js';

export default class LightHelper
{

    history = [];

    constructor(scene, camera, renderer) {
        this.scene    = scene;
        this.camera   = camera;
        this.renderer = renderer;
    }

    addPointLight(parameters = {})
    {

        // Default values
        parameters.color       = parameters.color     ?? 0xFFFFFF;
        parameters.intensity   = parameters.intensity ?? 1;
        parameters.position    = parameters.position  ?? [0, 0, 0];
        parameters.lightHelper = parameters.lightHelper ?? true;

        const light = new THREE.PointLight(parameters.color, parameters.intensity);

        // Add helpers
        if (parameters.gridHelper)       light.add( new THREE.GridHelper() );
        if (parameters.axesHelper)       light.add( new THREE.AxesHelper() );
        if (parameters.boxHelper)        light.add( new THREE.BoxHelper(light) );
        if (parameters.polarGridHelper)  light.add( new THREE.PolarGridHelper() );
        if (parameters.lightHelper) this.scene.add( new THREE.PointLightHelper(light));

        // set orientation
        light.position.set(...parameters.position);

        this.history.push(light);
        this.scene.add(light);
        this.render();

        return light;

    }

    addRectAreaLight(parameters = {})
    {

        // Default values
        parameters.width       = parameters.width       ??   1;
        parameters.height      = parameters.height      ??   1;
        parameters.intensity   = parameters.intensity   ??   1;
        parameters.lightHelper = parameters.lightHelper ?? true;
        parameters.position    = parameters.position    ?? [0, 0, 0];
        parameters.rotation    = parameters.rotation    ?? [0, 0, 0]; // In deg

        parameters.rotation = parameters.rotation.map( axis => THREE.MathUtils.degToRad(axis) ); // Convert deg to rad

        const light = new THREE.RectAreaLight(parameters.color, parameters.intensity);

        // Add helpers
        if (parameters.gridHelper)      light.add( new THREE.GridHelper() );
        if (parameters.axesHelper)      light.add( new THREE.AxesHelper() );
        if (parameters.boxHelper)       light.add( new THREE.BoxHelper(light) );
        if (parameters.polarGridHelper) light.add( new THREE.PolarGridHelper() );
        if (parameters.lightHelper)     this.scene.add( new RectAreaLightHelper(light) );

        // set orientation
        light.position.set(...parameters.position);
        light.rotation.set(...parameters.rotation);

        this.history.push(light);
        this.scene.add(light);
        this.render();

        return light;

    }

    addDirectionalLight(parameters = {})
    {

        // Default values
        parameters.color          = parameters.color          ?? 0xFFFFFF;
        parameters.intensity      = parameters.intensity      ?? 1;
        parameters.position       = parameters.position       ?? [0, 0, 0];
        parameters.targetPosition = parameters.targetPosition ?? [0, 0, 0];
        parameters.lightHelper    = parameters.lightHelper    ?? true;

        const light = new THREE.DirectionalLight(parameters.color, parameters.intensity);

        // Add helpers
        if (parameters.gridHelper)      light.add( new THREE.GridHelper() );
        if (parameters.axesHelper)      light.add( new THREE.AxesHelper() );
        if (parameters.boxHelper)       light.add( new THREE.BoxHelper(light) );
        if (parameters.polarGridHelper) light.add( new THREE.PolarGridHelper() );
        if (parameters.lightHelper)     this.scene.add( new THREE.DirectionalLightHelper(light));

        // set orientation
        light.position.set(...parameters.position);

        this.history.push(light);
        this.scene.add(light);
        this.render();

        return light;

    }

    render()
    {
        this.renderer.render(this.scene, this.camera);
    }

}