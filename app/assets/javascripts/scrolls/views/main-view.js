Scrolls.Views.MainView = Backbone.View.extend({

  events: {
    'click a#new-deck': 'createNewDeck'
  },

  initialize: function() {
    this.template = ich.main_view;
  },

  createNewDeck: function(e) {
    e.preventDefault();
    Scrolls.router.navigate('decks/new', {trigger: true});
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
    
});
