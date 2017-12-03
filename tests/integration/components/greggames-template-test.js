import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('greggames-template', 'Integration | Component | greggames template', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{greggames-template}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#greggames-template}}
      template block text
    {{/greggames-template}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
