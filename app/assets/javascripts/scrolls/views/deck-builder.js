Scrolls.Views.DeckBuilderView = Backbone.View.extend({

  events: {
    'click .scroll-filter button': 'filterScrolls',
    'click button.clear-filter': 'removeScrollFilter',

    'click .scroll-sort button': 'sortScrolls'
  },

  initialize: function(opts) {
    this.deck        = opts.deck;
    this.gameScrolls = opts.gameScrolls;
    this.deckScrolls = this.deck.get('deckScrolls');
    this.template    = ich.deck_builder;

    this.gameScrollsView = new Scrolls.Views.GameScrollsView({
      gameScrolls: this.gameScrolls,
      deck:        this.deck
    });

    this.deckScrollsView = new Scrolls.Views.DeckScrollsView({deck: this.deck});
    this.listenTo(this.gameScrolls, 'hoverOverScroll', this.showPreviewScroll);
    this.listenTo(this.deckScrolls, 'hoverOverScroll', this.showPreviewScroll);
  },

  filterScrolls: function(evt) {
    var button  = $(evt.target)
    var data    = button.data();

    if(button.hasClass('active')) { //remove creature filter
      this.gameScrolls.removeFilter(data.type, data.filter);
    } else { //add creature filter
      this.gameScrolls.addFilter(data['type'], data.filter);
    }
  },

  removeScrollFilter: function() {
    this.gameScrolls.clearFilter();
    this.$('.scroll-filter').children().removeClass('active');
  },

  sortScrolls: function(evt) {
    var button = $(evt.target);
    var data   = button.data();

    this.gameScrolls.sorter = data.sorter;
    this.gameScrolls.sort(this.comparator);
  },

  showPreviewScroll: function(scroll) {
    this.$('#scroll-preview').html(ich.preview_scroll(scroll.toJSON()));
  },

  render: function() {
    this.$el.html(this.template());

    this.$('#scrolls-list').html(this.gameScrollsView.render().el);
    this.$('#deck-scrolls').html(this.deckScrollsView.render().el);

    this.gameScrolls.fetch({reset: true});

    return this;
  }
    
});
