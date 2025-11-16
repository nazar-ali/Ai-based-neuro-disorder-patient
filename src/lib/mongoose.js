import mongoose from 'mongoose';

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neurocare';

if (!MONGODB_URI) {
  throw new Error('⚠️ Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = (async () => {
      try {
        const conn = await mongoose.connect(MONGODB_URI, {
          bufferCommands: false,
        });
       
        return conn;
      } catch (err) {
        console.error("❌ MongoDB connection error:", err && err.message ? err.message : err);
        // Provide a clearer error to callers
        throw new Error(`Unable to connect to MongoDB. Check MONGODB_URI (${MONGODB_URI}) and ensure MongoDB is running. Original error: ${err && err.message ? err.message : err}`);
      }
    })();
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
