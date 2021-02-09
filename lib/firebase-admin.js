import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            project_id: process.env.PROJECT_ID,
            private_key_id: process.env.PRIVATE_KEY_ID,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/g,'\n'),
            client_email: process.env.CLIENT_EMAIL,
        }),
        databaseURL: "https://fantasy-tracker-e5d7f.firebaseio.com"
    });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };