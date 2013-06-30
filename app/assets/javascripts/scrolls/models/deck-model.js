Scrolls.Models.Deck = Backbone.Model.extend({

  defaults: {
    name: 'New Pack',
  },

  urlRoot: '/decks',

  initialize: function() {
    this.deckScrolls = new Scrolls.Collections.ScrollCollection();
    this.maxDeckSize = 50;
    this.maxScrolls  = 3;

    this._sync = Backbone.sync;
  },

  validate: function(atts, opts) {
    if(! atts.scrolls || ! atts.scrolls.length > 0) {
      return "You must have at least one scroll in your pack";
    } else if(atts.name === "New Pack") {
      return "You must name your pack"
    }
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
  },

  populateScrolls: function(gameScrolls) {
    var deckScrolls = _.map(this.get('scrolls'), function(scroll) {
      var deckScroll = gameScrolls.get(scroll.id).clone();
      deckScroll.set('count', scroll.count);

      return deckScroll;
    });
    this.deckScrolls.set(deckScrolls);
  },

  sync: function(method, model, options) {
    if(method == 'update' || method == 'create') {
      var scrolls = _.map(model.deckScrolls.models, function(scroll) {
        return { id: scroll.get('id'), count: scroll.get('count') }
      });

      model.set('scrolls', scrolls);
    }

    this._sync(method, model, options);
  }

});
