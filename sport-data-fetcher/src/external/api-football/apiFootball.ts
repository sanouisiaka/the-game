/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum BetType {
  WINNER = 1
}

export enum Bookmaker {
  UNIBET = 16
}

export interface apiDataScheme {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any;
}

export interface GetTimezoneData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: string[];
}

export type GetTimezoneError = {
  message?: string;
};

export interface GetCountriesData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: {
    name?: string;
    code?: string;
    flag?: string;
  }[];
}

export type GetCountriesError = {
  message?: string;
};

export interface GetLeaguesData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: {
    league?: {
      id?: number;
      name?: string;
      type?: string;
      logo?: string;
    };
    country?: {
      name?: string;
      code?: string;
      flag?: string;
    };
    seasons?: {
      year?: number;
      start?: string;
      end?: string;
      current?: boolean;
      coverage?: {
        fixtures?: {
          events?: boolean;
          lineups?: boolean;
          statistics_fixtures?: boolean;
          statistics_players?: boolean;
        };
        standings?: boolean;
        players?: boolean;
        top_scorers?: boolean;
        predictions?: boolean;
        odds?: boolean;
      };
    }[];
  }[];
}

export type GetLeaguesError = {
  message?: string;
};

export interface GetSeasonsData {
  response?: string[];
  results?: number;
  errors?: {
    field?: string;
  }[];
  parameters?: {
    field?: string;
  }[];
  get?: string;
}

export type GetSeasonsError = {
  message?: string;
};

export interface GetTeamsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: TeamData[];
}

export interface TeamData {
  team?: {
    id?: number;
    name?: string;
    code?: string;
    country?: string;
    founded?: number;
    national?: boolean;
    logo?: string;
  };
  venue?: {
    id?: number;
    name?: string;
    address?: string;
    city?: string;
    capacity?: number;
    surface?: string;
    image?: string;
  };
}

export type GetTeamsError = {
  message?: string;
};

export interface GetTeamsStatisticsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: {
    league?: {
      id?: number;
      name?: string;
      country?: string;
      logo?: string;
      flag?: string;
      season?: number;
    };
    team?: {
      id?: number;
      name?: string;
      logo?: string;
    };
    matches?: {
      played?: {
        home?: number;
        away?: number;
        total?: number;
      };
      wins?: {
        home?: number;
        away?: number;
        total?: number;
      };
      draws?: {
        home?: number;
        away?: number;
        total?: number;
      };
      loses?: {
        home?: number;
        away?: number;
        total?: number;
      };
    };
    goals?: {
      for?: {
        total?: {
          home?: number;
          away?: number;
          total?: number;
        };
        average?: {
          home?: string;
          away?: string;
          total?: string;
        };
      };
      against?: {
        total?: {
          home?: number;
          away?: number;
          total?: number;
        };
        average?: {
          home?: string;
          away?: string;
          total?: string;
        };
      };
    };
  };
}

export type GetTeamsStatisticsError = {
  message?: string;
};

export interface GetTeamsSeasonsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: object[];
}

export type GetTeamsSeasonsError = {
  message?: string;
};

export interface GetTeamsCountriesData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: object[];
}

export type GetTeamsCountriesError = {
  message?: string;
};

export interface GetVenuesData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: {
    id?: number;
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    capacity?: number;
    surface?: string;
    image?: string;
  }[];
}

export type GetVenuesError = {
  message?: string;
};

export interface GetStandingsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetStandingsError = {
  message?: string;
};

export interface GetFixturesRoundsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetFixturesRoundsError = {
  message?: string;
};

export interface GetFixturesData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetFixturesError = {
  message?: string;
};

export interface GetFixturesHeadtoheadData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetFixturesHeadtoheadError = {
  message?: string;
};

export interface GetFixturesStatisticsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetFixturesStatisticsError = {
  message?: string;
};

export interface GetFixturesEventsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetFixturesEventsError = {
  message?: string;
};

export interface GetFixturesLineupsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetFixturesLineupsError = {
  message?: string;
};

export interface GetFixturesPlayersData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetFixturesPlayersError = {
  message?: string;
};

export interface GetInjuriesData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetInjuriesError = {
  message?: string;
};

export interface GetPredictionsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetPredictionsError = {
  message?: string;
};

export interface GetCoachsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetCoachsError = {
  message?: string;
};

export interface GetPlayersSeasonsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetPlayersSeasonsError = {
  message?: string;
};

export interface GetPlayersData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetPlayersError = {
  message?: string;
};

export interface GetPlayersSquadsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetPlayersSquadsError = {
  message?: string;
};

export interface GetPlayersTopscorersData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetPlayersTopscorersError = {
  message?: string;
};

export interface GetPlayersTopassistsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetPlayersTopassistsError = {
  message?: string;
};

export interface GetPlayersTopyellowcardsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetPlayersTopyellowcardsError = {
  message?: string;
};

export interface GetPlayersTopredcardsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetPlayersTopredcardsError = {
  message?: string;
};

export interface GetTransfersData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetTransfersError = {
  message?: string;
};

export interface GetTrophiesData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetTrophiesError = {
  message?: string;
};

export interface GetSidelinedData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetSidelinedError = {
  message?: string;
};

export interface GetOddsLiveData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetOddsLiveError = {
  message?: string;
};

