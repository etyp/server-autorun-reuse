# Start the app
Clone the repo, and `npm start`

This is a sample repo for showing how `meteor-reactive-publish` doesn't reuse observers when autoruns re-run.

Start the app and go to localhost:3000 to see a full description of the issue. Checkout the `no-autorun` branch to see a version where the issue of 2 queries doesn't happen.

# The issue + how to use
Once started, the subscription will re-run every 10 seconds. In server console you can see each re-run being logged as well as the unique ID for each PollingObserveDriver. The ID is different every time, which shows that observers on not reused on re-runs despite having identical selector + options.

To prove that this results in additional queries to mongo, do the following:

1. Connect to mongo shell: `meteor mongo`
2. Set profiling level to log all queries: `db.setProfilingLevel(2)`
3. Query count of all queries from the findOne: `db.system.profile.find({ns: 'meteor.collectionA', 'command.filter.testField': 'abc' }).count()`

You'll find that each autorun increments the count of queries

One issue that stands out here is that each re-run trigger 2 mongo queries! We can confirm that this is an issue specific to the server autorun package by commenting out the autorun, adding `{ disableOplog: true }` to the findOne and starting the subscription.

You can checkout the "no-autorun" branch to see this yourself.