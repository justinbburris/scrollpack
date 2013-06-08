Scrolls.Models.Deck = Backbone.Model.extend({

  defaults: function() {
    return {
      name: 'New Deck'
    }
  },

  url: '/decks'

});
