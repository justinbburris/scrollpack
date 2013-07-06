Scrolls.Mixins.DeckFavorite = {

  events: {
    'mouseenter i.can-favorite': 'toggleFavorite',
    'mouseleave i.can-favorite': 'toggleFavorite',
    'click .favorite-icon': 'updateFavorite'
  },

  toggleFavorite: function() {
    this.$('i.favorite-icon').toggleClass('icon-star-empty icon-star');
  },

  updateFavorite: function(evt) {
    var deck = this.deck;

    if($(evt.currentTarget).hasClass('can-favorite')) {
      User.user.save({}, {
        url: 'users/add_favorite/' + deck.get('id'),
        success: function(model, response) {
          User.user.set('favorites', response.favorites);
          deck.set('favorites', deck.get('favorites') + 1);
        }
      });
    } else {
      User.user.destroy({
        url: 'users/remove_favorite/' + deck.get('id'),
        success: function(model, response) {
          User.user.set('favorites', response.favorites);
          deck.set('favorites', deck.get('favorites') - 1);
        }
      });
    }

    $(evt.currentTarget).toggleClass('can-favorite');
  }

}
