/**
 * Export a World constructor which will be the scope of all step definitions.
 */
var zombie = require('zombie');

function World() {
  this.browser = new zombie({ runScripts: false });
}

module.exports = function() {
  this.World = World;
};
