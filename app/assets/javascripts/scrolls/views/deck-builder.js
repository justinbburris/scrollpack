Scrolls.Views.DeckBuilderView = Backbone.View.extend({

  events: {
    'click .scroll-filter button': 'filterScrolls',
    'click button.clear-filter': 'removeScrollFilter'
  },

  initialize: function(opts) {
    this.gameScrolls = opts.gameScrolls;
    this.deck        = opts.deck;
    this.template    = ich.deck_builder;

    this.gameScrollsView = new Scrolls.Views.GameScrollsView({
      gameScrolls: this.gameScrolls,
      deck:        this.deck
    });

    this.deckScrollsView = new Scrolls.Views.DeckScrollsView({deck: this.deck});
  },

  filterScrolls: function(evt) {
    var button     = $(evt.target)
    var data = button.data();

    if(button.hasClass('active')) { //remove creature filter
      this.gameScrolls.removeFilter(data['type'], data['filter']);
    } else { //add creature filter
      this.gameScrolls.addFilter(data['type'], data['filter']);
    }
  },

  removeScrollFilter: function() {
    this.gameScrolls.clearFilter();
    this.$('.scroll-filter').children().removeClass('active');
  },

  render: function() {
    this.$el.html(this.template());

    this.$('#scrolls-list').html(this.gameScrollsView.render().el);
    this.$('#deck-scrolls').html(this.deckScrollsView.render().el);

    this.gameScrolls.fetch({reset: true});

    return this;
  }
    
});
