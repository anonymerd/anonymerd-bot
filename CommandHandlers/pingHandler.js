const pingHandler = (client, message, messageToBot) => {
  message.reply({ content: 'Pong!' });
};

module.exports = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    handler: pingHandler,
  },
];
