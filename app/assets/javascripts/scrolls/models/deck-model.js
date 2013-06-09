Scrolls.Models.Deck = Backbone.Model.extend({

  defaults: function() {
    return {
      name: 'New Deck',
      maxDeckSize: 50,
      maxScrolls: 3,
      deckScrolls: new Scrolls.Collections.ScrollCollection()
    }
  },

  url: '/decks'

});
