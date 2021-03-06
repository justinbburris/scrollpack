Scrolls.Views.GameScrollView = Backbone.View.extend({

  tagName: 'li',

  className: 'scroll',

  events: {
    'click': 'addScrollToDeck',
    'mouseover': function() { this.scroll.trigger('hoverOverScroll', this.scroll); }
  },

  initialize: function(opts) {
    this.scroll      = opts.scroll;
    this.deck        = opts.deck;
    this.deckScrolls = this.deck.deckScrolls;
    this.template    = ich.game_scroll;
  },

  addScrollToDeck: function() {
    var scroll = this.deckScrolls.get(this.scroll);
    if(scroll !== undefined && scroll.get('count') <= (this.deck.maxScrolls - 1)) {
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
