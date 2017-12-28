import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('spadeplayer-view', 'Integration | Component | spadeplayer view', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{spadeplayer-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#spadeplayer-view}}
      template block text
    {{/spadeplayer-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
