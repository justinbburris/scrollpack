Scrolls.Collections.DeckCollection = Backbone.Collection.extend ({

  model: Scrolls.Models.Deck,

  url: '/decks',

  comparator: function(deck) {
    return -1 * deck.get(this.sorter);
  },

  initialize: function() {
    this.sorter = 'create_at';
    window.test = this;
  }

});
