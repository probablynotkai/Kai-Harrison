async function postMessage(client, message) {
	client.getDb("Messages").getCollection("Messages").insertOne(message);
}