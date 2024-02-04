Feature: Create a user

  Scenario: Creating a user successfully
    Given the email "william@gmail.com" is not use
    When I create a user "Will Smith" with email "william@gmail.com"
    Then the user "Will Smith" with email "william@gmail.com" is created

  Scenario: Creating a user fail because the email is already use
    Given the email "william@gmail.com" is taken
    When I create a user "Will Smith" with email "william@gmail.com"
    Then the user creation fail because the email already exists

  Scenario: Creating a user fail because the email is wrong
    Given the email "william@gmail.com" is not use
    When I create a user "Will Smith" with email "williamfake"
    Then the user creation fail because the email not correct

  Scenario: Creating a user fail because the user has no name
    Given the email "william@gmail.com" is not use
    When I create a user "" with email "william@gmail.com"
    Then the user creation fail because the user has no name