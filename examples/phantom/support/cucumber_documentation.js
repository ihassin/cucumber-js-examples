var currentPage;

module.exports = function() {

    this.Given(/^I am on the cucumber\.js GitHub repository$/, function(callback) {
        // Creating a page and opening a URL with the PhantomJS API
        this.browser.createPage().then(function(page) {
            page.open('https://github.com/cucumber/cucumber-js').then(function() {
                currentPage = page;
                callback();
            });
        });
    });

    this.When(/^I go to the README file$/, function(callback) {
        this.browser.createPage().then(function(page) {
            page.open('https://github.com/cucumber/cucumber-js/blob/master/README.md').then(function() {
                currentPage = page;
                callback();
            });
        });
    });

    this.Then(/^I should see a "(.*)" section$/, function(title, callback) {
        // Evaluating if a selector returns anything in the browser
        var titleLower = title.toLowerCase();
        var selector = 'a[href="#' + titleLower + '"]';

        currentPage.evaluate(function(selector) {
            return document.querySelectorAll(selector).length;
        }, selector).then(function(elementCount) {
            if (!elementCount) {
                callback(new Error('The "' + title + '" section was not found'));
            } else {
                callback();
            }
        });
    });

    this.Then('I should see a "$badge" badge', function(badge, callback) {
        var selector = 'img[alt="' + badge + '"]';

        currentPage.evaluate(function(selector) {
            return document.querySelectorAll(selector).length;
        }, selector).then(function(elementCount) {
            if (!elementCount) {
                callback(new Error('The "' + badge + '" badge was not found'));
            } else {
                callback();
            }
        });
    });

};

