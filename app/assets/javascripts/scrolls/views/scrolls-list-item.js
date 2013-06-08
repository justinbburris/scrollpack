Scrolls.Views.ScrollListItem = Backbone.View.extend({

  initialize: function() {
    this.template = ich.scroll_list_item;
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
    
});
