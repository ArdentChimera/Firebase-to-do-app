const functions = require("firebase-functions")
const admin = require("firebase-admin")
const schedule = require("node-schedule")

admin.initializeApp()

const db = admin.firestore()

exports.scheduledFirestoreCleanup = functions.pubsub
	.schedule("every 24 hours")
	.onRun(async context => {
		const now = new Date()
		const snapshot = await db
			.collectionGroup("YOUR_COLLECTION_NAME")
			.where("expiresAt", "<=", now)
			.get()

		const batch = db.batch()
		snapshot.docs.forEach(doc => {
			batch.delete(doc.ref)
		})

		await batch.commit()
		console.log("Firestore cleanup executed")
	})
