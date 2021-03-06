# Sun Wall

This is a demo project with a generated name 🌞\
It simply fetches the most viewed wikipedia pages for a specified date.

The app is live here 👉 [https://sun-wall.vercel.app/](https://sun-wall.vercel.app/)

# Remote Dev

<a href="https://gitpod.io/#https://github.com/sansarip/sun-wall"><img src="https://camo.githubusercontent.com/76e60919474807718793857d8eb615e7a50b18b04050577e5a35c19421f260a3/68747470733a2f2f676974706f642e696f2f627574746f6e2f6f70656e2d696e2d676974706f642e737667"/></a>

Other than using the Cypress GUI to run the tests, all of the other commands should be accessible from the Gitpod virtual workspace linked above -including the main application.

# Local Dev

Before you begin, you should run `yarn install` 📦️⬇️

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn cy:open`

Launches the Cypress test runner GUI in interactive watch mode.\
The component tests should be selectable.

### `yarn cy:run`

Runs the Cypress component tests in headless mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn storybook`

Runs the storybook app, demonstrating the various components in the project.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

# Notes

This project uses [XState](https://xstate.js.org/docs/) and the [XState VS Code extension](https://marketplace.visualstudio.com/items?itemName=statelyai.stately-vscode) will allow you to visualize the state machine located [here](https://github.com/sansarip/sun-wall/blob/main/src/pages/Articles.fsm.ts#L42).
