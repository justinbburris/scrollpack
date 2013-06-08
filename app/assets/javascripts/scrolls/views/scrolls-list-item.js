Scrolls.Views.ScrollListItem = Backbone.View.extend({

  tagName: 'li',

  className: 'scroll',

  initialize: function(opts) {
    this.scroll   = opts.scroll;
    this.template = ich.scroll_list_item;
  },

  render: function() {
    this.$el.html(this.template(this.scroll.toJSON()));

    this.$el.data('id', this.scroll.get('id'));

    return this;
  }
    
});
