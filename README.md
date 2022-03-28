# CodinGame - JavaScript Code

> Puzzles, Games, and Competition answers/experiments from [CodinGame](https://www.codingame.com/) -- JavaScript repo.

Other languages:

-   [TypeScript](https://github.com/Zweihander-Main/CodinGame_TS)

### List of projects:

[Unleash The Geek](./unleashTheGeek/) -- Oct, 2019 contest. [Details here.](https://www.codingame.com/contests/unleash-the-geek-amadeus) Hit Silver league. This was a time-restricted competition during a busy week so I intend on having a second go at the code if/when it opens back up.

[Puzzles](./puzzles) -- Divided by difficulty. Not necessarily optimal solutions for every one but they pass.

### Tech stack:

-   JavaScript ES2019
-   Webpack

### Instructions

1. Run `npm install` in the main directory (package.json should be accurate)
    - Special Notes:
    - Source/Dev: per project folder, Production: build folder
2. Run one of the commands from the [Scripts](#scripts) section. You'll most likely want `npm run watch` for development and `npm run build` for production.

### Scripts

-   `npm run build`: Create development build
-   `npm run watch`: Create development build in watch mode
-   `npm run test`: Run Jest

### Notes

-   This was intended to be used with the [CodinGame Sync](https://chrome.google.com/webstore/detail/codingame-sync-ext/ldjnbdgcceengbjkalemckffhaajkehd) extension & app. I point the output at the pertinent flatfile generated in the build folder after running build/watch.
-   Code was run against the online tester as well as [cd-brutaltester](https://github.com/dreignier/cg-brutaltester) with local versions of the contests. For puzzles, code was either linked to the src folder or copied by hand.
-   There are a LOT of improvements that can be done to unleashTheGeek.

## Available for Hire

I'm available for freelance, contracts, and consulting both remotely and in the Hudson Valley, NY (USA) area. [Some more about me](https://www.zweisolutions.com/about.html) and [what I can do for you](https://www.zweisolutions.com/services.html).

Feel free to drop me a message at:

```
hi [a+] zweisolutions {●} com
```

## License

[MIT](./LICENSE)
