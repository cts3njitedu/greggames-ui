import Ember from 'ember';
import ConvertObjectMixinMixin from 'greggames-ui/mixins/convert-object-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | convert object mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let ConvertObjectMixinObject = Ember.Object.extend(ConvertObjectMixinMixin);
  let subject = ConvertObjectMixinObject.create();
  assert.ok(subject);
});
