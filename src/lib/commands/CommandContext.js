// import Discord from 'discord.js';

// function validateOptions(options = {}) {
//   const { client, message } = options;
//   if (!client)
//     throw Error(
//       'You must provide an instance to the Discord.Client in the CommandContext options.'
//     );
//   if (!(client instanceof Discord.Client))
//     throw Error('You must provide a valid Discord.Client instance in the CommandContext options.');
//   if (!message)
//     throw Error(
//       'You must provide an instance to the Discord.Message in the CommandContext options.'
//     );
//   if (!(message instanceof Discord.Message))
//     throw Error('You must provide a valid Discord.Message instance in the CommandContext options.');
// }

export default class CommandContext {
  constructor({ client, message }) {
    //validateOptions({ client, message });

    this.client = client;
    this.message = message;
  }

  get author() {
    return this.message.author;
  }

  get member() {
    return this.message.member;
  }

  get channel() {
    return this.message.channel;
  }
};
