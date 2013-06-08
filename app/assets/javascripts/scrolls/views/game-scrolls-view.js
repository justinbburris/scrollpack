Scrolls.Views.GameScrollsView = Backbone.View.extend({

  initialize: function(opts) {
    this.deck        = opts.deck
    this.gameScrolls = opts.gameScrolls;
    this.template    = ich.game_scrolls;

    this.listenTo(this.gameScrolls, 'reset', this.addScrolls);
  },

  addScrolls: function() {
    var scrolls = [];
    var deck    = this.deck;

    this.gameScrolls.each(function(scroll) {
      var gameScrollView = new Scrolls.Views.GameScrollView({
        scroll:      scroll,
        deckScrolls: deck.get('deckScrolls')
      });
      scrolls.push(gameScrollView.render().el);
    });

    this.$('ul').html(scrolls);
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }

});
