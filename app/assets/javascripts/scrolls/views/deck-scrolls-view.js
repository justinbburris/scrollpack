Scrolls.Views.DeckScrollsView = Backbone.View.extend({

  initialize: function(opts) {
    this.deck        = opts.deck;
    this.deckScrolls = this.deck.get('deckScrolls');
    this.template    = ich.deck_scrolls;

    this.listenTo(this.deckScrolls, 'add', this.addedScroll);
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
