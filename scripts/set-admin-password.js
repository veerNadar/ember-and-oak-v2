/**
 * Generates a bcrypt hash for ADMIN_PASSWORD and writes it
 * (double-quoted) into .env.local so Next.js dotenv does not
 * interpolate the $ characters inside the hash.
 *
 * Usage:  node scripts/set-admin-password.js
 */

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const PASSWORD = "DuoVibeDev2005";
const ENV_FILE = path.join(__dirname, "..", ".env.local");
const COST = 12;

(async () => {
    console.log(`Hashing password with bcrypt (cost ${COST})…`);
    const hash = await bcrypt.hash(PASSWORD, COST);

    console.log("Generated hash :", hash);
    console.log("Hash length    :", hash.length);

    // Read current .env.local
    let env = fs.readFileSync(ENV_FILE, "utf8");

    // Replace the ADMIN_PASSWORD_HASH line (with or without existing quotes)
    const LINE_RE = /^ADMIN_PASSWORD_HASH=.*$/m;
    const newLine = `ADMIN_PASSWORD_HASH="${hash}"`;

    if (LINE_RE.test(env)) {
        env = env.replace(LINE_RE, newLine);
    } else {
        env = env.trimEnd() + "\n" + newLine + "\n";
    }

    fs.writeFileSync(ENV_FILE, env, "utf8");
    console.log("\n✅ Written to .env.local");

    // ── Verify ────────────────────────────────────────────────────────────
    const written = fs.readFileSync(ENV_FILE, "utf8");
    const match = written.match(/^ADMIN_PASSWORD_HASH="(.+)"$/m);
    const readHash = match ? match[1] : "";

    console.log("Read-back length :", readHash.length, "(expected 60)");
    console.log("Hashes identical :", hash === readHash);

    const ok = await bcrypt.compare(PASSWORD, readHash);
    console.log("bcrypt.compare   :", ok, "(expected true)");

    console.log("\n── Final .env.local ─────────────────────────────────────");
    console.log(written);
})();
