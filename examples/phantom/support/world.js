/**
 * Export a World constructor which will be the scope of all step definitions.
 */
function World() {
    // Nothing in the world as cannot set it up asynchronously
    // See the Before hook for how the browser is created
}

module.exports = function(callback) {
    this.World = World;
};
