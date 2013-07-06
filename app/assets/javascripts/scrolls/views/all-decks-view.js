Scrolls.Views.AllDecksView = Backbone.View.extend({

  attributes: {
    id: 'all-scroll-packs'
  },

  events: {
    'click .deck-sort button': 'sortDecks'
  },

  initialize: function() {
    this.template = ich.all_decks;

    this.listenTo(this.collection, 'reset', this.showDecks);
    this.listenTo(this.collection, 'sort', this.showDecks);
  },

  sortDecks: function(evt) {
    var button = $(evt.target);
    var data   = button.data();

    this.collection.sorter = data.sorter;
    this.collection.sort();
  },

  showDecks: function() {
    var deckItems = [];
    if(this.collection.models.length > 0) {
      _.each(this.collection.models, function(deck) {
        var deckItem = new Scrolls.Views.DeckItemView({deck: deck});
        deckItems.push(deckItem.render().el);
      });
    } else {
      var deckItems = "<li><h3>Sorry there are no packs to show you</h3></li>";
    }

    this.$('ul').html(deckItems);
  },

  render: function() {
    this.$el.html(this.template());

    this.collection.fetch({reset: true});

    return this;
  }

});
