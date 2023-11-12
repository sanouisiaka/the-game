export interface BetRequest {
  type: 'WINNER';
  api_foot_fixture_id: number;
  options: {
    value: 'Home' | 'Draw' | 'Away';
    odd: number;
  }[];
}
