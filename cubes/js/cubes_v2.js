// Cubes -- by Gerrit Hoevers -- october 2023
// code adapted from "Learn Three.js, fourth Edition" by Jos Dirksen -- Packt Publishing

/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./samples/chapters/chapter-1/getting-started.js":
      /*!*******************************************************!*\
  !*** ./samples/chapters/chapter-1/getting-started.js ***!
  \*******************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! three */ "./node_modules/three/build/three.module.js"
          );
        /* harmony import */ var three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! three/examples/jsm/libs/stats.module */ "./node_modules/three/examples/jsm/libs/stats.module.js"
          );
        /* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js"
          );
        /* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js"
          );

        // Note: This is just a getting started example. For the other examples
        // we reuse the basic components by extracting them to a set of common
        // JavaScript modules / files.

        // basic scene setup
        const scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
        scene.backgroundColor = 0xffffff;
        scene.fog = new three__WEBPACK_IMPORTED_MODULE_3__.Fog(
          0xffffff,
          0.0025,
          50
        );

        // setup camera
        const camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.x = -3;
        camera.position.z = 8;
        camera.position.y = 2;

        // setup the renderer and attach to canvas
        const renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer({
          antialias: true,
        });
        renderer.outputEncoding =
          three__WEBPACK_IMPORTED_MODULE_3__.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type =
          three__WEBPACK_IMPORTED_MODULE_3__.VSMShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff);
        document.body.appendChild(renderer.domElement);

        // add lights
        scene.add(
          new three__WEBPACK_IMPORTED_MODULE_3__.AmbientLight(0x666666)
        );
        const dirLight =
          new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xaaaaaa);
        dirLight.position.set(5, 12, 8);
        dirLight.castShadow = true;
        dirLight.intensity = 1;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 200;
        dirLight.shadow.camera.right = 10;
        dirLight.shadow.camera.left = -10;
        dirLight.shadow.camera.top = 10;
        dirLight.shadow.camera.bottom = -10;
        dirLight.shadow.mapSize.width = 512;
        dirLight.shadow.mapSize.height = 512;
        dirLight.shadow.radius = 4;
        dirLight.shadow.bias = -0.0005;

        scene.add(dirLight);

        // add orbitcontrols
        const controller =
          new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(
            camera,
            renderer.domElement
          );
        controller.enableDamping = true;
        controller.dampingFactor = 0.05;
        controller.minDistance = 3;
        controller.maxDistance = 10;
        controller.minPolarAngle = Math.PI / 4;
        controller.maxPolarAngle = (3 * Math.PI) / 4;

        // create a matrix of cubes and add them to the scene
        const cubeGeometry =
          new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry();
        const cubeMaterial =
          new three__WEBPACK_IMPORTED_MODULE_3__.MeshPhongMaterial({
            color: 0x0000ff,
          });

        let cubes = [];
        let dist = 2;
        for (let x = -1; x < 2; x += 1) {
          for (let y = -1; y < 2; y += 1) {
            for (let z = -1; z < 2; z += 1) {
              let cube = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(
                cubeGeometry,
                cubeMaterial
              );

              cube.position.x = x * dist;
              cube.position.y = y * dist;
              cube.position.z = z * dist;
              // cube.castShadow = true;

              cubes.push(cube);
            }
          }
        }

        for (let i = 0; i < cubes.length; i++) {
          scene.add(cubes[i]);
        }

        // create a very large ground plane
        const groundGeometry =
          new three__WEBPACK_IMPORTED_MODULE_3__.PlaneBufferGeometry(10, 10);
        const groundMaterial =
          new three__WEBPACK_IMPORTED_MODULE_3__.MeshLambertMaterial({
            color: 0xffffff,
          });
        const groundMesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(
          groundGeometry,
          groundMaterial
        );
        groundMesh.position.set(0, -2, 0);
        groundMesh.rotation.set(Math.PI / -2, 0, 0);
        groundMesh.receiveShadow = true;
        // scene.add(groundMesh);

        // add stats
        const stats = (0,
        three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ])();
        document.body.appendChild(stats.dom);

        // add gui
        const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]();
        const props = {
          cubeSpeed: 0.01,
          cubeSize: 1,
        };

        gui.add(props, "cubeSpeed", -0.2, 0.2, 0.01);
        gui.add(props, "cubeSize", 0.5, 2, 0.01);

        renderer.render(scene, camera);

        // render the scene
        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
          stats.update();

          for (let i = 0; i < cubes.length; i++) {
            cubes[i].scale.x = props.cubeSize;
            cubes[i].scale.y = props.cubeSize;
            cubes[i].scale.z = props.cubeSize;
            cubes[i].rotation.x += props.cubeSpeed;
            cubes[i].rotation.y += props.cubeSpeed;
            cubes[i].rotation.z += props.cubeSpeed;
          }

          controller.update();
        }
        animate();
      },

    /***/ "./node_modules/three/examples/jsm/libs/stats.module.js":
      /*!**************************************************************!*\
  !*** ./node_modules/three/examples/jsm/libs/stats.module.js ***!
  \**************************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        var Stats = function () {
          var mode = 0;

          var container = document.createElement("div");
          container.style.cssText =
            "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
          container.addEventListener(
            "click",
            function (event) {
              event.preventDefault();
              showPanel(++mode % container.children.length);
            },
            false
          );

          //

          function addPanel(panel) {
            container.appendChild(panel.dom);
            return panel;
          }

          function showPanel(id) {
            for (var i = 0; i < container.children.length; i++) {
              container.children[i].style.display = i === id ? "block" : "none";
            }

            mode = id;
          }

          //

          var beginTime = (performance || Date).now(),
            prevTime = beginTime,
            frames = 0;

          var fpsPanel = addPanel(new Stats.Panel("FPS", "#0ff", "#002"));
          var msPanel = addPanel(new Stats.Panel("MS", "#0f0", "#020"));

          if (self.performance && self.performance.memory) {
            var memPanel = addPanel(new Stats.Panel("MB", "#f08", "#201"));
          }

          showPanel(0);

          return {
            REVISION: 16,

            dom: container,

            addPanel: addPanel,
            showPanel: showPanel,

            begin: function () {
              beginTime = (performance || Date).now();
            },

            end: function () {
              frames++;

              var time = (performance || Date).now();

              msPanel.update(time - beginTime, 200);

              if (time >= prevTime + 1000) {
                fpsPanel.update((frames * 1000) / (time - prevTime), 100);

                prevTime = time;
                frames = 0;

                if (memPanel) {
                  var memory = performance.memory;
                  memPanel.update(
                    memory.usedJSHeapSize / 1048576,
                    memory.jsHeapSizeLimit / 1048576
                  );
                }
              }

              return time;
            },

            update: function () {
              beginTime = this.end();
            },

            // Backwards Compatibility

            domElement: container,
            setMode: showPanel,
          };
        };

        Stats.Panel = function (name, fg, bg) {
          var min = Infinity,
            max = 0,
            round = Math.round;
          var PR = round(window.devicePixelRatio || 1);

          var WIDTH = 80 * PR,
            HEIGHT = 48 * PR,
            TEXT_X = 3 * PR,
            TEXT_Y = 2 * PR,
            GRAPH_X = 3 * PR,
            GRAPH_Y = 15 * PR,
            GRAPH_WIDTH = 74 * PR,
            GRAPH_HEIGHT = 30 * PR;

          var canvas = document.createElement("canvas");
          canvas.width = WIDTH;
          canvas.height = HEIGHT;
          canvas.style.cssText = "width:80px;height:48px";

          var context = canvas.getContext("2d");
          context.font = "bold " + 9 * PR + "px Helvetica,Arial,sans-serif";
          context.textBaseline = "top";

          context.fillStyle = bg;
          context.fillRect(0, 0, WIDTH, HEIGHT);

          context.fillStyle = fg;
          context.fillText(name, TEXT_X, TEXT_Y);
          context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

          context.fillStyle = bg;
          context.globalAlpha = 0.9;
          context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

          return {
            dom: canvas,

            update: function (value, maxValue) {
              min = Math.min(min, value);
              max = Math.max(max, value);

              context.fillStyle = bg;
              context.globalAlpha = 1;
              context.fillRect(0, 0, WIDTH, GRAPH_Y);
              context.fillStyle = fg;
              context.fillText(
                round(value) +
                  " " +
                  name +
                  " (" +
                  round(min) +
                  "-" +
                  round(max) +
                  ")",
                TEXT_X,
                TEXT_Y
              );

              context.drawImage(
                canvas,
                GRAPH_X + PR,
                GRAPH_Y,
                GRAPH_WIDTH - PR,
                GRAPH_HEIGHT,
                GRAPH_X,
                GRAPH_Y,
                GRAPH_WIDTH - PR,
                GRAPH_HEIGHT
              );

              context.fillRect(
                GRAPH_X + GRAPH_WIDTH - PR,
                GRAPH_Y,
                PR,
                GRAPH_HEIGHT
              );

              context.fillStyle = bg;
              context.globalAlpha = 0.9;
              context.fillRect(
                GRAPH_X + GRAPH_WIDTH - PR,
                GRAPH_Y,
                PR,
                round((1 - value / maxValue) * GRAPH_HEIGHT)
              );
            },
          };
        };

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Stats;

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = __webpack_modules__;
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/chunk loaded */
  /******/ (() => {
    /******/ var deferred = [];
    /******/ __webpack_require__.O = (result, chunkIds, fn, priority) => {
      /******/ if (chunkIds) {
        /******/ priority = priority || 0;
        /******/ for (
          var i = deferred.length;
          i > 0 && deferred[i - 1][2] > priority;
          i--
        )
          deferred[i] = deferred[i - 1];
        /******/ deferred[i] = [chunkIds, fn, priority];
        /******/ return;
        /******/
      }
      /******/ var notFulfilled = Infinity;
      /******/ for (var i = 0; i < deferred.length; i++) {
        /******/ var [chunkIds, fn, priority] = deferred[i];
        /******/ var fulfilled = true;
        /******/ for (var j = 0; j < chunkIds.length; j++) {
          /******/ if (
            (priority & (1 === 0) || notFulfilled >= priority) &&
            Object.keys(__webpack_require__.O).every((key) =>
              __webpack_require__.O[key](chunkIds[j])
            )
          ) {
            /******/ chunkIds.splice(j--, 1);
            /******/
          } else {
            /******/ fulfilled = false;
            /******/ if (priority < notFulfilled) notFulfilled = priority;
            /******/
          }
          /******/
        }
        /******/ if (fulfilled) {
          /******/ deferred.splice(i--, 1);
          /******/ var r = fn();
          /******/ if (r !== undefined) result = r;
          /******/
        }
        /******/
      }
      /******/ return result;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/jsonp chunk loading */
  /******/ (() => {
    /******/ // no baseURI
    /******/
    /******/ // object to store loaded and loading chunks
    /******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
    /******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    /******/ var installedChunks = {
      /******/ "getting-started": 0,
      /******/
    };
    /******/
    /******/ // no chunk on demand loading
    /******/
    /******/ // no prefetching
    /******/
    /******/ // no preloaded
    /******/
    /******/ // no HMR
    /******/
    /******/ // no HMR manifest
    /******/
    /******/ __webpack_require__.O.j = (chunkId) =>
      installedChunks[chunkId] === 0;
    /******/
    /******/ // install a JSONP callback for chunk loading
    /******/ var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      /******/ var [chunkIds, moreModules, runtime] = data;
      /******/ // add "moreModules" to the modules object,
      /******/ // then flag all "chunkIds" as loaded and fire callback
      /******/ var moduleId,
        chunkId,
        i = 0;
      /******/ if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        /******/ for (moduleId in moreModules) {
          /******/ if (__webpack_require__.o(moreModules, moduleId)) {
            /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
            /******/
          }
          /******/
        }
        /******/ if (runtime) var result = runtime(__webpack_require__);
        /******/
      }
      /******/ if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      /******/ for (; i < chunkIds.length; i++) {
        /******/ chunkId = chunkIds[i];
        /******/ if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          /******/ installedChunks[chunkId][0]();
          /******/
        }
        /******/ installedChunks[chunkId] = 0;
        /******/
      }
      /******/ return __webpack_require__.O(result);
      /******/
    };
    /******/
    /******/ var chunkLoadingGlobal = (self["webpackChunkltjs_fourth"] =
      self["webpackChunkltjs_fourth"] || []);
    /******/ chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    /******/ chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module depends on other loaded chunks and execution need to be delayed
  /******/ var __webpack_exports__ = __webpack_require__.O(
    undefined,
    [
      "vendors-node_modules_three_build_three_module_js",
      "vendors-node_modules_three_examples_jsm_controls_OrbitControls_js",
      "vendors-node_modules_lil-gui_dist_lil-gui_esm_js",
    ],
    () => __webpack_require__("./samples/chapters/chapter-1/getting-started.js")
  );
  /******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
  /******/
  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMS9nZXR0aW5nLXN0YXJ0ZWQuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2xpYnMvc3RhdHMubW9kdWxlLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgU3RhdHMgZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0IEdVSSBmcm9tIFwibGlsLWd1aVwiO1xuXG4vLyBOb3RlOiBUaGlzIGlzIGp1c3QgYSBnZXR0aW5nIHN0YXJ0ZWQgZXhhbXBsZS4gRm9yIHRoZSBvdGhlciBleGFtcGxlc1xuLy8gd2UgcmV1c2UgdGhlIGJhc2ljIGNvbXBvbmVudHMgYnkgZXh0cmFjdGluZyB0aGVtIHRvIGEgc2V0IG9mIGNvbW1vblxuLy8gSmF2YVNjcmlwdCBtb2R1bGVzIC8gZmlsZXMuXG5cbi8vIGJhc2ljIHNjZW5lIHNldHVwXG5jb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuc2NlbmUuYmFja2dyb3VuZENvbG9yID0gMHhmZmZmZmY7XG5zY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nKDB4ZmZmZmZmLCAwLjAwMjUsIDUwKTtcblxuLy8gc2V0dXAgY2FtZXJhXG5jb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXG4gIDc1LFxuICB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgMC4xLFxuICAxMDAwXG4pO1xuY2FtZXJhLnBvc2l0aW9uLnggPSAtMztcbmNhbWVyYS5wb3NpdGlvbi56ID0gODtcbmNhbWVyYS5wb3NpdGlvbi55ID0gMjtcblxuLy8gc2V0dXAgdGhlIHJlbmRlcmVyIGFuZCBhdHRhY2ggdG8gY2FudmFzXG5jb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xucmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2Rpbmc7XG5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG5yZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcDtcbnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4ZmZmZmZmKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbi8vIGFkZCBsaWdodHNcbnNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NjY2NjY2KSk7XG5jb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKTtcbmRpckxpZ2h0LnBvc2l0aW9uLnNldCg1LCAxMiwgOCk7XG5kaXJMaWdodC5jYXN0U2hhZG93ID0gdHJ1ZTtcbmRpckxpZ2h0LmludGVuc2l0eSA9IDE7XG5kaXJMaWdodC5zaGFkb3cuY2FtZXJhLm5lYXIgPSAwLjE7XG5kaXJMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDIwMDtcbmRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMDtcbmRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xMDtcbmRpckxpZ2h0LnNoYWRvdy5jYW1lcmEudG9wID0gMTA7XG5kaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMDtcbmRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLndpZHRoID0gNTEyO1xuZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gNTEyO1xuZGlyTGlnaHQuc2hhZG93LnJhZGl1cyA9IDQ7XG5kaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDU7XG5cbnNjZW5lLmFkZChkaXJMaWdodCk7XG5cbi8vIGFkZCBvcmJpdGNvbnRyb2xzXG5jb25zdCBjb250cm9sbGVyID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcbmNvbnRyb2xsZXIuZW5hYmxlRGFtcGluZyA9IHRydWU7XG5jb250cm9sbGVyLmRhbXBpbmdGYWN0b3IgPSAwLjA1O1xuY29udHJvbGxlci5taW5EaXN0YW5jZSA9IDM7XG5jb250cm9sbGVyLm1heERpc3RhbmNlID0gMTA7XG5jb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNDtcbmNvbnRyb2xsZXIubWF4UG9sYXJBbmdsZSA9ICgzICogTWF0aC5QSSkgLyA0O1xuXG4vLyBjcmVhdGUgYSBjdWJlIGFuZCB0b3J1cyBrbm90IGFuZCBhZGQgdGhlbSB0byB0aGUgc2NlbmVcbmNvbnN0IGN1YmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgpO1xuY29uc3QgY3ViZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4MDAwMGZmIH0pO1xuY29uc3QgY3ViZSA9IG5ldyBUSFJFRS5NZXNoKGN1YmVHZW9tZXRyeSwgY3ViZU1hdGVyaWFsKTtcblxuY3ViZS5wb3NpdGlvbi54ID0gLTE7XG5jdWJlLmNhc3RTaGFkb3cgPSB0cnVlO1xuc2NlbmUuYWRkKGN1YmUpO1xuXG5jb25zdCB0b3J1c0tub3RHZW9tZXRyeSA9IG5ldyBUSFJFRS5Ub3J1c0tub3RCdWZmZXJHZW9tZXRyeSgwLjUsIDAuMiwgMTAwLCAxMDApO1xuY29uc3QgdG9ydXNLbm90TWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgY29sb3I6IDB4MDBmZjg4LFxuICByb3VnaG5lc3M6IDAuMSxcbn0pO1xuY29uc3QgdG9ydXNLbm90TWVzaCA9IG5ldyBUSFJFRS5NZXNoKHRvcnVzS25vdEdlb21ldHJ5LCB0b3J1c0tub3RNYXQpO1xuXG50b3J1c0tub3RNZXNoLmNhc3RTaGFkb3cgPSB0cnVlO1xudG9ydXNLbm90TWVzaC5wb3NpdGlvbi54ID0gMjtcbnNjZW5lLmFkZCh0b3J1c0tub3RNZXNoKTtcblxuLy8gY3JlYXRlIGEgdmVyeSBsYXJnZSBncm91bmQgcGxhbmVcbmNvbnN0IGdyb3VuZEdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKTtcbmNvbnN0IGdyb3VuZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICBjb2xvcjogMHhmZmZmZmYsXG59KTtcbmNvbnN0IGdyb3VuZE1lc2ggPSBuZXcgVEhSRUUuTWVzaChncm91bmRHZW9tZXRyeSwgZ3JvdW5kTWF0ZXJpYWwpO1xuZ3JvdW5kTWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApO1xuZ3JvdW5kTWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKTtcbmdyb3VuZE1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG5zY2VuZS5hZGQoZ3JvdW5kTWVzaCk7XG5cbi8vIGFkZCBzdGF0c1xuY29uc3Qgc3RhdHMgPSBTdGF0cygpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGF0cy5kb20pO1xuXG4vLyBhZGQgZ3VpXG5jb25zdCBndWkgPSBuZXcgR1VJKCk7XG5jb25zdCBwcm9wcyA9IHtcbiAgY3ViZVNwZWVkOiAwLjAxLFxuICB0b3J1c1NwZWVkOiAwLjAxLFxufTtcblxuZ3VpLmFkZChwcm9wcywgJ2N1YmVTcGVlZCcsIC0wLjIsIDAuMiwgMC4wMSlcbmd1aS5hZGQocHJvcHMsICd0b3J1c1NwZWVkJywgLTAuMiwgMC4yLCAwLjAxKVxuXG5yZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG5cbi8vIHJlbmRlciB0aGUgc2NlbmVcbmxldCBzdGVwID0gMDtcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICBzdGF0cy51cGRhdGUoKTtcbiAgY3ViZS5yb3RhdGlvbi54ICs9IHByb3BzLmN1YmVTcGVlZDtcbiAgY3ViZS5yb3RhdGlvbi55ICs9IHByb3BzLmN1YmVTcGVlZDtcbiAgY3ViZS5yb3RhdGlvbi56ICs9IHByb3BzLmN1YmVTcGVlZDtcblxuICB0b3J1c0tub3RNZXNoLnJvdGF0aW9uLnggLT0gcHJvcHMudG9ydXNTcGVlZDtcbiAgdG9ydXNLbm90TWVzaC5yb3RhdGlvbi55ICs9IHByb3BzLnRvcnVzU3BlZWQ7XG4gIHRvcnVzS25vdE1lc2gucm90YXRpb24ueiAtPSBwcm9wcy50b3J1c1NwZWVkO1xuXG4gIC8vIHVuY29tbWVudCB0aGlzIHRvIGhhdmUgdGhlIGN1YmUganVtcCBhcm91bmRcbiAgLy8gICBzdGVwICs9IDAuMDQ7XG4gIC8vICAgY3ViZS5wb3NpdGlvbi54ID0gNCooTWF0aC5jb3Moc3RlcCkpO1xuICAvLyAgIGN1YmUucG9zaXRpb24ueSA9IDQqTWF0aC5hYnMoTWF0aC5zaW4oc3RlcCkpO1xuXG4gIGNvbnRyb2xsZXIudXBkYXRlKCk7XG59XG5hbmltYXRlKCk7XG4iLCJ2YXIgU3RhdHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dmFyIG1vZGUgPSAwO1xuXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMCc7XG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRzaG93UGFuZWwoICsrIG1vZGUgJSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoICk7XG5cblx0fSwgZmFsc2UgKTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGFkZFBhbmVsKCBwYW5lbCApIHtcblxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggcGFuZWwuZG9tICk7XG5cdFx0cmV0dXJuIHBhbmVsO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzaG93UGFuZWwoIGlkICkge1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y29udGFpbmVyLmNoaWxkcmVuWyBpIF0uc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gJ2Jsb2NrJyA6ICdub25lJztcblxuXHRcdH1cblxuXHRcdG1vZGUgPSBpZDtcblxuXHR9XG5cblx0Ly9cblxuXHR2YXIgYmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCksIHByZXZUaW1lID0gYmVnaW5UaW1lLCBmcmFtZXMgPSAwO1xuXG5cdHZhciBmcHNQYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdGUFMnLCAnIzBmZicsICcjMDAyJyApICk7XG5cdHZhciBtc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01TJywgJyMwZjAnLCAnIzAyMCcgKSApO1xuXG5cdGlmICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSApIHtcblxuXHRcdHZhciBtZW1QYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdNQicsICcjZjA4JywgJyMyMDEnICkgKTtcblxuXHR9XG5cblx0c2hvd1BhbmVsKCAwICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdFJFVklTSU9OOiAxNixcblxuXHRcdGRvbTogY29udGFpbmVyLFxuXG5cdFx0YWRkUGFuZWw6IGFkZFBhbmVsLFxuXHRcdHNob3dQYW5lbDogc2hvd1BhbmVsLFxuXG5cdFx0YmVnaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XG5cblx0XHR9LFxuXG5cdFx0ZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0dmFyIHRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdFx0bXNQYW5lbC51cGRhdGUoIHRpbWUgLSBiZWdpblRpbWUsIDIwMCApO1xuXG5cdFx0XHRpZiAoIHRpbWUgPj0gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwc1BhbmVsLnVwZGF0ZSggKCBmcmFtZXMgKiAxMDAwICkgLyAoIHRpbWUgLSBwcmV2VGltZSApLCAxMDAgKTtcblxuXHRcdFx0XHRwcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGZyYW1lcyA9IDA7XG5cblx0XHRcdFx0aWYgKCBtZW1QYW5lbCApIHtcblxuXHRcdFx0XHRcdHZhciBtZW1vcnkgPSBwZXJmb3JtYW5jZS5tZW1vcnk7XG5cdFx0XHRcdFx0bWVtUGFuZWwudXBkYXRlKCBtZW1vcnkudXNlZEpTSGVhcFNpemUgLyAxMDQ4NTc2LCBtZW1vcnkuanNIZWFwU2l6ZUxpbWl0IC8gMTA0ODU3NiApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH0sXG5cblx0XHQvLyBCYWNrd2FyZHMgQ29tcGF0aWJpbGl0eVxuXG5cdFx0ZG9tRWxlbWVudDogY29udGFpbmVyLFxuXHRcdHNldE1vZGU6IHNob3dQYW5lbFxuXG5cdH07XG5cbn07XG5cblN0YXRzLlBhbmVsID0gZnVuY3Rpb24gKCBuYW1lLCBmZywgYmcgKSB7XG5cblx0dmFyIG1pbiA9IEluZmluaXR5LCBtYXggPSAwLCByb3VuZCA9IE1hdGgucm91bmQ7XG5cdHZhciBQUiA9IHJvdW5kKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxICk7XG5cblx0dmFyIFdJRFRIID0gODAgKiBQUiwgSEVJR0hUID0gNDggKiBQUixcblx0XHRURVhUX1ggPSAzICogUFIsIFRFWFRfWSA9IDIgKiBQUixcblx0XHRHUkFQSF9YID0gMyAqIFBSLCBHUkFQSF9ZID0gMTUgKiBQUixcblx0XHRHUkFQSF9XSURUSCA9IDc0ICogUFIsIEdSQVBIX0hFSUdIVCA9IDMwICogUFI7XG5cblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cdGNhbnZhcy53aWR0aCA9IFdJRFRIO1xuXHRjYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuXHRjYW52YXMuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDo4MHB4O2hlaWdodDo0OHB4JztcblxuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cdGNvbnRleHQuZm9udCA9ICdib2xkICcgKyAoIDkgKiBQUiApICsgJ3B4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmJztcblx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0Y29udGV4dC5maWxsVGV4dCggbmFtZSwgVEVYVF9YLCBURVhUX1kgKTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRILCBHUkFQSF9IRUlHSFQgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0ZG9tOiBjYW52YXMsXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICggdmFsdWUsIG1heFZhbHVlICkge1xuXG5cdFx0XHRtaW4gPSBNYXRoLm1pbiggbWluLCB2YWx1ZSApO1xuXHRcdFx0bWF4ID0gTWF0aC5tYXgoIG1heCwgdmFsdWUgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggMCwgMCwgV0lEVEgsIEdSQVBIX1kgKTtcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KCByb3VuZCggdmFsdWUgKSArICcgJyArIG5hbWUgKyAnICgnICsgcm91bmQoIG1pbiApICsgJy0nICsgcm91bmQoIG1heCApICsgJyknLCBURVhUX1gsIFRFWFRfWSApO1xuXG5cdFx0XHRjb250ZXh0LmRyYXdJbWFnZSggY2FudmFzLCBHUkFQSF9YICsgUFIsIEdSQVBIX1ksIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX0hFSUdIVCwgR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1ggKyBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9ZLCBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCByb3VuZCggKCAxIC0gKCB2YWx1ZSAvIG1heFZhbHVlICkgKSAqIEdSQVBIX0hFSUdIVCApICk7XG5cblx0XHR9XG5cblx0fTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJnZXR0aW5nLXN0YXJ0ZWRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xL2dldHRpbmctc3RhcnRlZC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
