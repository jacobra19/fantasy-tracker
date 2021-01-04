const firebaseConfig = require('./config/firebaseConfig').firebaseConfig

let nextConfig = {
    target: 'server',
    env: {
        ...firebaseConfig
    },
}
module.exports = nextConfig