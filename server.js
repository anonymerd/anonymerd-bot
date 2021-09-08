const fs = require('fs');

// Require the necessary discord.js classes
const { Client } = require('discord.js');

// Configuring node js to read the .env file.
const dotenv = require('dotenv');
dotenv.config();

// Creating a Discord client instance.
const client = new Client();

// Fetching all the command files.
const commandFiles = fs
  .readdirSync('./CommandHandlers')
  .filter((file) => file.endsWith('.js'));
const commands = [];
for (const file of commandFiles) {
  const cmds = require(`./CommandHandlers/${file}`);
  commands.push(...cmds);
}

// Mapping the commands to their handlers for optimization.
const handlers = new Map();
commands.forEach((command) => {
  handlers.set(command.name, command);
});

// Prefix for discord commands.
const PREFIX = 'op';

// Logging once the client is ready (only once).
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Setting up events.
client.on('message', async (message) => {
  // Checking for bot prefix.
  if (message.content.substring(0, PREFIX.length) == PREFIX) {
    // Extracting the message from the string.
    const messageToBot = message.content.substring(PREFIX.length + 1);

    const commandName = messageToBot.split(' ')[0];
    const command = handlers.get(commandName);
    // Checking if the command exists.
    if (command) {
      // Acting according the provided message by calling the respective handler method.
      await command.handler(client, message, messageToBot);
    }
  }
});

// Logging in to Discord using client token.
// client.login(`${process.env.DISCORD_CLIENT_KEY}`);

const token = 'NzUyNDI4NjMzMDQ5NTMwNDA4.X1XfxQ.Rj1gwif3pAOu92PgPr6_BQEMBZ8';
client.login(token);
