Scrolls.Views.ScrollList = Backbone.View.extend({

  initialize: function() {
    this.template = ich.scroll_list;
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
    
});
