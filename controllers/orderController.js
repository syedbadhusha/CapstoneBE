const Order = require('../models/orderModels');
const User = require('../models/userModels');
const getNextSequence = require('./getNextSequence');

const orderControllers = {
  createOrder: async (req, res) => {
    try {
      const userId = req.userInfo.id;
      const userRole = req.userInfo.userRole;
      const {
        deleveryAddress1,
        deleveryAddress2,
        deleveryAddress3,
        deleveryAddress4,
        pinCode,
        items,
        paymentStatus,
        payBy
      } = req.body;

      // Find user and check authorization
      const user = await User.findById(userId).select('-passwordHash -__v -_id');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (userRole !== 'user') {
        return res.status(403).json({ message: `Hi ${user.firstName}, you don't have access` });
      }
      const orderNo = await getNextSequence('orderNo');
      // Create a new order with details matching schema fields
      const newOrder = new Order({
        userId,
        deleveryAddress1,
        deleveryAddress2,
        deleveryAddress3,
        deleveryAddress4,
        pinCode,
        orderDate: new Date(),
        orderNo,
        items,
        paymentStatus,
        payBy
      });

      // Save order and send response
      const createdOrder = await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully', order: createdOrder });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = orderControllers;
