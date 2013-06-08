Scrolls.Models.Deck = Backbone.Model.extend({

  defaults: function() {
    return {
      name: 'New Deck',
      deckScrolls: new Scrolls.Collections.ScrollCollection()
    }
  },

  url: '/decks'

});
