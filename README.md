# Start the app
Clone the repo, and `npm start`

This is a sample repo for showing how `meteor-reactive-publish` doesn't reuse observers when autoruns re-run.

Start the app and go to localhost:3000 to see a full description of the issue. Checkout the `no-autorun` branch to see a version where the issue of 2 queries doesn't happen.