Scrolls.Views.DeckScrollsView = Backbone.View.extend({

  initialize: function(opts) {
    this.deck        = opts.deck;
    this.gameScrolls = opts.gameScrolls;
    this.deckScrolls = this.deck.get('deckScrolls');
    this.template    = ich.deck_scrolls;

    this.listenTo(this.deck, 'reset', this.addScrolls);
    this.listenTo(this.deckScrolls, 'add', this.addedScroll);
  },

  addScrolls: function() {
    var scrolls = [];

    this.deck.get('scrolls').each(function(scroll_id) {
      var scroll = this.gameScrolls.findWhere({id: scroll_id})
      var deckScrollView = new Scrolls.Views.DeckScrollView({scroll: scroll, deckScrolls: this.deckScrolls});
      scrolls.push(deckScrollView.render().el);
    });

    this.$('ul').html(scrolls);
  },

  addedScroll: function(scroll, scrolls, options) {
    var deckScrollView = new Scrolls.Views.DeckScrollView({scroll: scroll, deckScrolls: this.deckScrolls});
    this.$('ul').append(deckScrollView.render().el);
  },

  render: function() {
    this.$el.html(this.template());

    this.deck.fetch({reset: true});

    return this;
  }

});
