Scrolls.Router = Backbone.Router.extend({

  routes: {
    'decks/new': 'newDeck',
    '': 'index'
  },

  initialize: function() {
    this.bind('route', this._trackPageview);
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

    $('#app').html(deckBuilderView.render().el);

    gameScrolls.fetch({reset: true});
  },

  index: function() {
    var mainView = new Scrolls.Views.MainView();

    $('#app').html(mainView.render().el);
  }

});
