Scrolls.Views.DeckItemView = Backbone.View.extend({

  tagName: 'li',

  events: {
    'click a': 'addView'
  },

  initialize: function(opts) {
    this.deck     = opts.deck
    this.template = ich.deck_item;

    this.listenTo(this.deck, 'change:favorites', this.render);
  },

  addView: function() {
    this.deck.save(
      {views: this.deck.get('views') + 1},
      {validate: false, url: 'decks/' + this.deck.get('id') + '/add_view'}
    );
  },

  render: function() {
    var deck = {
      id: this.deck.get('id'),
      name: this.deck.get('name'),
      favoriteIcon: 'icon-star-empty can-favorite',
      favorites: this.deck.get('favorites'),
      resources: this.deck.get('resources'),
      views: this.deck.get('views')
    };

    if(User.logged_in && _.contains(User.user.get('favorites'), this.deck.get('id'))) {
      deck.favoriteIcon = 'icon-star';
    }

    this.$el.html(this.template(deck));

    return this;
  }

});

Cocktail.mixin(Scrolls.Views.DeckItemView, Scrolls.Mixins.DeckFavorite);
