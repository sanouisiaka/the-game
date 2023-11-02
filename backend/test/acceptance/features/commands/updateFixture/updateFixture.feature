Feature: update a fixture


  Scenario: Updating a fixture successfully
    Given the fixture 21 already exist
    When I want to update this fixture with score 2-1
    Then the fixture is updated with the score 2-1

  Scenario: Updating a unknown fixture
    Given the fixture 21 does not exist
    When I want to update this fixture with score 2-1
    Then the fixture update fails because the fixture does not exist

  Scenario Outline: Updating a fixture with a incorrect score
    Given the fixture 21 already exist
    When I want to update this fixture with score <home_score>-<away_score>
    Then the fixture is not created because the score is incorrect
    Examples:
      | home_score | away_score |
      | -1          | 0          |
      | -2         | -3         |


