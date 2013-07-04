Scrolls.Views.DeckItemView = Backbone.View.extend({
  events: {
    'mouseenter .deck-favorite': 'toggleFavorite',
    'mouseleave .deck-favorite': 'toggleFavorite'
  },

  initialize: function() {
    this.template = ich.deck_item;
  },

  toggleFavorite: function() {
    this.$('i.deck-favorite').toggleClass('icon-star-empty icon-star');
  },

  render: function() {

    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }

});
