Scrolls.Router = Backbone.Router.extend({

  routes: {
    '': 'index'
  },

  index: function() {
    var scrolls    = new Scrolls.Collections.ScrollCollection();
    var scrollList = new Scrolls.Views.ScrollList({collection: scrolls});

    $('#scrolls-list').html(scrollList.render().el);
  }
});
