const totp = require('steam-totp');

function run() {
    // Get shared secret from environment variable
    const sharedSecret = process.env.steam_shared_secret;
    if (!sharedSecret) {
        console.error('Error: steam_shared_secret environment variable is not set.');
        process.exit(1);
    }

    // Validate the shared secret format
    if (sharedSecret.length !== 28 || !sharedSecret.endsWith('=')) {
        console.error('Error: Invalid shared secret.');
        process.exit(1);
    }

    // Get the time offset and generate the TOTP code
    totp.getTimeOffset((error, offset) => {
        if (error) {
            console.error(`Error retrieving time offset: ${error}`);
            process.exit(1);
        }
        
        const code = totp.generateAuthCode(sharedSecret, offset);
        console.log(code);
        process.exit(0);
    });
}

run();
