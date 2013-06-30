window.Alert = {
  success: function(msg) {
    $('#alert').html(ich.success_alert({msg: msg}));
  },

  error: function(msg) {
    $('#alert').html(ich.error_alert({msg: msg}));
  }
}
