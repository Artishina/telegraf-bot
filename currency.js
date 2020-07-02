const Telegraf = require("telegraf");
const axios = require("axios");
const cc = require("currency-codes");


const TELEGRAM_BOT_TOKEN =
    process.env.TELEGRAM_BOT_TOKEN ||
    "1296204708:AAFWJFk84wx79nv0EYucT2VxA8yorefbB_Y";

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start(ctx => {
    return ctx.reply("Welcome to Mono Currency Bot");
});

/*
bot.hears('show', (ctx) => {
    axios.get('https://api.monobank.ua/bank/currency')
    .then((res) => {
        ctx.reply(res.data[0]);
    })
    .catch((err) => {
        ctx.reply(err);
    });
});
*/

bot.hears(/^[A-Z]+$/i, async (ctx) => {
    //console.log(ctx.message.text);
    const clientCurCode = ctx.message.text;
    const currency = cc.code(clientCurCode);

    // check for existing currency
    if (!currency) {
        return ctx.reply("Currency wasn't found");
    }

    try {
        const currencyObj = await axios.get('https://api.monobank.ua/bank/currency');
        //return ctx.reply(currencyObj.data[0]);

        const foundCurrency = currencyObj.data.find(cur => {
            return cur.currencyCodeA.toString() === currency.number;
        });
        console.log(foundCurrency);
        //return ctx.reply(foundCurrency);
        if (
            !foundCurrency ||
            !foundCurrency.rateBuy ||
            !foundCurrency.rateSell
        ) {
            return ctx.reply("Currency didnt found in Monobank API");
        }
        return ctx.replyWithMarkdown(
            `CURRENCY: ${currency.code}
RATE BUY: *${foundCurrency.rateBuy}*
RATE SELL: *${foundCurrency.rateSell}*
        `
        );
    }
    catch (error) {
        return ctx.reply(error);
    }
});

bot.launch();