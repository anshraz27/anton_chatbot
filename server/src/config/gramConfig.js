const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
require('dotenv').config();

const apiId = parseInt(process.env.apiId) || 27097910;
const apiHash = process.env.apiHash || "5b2b91513116373e49dd4808e5eb4529"; // Use your API Hash
const stringSession = new StringSession(process.env.stringSession || "1BQANOTEuMTA4LjU2LjE1OAG7qz7s7gqO1TrJYpu6kp"); // fill this later with the value from session.save()

const client = new TelegramClient(stringSession, apiId, apiHash, {
  autoReconnect: true,
});


const connectToGram = async () => {
  if (!client.connected) {
    await client.connect();
    console.log('Connected to Telegram successfully');
  }
  return client;
};

module.exports = {
  connectToGram, client
};
//   export default {connectToGram}