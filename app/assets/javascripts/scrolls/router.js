Scrolls.Router = Backbone.Router.extend({

  routes: {
    'decks/new': 'newDeck',
    '': 'index'
  },

  newDeck: function() {
    var deckBuilder = new Scrolls.Views.DeckBuilder();

    $('#app').html(deckBuilder.render().el);
  },

  index: function() {
    var mainView = new Scrolls.Views.MainView();

    $('#app').html(mainView.render().el);
  }

});
