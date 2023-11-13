Feature: Retrieve league list

  Scenario: Retrieving all leagues
    Given there is a list of leagues in db
    When I retrieve the list of leagues
    Then the list of leagues is returned