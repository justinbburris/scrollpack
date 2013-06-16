Scrolls.Models.Deck = Backbone.Model.extend({

  defaults: function() {
    return {
      name: 'New Deck',
      maxDeckSize: 50,
      maxScrolls: 3,
      deckScrolls: new Scrolls.Collections.ScrollCollection()
    }
  },

  url: '/decks',

  stats: function() {
    var scrollStats = this.get('deckScrolls').scrollStats();

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
