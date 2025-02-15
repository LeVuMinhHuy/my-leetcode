import { MongoClient, MongoClientOptions } from 'mongodb';
import _mongoose, { connect } from 'mongoose';

const uri: string | undefined = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

if (!uri) {
	throw new Error('Please add your Mongo URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
	// Ensure global._mongoClientPromise is recognized in TypeScript
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined;
	var mongoose: {
		promise: ReturnType<typeof connect> | null;
		conn: typeof _mongoose | null;
	};
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
	if (cached.conn) {
		console.log('🚀 Using cached connection');
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = connect(uri!, opts)
			.then((mongoose) => {
				console.log('✅ New connection established');
				return mongoose;
			})
			.catch((error) => {
				console.error('❌ Connection to database failed');
				throw error;
			});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
};

export const getDb = async () => {
	const client = await clientPromise;
	return client.db();
};
