Scrolls.Models.Deck = Backbone.Model.extend({

  defaults: function() {
    return {
      name: 'New Deck',
      scrollList: new Scrolls.Collections.ScrollCollection()
    }
  },

  url: '/decks'

});
