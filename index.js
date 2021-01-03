AFRAME.registerComponent('camera-listener', {
  tick: function () {
    var a=new THREE.Vector3(this.el.getAttribute('position').x,this.el.getAttribute('position').y,this.el.getAttribute('position').z);
    var objective= document.getElementById('char_1').object3D.position;
    var c=new THREE.Vector3(objective.x,this.el.getAttribute('position').y,objective.z);
    
    if(a.distanceTo( c )<=1)
      document.getElementById('text-succeed').object3D.visible=true;
    else
      document.getElementById('text-succeed').object3D.visible=false;
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
  init: function () {
    var elm=this.el;
    var loader = new THREE.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var strine="Succeed";
        var geometry = new THREE.TextGeometry( strine, {
            font: font,
            size: 1,
            height: 0.2,
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