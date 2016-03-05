Feature: Cucumber documentation
    As a user of cucumber.js
    I want to have documentation on cucumber
    So I can write better applications

    @sections
    Scenario: Usage documentation
        Given I am on the cucumber.js GitHub repository
        When I go to the README file
        Then I should see a "Usage" section

    @badges
    Scenario: Status badges
        Given I am on the cucumber.js GitHub repository
        When I go to the README file
        Then I should see a "Build Status" badge
            And I should see a "Dependencies" badge
