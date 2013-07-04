Scrolls.Views.AllDecksView = Backbone.View.extend({

  initialize: function() {
    this.template = ich.all_decks;

    this.listenTo(this.collection, 'reset', this.showDecks);
  },

  showDecks: function() {
    var deckItems = [];
    _.each(this.collection.models, function(deck) {
      deckItems.push(ich.deck_item(deck.toJSON()));
    });

    this.$('ul').html(deckItems);
  },

  render: function() {

    this.$el.html(this.template());

    this.collection.fetch({reset: true});

    return this;
  }

});
