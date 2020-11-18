import { NowRequest, NowResponse } from '@vercel/node';
import { renderToString } from 'react-dom/server';
import { Player } from '../app/components/Minimal/Player';
import { getNowPlayingData } from '../app/spotify';
// import axios from 'axios';
import ejs from 'ejs';
import fs from 'fs';

export default async function (req: NowRequest, res: NowResponse) {
  let { theme } = req.query;
  if (!theme) {
    theme = '0';
  }
  const {
    item = {},
    is_playing: isPlaying = false,
    progress_ms: progress = 0,
  } = await getNowPlayingData();
  let { duration_ms: duration, name: track } = item;
  const artist = (item.artists || []).map(({ name }) => name).join(', ');
  const { images = [] } = item.album || {};
  let text;
  if (theme == '0') {
    if (track == null) {
      track = 'No song is playing';
    }
    const cover = images[0]?.url || null;
    let file = fs.readFileSync(
      __dirname + '/../app/components/AudioVirtualize/index.ejs',
      'utf-8'
    );
    text = ejs.render(file, { title: track, artist: artist, cover: cover });
  } else if (theme == '1') {
    // Get Smallest Thumbnail
    const cover = images[images.length - 1]?.url || null;
    text = renderToString(
      Player({ cover, track, artist, progress, duration, isPlaying })
    );
  }
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  return res.status(200).send(text);
}
