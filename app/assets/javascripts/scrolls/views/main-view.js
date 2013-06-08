Scrolls.Views.MainView = Backbone.View.extend({

  initialize: function() {
    this.template = ich.main_view;
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
    
});
