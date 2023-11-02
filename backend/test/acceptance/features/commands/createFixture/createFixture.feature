Feature: create a fixture

  Scenario: Creating a fixture successfully
    Given the fixture 21 does not exist
    When I want to create the fixture 21 opposing PSG and OM
    Then the fixture is created

  Scenario: Creating a already existing fixture
    Given the fixture 21 already exist
    When I want to create the fixture 21 opposing PSG and OM
    Then the fixture creation fails because there already is a fixture with the same id

  Scenario Outline: Creating a fixture with a unknown team fails
    Given the fixture 21 does not exist
    When I want to create the fixture 21 opposing <home_team> and <away_team>
    Then the fixture is not created because a team is unknown
    Examples:
      | home_team | away_team |
      | PIATFC    | OM        |
      | PSG       | OUAGA     |

  Scenario: Creating a fixture with twice the same team is not possible
    Given the fixture 21 does not exist
    When I want to create the fixture 21 opposing PSG and PSG
    Then the fixture is not created because the team appear twice
