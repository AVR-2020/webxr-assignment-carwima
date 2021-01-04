var start;
var now;
var game_start=0;
var time;
var cam;
var obj;
var object_place = [
  "63 0.5 -40",
  "63 0.5 -27.6",
  "63 0.5 -14.5",
  "63 0.5 -2.8",
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
      now=new Date();
      var sec=Math.floor(((now-start)/1000)%60);
      var min=Math.floor(((now-start)/1000)/60);
      time= ("0" +min.toString()).slice(-2)+":"+("0" +sec.toString()).slice(-2);
      document.getElementById('score').object3D.el.setAttribute('value',time);
    }
  }
});

AFRAME.registerComponent('info', {
  tick: function () {
    // Do something.
    if(game_start==1){
      var sec=Math.floor(((now-start)/1000));
      if(sec>11)
        document.getElementById('info').object3D.visible=false;
      else if(sec>8)
        this.el.setAttribute('value', "Goodluck and Have fun!");
      else if(sec>4)
        this.el.setAttribute('value', "Go Find The Customer And Deliver Their Order By Clicking them");
      else if(sec>1)
        this.el.setAttribute('value', "You can use WASD For movement");
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
      document.getElementById('score').object3D.el.setAttribute('position','12  0 -48');
      document.getElementById('info').object3D.visible=true;
      //console.log();
      this.setAttribute('material', 'color', randomColor());
      this.remove();
    });
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
AFRAME.registerComponent('cursor_char', {
  init: function () {
    var nran=Math.floor(rand(0, 7));
    console.log(nran+" "+object_place[nran]);
    this.el.setAttribute('position', object_place[nran]);
    this.el.addEventListener('click', function (evt) { 
      //alert("jarak"+cam.distanceTo( obj ))
      if(cam.distanceTo( obj )<=1.7 && game_start==1){
        document.getElementById('text-succeed').object3D.visible=true;
        alert('Your Time is : '+time);
        location.reload();
      }
      else  
        document.getElementById('text-succeed').object3D.visible=false;
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});