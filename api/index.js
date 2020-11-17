import { renderToString } from "react-dom/server";
import { Player } from "../app/components/Minimal/Player";
import { getNowPlayingData } from "../app/spotify";

module.exports = async (req, res) => {
  const { theme } = req.query;
  const {
    item = {},
    is_playing: isPlaying = false,
    progress_ms: progress = 0,
  } = await getNowPlayingData();
  const { duration_ms: duration, name: track } = item;
  const artist = (item.artists || []).map(({ name }) => name).join(", ");
  const { images = [] } = item.album || {};
  let text;
  if (theme == 0) {
    // Get Smallest Thumbnail
    const cover = images[images.length - 1]?.url || null;
    text = renderToString(
      Player({ cover, track, artist, progress, duration, isPlaying })
    );
  }
  return res.status(200).send(text);
};
