export class UpdateWinnerBetCommand {
  public readonly fixtureId: string;
  public readonly homeOdd: number;
  public readonly drawOdd: number;
  public readonly awayOdd: number;

  constructor(fixtureId: string, homeOdd: number, drawOdd: number, awayOdd: number) {
    this.fixtureId = fixtureId;
    this.homeOdd = homeOdd;
    this.drawOdd = drawOdd;
    this.awayOdd = awayOdd;
  }
}
