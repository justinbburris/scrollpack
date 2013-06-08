Scrolls.Views.DeckScrollListItem = Backbone.View.extend({

  tagName: 'li',

  className: 'scroll',

  events: {
    'click .icon-remove-sign': 'removeScroll'
  },

  initialize: function(opts) {
    this.scroll     = opts.scroll;
    this.scrollList = opts.scrollList;
    this.template   = ich.deck_scroll_list_item;
  },

  removeScroll: function() {
    this.scrollList.remove(this.scroll);
    this.remove();
  },

  render: function() {
    this.$el.html(this.template(this.scroll.toJSON()));

    this.$el.data('id', this.scroll.get('id'));

    return this;
  }
    
});
