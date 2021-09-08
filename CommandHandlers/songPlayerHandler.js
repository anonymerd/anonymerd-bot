const YoutubeMusicApi = require('youtube-music-api');
const ytdl = require('ytdl-core-discord');

// Creating Youtube Music API instance.
const api = new YoutubeMusicApi();
// Initializing the api.
api.initalize();

const playSongHandler = async (client, message, messageToBot) => {
  // Voice only works in guilds, if the message does not come from a guild, we ignore it.
  if (!message.guild) return;

  // Extracting song name.
  const songName = messageToBot.substring('play '.length);

  // Only try to join the sender's voice channel if they are in one themselves.
  if (message.member.voice.channel) {
    // Fething the results from youtube music api.
    const results = await api.search(songName, 'song');
    // Fetching the first song.
    const song = results.content[0];

    // Checking if the bot is already in a voice channel.
    // let connection = NULL;
    // if (client.voice.connections.size) {
    //   connection = await message.member.voice.channel.join();
    // } else {
    //   connection = client.voice.connections[0];
    // }

    // Joining the voice channel.
    connection = await message.member.voice.channel.join();

    // Sending the songs info to the server.
    message.channel.send(`Playing ${song.name} by ${song.artist.name}`);

    const link = `https://www.youtube.com/watch?v=${song.videoId}`;

    // Playing the song on the voice channel.
    await connection.play(await ytdl(link, { filter: 'audioonly' }), {
      type: 'opus',
    });
  } else {
    message.reply('You need to join a voice channel first!');
  }
};

module.exports = [
  {
    name: 'play',
    description: 'Plays the song provided with the command.',
    handler: playSongHandler,
  },
];
