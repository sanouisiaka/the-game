Feature: create a fixture

  Scenario: Creating a team successfully
    Given the team PSG does not exist
    When I want to create the team PSG
    Then the team is created

  Scenario: Creating a already existing team
    Given the team PSG already exist
    When I want to create the team PSG
    Then the team creation fails because there already is a team with the same id