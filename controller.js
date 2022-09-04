const TelegramBot = require('node-telegram-bot-api');
const token = '5734443835:AAEFl6JYl1vYJB3VLbDR0RCvkh9Wa-xKgVg';
const bot = new TelegramBot(token, { polling: true });

locations = ["ArtPlace"]

bot.on('message', (msg) => {

    const bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }
    const check = "Проверить статус";
    const book = "Забронировать время";
    const cancel = "Отменить бронь";
    if (msg.text.toString().toLowerCase().includes(check.toLowerCase())) {
        bot.sendMessage(msg.from.id, 'Статус Вашей брони: и тут я такой пропишу инграцию  с календарём, по user.id буду определять, что за челик и че он хотел');
    }
    if (msg.text.toString().toLowerCase().includes(book.toLowerCase())) {
        bot.sendMessage(msg.from.id, 'Забронировать');
    }
    if (msg.text.toString().toLowerCase().includes(cancel.toLowerCase())) {
        bot.sendMessage(msg.from.id, 'Отменить');
    }


});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.from.id, "Привет, " + msg.from.first_name, {
        "reply_markup": {
            "keyboard": [["Проверить статус", "Забронировать время", "Отменить бронь"]]
        }
    });
    console.log(msg.from.first_name);

});

