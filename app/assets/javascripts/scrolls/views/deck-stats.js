Scrolls.Views.DeckStatsView = Backbone.View.extend({

  initialize: function(opts) {
    this.deck        = opts.deck;
    this.deckScrolls = this.deck.get('deckScrolls');
    this.template    = ich.deck_stats
  },

  render: function() {
    this.$el.html(this.template(this.deck.stats()));

    return this;
  }
});
