const mongoose = require('mongoose');

const Database = async() => {
    try {
        mongoose.connect(process.env.DATABASE_URL, { family: 4 }, { useNewUrlParser: true, useUnifiedTopology : true })
            .then(() => console.log('Database Connected Successfully........'))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error); 
    }
}


//check for DB Successful Connection
// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', dbURL)
// })
// db.on('error', err => {
//   console.error('connection error:', err)
// })


module.exports = Database