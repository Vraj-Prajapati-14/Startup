const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      console.log('Please create a .env file with your MongoDB connection string');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple document
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    await TestModel.create({ name: 'test' });
    console.log('✅ Database write test successful!');
    
    await TestModel.deleteOne({ name: 'test' });
    console.log('✅ Database delete test successful!');
    
    await mongoose.disconnect();
    console.log('✅ Connection closed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check if MongoDB is running');
    console.log('2. Verify your connection string in .env file');
    console.log('3. For MongoDB Atlas, ensure your IP is whitelisted');
    console.log('4. Check your username and password');
  }
}

testConnection(); 