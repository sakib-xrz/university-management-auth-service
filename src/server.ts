/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const database_url = config.database_url as string;
const port = config.port;

async function main() {
  try {
    await mongoose.connect(database_url);
    console.log('🛢️  Database connection successful ✅');

    app.listen(port, () => {
      console.log(`🎯 Server listening on port: ${port}`);
    });
  } catch (err) {
    console.error('🛢️  Failed to connect to database. ❌', err);
  }
}

main();
