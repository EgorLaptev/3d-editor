'use strict';

export default class FigureHelper
{

    history = [];

    constructor(scene, camera, renderer) {
        this.scene    = scene;
        this.camera   = camera;
        this.renderer = renderer;
    }

    createBox(parameters = {})
    {

        // Default values
        parameters.width    = parameters.width  ?? 1;
        parameters.height   = parameters.height ?? 1;
        parameters.depth    = parameters.depth  ?? 1;
        parameters.material = parameters.material ?? new THREE.MeshBasicMaterial({ color: 0x888888 });
        parameters.position = parameters.position  ?? [0, 0, 0];
        parameters.rotation = parameters.rotation  ?? [0, 0, 0]; // In deg

        parameters.rotation = parameters.rotation.map( axis => THREE.MathUtils.degToRad(axis) ); // Convert deg to rad

        const geometry = new THREE.BoxGeometry(parameters.width, parameters.height, parameters.depth);
        const mesh     = new THREE.Mesh(geometry, parameters.material);

        // Add helpers
        if (parameters.gridHelper) mesh.add( new THREE.GridHelper() );
        if (parameters.axesHelper) mesh.add( new THREE.AxesHelper(Math.max(parameters.width, parameters.height, parameters.depth)) );
        if (parameters.boxHelper)  mesh.add( new THREE.BoxHelper(mesh) );
        if (parameters.polarGridHelper)  mesh.add( new THREE.PolarGridHelper() );

        // set orientation
        mesh.position.set(...parameters.position);
        mesh.rotation.set(...parameters.rotation);

        this.history.push(mesh);
        this.scene.add(mesh);
        this.render();

        return mesh;

    }

    createSphere(parameters = {})
    {

        // Default values
        parameters.radius   = parameters.radius  ?? 1;
        parameters.segmentsW   = parameters.segmentsW  ?? 32;
        parameters.segmentsH   = parameters.segmentsH  ?? 32;
        parameters.material = parameters.material ?? new THREE.MeshBasicMaterial({ color: 0x888888 });
        parameters.position = parameters.position  ?? [0, 0, 0];
        parameters.rotation = parameters.rotation  ?? [0, 0, 0]; // In deg

        parameters.rotation = parameters.rotation.map( axis => THREE.MathUtils.degToRad(axis) ); // Convert deg to rad

        const geometry = new THREE.SphereGeometry(parameters.radius, parameters.segmentsW, parameters.segmentsH);
        const mesh     = new THREE.Mesh(geometry, parameters.material);

        // Add helpers
        if (parameters.gridHelper) mesh.add( new THREE.GridHelper() );
        if (parameters.axesHelper) mesh.add( new THREE.AxesHelper(parameters.radius*3) );
        if (parameters.boxHelper)  mesh.add( new THREE.BoxHelper(mesh) );
        if (parameters.polarGridHelper)  mesh.add( new THREE.PolarGridHelper() );

        // set orientation
        mesh.position.set(...parameters.position);
        mesh.rotation.set(...parameters.rotation);

        this.history.push(mesh);
        this.scene.add(mesh);
        this.render();

        return mesh;

    }

    createPlane(parameters = {})
    {

        // Default values
        parameters.side     = parameters.side ?? THREE.DoubleSide;
        parameters.width    = parameters.width  ?? 1;
        parameters.depth    = parameters.depth  ?? 1;
        parameters.material = parameters.material ?? new THREE.MeshBasicMaterial({ color: 0x888888, side: parameters.side });
        parameters.position = parameters.position  ?? [0, 0, 0];
        parameters.rotation = parameters.rotation  ?? [0, 0, 0]; // In deg

        parameters.rotation = parameters.rotation.map( axis => THREE.MathUtils.degToRad(axis) ); // Convert deg to rad

        const geometry = new THREE.PlaneGeometry(parameters.width, parameters.depth);
        const mesh     = new THREE.Mesh(geometry, parameters.material);

        // Add helpers
        if (parameters.gridHelper) mesh.add( new THREE.GridHelper() );
        if (parameters.axesHelper) mesh.add( new THREE.AxesHelper(parameters.radius*3) );
        if (parameters.boxHelper)  mesh.add( new THREE.BoxHelper(mesh) );
        if (parameters.polarGridHelper)  mesh.add( new THREE.PolarGridHelper() );

        // set orientation
        mesh.position.set(...parameters.position);
        mesh.rotation.set(...parameters.rotation);

        this.history.push(mesh);
        this.scene.add(mesh);
        this.render();

        return mesh;

    }

    render()
    {
        this.renderer.render(this.scene, this.camera);
    }

}