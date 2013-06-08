//= require ./scrolls_backbone_init
//= require_tree .

// Let's start this up!
$(function() {
  "use strict";

  Scrolls.router = new Scrolls.Router();
  Backbone.history.start();
});
