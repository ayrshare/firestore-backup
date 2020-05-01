const functions = require("firebase-functions");
const firestore = require("@google-cloud/firestore");
const client = new firestore.v1.FirestoreAdminClient();

const backupFirestore = async () => {
  const { BUCKET, PROJECT_ID, COLLECTIONS } = process.env;
  console.log('Backup Bucket: ', BUCKET);
  console.log('Backup Project: ', PROJECT_ID);

  const col = COLLECTIONS.split(',');
  console.log('Collections', col);

  const databaseName = client.databasePath(PROJECT_ID, "(default)");

  return client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: BUCKET,
      // Leave collectionIds empty to export all collections
      // or set to a list of collection IDs to export,
      // collectionIds: ['users', 'posts']
      collectionIds: col,
    })
    .then((responses) => {
      const response = responses[0];
      console.log(`Operation Name: ${response["name"]}`);
      console.log('Completed Firestore Backup');

      return response;
    })
    .catch((err) => {
      console.error(err);
      throw new Error("Firestore Export operation failed");
    });
};

exports.scheduledFirestoreBackup = functions.handler.pubsub.schedule.onRun(
  (message, context) => {
    console.log('Starting Firestore Backup');
    return backupFirestore();
  }
);
