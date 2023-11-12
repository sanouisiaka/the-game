export async function cleanDb(prisma) {
  const deleteFixture = prisma.fixture.deleteMany();
  const deleteBets = prisma.bet.deleteMany();
  const deleteEvent = prisma.event.deleteMany();
  const deleteTeams = prisma.team.deleteMany();
  const deleteLeagues = prisma.league.deleteMany();

  await prisma.$transaction([deleteFixture, deleteBets, deleteEvent, deleteTeams, deleteLeagues]);
}
