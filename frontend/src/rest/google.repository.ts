import { AXIOS_HTTP_CLIENT, HttpClient } from '@/rest/axios.config'
import { container } from '@/di'

export class GoogleRepository {

  CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

  getNewToken(refreshToken: string) {
    return container.resolve<HttpClient>(AXIOS_HTTP_CLIENT).post('https://oauth2.googleapis.com/token',
      {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }
}

export const googleRepository = new GoogleRepository();
