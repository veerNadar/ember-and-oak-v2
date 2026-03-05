#!/usr/bin/env node
// Usage: node scripts/hash-password.js <your-password>
// Prints the bcrypt hash to copy into ADMIN_PASSWORD_HASH in .env.local

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
    console.error("Error: please provide a password as an argument.");
    console.error("  Usage: node scripts/hash-password.js <your-password>");
    process.exit(1);
}

(async () => {
    const hash = await bcrypt.hash(password, 12);
    console.log("\nBcrypt hash (copy this into your .env.local):\n");
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log("");
})();
