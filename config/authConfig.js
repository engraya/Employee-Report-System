module.exports = {
    ensureAuthenticated: function(request, response, next) {
      if (request.isAuthenticated()) {
        return next();
      }
      request.flash('error_msg', 'Please Ensure you are Logged in Before gaining access');
      response.redirect('/users/login');
    },
    forwardAuthenticated: function(request, response, next) {
      if (!request.isAuthenticated()) {
        return next();
      }
      response.redirect('/reports');      
    }
  };
  