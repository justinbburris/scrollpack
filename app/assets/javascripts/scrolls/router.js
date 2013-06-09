Scrolls.Router = Backbone.Router.extend({

  routes: {
    'decks/new': 'newDeck',
    '': 'index'
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
