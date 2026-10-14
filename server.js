const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/productdb';

// Middleware
app.use(express.json());
app.use(cors());

// Kết nối MongoDB qua Mongoose
mongoose.connect(MONGO_URI)
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Sử dụng Routes cho Product CRUD
app.use('/api', productRoutes);

// Khởi động Server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});