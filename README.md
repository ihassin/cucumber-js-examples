# Cucumber JS Test

> Some tests of using cucumber JS with zombie and selenium

## Cucumber and zombie

Zombie is a simulated browser, headless, lightweight and fast, no fat binaries required.

Dependencies:

* cucumber
* zombie

To run:

```
$ npm run test-zombie
```

---

In `examples/zombie/support/world.js` we define the world that will be the context for all the step definitions.

A simple feature has been added in `examples/zombie/features/cucumber_documentation.feature`. As yet no step definitions have been added.

An npm script has been added to the `package.json` to run the tests, using `npm run test-zombie`. This could equally have been added to a `Makefile` or run directly from the command line. One thing to note about this script is that it uses the `-r` switch to tell cucumber where your JavaScript files are which means you *don't* have to put your `step_definitions` and `support` files in the `features` directory. Personally I'm not a fan of the convention of nesting steps and support inside features as I always forget where stuff is - having them as top-level directories makes things clearer for me.

---

Asynchronous steps are advanced by either using the `callback` argument to each step, or by returning a promise. The zombie API supports both mechanisms.

Any parameters in the matcher regex will be passed as arguments to your handler function, just like Ruby cucumber.

We're using `zombie.browser.assert` to check if the thing we care about is on the page. If this is not found zombie will throw an error, which cucumber will catch and fail the test.

---

An extra bit of sugar is that we don't have to use regular expressions to match step definitions, you can use simple strings with placeholder variables, which makes the code a bit more readable.

The step definitions are created using `this.Given`, `this.When` and `this.Then`. You can use the other gherkin keywords in your features, for example `And` and `But`, but there are no explicit methods for those keywords. In fact `Given`, `When` or `Then` are freely interchangeable in your step definitions and features, it is just a convention to use the one that makes sense. For example you could change *"Given I am on the cucumber.js GitHub repository"* to *"But I am on the cucumber.js GitHub repository"* and it will still work as expected, it just doesn't read very well ;)

---

The `World` constructor is run for every new scenario. You can add hooks to have setup/teardown code run in various places. By convention these are in a separate file. For example you can add a `Before` hook to run some setup before every test.

If you really want to do something before every test this could equally go in the `World` constructor, but one advantage of hooks is that they can be set to be run only for specific tags. For example you could add an `@with-user` tag to your test and it could do any setup of the world needed to make sure there is a user available.

There are also hooks that can be setup to run in a more granular fashion. For example `BeforeFeature` does exactly what it suggests and is only run once for each feature file, but be careful as this runs before the `World` constructor is called.

Sometimes it can be confusing choosing whether to use steps or hooks. Take this example:

```
Scenario: Default destination after sign-in
	Given I have an account
	When I log-in
	Then I expect to be redirected to my dashboard page
```

So in this case we would need to define steps to create the account, log-in and check what page URL you end up on. But you could equally do something like this:

```
@with-user
Scenario: Default destination after sign-in
	Given I've signed in
	Then I expect to be redirected to my dashboard page
```

Then you add a before hook on the `@with-user` tag that sets up a new random account and assigns it to the world, which can then be used in the test to check you do end up on the correct page.

One way of deciding is to consider whether the step is actually exercising your application. That first step may not be going through your application's sign-up flow to create the user, it might be directly modifying a database or creating users through an internal API. If you have steps that don't exercise your application, but only setup the world, then it might make more sense to use a hook. Especially if you want to do something like delete that user after every test.

Another consideration might be readability. The gherkin syntax is meant to be a [BusinessReadableDSL][], and for the business it may be implicit in the scenario that we're talking about a user that has an account and all we want to make explicit is that they're redirected somewhere after they sign-in.

Another consideration might be code sharing. You may want to set up a bunch of hooks that can be shared and have consistent semantics across your applications. You could do that by sharing step definitions, but I've found in that case the steps often need little tweaks because it made more sense to do it in one way for one application and another way for another application.

Related to code sharing, another consideration might be inadvertently creating dependencies between steps. If the first step, `I have an account` does something then adds the user to the world, subsequent steps are reliant on that. If you try to re-use the `When I login` somewhere else and it doesn't have the user assigned to the world as you expected in your tests then you may have to rewrite it. You could add quite a lot of brittleness to your tests if steps have implicit side-effects on the world.

---

## Cucumber and phantom

Dependencies:

* cucumber
* phantom (not phantomjs)

To run:

```
$ npm run test-phantom
```

This example is using the raw Phantom JS API from Node.js (on NPM that's `phantom` not `phantomjs`), so the change over zombie is this is now a real WebKit browser, albeit a headless one.

Whilst phantom does have a promise based API, it doesn't have the convenience methods that the zombie API does so some additional methods have been added to the `World` to provide a similar API. The main differences are that creating a browser and evaluating a selector are async operations, so some additional code is needed to manage that. It also requires an `After` hook to close the browser, otherwise the Phantom JS processes won't go away.

To see the messages sent to the Phantom JS process run as, `DEBUG=true npm run test-phantom`.

[BusinessReadableDSL]:http://martinfowler.com/bliki/BusinessReadableDSL.html
