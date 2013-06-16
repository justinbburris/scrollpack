Scrolls.Views.DeckScrollView = Backbone.View.extend({

  tagName: 'li',

  className: 'scroll',

  events: {
    'click .icon-remove-sign': 'removeScroll',
    'click .decrease-scrolls': 'decreaseScrolls',
    'click .increase-scrolls': 'increaseScrolls',
    'mouseover': function() { this.scroll.trigger('hoverOverScroll', this.scroll); }
  },

  initialize: function(opts) {
    this.scroll      = opts.scroll;
    this.deckScrolls = opts.deckScrolls;
    this.template    = ich.deck_scroll;

    this.listenTo(this.scroll, 'change:count', this.render);
  },

  removeScroll: function() {
    this.deckScrolls.remove(this.scroll);

    this.remove();
  },

  decreaseScrolls: function() {
    var count = this.scroll.get('count');
    if(count > 1) {
      this.scroll.set('count', count - 1);
    } else {
      this.removeScroll();
    }
  },

  increaseScrolls: function() {
    var count = this.scroll.get('count');
    if(count <= 2) {
      this.scroll.set('count', count + 1);
    }
  },

  render: function() {
    this.$el.html(this.template(this.scroll.toJSON()));

    return this;
  }
    
});
