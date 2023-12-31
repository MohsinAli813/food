import express from 'express'
import dotenv from 'dotenv'
const app =express()
import productroute from './routes/productroute.js'
import userroute from './routes/userroute.js'
import orderroute from './routes/orderroute.js'
const DATABASE_URL="mongodb+srv://mubashirahmad:ahmad1122@the-indus.vdcrrhs.mongodb.net/the-indus?retryWrites=true&w=majority";

import connectDb from './db/connection.js';
import {errormiddle} from './middleware/error.js'
import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import paymentroute from './routes/paymentroute.js'
import categoryroute from './routes/categoryroute.js'
import cors from 'cors'
dotenv.config({ path: "beckend/config/config.env" });


// Increase the request size limit to 10MB
app.use(express.json({ limit: '10mb' }));

// CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// More middleware and route handlers
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set('view engine', 'ejs');

// Route for the root endpoint '/'
app.get('/', (req, res) => {
  res.send('Hello, this is the root endpoint!');
});

// Routes
app.use('/api/v1', productroute);
app.use('/api/v1', userroute);
app.use('/api/v1', orderroute);
app.use('/api/v1', paymentroute);
app.use('/api/v1', categoryroute);

// Database connection
connectDb(DATABASE_URL);
app.use(errormiddle);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
  console.log(`MongoDB server running at ${DATABASE_URL}`);
});