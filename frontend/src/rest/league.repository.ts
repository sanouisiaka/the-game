import { AXIOS_HTTP_CLIENT, HttpClient } from '@/rest/axios.config';

import { AxiosResponse } from 'axios';
import { inject, injectable } from 'tsyringe';
import { ILeagueRepository } from '@/corelogic/ports/league.repository.interface';
import { League } from '@/corelogic/domain/league/league';

@injectable()
export class LeagueRepository implements ILeagueRepository {

  // @ts-ignore
  constructor(@inject(AXIOS_HTTP_CLIENT) private axiosHttp: HttpClient) {
  }

  async getLeagues(): Promise<League[]> {
    return this.axiosHttp.get<AxiosResponse<League[]>>('/leagues')
      .then(response => response.data);
  }

}