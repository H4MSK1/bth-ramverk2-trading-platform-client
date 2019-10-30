## Badges
[![Build Status](https://travis-ci.org/H4MSK1/bth-ramverk2-trading-platform-client.svg?branch=master)](https://travis-ci.org/H4MSK1/bth-ramverk2-trading-platform-client) [![Build Status](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-client/badges/build.png?b=master)](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-client/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-client/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-client/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-client/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-client/?branch=master)


## Installation

Run:
### `npm install`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Test cases

Test Cases

- api/currency: Should return the right currency symbol for according currency
- api/currency: Should convert the given value to a chosen currency (USD) and convert back, results should equal the initial number
- api/AuthService: 4 testcases ran testing the .isAuth() wether it behaves as expected, more details in src/api/__test__/AuthService.test.js
- api/TokenService: Should store and retrieve the given tokens
- *: Should render correct elements, for reference, check each test file.
