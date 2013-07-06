Scrolls.Views.DeckItemView = Backbone.View.extend({

  tagName: 'li',

  events: {
    'mouseenter i.can-favorite': 'toggleFavorite',
    'mouseleave i.can-favorite': 'toggleFavorite',
    'click .favorite-icon': 'updateFavorite',
    'click a': 'addView'
  },

  initialize: function() {
    this.template = ich.deck_item;

    this.listenTo(this.model, 'change:favorites', this.render);
  },

  toggleFavorite: function() {
    this.$('i.favorite-icon').toggleClass('icon-star-empty icon-star');
  },

  updateFavorite: function(evt) {
    var deck = this.model;

    if($(evt.currentTarget).hasClass('can-favorite')) {
      User.user.save({}, {
        url: 'users/add_favorite/' + this.model.get('id'),
        success: function(model, response) {
          User.user.set('favorites', response.favorites);
          deck.set('favorites', deck.get('favorites') + 1);
        }
      });
    } else {
      User.user.destroy({
        url: 'users/remove_favorite/' + this.model.get('id'),
        success: function(model, response) {
          User.user.set('favorites', response.favorites);
          deck.set('favorites', deck.get('favorites') - 1);
        }
      });
    }

    $(evt.currentTarget).toggleClass('can-favorite');
  },

  addView: function() {
    this.model.save(
      {views: this.model.get('views') + 1},
      {validate: false, url: 'decks/' + this.model.get('id') + '/add_view'}
    );
  },

  render: function() {
    var deck = {
      id: this.model.get('id'),
      name: this.model.get('name'),
      favoriteIcon: 'icon-star-empty can-favorite',
      favorites: this.model.get('favorites'),
      resources: this.model.get('resources'),
      views: this.model.get('views')
    };

    if(User.logged_in && _.contains(User.user.get('favorites'), this.model.get('id'))) {
      deck.favoriteIcon = 'icon-star';
    }

    this.$el.html(this.template(deck));

    return this;
  }

});
