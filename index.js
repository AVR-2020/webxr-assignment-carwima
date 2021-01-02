AFRAME.registerComponent('camera-listener', {
  tick: function () {
    var a=new THREE.Vector3(this.el.getAttribute('position').x,this.el.getAttribute('position').y,this.el.getAttribute('position').z);
    var b=new THREE.Vector3(0,this.el.getAttribute('position').y,0)
    var objective= document.getElementById('tree_1').object3D.position;
    var c=new THREE.Vector3(objective.x,this.el.getAttribute('position').y,objective.z);
    //console.log(c)
    if(a.distanceTo( c )<=1)
     console.log(a.distanceTo( c ));
    // Do something.
  }
});


function rand(min, max) {
  if (max === undefined) {
  max = min;
  min = 0;
  }
  return min + (max - min) * Math.random();
}

function randomColor() {
  return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
}

AFRAME.registerComponent('threetext', {
  tick: function () {
    var elm=this.el;
    var loader = new THREE.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var strine="IDGAF";
        var geometry = new THREE.TextGeometry( strine, {
            font: font,
            size: 1,
            height: 0.5,
            curveSegments: 0,
            bevelEnabled: false,
            bevelThickness: 0.5,
            bevelSize: 0.05,
            bevelOffset: 0,
            bevelSegments: 0.5,
        } );
        geometry.center();
        const material = new THREE.MeshPhongMaterial({
            color: randomColor(),
        });
        const text = new THREE.Mesh(geometry, material);
        elm.setObject3D('mesh',text);
    });
  }
});