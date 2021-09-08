const axios = require('axios');

const gifSearchHandler = async (client, message, messageToBot) => {
  const searchQuery = messageToBot.substring('gif '.length);

  if (searchQuery) {
    const TENOR_LINK = 'https://g.tenor.com/v1/search';
    const TENOR_CLIENT_KEY = process.env.TENOR_CLIENT_KEY;
    const TENOR_LOCALE = 'en_US';
    const TENOR_CONTENT_FILTER = 'off';
    const TENOR_MEDIA_FILTER = 'basic';
    const TENOR_AR_RANGE = 'all';

    const result = await axios({
      method: 'GET',
      url: `${TENOR_LINK}?key=${TENOR_CLIENT_KEY}&q=${searchQuery}&locale=${TENOR_LOCALE}&contentfilter=${TENOR_CONTENT_FILTER}&media_filter=${TENOR_MEDIA_FILTER}&ar_range=${TENOR_AR_RANGE}`,
    });

    // Getting a random index.
    const randomIdx =
      Math.floor(Math.random() * result['data']['results'].length) - 1;
    const gifUrl = result['data']['results'][randomIdx]['url'];

    message.channel.send(gifUrl);
  } else {
    message.channel.send(
      'My man needs to send some dope search query along with this shit.'
    );
  }
};

module.exports = [
  {
    name: 'gif',
    description:
      'Search for random gifs using the specified keyword with Tenor API.',
    handler: gifSearchHandler,
  },
];
