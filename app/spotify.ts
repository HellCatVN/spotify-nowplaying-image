const axios = require('axios');
const querystring = require('querystring');

const {
  CLIENT_ID: client_id,
  CLIENT_SECRET: client_secret,
  REFRESH_TOKEN: refresh_token,
} = process.env;

let base64 = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const Authorization = `Basic ${base64}`;
const nowPlayingURL = `https://api.spotify.com/v1/me/player/currently-playing`;

async function getAuthorizationToken() {
  try {
    const getTokenURL = 'https://accounts.spotify.com/api/token';
    const response = await axios({
      url: getTokenURL,
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });
    return response.data.access_token;
  } catch (e) {
    console.log(e);
  }
}

export async function getNowPlayingData() {
  try {
    console.log(refresh_token);
    const accessToken = await getAuthorizationToken();
    const response = await axios.get(nowPlayingURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { status } = response;
    if (status === 204) {
      return {};
    } else if (status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e.data.error);
  }
}
