Feature: Retrieve fixture list

  Scenario: Retrieving paginated list of next fixtures
    Given there is the following fixtures
      | id | homeTeam    | awayTeam    | date                | league  |
      | 1  | PSG         | OM          | 2023-04-07          | Ligue 1 |
      | 2  | ATLETICO    | REAL MADRID | 2023-10-27          | LIGA    |
      | 3  | LYON        | OM          | 2023-06-10          | Ligue 1 |
      | 4  | RENNES      | PSG         | 2023-01-04 13:00:00 | Ligue 1 |
      | 5  | OM          | LYON        | 2022-12-24          | Ligue 1 |
      | 6  | LYON        | PSG         | 2023-10-27          | Ligue 1 |
      | 7  | REAL MADRID | BARCELONE   | 2022-04-07 21:00:00 | LIGA    |
      | 8  | REAL MADRID | PSG         | 2022-12-31 21:00:00 | Ligue 1 |
    And I want to retrieve fixtures by 3
    When I retrieve the page 1 of Ligue 1's fixtures after 2023-01-01
    Then a sorted list of fixtures is returned
      | homeTeam | awayTeam | date                | league  |
      | RENNES   | PSG      | 2023-01-04 13:00:00 | Ligue 1 |
      | PSG      | OM       | 2023-04-07          | Ligue 1 |
      | LYON     | OM       | 2023-06-10          | Ligue 1 |
    When I retrieve the page 2 of Ligue 1's fixtures after 2023-01-01
    Then a sorted list of fixtures is returned
      | homeTeam | awayTeam | date       | league  |
      | LYON     | PSG      | 2023-10-27 | Ligue 1 |
    Then the total count of fixtures is 4
    When I retrieve the page 1 of fixtures before 2022-12-31 20:00:00
    Then a sorted list of fixtures is returned
      | homeTeam    | awayTeam  | date                | league  |
      | OM          | LYON      | 2022-12-24          | Ligue 1 |
      | REAL MADRID | BARCELONE | 2022-04-07 21:00:00 | LIGA    |

  Scenario: Retrieving paginated list of next fixture without sizing
    Given there is a lot of fixtures
    When I retrieve the page 1 of Ligue 1's fixtures after 2023-01-01
    Then a list of fixtures is returned by 15




