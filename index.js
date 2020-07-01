const Telegraf = require("telegraf");
const bot = new Telegraf("1296204708:AAFWJFk84wx79nv0EYucT2VxA8yorefbB_Y");

bot.use(async (ctx, next)=> {
    //ctx.reply('Middleware');
    ctx.state.isSend = true;
    //ctx.state.role = ctx.message.message_id;
    console.log(new Date());
    //throw 'error';
    await next();
})

bot.start(ctx=> {
    const { state } = ctx;
    console.log(state);
    ctx.reply(`Start command ${state.isSend}`)
});

bot.help(ctx=>ctx.reply('Help command'));
bot.settings(ctx=>ctx.reply('Settings'));

//bot.command('stop',ctx=>ctx.reply('Stop command'));

bot.command(['stop', 'finish'], (ctx)=>{
    return ctx.reply('Stop command');
})

bot.mention('ravioli117', (ctx)=> {
    ctx.reply("This is little piggy");
})

bot.phone('+79375217792', (ctx)=> {
    ctx.reply("my phone number");
})

bot.hashtag('piggy', (ctx)=> {
    ctx.reply('piggy hashtag');
})

bot.command('hello', (ctx)=> {
    console.log(ctx);
    ctx.reply(`Hello,${ctx.update.message.from.first_name}`);
})

bot.hears('piggy', (ctx)=> {
    //ctx.reply('PIGGY!!!');
    ctx.replyWithPhoto('https://s.tcdn.co/e3a/876/e3a87689-707f-3495-b94a-8ee96e2538e5/1.png');
});

bot.catch((err, ctx) => {
    console.log('Error', err);
})

bot.on(['message', 'edited_message'], (ctx) => {
    console.log(ctx.updateType);
    console.log(ctx.updateSubTypes);
});

bot.launch()
    .then((res) => {
        console.log("Started");
    })
    .catch((err) => console.log(err));