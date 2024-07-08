const mongoose = require('mongoose');
const DATABASE = process.env.DATABASE

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(`Database connected successfully`)
}).catch((err) => console.log(`Failed to connect database`));