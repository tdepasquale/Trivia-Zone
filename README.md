# Trivia Zone

An alternate reality in which the only thing that matters is trivia.

A web app built with Next.js and hosted on Vercel.

https://trivia-zone.vercel.app/

## Getting Started

First, install the dependencies:

```bash
npm i
# or
yarn install
```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing the Application

```bash
npm run e2e
# or
yarn e2e
```

The Cypress testing window will open, and you can click on trivia-demo_spec.js to run the end to end test.

## Notable Features

This trivia web app has a few notable features including:

### Speech Synthesis

Each question is read aloud by a friendly robot, courtesy of the speech synthesis API.

Read more here: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

### Sound Effects

Sound effects are played using Howler when a correct answer is chosen, and when the game is over.

Read more here: https://www.npmjs.com/package/howler

### Tweet Your Score

Upon completion of a round of trivia, the user is presented with a 'Tweet Your Score' button, to encourage sharing of the app.

## Future Features

-Backend written with .NET Core and signalR to allow users to play a game of trivia with their friends in real time.

-Allow users to suggest questions, and categories.

-Timed Trivia Mode which rewards more points choosing an answer quickly.

-Social Trivia Mode in which users write questions about themselves in order to learn more about their friends.
