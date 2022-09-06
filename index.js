const myCalendar = require('./google__calendar');
const TelegramBot = require('node-telegram-bot-api');
const token = '5734443835:AAEFl6JYl1vYJB3VLbDR0RCvkh9Wa-xKgVg';
const bot = new TelegramBot(token, { polling: true });

let botStatus = "None";
const locations = ["ArtPlace"];

if(botStatus === "None") {
  bot.on('message', (msg) => {

    const bye = "Пока";
    if (msg.text.toString().toLowerCase().includes(bye)) {
      bot.sendMessage(msg.chat.id, "До скорой встречи!");
    }
    const check = "Проверить статус";
    const book = "Забронировать время";
    const cancel = "Отменить бронь";
    if (msg.text.toString().toLowerCase().includes(check.toLowerCase())) {
      bot.sendMessage(msg.from.id, 'Статус Вашей брони: и тут я такой пропишу инграцию  с календарём, по user.id буду определять, что за челик и че он хотел');
    }
    if (msg.text.toString().toLowerCase().includes(book.toLowerCase())) {
      bot.sendMessage(msg.from.id, 'Введите дату: dd/mm/yyyy hh:mm');
      myCalendar.insertEvent(myCalendar.event);
    }
    if (msg.text.toString().toLowerCase().includes(cancel.toLowerCase())) {
      bot.sendMessage(msg.from.id, 'Отменить');
    }
    if (msg.text.toString().match(/\d\d\/\d\d\/\d\d\d\d \d\d:\d\d/))
    {

      bot.sendMessage(msg.from.id, "Успешно!");
      myCalendar.insertEvent({
        'summary': `This is the summary.`,
        'description': `This is the description.`,
        'start': {
          'dateTime': dateTime['start'],
          'timeZone': 'Europe/Moscow'
        },
        'end': {
          'dateTime': dateTime['end'],
          'timeZone': 'Europe/Moscow'
        },
    })
  };
  bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.from.id, "Привет, " + msg.from.first_name, {
      "reply_markup": {
        "keyboard": [["Проверить статус", "Забронировать время", "Отменить бронь"]]
      }
    });
    console.log(msg.from.first_name);
  });

})
}

