Scrolls.Views.GameScrollView = Backbone.View.extend({

  tagName: 'li',

  className: 'scroll',

  events: {
    'click': 'addScrollToDeck'
  },

  initialize: function(opts) {
    this.scroll      = opts.scroll;
    this.deckScrolls = opts.deckScrolls;
    this.template    = ich.game_scroll;
  },

  addScrollToDeck: function() {
    var scroll = this.deckScrolls.get(this.scroll);
    if(scroll !== undefined) {
      scroll.set('count', scroll.get('count') + 1);
    } else {
      this.deckScrolls.add(this.scroll.clone());
    }
  },

  render: function() {
    this.$el.html(this.template(this.scroll.toJSON()));

    return this;
  }
    
});
