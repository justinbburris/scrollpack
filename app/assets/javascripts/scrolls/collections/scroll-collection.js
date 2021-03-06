Scrolls.Collections.ScrollCollection = Backbone.Collection.extend ({

  model: Scrolls.Models.Scroll,

  url: '/scrolls',

  baseFilter: {
    scroll_type: [],
    rarity: [],
    resource_type: []
  },

  comparator: function(scroll) {
    if(this.sorter === 'rarity') {
      var rarity = scroll.get(this.sorter);
      if(rarity === 'Common') {
        return -6;
      } else if(rarity === 'Uncommon') {
        return -4;
      } else {
        return -2;
      }
    } else {
      return scroll.get(this.sorter);
    }
  },

  initialize: function() {
    this.scrollFilter = JSON.parse(JSON.stringify(this.baseFilter));
    this.noFilter     = true;
    this.sorter       = 'name';

    this.on('change:scrollFilter', this.checkFilter);
  },

  checkFilter: function() {
    if(JSON.stringify(this.scrollFilter) === JSON.stringify(this.baseFilter)) {
      this.noFilter = true;
    } else {
      this.noFilter = false;
    }
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
    if(this.noFilter) {
      return this.models;
    }

    var filter          = this.scrollFilter;
    var filteredScrolls = this.models;
    var typeFilter      = filter.scroll_type;
    var rarityFilter    = filter.rarity;
    var resourceFilter  = filter.resource_type;

    if(typeFilter.length > 0) {
      filteredScrolls = _.filter(filteredScrolls, function(model) {
        var selected = false;

        _.each(typeFilter, function(scroll_type) {
          if(model.get('scroll_type') === scroll_type) { selected = true }
        });

        return selected;
      });
    }

    if(rarityFilter.length > 0) {
      filteredScrolls = _.filter(filteredScrolls, function(model) {
        var selected = false;

        _.each(rarityFilter, function(scroll_type) {
          if(model.get('rarity') === scroll_type) { selected = true }
        });

        return selected;
      });
    }

    if(resourceFilter.length > 0) {
      filteredScrolls = _.filter(filteredScrolls, function(model) {
        var selected = false;

        _.each(resourceFilter, function(scroll_type) {
          if(model.get('resource_type') === scroll_type) { selected = true }
        });

        return selected;
      });
    }

    return filteredScrolls;
  },

  scrollStats: function() {
    var stats = {
      resources: {
        Order: 0,
        Energy: 0,
        Growth: 0
      },
      types: {
        Creature: 0,
        Enchantment: 0,
        Spell: 0,
        Structure: 0
      },
      scrollCount: 0
    }

    _.each(this.models, function(scroll) {
      stats.scrollCount += scroll.get('count');
      stats.resources[scroll.get('resource_type')] += scroll.get('count');
      stats.types[scroll.get('scroll_type')] += scroll.get('count');
    });

    return stats;
  },

});
