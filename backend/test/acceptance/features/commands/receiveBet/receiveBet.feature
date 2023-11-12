Feature: receive a bet

  Scenario: Receiving a new winner bet
    Given the fixture 21 already exist
    When I receive the new winner bet 1.5 - 3.4 - 1.1 for fixture 21
    Then the fixture's winner bet update is called with specified odds

  Scenario: Receiving a bet for a unknown fixture
    Given the fixture 21 does not exist
    When I receive the new winner bet 1.5 - 3.4 - 1.1 for fixture 21
    Then the fixture's winner bet update is not called because the fixture does not exist

  Scenario: Receiving a unknown bet
    Given the fixture 21 already exist
    When I receive a unknown type bet for fixture 21
    Then a error is return and the fixture bet update is not called
