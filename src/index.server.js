const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
env.config()
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// Route
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialData = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialData);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);
app.use('/api', adminOrderRoute);

// Mongodb connection
// ${process.env.MONGO_DB_USER} . ${process.env.MONGO_DB_PASSWORD}
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wfnup.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Database connected');
    });
    
// Server connection
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`SERVER is RUNNING ON PORT ${PORT}`)

})