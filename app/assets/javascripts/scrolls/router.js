Scrolls.Router = Backbone.Router.extend({

  routes: {
    '': 'index'
  },

  index: function() {
    var scrolls    = new Scrolls.Models.ScrollCollection();
    var scrollList = new Scrolls.Views.ScrollList({collection: scrolls});

    scrollList.render();
  }
});
