const firebaseConfig = require('./config/firebaseConfig')

module.exports = {
    target: 'server',
    env: {
        ...firebaseConfig
    },
}