function init(){
    var scene = new THREE.Scene();
    
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

    var particleGeo = new THREE.SphereGeometry(10,32,32);
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

    
    var box = new CustomObject();
    box.name = 'box';
    scene.add( box );

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.getElementById('webgl').appendChild(renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
}


function CustomObject() {

    this.type = 'CustomObject';
    this.geometry = new THREE.BoxGeometry( 10, 10, 7 );

        
    this.material = new THREE.MeshBasicMaterial( { 
        color: 0xf23200,
        map: new THREE.TextureLoader().load("/assets/textures/checkerboard.jpg"),
    } );
    
    THREE.Mesh.call( this, this.geometry, this.material );

}

CustomObject.prototype = Object.create( THREE.Mesh.prototype );
CustomObject.prototype.constructor = CustomObject;

CustomObject.prototype.getMesh = function() {

    return this.mesh;

}



function update(renderer, scene, camera){
    renderer.render(
    	scene,
    	camera
    );

    var particleSystem = scene.getObjectByName('particleSystem');
    var box = scene.getObjectByName('box');
    particleSystem.rotation.y += 0.005;
    box.rotation.y += 0.005;
    box.rotation.x += 0.005;
    box.rotation.z -= 0.005;

    requestAnimationFrame(function(){
        update(renderer, scene, camera);
    });
    
}


var scene = init();