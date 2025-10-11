// scripts/create-admin.js
// Helper script to create an admin user in MongoDB
// Run with: node scripts/create-admin.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

async function createAdmin() {
  try {
    console.log('\n🔐 AGMAR Paliwa - Tworzenie Administratora\n');

    // Connect to MongoDB
    const MONGO_URI = process.env.MONGO_URI;
    
    if (!MONGO_URI) {
      console.error('❌ Błąd: MONGO_URI nie jest ustawione w pliku .env');
      process.exit(1);
    }

    console.log('📡 Łączenie z MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Połączono z MongoDB\n');

    const User = mongoose.model('User', UserSchema);

    // Get username
    const username = await new Promise((resolve) => {
      rl.question('Nazwa użytkownika (admin): ', (answer) => {
        resolve(answer.trim() || 'admin');
      });
    });

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      const overwrite = await new Promise((resolve) => {
        rl.question(`⚠️  Użytkownik "${username}" już istnieje. Nadpisać? (tak/nie): `, (answer) => {
          resolve(answer.toLowerCase() === 'tak' || answer.toLowerCase() === 't');
        });
      });

      if (!overwrite) {
        console.log('❌ Anulowano.');
        process.exit(0);
      }

      await User.deleteOne({ username });
      console.log('🗑️  Usunięto starego użytkownika.');
    }

    // Get password
    const password = await new Promise((resolve) => {
      rl.question('Hasło (minimum 6 znaków): ', (answer) => {
        resolve(answer);
      });
    });

    if (password.length < 6) {
      console.error('❌ Hasło musi mieć minimum 6 znaków!');
      process.exit(1);
    }

    // Hash password
    console.log('\n🔐 Hashowanie hasła...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    console.log('\n✅ Użytkownik administratora utworzony pomyślnie!');
    console.log(`\n📝 Szczegóły:`);
    console.log(`   Nazwa użytkownika: ${username}`);
    console.log(`   Hasło: ${password}`);
    console.log(`\n🔗 Możesz się teraz zalogować na: http://localhost:3000/login`);
    console.log(`\n⚠️  WAŻNE: Zapisz te dane w bezpiecznym miejscu!\n`);

  } catch (error) {
    console.error('\n❌ Błąd:', error.message);
  } finally {
    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  }
}

createAdmin();

