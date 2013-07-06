Scrolls.Views.DeckScrollsView = Backbone.View.extend({

  events: {
    'click .empty-pack':    'emptyPack',
    'click .edit-name':     'toggleEditName',
    'click .rename':        'rename',
    'click .cancel-rename': 'setName'
  },

  initialize: function(opts) {
    this.deck        = opts.deck;
    this.deckScrolls = this.deck.deckScrolls;
    this.template    = ich.deck_scrolls;

    this.listenTo(this.deck, 'change:name', this.setName);

    this.listenTo(this.deckScrolls, 'add', this.addScroll);
  },

  emptyPack: function() {
    this.deckScrolls.reset([]);
    this.deck.set('scrolls', []);
    this.render();
  },

  toggleEditName: function() {
    this.$('.edit-name').toggle();
    this.$('.editing-name').toggle();
  },

  rename: function() {
    this.deck.set('name', this.$('#name-input').val());
  },

  setName: function() {
    this.$('.header').html(ich.edit_deck_name(this.deck.toJSON()));
  },

  addScroll: function(scroll, scrolls, options) {
    var deckScrollView = new Scrolls.Views.DeckScrollView({scroll: scroll, deckScrolls: this.deckScrolls});
    this.$('ul').append(deckScrollView.render().el);
  },

  render: function() {
    this.$el.html(this.template);
    this.$('.header').html(ich.edit_deck_name(this.deck.toJSON()));

    return this;
  }

});
