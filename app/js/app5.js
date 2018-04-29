function init(){
    var scene = new THREE.Scene();
    var stats = new Stats();
    document.body.appendChild(stats.dom);

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );

    camera.position.x = 30;
    camera.position.y = 0;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(0,0,0));

    var particleGeo = new THREE.SphereGeometry(10,64,64);

    particleGeo.vertices.forEach(function(vertex){
        vertex.x += (Math.random() - 0.5);
        vertex.y += (Math.random() - 0.5);
        vertex.z += (Math.random() - 0.5);
    });

    var particleMat = new THREE.PointsMaterial({
        color: 'rgb(255,255,255)',
        size: 0.25,
        map: new THREE.TextureLoader().load("/assets/textures/particle.jpg"),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });


    var particleSystem = new THREE.Points(
        particleGeo,
        particleMat
    );
    particleSystem.name = 'particleSystem';
    scene.add(particleSystem);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('rgb(20,20,20)');

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.getElementById('webgl').appendChild(renderer.domElement);

    update(renderer, scene, camera, controls, stats);

    return scene;
}


function update(renderer, scene, camera, controls, stats){
    renderer.render(
    	scene,
    	camera
    );

    stats.update();

    var particleSystem = scene.getObjectByName('particleSystem');
    particleSystem.rotation.y += 0.005;

    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls, stats);
    });
    
}

var scene = init();