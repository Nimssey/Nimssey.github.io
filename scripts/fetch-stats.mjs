// Runs in GitHub Actions: fetches live Roblox stats server-side (no CORS / proxy needed)
// and writes data.json, which the site loads from its own origin.
import { readFileSync, writeFileSync } from "node:fs";

const config = readFileSync("config.js", "utf8");
const placeIds = [...config.matchAll(/placeId:\s*(\d+)/g)].map((m) => m[1]);

const get = async (url) => {
  const r = await fetch(url, { headers: { "Accept-Language": "en-US" } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
};

const games = {};
for (const placeId of placeIds) {
  try {
    const { universeId } = await get(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    const [info, favs, icon] = await Promise.all([
      get(`https://games.roblox.com/v1/games?universeIds=${universeId}`),
      get(`https://games.roblox.com/v1/games/${universeId}/favorites/count`).catch(() => ({})),
      get(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png`).catch(() => ({ data: [] })),
    ]);
    const d = info.data?.[0] || {};
    games[placeId] = {
      name: d.sourceName || d.name,
      visits: d.visits,
      playing: d.playing,
      favorites: favs.favoritesCount ?? d.favoritedCount,
      icon: icon.data?.[0]?.imageUrl,
    };
  } catch (e) {
    console.error("failed", placeId, e.message);
  }
}

if (!Object.keys(games).length) process.exit(1);
writeFileSync("data.json", JSON.stringify({ updated: new Date().toISOString(), games }, null, 2) + "\n");
console.log(JSON.stringify(games, null, 2));
