const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  console.log('🔍 Testing MongoDB Connection...\n');
  
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bacancy-clone';
  console.log('Connection string:', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
  
  try {
    // Test 1: Basic connection
    console.log('\n📡 Attempting connection...');
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Port: ${conn.connection.port}`);
    
    // Test 2: Basic operation
    console.log('\n🧪 Testing basic operation...');
    const testCollection = conn.connection.db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Write operation successful');
    
    const result = await testCollection.findOne({ test: true });
    console.log('✅ Read operation successful');
    
    await testCollection.deleteOne({ test: true });
    console.log('✅ Delete operation successful');
    
    console.log('\n🎉 All tests passed! Your MongoDB connection is working perfectly.');
    
  } catch (error) {
    console.error('\n❌ MongoDB Connection Failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('SSL') || error.message.includes('tlsv1')) {
      console.log('\n💡 SSL Error detected. Trying alternative connection...');
      try {
        const conn = await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          ssl: false,
          serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ Connection successful without SSL!');
        console.log(`   Host: ${conn.connection.host}`);
      } catch (retryError) {
        console.error('❌ Alternative connection also failed:', retryError.message);
      }
    }
    
    console.log('\n🔧 Troubleshooting Tips:');
    console.log('1. Check your MONGODB_URI in .env file');
    console.log('2. For MongoDB Atlas:');
    console.log('   - Ensure your IP is whitelisted');
    console.log('   - Verify username/password are correct');
    console.log('   - Check if cluster is active');
    console.log('3. For local MongoDB:');
    console.log('   - Ensure MongoDB service is running');
    console.log('   - Check if port 27017 is available');
    console.log('4. Try the alternative connection strings in env.example');
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
};

// Run the test
testConnection(); 