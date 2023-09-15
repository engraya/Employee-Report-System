const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/authConfig')
const { forwardAuthenticated } = require('../config/authConfig')




// Welcome Page
router.get('/', forwardAuthenticated,  (request, response) => {
    response.render('core')
})



module.exports = router;