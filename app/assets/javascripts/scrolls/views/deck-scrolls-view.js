Scrolls.Views.DeckScrollsView = Backbone.View.extend({

  events: {
    'click .empty-pack': 'emptyPack',
    'click .edit-name': 'toggleEditName',
    'click .set-name': 'setName'
  },

  initialize: function(opts) {
    this.deck        = opts.deck;
    this.deckScrolls = this.deck.deckScrolls;
    this.template    = ich.deck_scrolls;

    this.listenTo(this.deckScrolls, 'add', this.addedScroll);
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

  setName: function() {
    this.toggleEditName();
    this.deck.set('name', this.$('#name-input').val());
  },

  addedScroll: function(scroll, scrolls, options) {
    var deckScrollView = new Scrolls.Views.DeckScrollView({scroll: scroll, deckScrolls: this.deckScrolls});
    this.$('ul').append(deckScrollView.render().el);
  },

  render: function() {
    this.$el.html(this.template(this.deck.toJSON()));

    return this;
  }

});
