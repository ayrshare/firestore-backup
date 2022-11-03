---
description: Backup Firestore to a Cloud Storage bucket
---

# Install the Firestore Backup Extension

## About Firestore Backup Extension

This extension backs up your Firestore collections to a Cloud Storage bucket. If you're a Firestore user, you know that it is important to regularly do backups, but unfortunately Firestore doesn't have an automated backups system - unlike Realtime DB. You typically need to either manually do the backup to Cloud Storage or use the Google APIs to automate the process.

This extension makes the setup easy and allows you to choose the frequency of backups and which collections to backup. Note: more frequent backups could incur greater Cloud Function and Cloud Storage costs.

Created by [fireRun.io](https://www.firerun.io).

## Setup

### Create a new Cloud Storage bucket for backups 

Skip to [Secure your bucket](https://app.gitbook.com/@firerun/s/firerun-extensions/~/drafts/-M6jh67pITX99bO2p1oC/install-the-firestore-backup-extension/~/settings/share#secure-your-bucket) if you already have created a bucket.

* Create a Cloud Storage bucket for backups. In the Firebase console, go to Storage. Click the three vertical dots -&gt; Add Bucket.
* Choose a bucket name and create.

{% hint style="info" %}
**Quick Cost Savings Tip:** If you plan to rarely access these backups, create your bucket with the "Frequency" set to "Rare". This will [reduce](https://cloud.google.com/storage/pricing#storage-pricing) your storage costs, but [increase](https://cloud.google.com/storage/pricing#operations-pricing) your access costs.
{% endhint %}

![Choose &quot;Rare&quot; to save storage costs](.gitbook/assets/image%20%281%29.png)

### Secure your bucket

* You want to be sure to secure your Cloud Storage bucket. In the Firebase console, go to Storage -&gt; your backup bucket -&gt; rules. Delete the current rule and copy and paste this new one.

```bash
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false
    }
  }
}
```

* Click `Publish` to complete.

### Copy the bucket name

* In the Storage section of the Firebase console, select your bucket. Copy the bucket _name_ that begins with `gs://` by clicking the link icon 🔗. This will be used during installation. Note, when you enter the name below you'll need to remove the `gs://`

### Install the extension

**1.** Open a command prompt and clone the fireRun.io extension GitHub repository by running:

```text
git clone https://github.com/fireRun-io/firerun-ext.git
```

**2.** Go into the extension directory: 

```text
cd firerun-ext
```

{% hint style="success" %}
Ensure that the `firebase-tools` module is installed locally. At a command prompt, type the following to verify:

```text
firebase --version
```

If you don't have it installed or need to upgrade the version run:

```text
npm install -g firebase-tools
```
{% endhint %}

**3.** Run the command:

```text
firebase --open-sesame extdev
```

**4.** Run the extension install:

```text
firebase ext:install . --project=[projectId]
```

Where _\[projectId\]_ is the Firebase project you want to run your daily report on. 

For example: `firebase ext:install . --project=firerun-123`

**5.** Choose 'Y' to give permission for the extension to run.

**6.** Enter the name of the Cloud Storage bucket to save backups, found in the [previous](https://app.gitbook.com/@firerun/s/firerun-extensions/~/drafts/-M6jh67pITX99bO2p1oC/install-the-firestore-backup-extension/~/settings/share#copy-the-bucket-uri) step. Note, just enter the name without the `gs://`

**7.** Select the frequency of backups. Note, more frequent backups could incur greater cost.

**8.** Choose the Firestore Collections you want to backup. You can choose a specific list of Collections by entering each Collection name separated by a comma. Backup all Firestore Collections by leaving blank and hitting enter.

Your extension will install in 3-5 minutes. 

The first backup will occur depending on the frequency you selected. If you selected 12 hours, your first backup will occur in 12 hours.

### Verify Setup

You are all set up! You will start receiving your daily report the next day. You can go to the Extensions section of the Firebase Console to verify the install. If you have an errors please [contact us](mailto:support@firerun.io).

![Successful Extension Installation](.gitbook/assets/firerun-ext%20%281%29.jpg)

## Restore Firestore from a backup

If you want to restore your Firestore from a Cloud Storage backup, please follow these import [instructions](https://firebase.google.com/docs/firestore/manage-data/export-import#import_data).

## More Info

Brought to you by [Ayrshare's Social Media APIs](https://www.ayrshare.com)
