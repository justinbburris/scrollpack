Scrolls.Collections.ScrollCollection = Backbone.Collection.extend ({

  model: Scrolls.Models.Scroll,

  url: '/scrolls',

  baseFilter: {
    scroll_type: [],
    rarity: [],
    resource_type: []
  },

  initialize: function() {
    this.scrollFilter = JSON.parse(JSON.stringify(this.baseFilter));
  },

  removeFilter: function(filter_type, filter_name) {
    this.scrollFilter[filter_type] = _.reject(this.scrollFilter[filter_type], function(name) {
      return name === filter_name
    });
    this.trigger('change:scrollFilter');
  },

  addFilter: function(filter_type, filter_name) {
    this.scrollFilter[filter_type].push(filter_name);
    this.trigger('change:scrollFilter');
  },

  clearFilter: function() {
    this.scrollFilter = JSON.parse(JSON.stringify(this.baseFilter));
    this.trigger('change:scrollFilter');
  },

  // Max complexity == n * 10
  // Not great, but considering n == 139, I don't care
  filteredScrolls: function() {
    var filter = this.scrollFilter;

    return _.reject(this.models, function(model) {
      var filtered = false;

      _.each(filter.scroll_type, function(scroll_type) {
        if(model.get('scroll_type') === scroll_type) { filtered = true }
      });

      _.each(filter.rarity, function(scroll_type) {
        if(model.get('rarity') === scroll_type) { filtered = true }
      });

      _.each(filter.resource_type, function(scroll_type) {
        if(model.get('resource_type') === scroll_type) { filtered = true }
      });

      return filtered;
    });
  }

});
