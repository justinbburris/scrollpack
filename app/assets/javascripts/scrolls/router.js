Scrolls.Router = Backbone.Router.extend({

  routes: {
    'decks/new': 'newDeck',
    '': 'index'
  },

  newDeck: function() {
    var deck        = new Scrolls.Models.Deck();
    var scrolls     = new Scrolls.Collections.ScrollCollection();
    var deckBuilder = new Scrolls.Views.DeckBuilder({scrolls: scrolls, deck: deck});

    $('#app').html(deckBuilder.render().el);
  },

  index: function() {
    var mainView = new Scrolls.Views.MainView();

    $('#app').html(mainView.render().el);
  }

});
