<h1 align="center">Spotify Now Playing</h1>
<p align="center">Show what you listen at spotify for github README</p>

<p align="center">
   <h3>Demo</h3>
   <h4>Theme: 0</h4>
   <img src="https://spotify-nowplaying-image.vercel.app"/>
<p align="center">

Spotify for Developers
-----

* Create a [Spotify for Developers](https://developer.spotify.com/dashboard/applications) account
* Get Credentials
    * `Client ID`
    * `Client Secret`
* Go to **Edit Settings**
* Find **Redirect URIs**:
    * Add `http://localhost/callback/`

Get the Refresh Token from Spotify
-----

* Navigate to the following URL:
  <br/>
  **Note**: copy your Client ID and paste in **{SPOTIFY_CLIENT_ID}** below.

```
https://accounts.spotify.com/authorize?client_id={SPOTIFY_CLIENT_ID}&response_type=code&scope=user-read-currently-playing,user-read-recently-played&redirect_uri=http://localhost/callback/
```

* After logging in, get the {GET_THE_TOKEN} portion of: `http://localhost/callback/?code={GET_THE_TOKEN}`

* Create a string combining `{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}` (e.g. `5n7o4v5a3t7o5r2e3m1:5a8n7d3r4e2w5n8o2v3a7c5`) and encode into [Base64](https://www.base64encode.org/).

* Then run a [curl command](https://reqbin.com/curl):
```sh
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic {YOUR_BASE64}" -d "grant_type=authorization_code&redirect_uri=http://localhost/callback/&code={YOUR_TOKEN}" https://accounts.spotify.com/api/token
```
