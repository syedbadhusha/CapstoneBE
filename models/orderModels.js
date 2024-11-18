const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,  // Ensure userId is provided
    ref: 'User'      // Reference the User model if needed
  },
  deleveryAddress1: {
    type: String,
    required: true
  },
  deleveryAddress2: {
    type: String,
    required: true
  },
  deleveryAddress3: String,
  deleveryAddress4: String,
  pinCode: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now  // Use Date.now to set the date at order creation
  },
  orderNo: {
    type: String,
    required: true,  // Make sure order number is set
    unique: true
  },
  items: {
    type: Array,
    default: []
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending'],
    default: 'pending'
  },
  payBy: {
    type: String,
  }
});
// orderSchema.plugin(AutoIncrement, { inc_field: 'orderNo' });
module.exports = mongoose.model('Order', orderSchema, 'orders');
