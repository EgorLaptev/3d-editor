'use strict';

import { GUI } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/libs/dat.gui.module.js';

import FigureHelper from "./FigureHelper.js";
import LightHelper from "./LightHelper.js";
import Controls from "./Controls.js";

export default class HUD
{

    // Dom elements
    static domElement     = document.querySelector('#HUD');

    static transformHints = this.domElement.querySelector('#transformHints');

    static addCube        = this.domElement.querySelector('#addCube');
    static addPlane       = this.domElement.querySelector('#addPlane');
    static addSphere      = this.domElement.querySelector('#addSphere');

    static addPointLight       = this.domElement.querySelector('#addPointLight');
    static addRectAreaLight    = this.domElement.querySelector('#addRectAreaLight');
    static addDirectionalLight = this.domElement.querySelector('#addDirectionalLight');

    static propertiesForm   = this.domElement.querySelector('#propertiesForm');
    static propertiesInputs = this.propertiesForm.querySelectorAll('input, select');
    static materialType     = this.propertiesForm.querySelector('#materialType');
    static sideType         = this.propertiesForm.querySelector('#sideType');

    static orientationInputs = this.propertiesForm.querySelector('#axises').children;
    static orientationMode   = 'position';

    static hidden = false;
    static scale  = 1;

    static figureHelper;

    static init(scene, camera, renderer)
    {

        this.scene    = scene;
        this.camera   = camera;
        this.renderer = renderer;

        this.figureHelper = new FigureHelper(scene, camera, renderer);
        this.lightHelper  = new LightHelper(scene, camera, renderer);

        $('#propertiesForm').draggable({ containment: "parent" })
        $('#objectsMenu').draggable({ axis: "y", containment: "parent" });

        this.listeners();

    }

    static listeners()
    {

        // Update properties menu
        Controls.transform.addEventListener( 'change', e => {
            if (Controls.focus) [
                this.orientationInputs[0].value,
                this.orientationInputs[1].value,
                this.orientationInputs[2].value ] = Controls.focus[this.orientationMode].toArray();
        });

        for (const orientationInput of this.orientationInputs) {
            orientationInput.addEventListener('input', e => {
                Controls.focus.position.set(
                    +this.orientationInputs[0].value || 0,
                    +this.orientationInputs[1].value || 0,
                    +this.orientationInputs[2].value || 0,
                );
                this.render();
            });
        }

        this.propertiesInputs.forEach( input => input.addEventListener('input', e => {
            if(input.dataset.property === 'material') Controls.focus.material = new THREE[e.target.value];
            else if(input.dataset.property === 'side') Controls.focus.material.side = THREE[e.target.value];
            else if (['color', 'emissive'].includes(input.dataset.property)) Controls.focus.material[input.dataset.property].set(e.target.value);
            else Controls.focus.material[input.dataset.property] = e.target.value;
            this.render();
        }) );

        // Add new figure and set focus on it
        this.addCube.addEventListener('click', e => Controls.updateFocus(this.figureHelper.createBox()) );
        this.addPlane.addEventListener('click', e => Controls.updateFocus(this.figureHelper.createPlane()) );
        this.addSphere.addEventListener('click', e => Controls.updateFocus(this.figureHelper.createSphere()) );

        this.addPointLight.addEventListener('click', e => Controls.updateFocus(this.lightHelper.addPointLight() ) );
        this.addRectAreaLight.addEventListener('click', e => Controls.updateFocus(this.lightHelper.addRectAreaLight() ) );
        this.addDirectionalLight.addEventListener('click', e => Controls.updateFocus(this.lightHelper.addDirectionalLight() ) );

    }

    static toggle()
    {
        (this.hidden) ? this.show() : this.hide();
    }

    static hide()
    {
        this.hidden = true;
        this.domElement.style.display = 'none';
    }

    static show()
    {
        this.hidden = false;
        this.domElement.style.display = 'block';
    }

    static render()
    {
        this.renderer.render(this.scene, this.camera);
    }

}