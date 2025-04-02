import SpotifyWebApi from 'spotify-web-api-node';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export class SpotifyApi {
  private static instance: SpotifyWebApi;

  private constructor() {}

  public static async getInstance(): Promise<SpotifyWebApi> {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      redirect('/login');
    }

    if (session.error === 'RefreshAccessTokenError') {
      redirect('/login');
    }

    if (!this.instance) {
      this.instance = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      });
    }

    this.instance.setAccessToken(session.accessToken);
    return this.instance;
  }
}
