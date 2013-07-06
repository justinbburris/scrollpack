//= require_tree ./mixins
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_directory .

// Let's start this up!
$(function() {
  "use strict";

  if(User.logged_in) {
    User.initialize(function() {
      Scrolls.init_app();
    });
  } else {
    Scrolls.init_app();
  }

});

Scrolls.init_app = function() {
  Scrolls.router = new Scrolls.Router();
  Backbone.history.start();
}
