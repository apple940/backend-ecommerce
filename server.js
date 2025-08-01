require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');
const errorHandler = require('./middleware/errorHandlerMiddleware');





//app
const app = express();

//connecting the db
connectDB()

//cors
app.use(cors())
//middleware
app.use(express.json());

//router
app.use('/api',require('./routes/authRoutes'))
// app.use('/test',require('./routes/testRoute'))
app.use('/api/admin',require('./routes/productRoutes'))
app.use('/api/product',require('./routes/cartRoutes'))

//error handler
app.use(errorHandler)

//port
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})