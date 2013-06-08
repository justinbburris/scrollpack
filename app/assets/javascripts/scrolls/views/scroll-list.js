Scrolls.Views.ScrollList = Backbone.View.extend({

  initialize: function() {
    this.template = ich.scroll_list;

    this.listenTo(this.collection, 'reset', this.addScrolls);
  },

  addScrolls: function() {
    var scrolls = [];

    this.collection.each(function(model) {
      var scrollListItem = new Scrolls.Views.ScrollListItem({model: model});
      scrolls.push(scrollListItem.render().el);
    });

    this.$('ul').html(scrolls);
  },

  render: function() {
    this.$el.html(this.template());

    this.collection.fetch({reset: true});

    return this;
  }
    
});
