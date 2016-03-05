Feature: Cucumber documentation
  As a user of cucumber.js
  I want to have documentation on cucumber
  So I can write better applications

Scenario: Usage documentation
    Given I am on the cucumber.js Github repository
    When I go to the README file
    Then I should see a "Usage" section
