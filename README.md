# Github Search

A simple application utilizing the Github API and Github Search API to view
users and repositories across Github.

## High-level Implementation Plan

### Build out the UI for the search component of the application:

- Input
- Dropdown
- Logo and descriptions

This helps establish styling and provides a good jumping off point for accessing and displaying API calls.

Notes:
Used styled components for CSS with the assumption this falls under the category of 'CSS in JS.' It fits the style of React JSX and keeps the repository all in javascript. It is also using real CSS sytax.

### Implement API calls:

- Create API calls for user and repo using the github search API
- Build out models

This is where the bulk of structure of the app takes shape, and the first refactor and designing of the file structure occurs here.

Notes: Decided use React Query for fetching API data. Redux Query is incompatible with the latest version of React (17) and doesn't appear to be actively maintained; last commit was 15 months ago on a config, and 2 years ago fo rmeaningful source code commits.

### Build out the Results UI:

- Repo view
- User view
- Error, Loading, Empty views

The end of this stage marks the first 'working' version of the app as described in the requirements doc.

Notes:
The search api returns a truncated version of the User and Repo models returned by the users/ and repos/ endpoints. Therefore, fields such as Location on User are unavailable. A second call is needed to grab more detailed information of both models - it is not implemented in this version of the application.

### Cover the edges:

- Debouncing
- Sharpen the UI
- Documentation

This covered the most basic of rate limiting by preventing the user from calling the API with each change in on the input field. Slightly more complex Loading states are required to keep the users informed on current application state.

Notes:

From Github API docs:

> The Search API has a custom rate limit. For requests using Basic Authentication, OAuth, or client ID and secret, you can make up to 30 requests per minute. For unauthenticated requests, the rate limit allows you to make up to 10 requests per minute.

Current implementation of debouncing is set to a timer, but is naive. Better error messaging can be displayed to let the user know rate limits have been hit, as well as more debounding features (i.e. min-characters input).

## Folder Structure

.  
├── api # Contains API calls and return types for user and repos

├── components # All views

├── resources # logos, etc

└── App.tsx # Main entry point

### Future Work

Testing: API calls, error and loading states.

Deployment: Looked into gh-pages as a free option, but it requires a public repository. A ton of other options here.

Pagination: Only the top 30 results are currently displayed.

Sorting: Another dropdown for sorting results based on a metric.

Authentication: Users login to avoid rate-limiting on both Github API and Search API

Implement users/ and repos/ endpoint to gather and display more information for each model.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
