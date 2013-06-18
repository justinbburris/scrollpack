Scrolls.Models.Deck = Backbone.Model.extend({

  defaults: {
    name: 'New Pack',
  },

  url: '/decks',

  initialize: function() {
    this.deckScrolls = new Scrolls.Collections.ScrollCollection();
    this.maxDeckSize = 50;
    this.maxScrolls  = 3;
  },

  stats: function() {
    var scrollStats = this.deckScrolls.scrollStats();

    _.each(_.keys(scrollStats), function(statType) {
      if(! _.isObject(scrollStats[statType])) {
        return;
      }
      _.each(_.keys(scrollStats[statType]), function(stat) {
        if(scrollStats[statType][stat] == 0) {
          delete scrollStats[statType][stat];
        }
      });
    });

    var stats = {
      resources: function() {
        return _.pairs(scrollStats.resources);
      },
      types: function() {
        return _.pairs(scrollStats.types);
      },
      scrollCount: scrollStats.scrollCount
    }

    return stats;
  }

});
