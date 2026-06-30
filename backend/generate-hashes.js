
const bcrypt = require('bcrypt');

async function main() {
    const hashes = {
        // Admin password: admin123
        admin: await bcrypt.hash('admin123', 10),
        // User passwords: user123
        user: await bcrypt.hash('user123', 10)
    };
    console.log('Password hashes generated:');
    console.log('Admin hash:', hashes.admin);
    console.log('User hash:', hashes.user);
}

main();
