//= require ./scrolls_backbone_init
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_directory .

// Let's start this up!
$(function() {
  "use strict";

  Scrolls.router = new Scrolls.Router();
  Backbone.history.start();
});
