
## How to set up local environment 

In the project directory, you have to add a .env file to config REACT_APP_ENVIRONMENT and REACT_APP_API_URL parameters to run the frontend.

### `yarn install` or `npm install`

Run yarn install or npm install to add dependencies to the project.

### `node tools/apiServer.js`

Run the back-end service to provide a mock api for front-end. 

### `yarn start` or `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!