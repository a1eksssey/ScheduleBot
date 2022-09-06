const {google} = require('googleapis');
require('dotenv').config();

// Парсим нужную хуйню
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Настройки гугл календаря и апи
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const TIMEOFFSET = '+05:30';

// Получаем время для календаря
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;

    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
};

/**
 * Добавляем ебучее событие
 * @param event
 * @returns {Promise<number>}
 */
const insertEvent = async (event) => {

    try {
        let answer = await calendar.events.insert({
            calendarId: calendarId,
            auth: auth,
            resource: event,
        }, null);

        if (answer.status === 200 && answer.statusText === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

 let dateTime = dateTimeForCalander();

 //Событие
 let event = {
     'summary': `This is the summary.`,
     'description': `This is the description.`,
     'start': {
         'dateTime': dateTime['start'],
         'timeZone': 'Europe/Moscow'
     },
     'end': {
         'dateTime': dateTime['end'],
         'timeZone': 'Europe/Moscow'
     }
 };

 // insertEvent(event)
 //     .then((res) => {
 //         console.log(res);
 //     })
 //     .catch((err) => {
 //         console.log(err);
 //     });

// Получаем все события между двумя ебучими датами
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Europe/Moscow'
        });

        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

 let start = '2022-09-05T00:00:00.000Z';
 let end = '2022-09-06T00:00:00.000Z';

 // getEvents(start, end)
 //     .then((res) => {
 //         console.log(res);
 //     })
 //     .catch((err) => {
 //         console.log(err);
 //     });

// Удаляем ебучее событие по ебучему id
const deleteEvent = async (eventId) => {

    try {
        let response = await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        });

        if (response.data === '') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
    }
};

let eventId = 'hkkdmeseuhhpagc862rfg6nvq4';

deleteEvent(eventId)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

module.exports.insertEvent = insertEvent;
module.exports.event = event;