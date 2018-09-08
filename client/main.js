import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './main.html';

Template.subs.onCreated(function onCreated() {
  this.active = new ReactiveVar(false);
});

Template.subs.helpers({
  isActive() {
    return Template.instance().active.get();
  }
});

Template.subs.events({
  'click .js-start'(event, instance) {
    event.preventDefault();
    if (!instance.subscription) {
      instance.subscription = Meteor.subscribe('testObserverReuse');
      instance.active.set(true);
    }
  },
  'click .js-stop'(event, instance) {
    event.preventDefault();
    instance.subscription.stop();
    delete instance.subscription;
    instance.active.set(false);
  },
});
