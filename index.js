const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`${client.user.tag} 온라인!`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if (message.content == '!네이버') {
    message.reply('https://www.naver.com/');
}
  if (message.content == '!유튜브') {
    message.reply('https://www.youtube.com/');
}
  if (message.content == '!규칙') {
    message.reply('**초면반말(경고1회), 욕설(경고2회), 성드립(경고2회)**');
}
  if (message.content == '!서버주소') {
    message.reply('**서버주소:** ```oooya.kro.kr```');
}
if (message.content == '!전적사이트') {
  message.reply('https://www.op.gg/');
}
  if(message.content === '!명령어') {
  let img = 'https://postfiles.pstatic.net/MjAyMDA0MThfMjMg/MDAxNTg3MjEwODc5NzEw.U1atfv3TMoc-09hRX3sbO5oE6FadvIV8D-EUJE45bTsg.F4KLUi191KW8UJwcO1Q86JoADVVJ2JxlAPpPyW_Ptv4g.JPEG.vb0877/mug_obj_142839735636624358.jpg?type=w773';
  let embed = new Discord.RichEmbed()
      .setTitle('명령어 목록')
      .setAuthor('김치갱', img)
      .setThumbnail(img)
      .addField('!도움말', '봇이 할수있는것을 보여줍니다.\n')
      .addField('!네이버', '네이버로 갈수있는 링크를 줍니다.\n')
      .addField('!유튜브', '유튜브로 갈수있는 링크를 줍니다.\n')
      .addField('!청소 <숫자>', '채팅청소를 할수있습니다.\n')
      .addField('!전적사이트', '전적사이트로 갈수있는 링크를 줍니다.\n')
      .addField('!규칙', '채팅, 음성 규칙을 알려줍니다\n')
      .addField('!서버주소', '서버주소를 알려줍니다\n')
      .addField('추가 예정.', '추가 예정.\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('김치갱 유저가 만듬', img)

message.channel.send(embed)
}
  if(message.content.split(' ')[0] == '!청소') {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    }

    var clearLine = message.content.substring(3);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 99까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @바부 3 // c <@124125125125> 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다");
        })
        .catch(console.error)
    }
  }
});

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}

client.login('NzAxNDcyNjE1ODQ3NjkwMjcx.Xpx_eA.pjJsPQXIuhNlcmzctS0zTySQ2Yc');