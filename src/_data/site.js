module.exports = {
  env: process.env.ELEVENTY_ENV,
  title: "minttoothpick",
  description: "Jeremy Robert Jones’ personal website: art, music, musings",
  url: process.env.URL || "http://localhost:8080",
  authorName: "Jeremy Robert Jones",
  authorEmail: "minttoothpick+hello@protonmail.com",
  twitterUsername: "minttoothpick",
  buildTime: new Date(),
  navigation: [
    {
      name: "Diary",
      url: "/diary/"
    },
    {
      name: "Music",
      url: "/music/"
    },
    {
      name: "Reading",
      url: "/reading/"
    },
    {
      name: "Now",
      url: "/now/"
    },
    // {
    //   name: "About",
    //   url: "/about/"
    // },
    // {
    //   name: "Stuff",
    //   url: "/stuff/"
    // },
    // {
    //   name: "Tags",
    //   url: "/tags/"
    // },
  ]
};
