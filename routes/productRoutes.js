const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. CREATE: Thêm mới sản phẩm
router.post('/products', async (req, res) => {
    try {
        const { pid, pname, price, quantity } = req.body;
        
        // Kiểm tra mã sản phẩm (pid) xem đã tồn tại trong database chưa
        const existingProduct = await Product.findOne({ pid });
        if (existingProduct) {
            return res.status(400).json({ error: 'Mã sản phẩm (pid) đã tồn tại!' });
        }

        const newProduct = new Product({ pid, pname, price, quantity });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Tạo sản phẩm thành công', data: savedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. READ (All): Lấy danh sách tất cả sản phẩm
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ data: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. READ (Detail): Lấy thông tin chi tiết một sản phẩm theo pid
router.get('/products/:pid', async (req, res) => {
    try {
        const product = await Product.findOne({ pid: req.params.pid });
        if (!product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm!' });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. UPDATE: Cập nhật thông tin sản phẩm theo pid
router.put('/products/:pid', async (req, res) => {
    try {
        const { pname, price, quantity } = req.body;
        const updatedProduct = await Product.findOneAndUpdate(
            { pid: req.params.pid },
            { pname, price, quantity },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm để cập nhật!' });
        }
        res.status(200).json({ message: 'Cập nhật sản phẩm thành công', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. DELETE: Xóa sản phẩm theo pid
router.delete('/products/:pid', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ pid: req.params.pid });
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm để xóa!' });
        }
        res.status(200).json({ message: 'Xóa sản phẩm thành công', data: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;