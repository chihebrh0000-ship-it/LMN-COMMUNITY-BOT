const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`LMN COMMUNITY Bot online: ${client.user.tag}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if (!oldMember.premiumSince && newMember.premiumSince) {
    const channel = newMember.guild.channels.cache.find(
      ch => ch.name === 'boost-log'
    );

    if (!channel || !channel.isTextBased()) return;

    const embed = new EmbedBuilder()
      .setColor('#ff1493')
      .setTitle('💗 THANK YOU FOR BOOSTING!')
      .setDescription(
        `يعطيك الصحة ${newMember} على الـ Server Boost متاع **LMN COMMUNITY**! 🖤`
      )
      .setThumbnail(newMember.user.displayAvatarURL({ size: 256 }))
      .setTimestamp();

    await channel.send({ embeds: [embed] }).catch(console.error);
  }
});

client.login(process.env.DISCORD_TOKEN);
