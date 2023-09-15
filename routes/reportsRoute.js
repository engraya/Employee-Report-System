const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/authConfig')
const reportController = require('../controllers/reportController');




// Fecth all reports in HomePge
router.get('/', ensureAuthenticated, reportController.homePageController)


router.get('/create', ensureAuthenticated, reportController.createReportControllerGET)

// Post an Issue from a form
router.post('/create', ensureAuthenticated, reportController.createReportControllerPOST)

// get Single issue by ID
router.get('/:id', ensureAuthenticated, reportController.getSingleReportController)


// Load thr Update fORM
router.get('/update/:id', ensureAuthenticated, reportController.updateReportControllerGET)

// make an update for a single issue
router.post('/update/:id', ensureAuthenticated, reportController.updateReportControllerPOST)


router.delete('/delete/:id', ensureAuthenticated, reportController.deleteReportController)



module.exports = router;