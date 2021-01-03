import firebaseConfig from './config/firebaseConfig'

module.exports = {
    target: 'server',
    env: {
        ...firebaseConfig
    },
}