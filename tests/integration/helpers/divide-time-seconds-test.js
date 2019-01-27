
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('divide-time-seconds', 'helper:divide-time-seconds', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{divide-time-seconds inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

