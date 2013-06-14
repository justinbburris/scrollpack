Scrolls.Router = Backbone.Router.extend({

  routes: {
    'decks/new': 'newDeck',
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
    var deck            = new Scrolls.Models.Deck();
    var gameScrolls     = new Scrolls.Collections.ScrollCollection();
    var deckBuilderView = new Scrolls.Views.DeckBuilderView({
      deck: deck,
      gameScrolls: gameScrolls,
    });

    this.deckBuild(deckBuilderView.render().el);

    gameScrolls.fetch({reset: true});
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
  }


});
