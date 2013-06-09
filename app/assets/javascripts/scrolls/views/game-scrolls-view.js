Scrolls.Views.GameScrollsView = Backbone.View.extend({

  initialize: function(opts) {
    this.gameScrolls = opts.gameScrolls;
    this.deck        = opts.deck;
    this.template    = ich.game_scrolls;

    this.listenTo(this.gameScrolls, 'reset', this.setScrolls);
    this.listenTo(this.gameScrolls, 'change:scrollFilter', this.setScrolls);
    this.listenTo(this.gameScrolls, 'sort', this.setScrolls);
  },

  setScrolls: function() {
    var scrollsToRender = [];
    var deck           = this.deck;

    _.each(this.gameScrolls.filteredScrolls(), function(scroll) {
      var gameScrollView = new Scrolls.Views.GameScrollView({
        scroll: scroll,
        deck:   deck
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
