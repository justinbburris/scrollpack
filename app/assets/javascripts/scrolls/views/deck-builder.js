Scrolls.Views.DeckBuilder = Backbone.View.extend({

  initialize: function() {
    this.template = ich.deck_builder;
    this.scrolls    = new Scrolls.Collections.ScrollCollection();
    this.scrollList = new Scrolls.Views.ScrollList({collection: this.scrolls});

  },

  render: function() {

    this.$el.html(this.template());
    this.$('#scrolls-list').html(this.scrollList.render().el);

    return this;
  }
    
});
