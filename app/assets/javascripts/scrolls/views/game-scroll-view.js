Scrolls.Views.GameScrollView = Backbone.View.extend({

  tagName: 'li',

  className: 'scroll',

  events: {
    'click': 'addScrollToDeck'
  },

  initialize: function(opts) {
    this.scroll      = opts.scroll;
    this.deckScrolls = opts.deckScrolls;
    this.template    = ich.game_scroll;
  },

  addScrollToDeck: function() {
    this.deckScrolls.add(scroll);
  },

  render: function() {
    this.$el.html(this.template(this.scroll.toJSON()));

    return this;
  }
    
});
