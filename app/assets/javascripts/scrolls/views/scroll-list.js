Scrolls.Views.ScrollList = Backbone.View.extend({

  initialize: function(opts) {
    this.template = ich.scroll_list;
    this.scrolls  = opts.scrolls;

    this.listenTo(this.scrolls, 'reset', this.addScrolls);
  },

  addScrolls: function() {
    var scrolls = [];

    this.scrolls.each(function(model) {
      var scrollListItem = new Scrolls.Views.ScrollListItem({model: model});
      scrolls.push(scrollListItem.render().el);
    });

    this.$('ul').html(scrolls);
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
    
});
