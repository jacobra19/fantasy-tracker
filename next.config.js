const firebaseConfig = require('./config/firebaseConfig').firebaseConfig

module.exports = {
    target: 'server',
    env: {
        ...firebaseConfig
    },
}