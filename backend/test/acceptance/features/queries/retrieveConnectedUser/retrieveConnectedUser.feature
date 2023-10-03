Feature: Retrieve the connected user

  Scenario: Retrieving the connected user successfully
    Given the user with email "william@gmail.com" is logged
    And the user "Will Smith" with email "william@gmail.com" exists in BetThemAll
    When I retrieve the connected user
    Then the user "Will Smith" with email "william@gmail.com" is returned

  Scenario: Retrieving the connected user fail because the user does not exists in BetThemAll
    Given the user with email "william@gmail.com" is logged
    And the user with email "william@gmail.com" does not exists in BetThemAll
    When I retrieve the connected user
    Then An error is returned because the user is not found
