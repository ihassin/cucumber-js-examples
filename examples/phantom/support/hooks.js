var phantom = require('phantom');

module.exports = function() {
    // Open a new browser before each scenario
    this.Before(function(scenario, callback) {
        phantom.create().then(function(browser) {
            this.browser = browser;
            callback();
        }.bind(this));
    });

    // Close the browser after each scenario
    this.After(function(scenario, callback) {
        this.browser.exit();
        callback();
    });
};
