export class ReceiveBetCommand {
  public readonly type: 'WINNER';
  public readonly api_foot_fixture_id: number;
  public readonly options: {
    value: 'Home' | 'Draw' | 'Away';
    odd: number;
  }[];

  constructor(type: 'WINNER', api_foot_fixture_id: number, options: { value: 'Home' | 'Draw' | 'Away'; odd: number }[]) {
    this.type = type;
    this.api_foot_fixture_id = api_foot_fixture_id;
    this.options = options;
  }
}
