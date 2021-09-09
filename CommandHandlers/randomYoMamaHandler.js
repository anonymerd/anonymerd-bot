const axios = require('axios');

const randomYoMamaHandler = async (client, message, messageToBot) => {
  const YOMAMA_LINK = 'https://api.yomomma.info/';

  const result = await axios({
    method: 'GET',
    url: YOMAMA_LINK,
  });

  const randomJoke = result['data']['joke'];
  message.channel.send(randomJoke);
};

module.exports = [
  {
    name: 'yomama',
    description: 'Sends a random Yo Mama Joke using yomama API.',
    handler: randomYoMamaHandler,
  },
];
