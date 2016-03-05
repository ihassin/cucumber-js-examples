# Cucumber JS Test

> Some tests of using cucumber JS with zombie and selenium

## Cucumber and zombie

Zombie is a simulated browser, headless, lightweight and fast, no fat binaries required.

Dependencies:

* cucumber
* zombie

In `examples/zombie/support/world.js` we define the world that will be the context for all the step definitions.

A simple feature has been added in `examples/zombie/features/cucumber_documentation.feature`. As yet no step definitions have been added.

An npm script has been added to the `package.json` to run the tests, using `npm run test-zombie`. This could equally have been added to a `Makefile` or run directly from the command line. One thing to note about this script is that it uses the `-r` switch to tell cucumber where your JavaScript files are which means you *don't* have to put your `step_definitions` and `support` files in the `features` directory. Personally I'm not a fan of the convention of nesting steps and support inside features as I always forget where stuff is - having them as top-level directories makes things clearer for me.

Asynchronous steps are advanced by either using the `callback` argument to each step, or by returning a promise. The zombie API supports both mechanisms.

Any parameters in the matcher regex will be passed as arguments to your handler function, just like Ruby cucumber.

We're using `zombie.browser.assert` to check if the thing we care about is on the page. If this is not found zombie will throw an error, which cucumber will catch and fail the test.


