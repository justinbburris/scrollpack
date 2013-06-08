Scrolls.Views.GameScrollsView = Backbone.View.extend({

  initialize: function(opts) {
    this.gameScrolls = opts.gameScrolls;
    this.deckScrolls = opts.deckScrolls;
    this.template    = ich.game_scrolls;

    this.listenTo(this.gameScrolls, 'reset', this.addScrolls);
  },

  addScrolls: function() {
    var scrollsToRender = [];
    var deckScrolls     = this.deckScrolls;

    this.gameScrolls.each(function(scroll) {
      var gameScrollView = new Scrolls.Views.GameScrollView({
        scroll:      scroll,
        deckScrolls: deckScrolls
      });
      scrollsToRender.push(gameScrollView.render().el);
    });

    this.$('ul').html(scrollsToRender);
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }

});
