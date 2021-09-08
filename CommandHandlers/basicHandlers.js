const pingHandler = (client, message, messageToBot) => {
  message.reply('Pong!');
};

const hiHandler = (client, message, messageToBot) => {
  message.reply('Hi!');
};

const avatarHandler = (client, message, messageToBot) => {
  message.reply(message.author.displayAvatarURL());
};

const testHandler = (client, message, messageToBot) => {
  message.reply('Working Bitch!');
};

module.exports = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    handler: pingHandler,
  },
  {
    name: 'hello',
    description: 'Replies with Hi!',
    handler: hiHandler,
  },
  {
    name: 'avatar',
    description: "Replies with the sender's display avatar!",
    handler: avatarHandler,
  },
  {
    name: 'test',
    description: 'Replies accordingly!',
    handler: testHandler,
  },
];
