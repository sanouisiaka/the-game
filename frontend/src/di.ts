import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepository, USER_REPOSITORY } from '@/corelogic/ports/user.repository.interface';
import { UserRepository } from '@/rest/user.repository';
import { AXIOS_HTTP_CLIENT, AxiosInstance, HttpClient } from '@/rest/axios.config';
import { ILeagueRepository, LEAGUE_REPOSITORY } from '@/corelogic/ports/league.repository.interface';
import { LeagueRepository } from '@/rest/league.repository';
import { FIXTURE_REPOSITORY, IFixtureRepository } from '@/corelogic/ports/fixture.repository.interface';
import { FixtureRepository } from '@/rest/fixture.repository';

export { container };

container.register<IUserRepository>(USER_REPOSITORY, { useClass: UserRepository });
container.register<ILeagueRepository>(LEAGUE_REPOSITORY, { useClass: LeagueRepository });
container.register<IFixtureRepository>(FIXTURE_REPOSITORY, { useClass: FixtureRepository });

container.register<HttpClient>(AXIOS_HTTP_CLIENT, { useClass: AxiosInstance });
