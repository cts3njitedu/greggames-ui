import Ember from 'ember';
import CardMixinMixin from 'greggames-ui/mixins/card-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | card mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let CardMixinObject = Ember.Object.extend(CardMixinMixin);
  let subject = CardMixinObject.create();
  assert.ok(subject);
});
