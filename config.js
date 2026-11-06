// ============================================================
//  PORTFOLIO CONFIG — edit only this file
// ============================================================
const CONFIG = {
  name: "Nimssey",
  role: "Scripter and Game Developer",
  tagline: "I build Roblox experiences that players love.",
  photo: "assets/me.png",
  verified: true,                  // show the Roblox verified badge

  links: {
    roblox: "https://www.roblox.com/users/8594259676/profile",
    discord: "https://discord.com/users/1379882162601463960",
    twitter: "",
  },

  // Just the placeId (the number in roblox.com/games/<placeId>/...).
  // Live data (icon, favorites, visits, active players) loads automatically.
  // "fallback" is used if the API doesn't respond.
  experiences: [
    { placeId: 125977609033603, role: "", fallback: { name: "Evolve & Survive" } },
    { placeId: 118829143845477, role: "", fallback: { name: "Break and Steal Spooky Eggs" } },
    { placeId: 84622560457958,  role: "", fallback: { name: "Throw Food For Spooky Animals" } },
  ],
};
