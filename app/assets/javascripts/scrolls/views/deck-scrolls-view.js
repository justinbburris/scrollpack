Scrolls.Views.DeckScrollsView = Backbone.View.extend({

  events: {
    'click .empty-pack': 'emptyPack'
  },

  initialize: function(opts) {
    this.deck        = opts.deck;
    this.deckScrolls = this.deck.deckScrolls;
    this.template    = ich.deck_scrolls;

    this.listenTo(this.deckScrolls, 'add', this.addedScroll);
  },

  emptyPack: function() {
    this.deckScrolls.reset([]);
    this.render();
  },

  addedScroll: function(scroll, scrolls, options) {
    var deckScrollView = new Scrolls.Views.DeckScrollView({scroll: scroll, deckScrolls: this.deckScrolls});
    this.$('ul').append(deckScrollView.render().el);
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }

});
