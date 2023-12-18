import { container } from '@/di';
import { League } from '@/corelogic/domain/league/league';
import { ILeagueRepository, LEAGUE_REPOSITORY } from '@/corelogic/ports/league.repository.interface';

export async function retrieveLeagues(): Promise<League[]> {
  const leagueRepository = container.resolve<ILeagueRepository>(LEAGUE_REPOSITORY);
  return leagueRepository.getLeagues();
}