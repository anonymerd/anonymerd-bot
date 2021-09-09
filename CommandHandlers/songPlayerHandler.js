const YoutubeMusicApi = require('youtube-music-api');
const ytdl = require('ytdl-core-discord');

// Creating Youtube Music API instance.
const api = new YoutubeMusicApi();
// Initializing the api.
api.initalize();

// Contains the current instance of the song.
let dispatcher;

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

    // Joining the voice channel.
    connection = await message.member.voice.channel.join();

    // Sending the songs info to the server.
    message.channel.send(`Playing ${song.name} by ${song.artist.name}`);

    const link = `https://www.youtube.com/watch?v=${song.videoId}`;

    // Playing the song on the voice channel.
    dispatcher = await connection.play(
      await ytdl(link, { filter: 'audioonly' }),
      {
        type: 'opus',
      }
    );
  } else {
    message.reply('You need to join a voice channel first!');
  }
};

const pauseSongHandler = async (client, message, messageToBot) => {
  if (dispatcher) {
    // Pausing the current instance of the song.
    dispatcher.pause();
    message.reply('Paused');
  }
};

const resumeSongHandler = async (client, message, messageToBot) => {
  if (dispatcher) {
    // Resuming the song.
    dispatcher.resume();
    message.reply('Resuming');
  }
};

const stopSongHandler = async (client, message, messageToBot) => {
  // Leaving the voice channel.
  message.member.voice.channel.leave(message.member.voice.channel.id);
  message.channel.send(`Thanks for tuning in!`);
};

module.exports = [
  {
    name: 'play',
    description: 'Plays the song provided with the command.',
    handler: playSongHandler,
  },
  {
    name: 'pause',
    description: 'Pause the currently playing song.',
    handler: pauseSongHandler,
  },
  {
    name: 'resume',
    description: 'Pause the currently playing song.',
    handler: resumeSongHandler,
  },
  {
    name: 'stop',
    description: 'Stops the song and leaves the voice channel.',
    handler: stopSongHandler,
  },
];
