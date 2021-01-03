var start =new Date();
var game_start=0;
var time;
var cam;
var obj;
var object_place = [
  "63 0.5 -38",
  "63 0.5 -28",
  "63 0.5 -18",
  "63 0.5 -8",
  "47 0.5 -42",
  "47 0.5 -31",
  "47 0.5 -21",
  "24.4 0.5 27.4"
];
AFRAME.registerComponent('camera-listener', {
  tick: function () {
    cam=new THREE.Vector3(this.el.getAttribute('position').x,this.el.getAttribute('position').y,this.el.getAttribute('position').z);
    var objective= document.getElementById('char_1').object3D.position;
    obj=new THREE.Vector3(objective.x+1,this.el.getAttribute('position').y,objective.z);
    
    // Do something.
    if(game_start==1){
      var now=new Date();
      var sec=Math.floor(((now-start)/1000)%60);
      var min=Math.floor(((now-start)/1000)/60);
      time= ("0" +min.toString()).slice(-2)+":"+("0" +sec.toString()).slice(-2);
      document.getElementById('score').object3D.el.setAttribute('value',time);
    }
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
  schema: {
    text: {type: 'string', default: 'defaultstring'},
    f_size: {type: 'number', default: 1}
  },
  init: function () {
    var data = this.data;
    var elm=this.el;
    var loader = new THREE.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var strine= data.text;
        var geometry = new THREE.TextGeometry( strine, {
            font: font,
            size: data.f_size,
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

AFRAME.registerComponent('cursor-text', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      start=new Date();
      game_start=1;
      //console.log();
      this.setAttribute('material', 'color', randomColor());
      this.remove();
    });
  }
});

AFRAME.registerComponent('cursor_char', {
  init: function () {
    var nran=Math.floor(rand(0, 7));
    console.log(nran+" "+object_place[nran]);
    this.el.setAttribute('position', object_place[nran]);

    this.el.addEventListener('click', function (evt) { 
      alert("jarak"+cam.distanceTo( obj ))
      if(cam.distanceTo( obj )<=1.7){
        alert('game selesai');
        document.getElementById('text-succeed').object3D.visible=true;
      }
      else  
        document.getElementById('text-succeed').object3D.visible=false;
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});