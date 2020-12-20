AFRAME.registerComponent('house', {
  init: function () {
    var el = this.el;
    el.setObject3D('mesh',  new AFRAME.THREE.Object3D());  // Returns THREE.Mesh that was just created.
  }
});