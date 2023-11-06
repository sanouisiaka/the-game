Feature: receive a team

  Scenario: Receiving a new team
    Given the team PSG does not exist
    When I receive the new team PSG
    Then the team creation is called

  Scenario: Receiving a known team
    Given the team PSG already exist
    When I receive the new team PSG
    Then the team creation is not called
