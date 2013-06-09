Scrolls.Views.DeckScrollView = Backbone.View.extend({

  tagName: 'li',

  className: 'scroll',

  events: {
    'click .icon-remove-sign': 'removeScroll'
  },

  initialize: function(opts) {
    this.scroll      = opts.scroll;
    this.deckScrolls = opts.deckScrolls;
    this.template    = ich.deck_scroll;

    this.listenTo(this.scroll, 'change:count', this.render);
  },

  removeScroll: function() {
    this.deckScrolls.remove(this.scroll);

    this.remove();
  },

  render: function() {
    this.$el.html(this.template(this.scroll.toJSON()));

    return this;
  }
    
});