export interface GetBetsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetBetsError = {
  message?: string;
};

export interface GetOddsData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetOddsError = {
  message?: string;
};

export interface GetOddsMappingData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetOddsMappingError = {
  message?: string;
};

export interface GetBookmakersData {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetBookmakersError = {
  message?: string;
};

export interface GetBets2Data {
  get?: string;
  parameters?: {
    field?: string;
  }[];
  errors?: {
    field?: string;
  }[];
  results?: number;
  response?: any[];
}

export type GetBets2Error = {
  message?: string;
};

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || 'https://v3.football.api-sports.io' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API-FOOTBALL
 * @version 3.9.2
 * @baseUrl https://v3.football.api-sports.io
 * @contact support (https://www.api-football.com)
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  timezone = {
    /**
     * @description Get the list of available timezone to be used in the fixtures endpoint. > This endpoint does not require any parameters. **Update Frequency** : This endpoint contains all the existing timezone, it is not updated. **Recommended Calls** : 1 call when you need.
     *
     * @tags Timezone
     * @name GetTimezone
     * @summary Timezone
     * @request GET:/timezone
     */
    getTimezone: (params: RequestParams = {}) =>
      this.request<GetTimezoneData, GetTimezoneError>({
        path: `/timezone`,
        method: 'GET',
        ...params,
      }),
  };
  countries = {
    /**
     * @description Get the list of available countries for the `leagues` endpoint. The `name` and `code` fields can be used in other endpoints as filters. To get the flag of a country you have to call the following url: `https://media.api-sports.io/flags/{country_code}.svg` > Examples available in Request samples "Use Cases". All the parameters of this endpoint can be used together. **Update Frequency** : This endpoint is updated each time a new league from a country not covered by the API is added. **Recommended Calls** : 1 call per day.
     *
     * @tags Countries
     * @name GetCountries
     * @summary Countries
     * @request GET:/countries
     */
    getCountries: (
      query?: {
        /** The name of the country */
        name?: string;
        /**
         * The Alpha2 code of the country
         * @minLength 2
         * @maxLength 2
         * @pattern FR, GB, IT ...
         */
        code?: string;
        /**
         * The name of the country
         * @minLength 3
         * @maxLength 3
         */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetCountriesData, GetCountriesError>({
        path: `/countries`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  leagues = {
    /**
     * @description Get the list of available leagues and cups. The league `id` are **unique** in the API and leagues keep it across all `seasons` To get the logo of a competition you have to call the following url: `https://media.api-sports.io/football/leagues/{league_id}.png` This endpoint also returns the `coverage` of each competition, which makes it possible to know what is available for that league or cup. The values returned by the coverage indicate the **data available at the moment** you call the API, so for a competition that has not yet started, it is normal to have all the features set to `False`. This will be updated once the competition has started. > You can find all the leagues ids on our [Dashboard](https://dashboard.api-football.com/soccer/ids). **Example :** ``` "coverage": { "fixtures": { "events": true, "lineups": true, "statistics_fixtures": false, "statistics_players": false }, "standings": true, "players": true, "top_scorers": true, "top_assists": true, "top_cards": true, "injuries": true, "predictions": true, "odds": false } ``` In this example we can deduce that the competition does not have the following features: `statistics_fixtures`, `statistics_players`, `odds` because it is set to `False`. The coverage of a competition can vary from season to season and values set to `True` do not guarantee 100% data availability. Some competitions, such as the `friendlies`, are exceptions to the coverage indicated in the `leagues` endpoint, and the data available may differ depending on the match, including livescore, events, lineups, statistics and players. Competitions are automatically renewed by the API when a new season is available. There may be a delay between the announcement of the official calendar and the availability of data in the API. For `Cup` competitions, fixtures are automatically added when the two participating teams are known. For example if the current phase is the 8th final, the quarter final will be added once the teams playing this phase are known. > Examples available in Request samples "Use Cases". > Most of the parameters of this endpoint can be used together. **Update Frequency** : This endpoint is updated several times a day. **Recommended Calls** : 1 call per hour.
     *
     * @tags Leagues
     * @name GetLeagues
     * @summary Leagues
     * @request GET:/leagues
     */
    getLeagues: (
      query?: {
        /** The id of the league */
        id?: number;
        /** The name of the league */
        name?: string;
        /** The country name of the league */
        country?: string;
        /**
         * The Alpha2 code of the country
         * @minLength 2
         * @maxLength 2
         * @pattern FR, GB, IT…
         */
        code?: string;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season?: number;
        /** The id of the team */
        team?: number;
        /** The type of the league  */
        type?: 'league' | 'cup';
        /**
         * The state of the league
         * @pattern  Return the list of active seasons or the last one of each competition
         */
        current?: 'true' | 'false';
        /**
         * The name or the country of the league
         * @minLength 3
         */
        search?: string;
        /**
         * The X last leagues/cups added in the API
         * @maxLength 2
         */
        last?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetLeaguesData, GetLeaguesError>({
        path: `/leagues`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the list of available seasons. All seasons are only **4-digit keys**, so for a league whose season is `2018-2019` like the English Premier League (EPL), the `2018-2019` season in the API will be `2018`. All `seasons` can be used in other endpoints as filters. > This endpoint does not require any parameters. **Update Frequency** : This endpoint is updated each time a new league is added. **Recommended Calls** : 1 call per day.
     *
     * @tags Leagues
     * @name GetSeasons
     * @summary Seasons
     * @request GET:/leagues/seasons
     */
    getSeasons: (params: RequestParams = {}) =>
      this.request<GetSeasonsData, GetSeasonsError>({
        path: `/leagues/seasons`,
        method: 'GET',
        ...params,
      }),
  };
  teams = {
    /**
     * @description Get the list of available teams. The team `id` are **unique** in the API and teams keep it among all the leagues/cups in which they participate. To get the logo of a team you have to call the following url: `https://media.api-sports.io/football/teams/{team_id}.png` > You can find all the teams ids on our [Dashboard](https://dashboard.api-football.com/soccer/ids/teams). > Examples available in Request samples "Use Cases". > All the parameters of this endpoint can be used together. **This endpoint requires at least one parameter.** **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day. **Tutorials** : - [HOW TO GET ALL TEAMS AND PLAYERS FROM A LEAGUE ID](https://www.api-football.com/tutorials/4/how-to-get-all-teams-and-players-from-a-league-id)
     *
     * @tags Teams
     * @name GetTeams
     * @summary Teams information
     * @request GET:/teams
     */
    getTeams: (
      query?: {
        /** The id of the team */
        id?: number;
        /** The name of the team */
        name?: string;
        /** The id of the league */
        league?: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season?: number;
        /** The country name of the team */
        country?: string;
        /**
         * The code of the team
         * @minLength 3
         * @maxLength 3
         */
        code?: string;
        /** The id of the venue */
        venue?: number;
        /**
         * The name or the country name of the team
         * @minLength 3
         */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTeamsData, GetTeamsError>({
        path: `/teams`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Returns the statistics of a team in relation to a given competition and season. It is possible to add the `date` parameter to calculate statistics from the beginning of the season to the given date. By default the API returns the statistics of all games played by the team for the competition and the season. **Update Frequency** : This endpoint is updated twice a day. **Recommended Calls** : 1 call per day for the teams who have at least one fixture during the day otherwise 1 call per week. > Here is an example of what can be achieved ![demo-teams-statistics](https://www.api-football.com/public/img/demo/demo-teams-statistics.png)
     *
     * @tags Teams
     * @name GetTeamsStatistics
     * @summary Teams statistics
     * @request GET:/teams/statistics
     */
    getTeamsStatistics: (
      query: {
        /** The id of the league */
        league: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season: number;
        /** The id of the team */
        team: number;
        /**
         * The limit date
         * @pattern YYYY-MM-DD
         */
        date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTeamsStatisticsData, GetTeamsStatisticsError>({
        path: `/teams/statistics`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the list of seasons available for a team. > Examples available in Request samples "Use Cases". **This endpoint requires at least one parameter.** **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Teams
     * @name GetTeamsSeasons
     * @summary Teams seasons
     * @request GET:/teams/seasons
     */
    getTeamsSeasons: (
      query: {
        /** The id of the team */
        team: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTeamsSeasonsData, GetTeamsSeasonsError>({
        path: `/teams/seasons`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the list of countries available for the `teams` endpoint. **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Teams
     * @name GetTeamsCountries
     * @summary Teams countries
     * @request GET:/teams/countries
     */
    getTeamsCountries: (params: RequestParams = {}) =>
      this.request<GetTeamsCountriesData, GetTeamsCountriesError>({
        path: `/teams/countries`,
        method: 'GET',
        ...params,
      }),
  };
  venues = {
    /**
     * @description Get the list of available venues. The venue `id` are **unique** in the API. To get the image of a venue you have to call the following url: `https://media.api-sports.io/football/venues/{venue_id}.png` > Examples available in Request samples "Use Cases". > All the parameters of this endpoint can be used together. **This endpoint requires at least one parameter.** **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Venues
     * @name GetVenues
     * @summary Venues
     * @request GET:/venues
     */
    getVenues: (
      query?: {
        /** The id of the venue */
        id?: number;
        /** The name of the venue */
        name?: string;
        /** The city of the venue */
        city?: string;
        /** The country name of the venue */
        country?: string;
        /**
         * The name, city or the country of the venue
         * @minLength 3
         */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetVenuesData, GetVenuesError>({
        path: `/venues`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  standings = {
    /**
     * @description Get the standings for a league or a team. Return a table of one or more rankings according to the league / cup. Some competitions have several rankings in a year, group phase, opening ranking, closing ranking etc… > Examples available in Request samples "Use Cases". > Most of the parameters of this endpoint can be used together. **Update Frequency** : This endpoint is updated every hour. **Recommended Calls** : 1 call per hour for the leagues or teams who have at least one fixture in progress otherwise 1 call per day. **Tutorials** : - [HOW TO GET STANDINGS FOR ALL CURRENT SEASONS](https://www.api-football.com/tutorials/6/how-to-get-standings-for-all-current-seasons)
     *
     * @tags Standings
     * @name GetStandings
     * @summary Standings
     * @request GET:/standings
     */
    getStandings: (
      query: {
        /** The id of the league */
        league?: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season: number;
        /** The id of the team */
        team?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetStandingsData, GetStandingsError>({
        path: `/standings`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  fixtures = {
    /**
     * @description Get the rounds for a league or a cup. The `round` can be used in endpoint fixtures as filters > Examples available in Request samples "Use Cases". **Update Frequency** : This endpoint is updated every day. **Recommended Calls** : 1 call per day.
     *
     * @tags Fixtures
     * @name GetFixturesRounds
     * @summary Rounds
     * @request GET:/fixtures/rounds
     */
    getFixturesRounds: (
      query: {
        /** The id of the league */
        league: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season: number;
        /** The current round only */
        current?: true | false;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetFixturesRoundsData, GetFixturesRoundsError>({
        path: `/fixtures/rounds`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description For all requests to fixtures you can add the query parameter `timezone` to your request in order to retrieve the list of matches in the time zone of your choice like *“Europe/London“* To know the list of available time zones you have to use the endpoint timezone. **Available fixtures status** | SHORT  | LONG                            | TYPE       | DESCRIPTION                                                                                                                                           | | -------| --------------------------------| -----------|-------------------------------------------------------------------------------------------------------------------------------------------------------| | TBD    | Time To Be Defined              | Scheduled  | Scheduled but date and time are not known                                                                                                             | | NS     | Not Started                     | Scheduled  |                                                                                                                                                       | | 1H     | First Half, Kick Off            | In Play    | First half in play                                                                                                                                    | | HT     | Halftime                        | In Play    | Finished in the regular time                                                                                                                          | | 2H     | Second Half, 2nd Half Started   | In Play    | Second half in play                                                                                                                                   | | ET     | Extra Time                      | In Play    | Extra time in play                                                                                                                                    | | BT     | Break Time                      | In Play    | Break during extra time                                                                                                                               | | P      | Penalty In Progress             | In Play    | Penaly played after extra time                                                                                                                        | | SUSP   | Match Suspended                 | In Play    | Suspended by referee's decision, may be rescheduled another day                                                                                       | | INT    | Match Interrupted               | In Play    | Interrupted by referee's decision, should resume in a few minutes                                                                                     | | FT     | Match Finished                  | Finished   | Finished in the regular time                                                                                                                          | | AET    | Match Finished                  | Finished   | Finished after extra time without going to the penalty shootout                                                                                       | | PEN    | Match Finished                  | Finished   | Finished after the penalty shootout                                                                                                                   | | PST    | Match Postponed                 | Postponed  | Postponed to another day, once the new date and time is known the status will change to Not Started                                                   | | CANC   | Match Cancelled                 | Cancelled  | Cancelled, match will not be played                                                                                                                   | | ABD    | Match Abandoned                 | Abandoned  | Abandoned for various reasons (Bad Weather, Safety, Floodlights, Playing Staff Or Referees), Can be rescheduled or not, it depends on the competition | | AWD    | Technical Loss                  | Not Played | | | WO     | WalkOver                        | Not Played | Victory by forfeit or absence of competitor                                                                                                           | | LIVE   | In Progress                     | In Play    | Used in very rare cases. It indicates a fixture in progress but the data indicating the half-time or elapsed time are not available                   | Fixtures with the status `TBD` may indicate an incorrect fixture date or time because the fixture date or time is not yet known or final. Fixtures with this status are checked and updated daily. The same applies to fixtures with the status `PST`, `CANC`. The fixtures ids are unique and specific to each fixture. In no case an `ID` will change. Not all competitions have livescore available and only have `final result`. In this case, the status remains in `NS` and will be updated in the minutes/hours following the match (this can take up to 48 hours, depending on the competition). > Although the data is updated every 15 seconds, depending on the competition there may be a delay between reality and the availability of data in the API. **Update Frequency** : This endpoint is updated every 15 seconds. **Recommended Calls** : 1 call per minute for the leagues, teams, fixtures who have at least one fixture in progress otherwise 1 call per day. > Here are several examples of what can be achieved ![demo-fixtures](https://www.api-football.com/public/img/demo/demo-fixtures.jpg)
     *
     * @tags Fixtures
     * @name GetFixtures
     * @summary Fixtures
     * @request GET:/fixtures
     */
    getFixtures: (
      query?: {
        /** The id of the fixture */
        id?: 'id';
        /**
         * One or more fixture ids
         * @pattern Maximum of 20 fixtures ids
         */
        ids?: 'id-id-id';
        /** All or several leagues ids */
        live?: 'all' | 'id-id';
        /**
         * A valid date
         * @pattern YYYY-MM-DD
         */
        date?: string;
        /** The id of the league */
        league?: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season?: number;
        /** The id of the team */
        team?: number;
        /**
         * For the X last fixtures
         * @maxLength 2
         */
        last?: number;
        /**
         * For the X next fixtures
         * @maxLength 2
         */
        next?: number;
        /**
         * A valid date
         * @pattern YYYY-MM-DD
         */
        from?: string;
        /**
         * A valid date
         * @pattern YYYY-MM-DD
         */
        to?: string;
        /** The round of the fixture */
        round?: string;
        /** One or more fixture status short */
        status?: 'NS' | 'NS-PST-FT';
        /** The venue id of the fixture */
        venue?: number;
        /** A valid timezone from the endpoint `Timezone` */
        timezone?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetFixturesData, GetFixturesError>({
        path: `/fixtures`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get heads to heads between two teams. **Update Frequency** : This endpoint is updated every 15 seconds. **Recommended Calls** : 1 call per minute for the leagues, teams, fixtures who have at least one fixture in progress otherwise 1 call per day. > Here is an example of what can be achieved ![demo-h2h](https://www.api-football.com/public/img/demo/demo-h2h.png)
     *
     * @tags Fixtures
     * @name GetFixturesHeadtohead
     * @summary Head To Head
     * @request GET:/fixtures/headtohead
     */
    getFixturesHeadtohead: (
      query: {
        /**
         * The ids of the teams
         * @pattern ID-ID
         */
        h2h: string;
        /** @pattern YYYY-MM-DD */
        date?: string;
        /** The id of the league */
        league?: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season?: number;
        /** For the X last fixtures */
        last?: number;
        /** For the X next fixtures */
        next?: number;
        /** @pattern YYYY-MM-DD */
        from?: string;
        /** @pattern YYYY-MM-DD */
        to?: string;
        /** One or more fixture status short */
        status?: 'NS' | 'NS-PST-FT';
        /** The venue id of the fixture */
        venue?: number;
        /** A valid timezone from the endpoint `Timezone` */
        timezone?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetFixturesHeadtoheadData, GetFixturesHeadtoheadError>({
        path: `/fixtures/headtohead`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the statistics for one fixture. **Available statistics** * Shots on Goal * Shots off Goal * Shots insidebox * Shots outsidebox * Total Shots * Blocked Shots * Fouls * Corner Kicks * Offsides * Ball Possession * Yellow Cards * Red Cards * Goalkeeper Saves * Total passes * Passes accurate * Passes % **Update Frequency** : This endpoint is updated every minute. **Recommended Calls** : 1 call every minute for the teams or fixtures who have at least one fixture in progress otherwise 1 call per day. > Here is an example of what can be achieved ![demo-statistics](https://www.api-football.com/public/img/demo/demo-statistics.png)
     *
     * @tags Fixtures
     * @name GetFixturesStatistics
     * @summary Statistics
     * @request GET:/fixtures/statistics
     */
    getFixturesStatistics: (
      query: {
        /** The id of the fixture */
        fixture: number;
        /** The id of the team */
        team?: number;
        /** The type of statistics */
        type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetFixturesStatisticsData, GetFixturesStatisticsError>({
        path: `/fixtures/statistics`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the events from a fixture. **Available events** | TYPE        |                 |                      |          |                 | | ----------- | -------------   | ---------            |--------  |--------         | | Goal        |   Normal Goal   |   Own Goal           | Penalty  | Missed Penalty  | | Card        |   Yellow Card   |   Red card           |          |                 | | Subst       | Substitution [1, 2, 3...]  |           |          |                 | | Var         | Goal cancelled  |   Penalty confirmed  |          |                 | * *VAR events are available from the 2020-2021 season.* **Update Frequency** : This endpoint is updated every 15 seconds. **Recommended Calls** : 1 call per minute for the fixtures in progress otherwise 1 call per day. You can also retrieve all the events of the fixtures in progress with to the endpoint `fixtures?live=all` > Here is an example of what can be achieved ![demo-events](https://www.api-football.com/public/img/demo/demo-events.png)
     *
     * @tags Fixtures
     * @name GetFixturesEvents
     * @summary Events
     * @request GET:/fixtures/events
     */
    getFixturesEvents: (
      query: {
        /** The id of the fixture */
        fixture: number;
        /** The id of the team */
        team?: number;
        /** The id of the player */
        player?: number;
        /** The type */
        type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetFixturesEventsData, GetFixturesEventsError>({
        path: `/fixtures/events`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the lineups for a fixture. Lineups are available between 20 and 40 minutes before the fixture when the competition covers this feature. You can check this with the endpoint `leagues` and the `coverage` field. > It's possible that for some competitions the lineups are not available before the fixture, this can be the case for minor competitions **Available datas** * Formation * Coach * Start XI * Substitutes **Players' positions on the grid `*`** **X** = row and **Y** = column (X:Y) Line 1 **X** being the one of the goal and then for each line this number is incremented. The column **Y** will go from left to right, and incremented for each player of the line. `* As a new feature, some irregularities may occur, do not hesitate to report them on our public Roadmap` **Update Frequency** : This endpoint is updated every 15 minutes. **Recommended Calls** : 1 call every 15 minutes for the fixtures in progress otherwise 1 call per day. > Here are several examples of what can be done ![demo-lineups](https://www.api-football.com/public/img/demo/demo-lineups-1.jpg) ![demo-lineups](https://www.api-football.com/public/img/demo/demo-lineups.png)
     *
     * @tags Fixtures
     * @name GetFixturesLineups
     * @summary Lineups
     * @request GET:/fixtures/lineups
     */
    getFixturesLineups: (
      query: {
        /** The id of the fixture */
        fixture: number;
        /** The id of the team */
        team?: number;
        /** The id of the player */
        player?: number;
        /** The type */
        type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetFixturesLineupsData, GetFixturesLineupsError>({
        path: `/fixtures/lineups`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the players statistics from one fixture. **Update Frequency** : This endpoint is updated every minute. **Recommended Calls** : 1 call every minute for the fixtures in progress otherwise 1 call per day.
     *
     * @tags Fixtures
     * @name GetFixturesPlayers
     * @summary Players statistics
     * @request GET:/fixtures/players
     */
    getFixturesPlayers: (
      query: {
        /** The id of the fixture */
        fixture: number;
        /** The id of the team */
        team?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetFixturesPlayersData, GetFixturesPlayersError>({
        path: `/fixtures/players`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  injuries = {
    /**
     * @description Get the list of players not participating in the fixtures for various reasons such as `suspended`, `injured` for example. Being a new endpoint, the data is only available from April 2021. **There are two types:** * `Missing FootballContract` : The player will not play the fixture. * `Questionable` : The information is not yet 100% sure, the player may eventually play the fixture. > Examples available in Request samples "Use Cases". > All the parameters of this endpoint can be used together. **This endpoint requires at least one parameter.** **Update Frequency** : This endpoint is updated every 4 hours. **Recommended Calls** : 1 call per day.
     *
     * @tags Injuries
     * @name GetInjuries
     * @summary Injuries
     * @request GET:/injuries
     */
    getInjuries: (
      query?: {
        /** The id of the league */
        league?: number;
        /**
         * The season of the league, **required** with `league`, `team` and `player` parameters
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season?: number;
        /** The id of the fixture */
        fixture?: number;
        /** The id of the team */
        team?: number;
        /** The id of the player */
        player?: number;
        /**
         * A valid date
         * @pattern YYYY-MM-DD
         */
        date?: string;
        /** A valid timezone from the endpoint `Timezone` */
        timezone?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetInjuriesData, GetInjuriesError>({
        path: `/injuries`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  predictions = {
    /**
     * @description Get predictions about a fixture. The predictions are made using several algorithms including the poisson distribution, comparison of team statistics, last matches, players etc… Bookmakers odds are not used to make these predictions Also provides some comparative statistics between teams **Available Predictions** * Match winner : Id of the team that can potentially win the fixture * Win or Draw : If `True` indicates that the designated team can win or draw * Under / Over : -1.5 / -2.5 / -3.5 / -4.5 / +1.5 / +2.5 / +3.5 / +4.5 `*` * Goals Home : -1.5 / -2.5 / -3.5 / -4.5 `*` * Goals Away -1.5 / -2.5 / -3.5 / -4.5 `*` * Advice *(Ex : Deportivo Santani or draws and -3.5 goals)* `*` **-1.5** means that there will be a maximum of **1.5** goals in the fixture, i.e : **1** goal **Update Frequency** : This endpoint is updated every hour. **Recommended Calls** : 1 call per hour for the fixtures in progress otherwise 1 call per day. >Here is an example of what can be achieved ![demo-prediction](https://www.api-football.com/public/img/demo/demo-prediction.png)
     *
     * @tags Predictions
     * @name GetPredictions
     * @summary Predictions
     * @request GET:/predictions
     */
    getPredictions: (
      query: {
        /** The id of the fixture */
        fixture: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPredictionsData, GetPredictionsError>({
        path: `/predictions`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  coachs = {
    /**
     * @description Get all the information about the coachs and their careers. To get the photo of a coach you have to call the following url: `https://media.api-sports.io/football/coachs/{coach_id}.png` **Update Frequency** : This endpoint is updated every day. **Recommended Calls** : 1 call per day.
     *
     * @tags Coachs
     * @name GetCoachs
     * @summary Coachs
     * @request GET:/coachs
     */
    getCoachs: (
      query?: {
        /** The id of the coach */
        id?: number;
        /** The id of the team */
        team?: number;
        /**
         * The name of the coach
         * @minLength 3
         */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetCoachsData, GetCoachsError>({
        path: `/coachs`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  players = {
    /**
     * @description Get all available seasons for players statistics. **Update Frequency** : This endpoint is updated every day. **Recommended Calls** : 1 call per day.
     *
     * @tags Players
     * @name GetPlayersSeasons
     * @summary Seasons
     * @request GET:/players/seasons
     */
    getPlayersSeasons: (
      query?: {
        /** The id of the player */
        player?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPlayersSeasonsData, GetPlayersSeasonsError>({
        path: `/players/seasons`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get players statistics. This endpoint returns the players for whom the `profile` and `statistics` data are available. Note that it is possible that a player has statistics for 2 teams in the same season in case of transfers. The statistics are calculated according to the team `id`, league `id` and `season`. You can find the available `seasons` by using the endpoint `players/seasons`. > To get the squads of the teams it is better to use the endpoint `players/squads`. The players `id` are unique in the API and players keep it among all the teams they have been in. In this endpoint you have the `rating` field, which is the rating of the player according to a match or a season. This data is calculated according to the performance of the player in relation to the other players of the game or the season who occupy the same position *(Attacker, defender, goal...)*. There are different algorithms that take into account the position of the player and assign points according to his performance. To get the photo of a player you have to call the following url: `https://media.api-sports.io/football/players/{player_id}.png` This endpoint uses a **pagination system**, you can navigate between the different pages with to the `page` parameter. > **Pagination** : 20 results per page. **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day. **Tutorials** : - [HOW TO GET ALL TEAMS AND PLAYERS FROM A LEAGUE ID](https://www.api-football.com/tutorials/4/how-to-get-all-teams-and-players-from-a-league-id)
     *
     * @tags Players
     * @name GetPlayers
     * @summary Players
     * @request GET:/players
     */
    getPlayers: (
      query?: {
        /** The id of the player */
        id?: number;
        /** The id of the team */
        team?: number;
        /** The id of the league */
        league?: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY | Requires the fields Id, League or Team
         */
        season?: number;
        /**
         * The name of the player
         * @minLength 4
         * @pattern Requires the fields League or Team
         */
        search?: string;
        /**
         * Use for the pagination
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPlayersData, GetPlayersError>({
        path: `/players`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Return the current squad of a team when the `team` parameter is used. When the `player` parameter is used the endpoint returns the set of teams associated with the player. > The response format is the same regardless of the parameter sent. **This endpoint requires at least one parameter.** **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per week.
     *
     * @tags Players
     * @name GetPlayersSquads
     * @summary Squads
     * @request GET:/players/squads
     */
    getPlayersSquads: (
      query?: {
        /** The id of the team */
        team?: number;
        /** The id of the player */
        player?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPlayersSquadsData, GetPlayersSquadsError>({
        path: `/players/squads`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the 20 best players for a league or cup. **How it is calculated:** * 1 : The player that has scored the higher number of goals * 2 : The player that has scored the fewer number of penalties * 3 : The player that has delivered the higher number of goal assists * 4 : The player that scored their goals in the higher number of matches * 5 : The player that played the fewer minutes * 6 : The player that plays for the team placed higher on the table * 7 : The player that received the fewer number of red cards * 8 : The player that received the fewer number of yellow cards **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Players
     * @name GetPlayersTopscorers
     * @summary Top Scorers
     * @request GET:/players/topscorers
     */
    getPlayersTopscorers: (
      query: {
        /** The id of the league */
        league: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPlayersTopscorersData, GetPlayersTopscorersError>({
        path: `/players/topscorers`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the 20 best players assists for a league or cup. **How it is calculated:** * 1 : The player that has delivered the higher number of goal assists * 2 : The player that has scored the higher number of goals * 3 : The player that has scored the fewer number of penalties * 4 : The player that assists in the higher number of matches * 5 : The player that played the fewer minutes * 6 : The player that received the fewer number of red cards * 7 : The player that received the fewer number of yellow cards **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Players
     * @name GetPlayersTopassists
     * @summary Top Assists
     * @request GET:/players/topassists
     */
    getPlayersTopassists: (
      query: {
        /** The id of the league */
        league: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPlayersTopassistsData, GetPlayersTopassistsError>({
        path: `/players/topassists`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the 20 players with the most yellow cards for a league or cup. **How it is calculated:** * 1 : The player that received the higher number of yellow cards * 2 : The player that received the higher number of red cards * 3 : The player that assists in the higher number of matches * 4 : The player that played the fewer minutes **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Players
     * @name GetPlayersTopyellowcards
     * @summary Top Yellow Cards
     * @request GET:/players/topyellowcards
     */
    getPlayersTopyellowcards: (
      query: {
        /** The id of the league */
        league: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPlayersTopyellowcardsData, GetPlayersTopyellowcardsError>({
        path: `/players/topyellowcards`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the 20 players with the most red cards for a league or cup. **How it is calculated:** * 1 : The player that received the higher number of red cards * 2 : The player that received the higher number of yellow cards * 3 : The player that assists in the higher number of matches * 4 : The player that played the fewer minutes **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Players
     * @name GetPlayersTopredcards
     * @summary Top Red Cards
     * @request GET:/players/topredcards
     */
    getPlayersTopredcards: (
      query: {
        /** The id of the league */
        league: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPlayersTopredcardsData, GetPlayersTopredcardsError>({
        path: `/players/topredcards`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  transfers = {
    /**
     * @description Get all available transfers for players and teams **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Transfers
     * @name GetTransfers
     * @summary Transfers
     * @request GET:/transfers
     */
    getTransfers: (
      query?: {
        /** The id of the player */
        player?: number;
        /** The id of the team */
        team?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTransfersData, GetTransfersError>({
        path: `/transfers`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  trophies = {
    /**
     * @description Get all available trophies for a player or a coach. **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Trophies
     * @name GetTrophies
     * @summary Trophies
     * @request GET:/trophies
     */
    getTrophies: (
      query?: {
        /** The id of the player */
        player?: number;
        /** The id of the coach */
        coach?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTrophiesData, GetTrophiesError>({
        path: `/trophies`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  sidelined = {
    /**
     * @description Get all available sidelined for a player or a coach. **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Sidelined
     * @name GetSidelined
     * @summary Sidelined
     * @request GET:/sidelined
     */
    getSidelined: (
      query?: {
        /** The id of the player */
        player?: number;
        /** The id of the coach */
        coach?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetSidelinedData, GetSidelinedError>({
        path: `/sidelined`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  odds = {
    /**
     * @description This endpoint returns in-play odds for fixtures in progress. Fixtures are added between 15 and 5 minutes before the start of the fixture. Once the fixture is over they are removed from the endpoint between 5 and 20 minutes. **No history is stored**. So fixtures that are about to start, fixtures in progress and fixtures that have just ended are available in this endpoint. **Update Frequency** : This endpoint is updated every 5 seconds.`*` `* This value can change in the range of 5 to 60 seconds` **INFORMATIONS ABOUT STATUS** ``` "status": { "stopped": false, // True if the fixture is stopped by the referee for X reason "blocked": false, // True if bets on this fixture are temporarily blocked "finished": false // True if the fixture has not started or if it is finished }, ``` **INFORMATIONS ABOUT VALUES** When several identical values exist for the same bet the `main` field is set to `True` for the bet being considered, the others will have the value `False`. The `main` field will be set to `True` only if several identical values exist for the same bet. When a value is unique for a bet the `main` value will always be `False` or `null`. **Example below** : ``` "id": 36, "name": "Over/Under Line", "values": [ { "value": "Over", "odd": "1.975", "handicap": "2", "main": true, // Bet to consider "suspended": false // True if this bet is temporarily suspended }, { "value": "Over", "odd": "3.45", "handicap": "2", "main": false, // Bet to no consider "suspended": false }, ] ```
     *
     * @tags Odds (In-Play)
     * @name GetOddsLive
     * @summary odds/live
     * @request GET:/odds/live
     */
    getOddsLive: (
      query?: {
        /** The id of the fixture */
        fixture?: number;
        /** The id of the league */
        league?: number;
        /** The id of the bet */
        bet?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetOddsLiveData, GetOddsLiveError>({
        path: `/odds/live`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get all available bets for in-play odds. All bets `id` can be used in endpoint `odds/live` as filters, **but are not compatible with endpoint `odds` for pre-match odds**. **Update Frequency** : This endpoint is updated every 60 seconds.
     *
     * @tags Odds (In-Play)
     * @name GetBets
     * @summary odds/live/bets
     * @request GET:/odds/live/bets
     */
    getBets: (
      query?: {
        /** The id of the bet name */
        id?: string;
        /**
         * The name of the bet
         * @minLength 3
         * @maxLength 3
         */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetBetsData, GetBetsError>({
        path: `/odds/live/bets`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get odds from fixtures, leagues or date. This endpoint uses a **pagination system**, you can navigate between the different pages with to the `page` parameter. > **Pagination** : 10 results per page. We provide pre-match odds between 1 and 14 days before the fixture. We keep a 7-days history *(The availability of odds may vary according to the leagues, seasons, fixtures and bookmakers)* **Update Frequency** : This endpoint is updated every 3 hours. **Recommended Calls** : 1 call every 3 hours.
     *
     * @tags Odds (Pre-Match)
     * @name GetOdds
     * @summary Odds
     * @request GET:/odds
     */
    getOdds: (
      query?: {
        /** The id of the fixture */
        fixture?: number;
        /** The id of the league */
        league?: number;
        /**
         * The season of the league
         * @minLength 4
         * @maxLength 4
         * @pattern YYYY
         */
        season?: number;
        /**
         * A valid date
         * @pattern YYYY-MM-DD
         */
        date?: string;
        /** A valid timezone from the endpoint `Timezone` */
        timezone?: string;
        /**
         * Use for the pagination
         * @default 1
         */
        page?: number;
        /** The id of the bookmaker */
        bookmaker?: number;
        /** The id of the bet */
        bet?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetOddsData, GetOddsError>({
        path: `/odds`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the list of available fixtures `id` for the endpoint odds. All fixtures, leagues `id` and `date` can be used in endpoint odds as filters. This endpoint uses a **pagination system**, you can navigate between the different pages with to the `page` parameter. > **Pagination** : 100 results per page. **Update Frequency** : This endpoint is updated every day. **Recommended Calls** : 1 call per day.
     *
     * @tags Odds (Pre-Match)
     * @name GetOddsMapping
     * @summary Mapping
     * @request GET:/odds/mapping
     */
    getOddsMapping: (
      query?: {
        /**
         * Use for the pagination
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetOddsMappingData, GetOddsMappingError>({
        path: `/odds/mapping`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get all available bookmakers. All bookmakers `id` can be used in endpoint odds as filters. **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Odds (Pre-Match)
     * @name GetBookmakers
     * @summary Bookmakers
     * @request GET:/odds/bookmakers
     */
    getBookmakers: (
      query?: {
        /** The id of the bookmaker */
        id?: number;
        /**
         * The name of the bookmaker
         * @minLength 3
         * @maxLength 3
         */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetBookmakersData, GetBookmakersError>({
        path: `/odds/bookmakers`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get all available bets for pre-match odds. All bets `id` can be used in endpoint odds as filters, **but are not compatible with endpoint `odds/live` for in-play odds**. **Update Frequency** : This endpoint is updated several times a week. **Recommended Calls** : 1 call per day.
     *
     * @tags Odds (Pre-Match)
     * @name GetBets2
     * @summary Bets
     * @request GET:/odds/bets
     * @originalName getBets
     * @duplicate
     */
    getBets2: (
      query?: {
        /** The id of the bet name */
        id?: string;
        /**
         * The name of the bet
         * @minLength 3
         * @maxLength 3
         */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetBets2Data, GetBets2Error>({
        path: `/odds/bets`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
}
