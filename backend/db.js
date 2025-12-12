const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://piyushpandey0651_db_user:elYvWegr7V9zAqGB@cluster0.aj9ddhf.mongodb.net/MealTrackerDB?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
