Feature: receive a fixture

  Scenario: Receiving a new fixture
    Given the fixture 21 does not exist
    When I receive the fixture 21
    Then the fixture creation is called

  Scenario: Receiving a known fixture
    Given the fixture 21 already exist
    When I receive the fixture 21
    Then the fixture update is called
