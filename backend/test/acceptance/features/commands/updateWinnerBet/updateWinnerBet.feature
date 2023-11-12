Feature: update a winner bet for a fixture


  Scenario: Updating a fixture's winner bet
    Given the fixture 21 already exist
    When I update this fixture with odds 1.5 - 3.4 - 1.1
    Then the fixture is update with his new winner odds 1.5 - 3.4 - 1.1
    When I update this fixture with odds 1.5 - 2.874 - 3.2
    Then the fixture is update with his new winner odds 1.5 - 2.874 - 3.2


  Scenario: Updating a unknown fixture's winner bet
    Given the fixture 21 does not exist
    When I update this fixture with odds 1.5 - 3.4 - 1.1
    Then the fixture update fails because the fixture does not exist

  Scenario Outline: Updating a fixture's winner bet with incorrect odds
    Given the fixture 21 already exist
    When I update this fixture with odds <home> - <draw> - <away>
    Then the fixture update fails because the odds are incorrects
    Examples:
      | home | draw  | away |
      | 0.3  | 1.23  | 2.0  |
      | 1.0  | -5.12 | 2.0  |
      | 3.04 | 1.23  | -2.2 |


