Scrolls.Router = Backbone.Router.extend({

  routes: {
    'decks/new': 'newDeck',
    'deck/:id': 'showDeck',
    '': 'index'
  },

  initialize: function() {
    this.bind('route', this._trackPageview);

    this.applicationLayout = ich.application_layout;
    this.deckLayout        = ich.deck_layout;
  },

  _trackPageview: function() {
    var url = Backbone.history.getFragment();

    if (!/^\//.test(url) && url != "") {
      url = "/" + url;
    }

    ga('send', 'pageview', url);
  },

  newDeck: function() {
    this.initDeckBuilder(function(router) {
      var deck            = new Scrolls.Models.Deck();
      var deckBuilderView = new Scrolls.Views.DeckBuilderView({
        deck: deck,
        gameScrolls: router.gameScrolls,
      });

      router.deckBuild(deckBuilderView.render().el);
    });
  },

  showDeck: function(id) {
    this.initDeckBuilder(function(router) {
      var deck            = new Scrolls.Models.Deck({id: id});
      var deckBuilderView = new Scrolls.Views.DeckBuilderView({
        deck: deck,
        gameScrolls: router.gameScrolls,
      });

      deck.fetch({
        reset: true,
        success: function(model) {
          router.deckBuild(deckBuilderView.render().el);
          model.populateScrolls(router.gameScrolls);
        }
      });
    });
  },

  index: function() {
    var mainView = new Scrolls.Views.MainView();

    this.applicationBuild(mainView.render().el);
  },

  applicationBuild: function(view) {
    $('#main-view').html(this.applicationLayout());
    $('#app').html(view);
  },

  deckBuild: function(view) {
    $('#main-view').html(this.deckLayout());
    $('#deck').html(view);
  },

  initDeckBuilder: function(callback) {
    if(!this.deckCollection) {
      this.deckCollection = new Scrolls.Collections.DeckCollection();
    }
    this.deckCollection.fetch();

    if(!this.gameScrolls) {
      var router = this;
      this.gameScrolls = new Scrolls.Collections.ScrollCollection();
      this.gameScrolls.fetch({
        success: function() {
          callback(router);
        }
      });
    } else {
      callback(this);
    }
  }
});
