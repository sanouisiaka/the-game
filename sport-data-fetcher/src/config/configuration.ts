export default () => ({
  TCP_PORT: process.env.TCP_PORT,
  api: {
    season: parseInt(process.env.SEASON) || 2023,
  },
  cron: {
    getTeams: process.env.GET_TEAMS_CRON || '0 1 * * *',
    getFixtures: process.env.GET_FIXTURES_CRON || '0 2 * * *',
    getFixturesOdds: process.env.GET_ODDS_CRON || '0 3 * * *',
    updateFixtures: process.env.UPDATE_FIXTURES_CRON || '0 4 * * *',
  },
});
