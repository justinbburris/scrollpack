Scrolls.Views.DeckBuilderView = Backbone.View.extend({

  events: {
    // Sorting & filtering
    'click .scroll-filter button': 'filterScrolls',
    'click button.clear-filter':   'removeScrollFilter',
    'click .scroll-sort button':   'sortScrolls',

    // Pack actions
    'click button.save-pack':   'savePack',
    'click button.load-pack':   'openLoadDialog',
    'click button.close-load':  'closeLoadDialog',
    'click a.open-pack':        'openPack',
    'click button.delete-pack': 'deletePack'
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

    this.listenTo(this.deck, 'invalid', this.showError);

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
      wait: true,
      newDeck: this.deck.isNew(),
      deckView: this,
      success: function(model, response, opts) {
        if(opts.newDeck) {
          Scrolls.router.navigate('deck/' + response.id, {replace: true, trigger: true});
        }
        Scrolls.router.deckCollection.fetch();
        Alert.success("Your pack was saved successfully!");
      },
      error: function(model, response, opts) {
        Alert.error(response.responseJSON.error);
      }
    });
  },

  openLoadDialog: function() {
    var deck_collection = {
      decks: Scrolls.router.deckCollection.models
    };

    this.$('#pack-list').html(ich.pack_list(deck_collection));
    this.$('#pack-list .modal').modal({backdrop: false});
  },

  closeLoadDialog: function() {
    this.$('#pack-list .modal').modal('hide');
  },

  openPack: function(e) {
    e.preventDefault();
    this.closeLoadDialog();

    Scrolls.router.navigate(e.currentTarget.hash, {trigger: true});
  },

  showError: function() {
    Alert.error(this.deck.validationError);
  },

  showPreviewScroll: function(scroll) {
    this.$('#scroll-preview').html(ich.preview_scroll(scroll.toJSON()));
  },

  deletePack: function() {
    var r = window.confirm("Are you sure you want to discard this pack?");

    if(r) {
      this.deck.destroy({
        wait: true,
        success: function() {
          Scrolls.router.navigate('decks/new', {trigger: true, replace: true});
        },
        error: function(model, response, opts) {
          Alert.error(response.responseJSON.error);
        }
      });
    }
  },

  renderStats: function() {
    this.$('#deck-stats').html(this.deckStatsView.render().el);
  },

  render: function() {
    var deckData = _.extend(this.deck.toJSON(), {canEditDeck: false});

    if(User.logged_in && _.contains(User.user.get('favorites'), this.deck.get('id'))) {
      deckData.favoriteIcon = 'icon-star';
    } else {
      deckData.favoriteIcon = 'icon-star-empty can-favorite';
    }

    if(this.deck.get('user_id') === User.user.get('id')) {
      deckData.canEditDeck = true;
    }

    this.$el.html(this.template(deckData));

    this.$('#scrolls-list').html(this.gameScrollsView.render().el);
    this.$('#deck-scrolls').html(this.deckScrollsView.render().el);
    this.renderStats();

    this.gameScrolls.fetch({reset: true});

    return this;
  }
    
});

Cocktail.mixin(Scrolls.Views.DeckBuilderView, Scrolls.Mixins.DeckFavorite);
