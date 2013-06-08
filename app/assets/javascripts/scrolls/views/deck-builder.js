Scrolls.Views.DeckBuilder = Backbone.View.extend({

  events: {
    'click #scrolls-list li.scroll': 'addScrollToDeck'
  },

  initialize: function(opts) {
    this.scrolls     = opts.scrolls;
    this.deck        = opts.deck;
    this.template    = ich.deck_builder;

    this.scrollList  = new Scrolls.Views.ScrollList({scrolls: this.scrolls});
    this.deckScrolls = new Scrolls.Views.DeckScrolls({deck: this.deck, scrolls: this.scrolls});    
  },

  addScrollToDeck: function() {
    console.log('scroll');
  },

  render: function() {
    this.$el.html(this.template());

    this.$('#scrolls-list').html(this.scrollList.render().el);
    this.$('#deck-scrolls').html(this.deckScrolls.render().el);

    this.scrolls.fetch({reset: true});

    return this;
  }
    
});
