Scrolls.Views.DeckBuilderView = Backbone.View.extend({

  events: {
    'click .scroll-filter button': 'filterScrolls',
    'click button.clear-filter': 'removeScrollFilter',

    'click .scroll-sort button': 'sortScrolls',

    'click button.save-pack': 'savePack',
    'click button.load-pack': 'loadPack',
    'click button.close-load': 'closeLoad'
  },

  initialize: function(opts) {
    this.deck        = opts.deck;
    this.gameScrolls = opts.gameScrolls;
    this.deckScrolls = this.deck.deckScrolls;
    this.template    = ich.deck_builder;

    this.gameScrollsView = new Scrolls.Views.GameScrollsView({
      gameScrolls: this.gameScrolls,
      deck:        this.deck
    });

    this.deckScrollsView = new Scrolls.Views.DeckScrollsView({deck: this.deck});
    this.deckStatsView   = new Scrolls.Views.DeckStatsView({deck: this.deck});

    this.listenTo(this.gameScrolls, 'hoverOverScroll', this.showPreviewScroll);

    this.listenTo(this.deckScrolls, 'hoverOverScroll', this.showPreviewScroll);
    this.listenTo(this.deckScrolls, 'add', this.renderStats);
    this.listenTo(this.deckScrolls, 'remove', this.renderStats);
    this.listenTo(this.deckScrolls, 'change', this.renderStats);
    this.listenTo(this.deckScrolls, 'reset', this.renderStats);

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

  savePack: function() {
    this.deck.save({}, {
      success: function() {
        console.log("Your pack was saved successfully!");
      },
      error: function() {
        console.log("We're unable to save your pack at this time.");
      }
    });
  },

  loadPack: function() {
    this.$('#pack-list').html(ich.pack_list());
    this.$('#pack-list .modal').modal('show');
  },

  closeLoad: function() {
    this.$('#pack-list .modal').modal('hide');
  },

  showPreviewScroll: function(scroll) {
    this.$('#scroll-preview').html(ich.preview_scroll(scroll.toJSON()));
  },

  renderStats: function() {
    this.$('#deck-stats').html(this.deckStatsView.render().el);
  },

  render: function() {
    this.$el.html(this.template());

    this.$('#scrolls-list').html(this.gameScrollsView.render().el);
    this.$('#deck-scrolls').html(this.deckScrollsView.render().el);
    this.renderStats();

    this.gameScrolls.fetch({reset: true});

    return this;
  }
    
});
