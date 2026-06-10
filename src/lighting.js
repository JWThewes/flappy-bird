// lighting.js — Stylized lighting, shadows, and sky environment for Flappy Bird 3D
// Requires THREE to be available globally (loaded via CDN in index.html)

/**
 * Sets up stylized lighting and environment on the given Three.js scene and renderer.
 * @param {THREE.Scene} scene
 * @param {THREE.WebGLRenderer} renderer
 */
function setupLighting(scene, renderer) {
  // Enable shadow mapping on the renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Ambient light for soft fill illumination
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  // Directional light (sun) with shadow mapping
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
  dirLight.position.set(5, 10, 7);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 50;
  dirLight.shadow.camera.left = -15;
  dirLight.shadow.camera.right = 15;
  dirLight.shadow.camera.top = 10;
  dirLight.shadow.camera.bottom = -10;
  scene.add(dirLight);

  // Gradient sky background (vertical gradient texture)
  const canvas = document.createElement('canvas');
  canvas.width = 2;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, '#4ec0ca');   // top — light blue
  gradient.addColorStop(0.5, '#87ceeb'); // mid — sky blue
  gradient.addColorStop(1, '#b0e0e6');   // bottom — pale blue
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2, 256);
  const skyTexture = new THREE.CanvasTexture(canvas);
  skyTexture.magFilter = THREE.LinearFilter;
  scene.background = skyTexture;

  // Ground plane
  const groundGeo = new THREE.PlaneGeometry(60, 10);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x7cba3d,
    roughness: 0.9,
    metalness: 0.0
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -4, 0);
  ground.receiveShadow = true;
  scene.add(ground);

  return { ambient, dirLight, ground, skyTexture };
}
