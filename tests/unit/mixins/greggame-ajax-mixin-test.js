import Ember from 'ember';
import GreggameAjaxMixinMixin from 'greggames-ui/mixins/greggame-ajax-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | greggame ajax mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let GreggameAjaxMixinObject = Ember.Object.extend(GreggameAjaxMixinMixin);
  let subject = GreggameAjaxMixinObject.create();
  assert.ok(subject);
});
