Scrolls.Router = Backbone.Router.extend({

  routes: {
    '': 'index'
  },

  index: function() {
    var deckBuilder = new Scrolls.Views.DeckBuilder();

    $('#deck-builder').html(deckBuilder.render().el);
  }
});
