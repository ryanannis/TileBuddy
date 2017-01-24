![tilebuddy](https://cloud.githubusercontent.com/assets/4493022/22237323/ef093822-e1bf-11e6-81e2-d0067cf7a4be.PNG)

## About

Tilebuddy is a React/Redux webapp for solving Scrabble Boards.  It is based off the algorithm described in the whitepaper at 
https://pdfs.semanticscholar.org/da31/cb24574f7c881a5dbf008e52aac7048c9d9c.pdf except it uses a Trie instead of a DAWG
because of the relative difficulty in serializing a dawg.

## Usage

Github pages will be set up for this respository shortly.  For now, to install do:

```
yarn install
yarn start
```

or if you are using npm
```
npm install
npm run start
```

The board area can be navigated via keyboard.  Hovering over the words in the word list will show their location on the board.

## Status

The core algorithm is implemented but the UI is rough around the edges, mostly missing visual cues for interactions.  Please submit a push request or issue if you wish to improve anything.

Additional manual data input is also required for adding non-Scrabble boards.

## License

This is licensed under MIT so you are free to use this how you please (even commercial applications).  Just please credit me and link back to this page.