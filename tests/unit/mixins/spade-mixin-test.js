import Ember from 'ember';
import SpadeMixinMixin from 'greggames-ui/mixins/spade-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | spade mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let SpadeMixinObject = Ember.Object.extend(SpadeMixinMixin);
  let subject = SpadeMixinObject.create();
  assert.ok(subject);
});
