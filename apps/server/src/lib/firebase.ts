var admin = require("firebase-admin");

var serviceAccount = require("../../google-services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();

export default admin;
