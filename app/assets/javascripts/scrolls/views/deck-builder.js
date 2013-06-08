Scrolls.Views.DeckBuilderView = Backbone.View.extend({

  events: {
    'click #scrolls-list li.scroll': 'addScrollToDeck'
  },

  initialize: function(opts) {
    this.gameScrolls = opts.gameScrolls;
    this.deckScrolls = opts.deckScrolls;
    this.template    = ich.deck_builder;

    this.gameScrollsView = new Scrolls.Views.GameScrollsView({
      gameScrolls: this.gameScrolls,
      deckScrolls: this.deckScrolls
    });

    this.deckScrollsView = new Scrolls.Views.DeckScrollsView({
      deckScrolls: this.deckScrolls
    });
  },

  render: function() {
    this.$el.html(this.template());

    this.$('#scrolls-list').html(this.gameScrollsView.render().el);
    this.$('#deck-scrolls').html(this.deckScrollsView.render().el);

    this.gameScrolls.fetch({reset: true});

    return this;
  }
    
});
