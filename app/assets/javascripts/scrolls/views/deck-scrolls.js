Scrolls.Views.DeckScrolls = Backbone.View.extend({

  initialize: function(opts) {
    this.deck     = opts.deck;
    this.scrolls  = opts.scrolls;
    this.template = ich.deck_scrolls;

    this.listenTo(this.deck, 'reset', this.addScrolls);
  },

  addScrolls: function() {
    var scrolls = [];

    this.deck.get('scrolls').each(function(scroll_id) {
      var scroll = this.scrolls.findWhere({id: scroll_id})
      var scrollListItem = new Scrolls.Views.ScrollListItem({scroll: scroll});
      scrolls.push(scrollListItem.render().el);
    });

    this.$('ul').html(scrolls);
  },

  render: function() {
    this.$el.html(this.template());

    this.deck.fetch({reset: true});

    return this;
  }

});
