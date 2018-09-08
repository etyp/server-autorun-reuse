import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const CollectionA = new Mongo.Collection('collectionA');
const CollectionB = new Mongo.Collection('collectionB');

const tickTock = new ReactiveVar(new Date().getTime());
Meteor.setInterval(() => {
  tickTock.set(new Date().getTime());
}, 10000);

Meteor.publish('testObserverReuse', function testObserverReuse() {
  // this.autorun(() => {
    const tick = tickTock.get();
    console.log('re-running');
    CollectionA.findOne(
      { testField: 'abc' },
      { fields: { testField: 1 }, disableOplog: true }
    );
    return CollectionB.find(
      { createdAt: { $gt: tick } },
      { fields: { testField: 1 } }
    );
  // });
});

// meteor mongo
// db.setProfilingLevel(2)
// db.system.profile.find({ns: 'meteor.collectionA', 'command.filter.testField': 'abc' }).count()