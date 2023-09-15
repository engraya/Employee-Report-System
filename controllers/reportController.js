const Report = require('../models/Report');
const { ensureAuthenticated } = require('../config/authConfig')



const homePageController = (request, response) => {
    Report.find()
        .then((result) => {
            context = { reports: result, name : request.user.name}
            response.render('home', context)
        })
        .catch((error) => {
            console.log(error)
        })
}


const createReportControllerGET = (request, response) => {
    response.render('createReport')
}


const createReportControllerPOST = (request, response) => {
    let report = new Report(request.body);
    report.save()
        .then((result) => {
            response.redirect('/reports')
        })
        .catch((error) => {
            console.log(error)
        })
}


const getSingleReportController = (request, response) => {
    const id = request.params.id;
    Report.findById(id)
        .then((result) => {
            context = {report : result, name : request.user.name}
            response.render('reportDetail', context)

        })
        .catch((error) => console.log(error))
}

const updateReportControllerGET = (request, response) => {
    const id = request.params.id;
    Report.findById(id)
        .then((result) => {
            context = {report : result}
            response.render('updateReport', context)

        })
        .catch((error) => console.log(error))
}


const updateReportControllerPOST = (request, response) => {
    const id = request.params.id;
    Report.findByIdAndUpdate(id, request.body)
        .then((result) => {
            response.redirect('/reports/' + id)
        })
        .catch((error) => console.log(error))
}

const deleteReportController = (request, response) => {
    const id = request.params.id;
    Report.findByIdAndDelete(id)
        .then((result) => {
            // response.json({ redirect : '/'})
            response.redirect('/reports')
        })
        .catch((error) => {
            console.log(error)
        })
}


module.exports = {
    homePageController,
    createReportControllerGET,
    createReportControllerPOST,
    getSingleReportController,
    updateReportControllerGET,
    updateReportControllerPOST,
    deleteReportController,
}
