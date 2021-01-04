const firebaseConfig = require('./config/firebaseConfig')

let nextConfig = {
    target: 'server',
    env: {
        ...firebaseConfig
    },
}
module.exports = nextConfig