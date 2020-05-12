const functions = require("firebase-functions");
const firestore = require("@google-cloud/firestore");
const client = new firestore.v1.FirestoreAdminClient();

const backupFirestore = async () => {
  const { BUCKET, PROJECT_ID, COLLECTIONS } = process.env;
  console.log('Firestore Backup Bucket: ', BUCKET);
  console.log('Firestore Backup Project: ', PROJECT_ID);

  const col = COLLECTIONS ? COLLECTIONS.split(',') : [];    // Empty if all collections, or array of collection names

  const databaseName = client.databasePath(PROJECT_ID, "(default)");

  return client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: 'gs://' + BUCKET,
      collectionIds: col,
    })
    .then((res) => {
      const data = res[0];
      console.log(`Completed Firestore Backup: ${data["name"]} at ${data.metadata.outputUriPrefix}`);

      return data;
    })
    .catch((err) => {
      console.error(err);
      throw new Error("Firestore Backup failed.");
    });
};

exports.scheduledFirestoreBackup = functions.handler.pubsub.schedule.onRun(
  (message, context) => {
    console.log('Starting Firestore Backup...');
    return backupFirestore();
  }
);

/*
exports.storageChanged = functions.handler.storage.object.onFinalize((object) => {
  console.log('Storage be changing: ' + JSON.stringify(object, null, 2));
});
*/
