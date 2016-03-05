/**
 * Export a World constructor which will be the scope of all step definitions.
 */
var zombie = require('zombie');
var worldCallCount = 0;

function World() {
    console.log('---> World initalised', ++worldCallCount, 'time' + (worldCallCount !== 1 ? 's' : ''));
    this.browser = new zombie({ runScripts: false });
}

module.exports = function() {
    this.World = World;
};
