'use strict';

import Viewport from "./Viewport.js";
import Controls from "./Controls.js";
import HUD from "./HUD.js";

const canvas = document.querySelector("#viewport");

Viewport.init(
    new THREE.Scene(),
    new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight),
    new THREE.WebGLRenderer({ canvas, antialias: true })
);

Controls.init(Viewport.scene, Viewport.camera, Viewport.renderer);
HUD.init(Viewport.scene, Viewport.camera, Viewport.renderer);
