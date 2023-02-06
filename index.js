const express = require('express');
const { google } = require('googleapis');

const app = express();


const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWJwFLxYoSWlsZ\nr3P9uwAtVnSGiA9KBCHMRag3PonDnD+S2nBuP4rmWYwbl01/ixayhz1Oknh1tbrx\nyzVoR7rRA0YQl8fhdJUDUMGrtNjsrgY7sD0RiHEiUkLlhlk16kF9I4UK3C4aOAlj\ndhKd9yBjcMgje7geA1mGhCsHxRc2LRS1ElHlJkkqP5Qm115gqSwXrquyyTtJmCKe\ne9hqwDJOu+SyMyMMXrRXhX/Rum5tMqZn5C2HuMldEKUHdJBWLino5+/gdoJUuZ16\nYJ/LPLk4HfNRaYq1FAhsvLiWc13G2g0XvcOf7/Ur3dFuol3HgRdkMMPPPO5nRo1r\n1HuZNaX9AgMBAAECggEAH6g0cNcKyhvBS9K7+s4iAJG/OAP0/qQNuvyxGTmNc/Ut\nELBp3mJWTib+pzV+p1QQTuPfFDZiyEPNFuFLS9cOrsclHF7TlWh+frb5akCZsKMp\nGLm8zVK2JrSyXuu1VFsEw1L0394ckpOmD6Xsqp1VlF2fuF8ZoJYuLcxr8AIapE9Q\nOWhAOHG3h2vYiiXo2u+sjv+NDuCjotZYJO//e40zOAmE5FwGVZ2FEEg30+KoWREL\n91CgaO+rM+u7fEKV/S7rY3uEvXGW5ZPuC/jpMF82aNnOkfcAbWEtiBJpMU0qogNw\nAQw+ZKsOgkwW2H+51tHCIaP7skm9bXEfSSSWxqIHoQKBgQD/xYPi7Q540EOlJCZ3\nKPqUOUdKlU8aml93yxgKr6TRm5CUYwFirxJh7XCFyWcHaBfaWvTN1zV+ZwZryXud\nYoABXeXhDJq4Hiq22EYv+oXXg+QyxgGX25Nx3o7HRgAUlVxeQbl4vrGr0wuqjcGa\n2D04nkiXcmVHRs4YnJ9MDQ/gZwKBgQDWV/klLHfJxKZRyQVhzfhiNZoB0TlfzMOv\n0AD3EhQC6cuh9s6JJZlpF3+EY18g8xllTYAv33DKwrLu1L+Z9eA+dvRPs1kIYqpJ\nW4ZS0fjeiAnH1/7SY+yIyBp1+PnXRdX+M8Oex6BKQzCdj71liUcEGatcm0WWBoHY\nGv8SFA23+wKBgQCK+K3tafKYEEkA/MBttHVafjjPPItLoB9JPq+kdsUuIsGO7rB9\nBzUMwm+GMeVqL9PuD8e95DYrpRznCgXBgRieJX/XJPsYGUQKLz8LqKp6bC5crBuH\ngIX/s/aOLemzRWh3ymxVP//XpYdMN1O/p8iz78TvjPecn8sxskAXmW1L9wKBgFC7\nGc/yi7unIa20NR69YUw8PCFrGF0I1rulcHeei4L9ZAFA4FGvo7R9cT3/35idd3c8\nVYeydN0psBNcdj4a6bcdPq+2MVaDMvgmTNVs2HuYaXan2AaONEzgcXb1q8R1PUBd\nZtSrA6h03h66QO+5YNIeiPh8Ux1KniUzJdc9Tl15AoGBAJwLsAiF75JaggWIktWd\nuDJ6hm+DSSO+h17T4wODoiYZNcmCik3C2jkdm+SnLiiy0i8NZda+upCCjNx+lUcD\njBNHBXi00Pv1wJGlTGbRoEZz2L3Iu61JCZr3KWxkQ1wIn2MbpuHoaEKjy6QPxRnj\nnUfZPzjJucwrOv/mcPef68jz\n-----END PRIVATE KEY-----\n";
const GOOGLE_CLIENT_EMAIL = "calendar-key@essential-rider-377018.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "49813314830"
const GOOGLE_CALENDAR_ID = "6493c3250146a5cb828c00333320afddca03da94af89f8ac65e679f25ad2ed40@group.calendar.google.com"

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar = google.calendar({
  version: 'v3',
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient
});

app.get('/', (req, res) => {
  calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});




app.get("/createEvent",(req,res)=>{
  var event = {
    'summary': 'My first event!',
    'location': 'Hyderabad,India',
    'description': 'First event with nodeJS!',
    'start': {
      'dateTime': '2022-01-12T09:00:00-07:00',
      'timeZone': 'Asia/Dhaka',
    },
    'end': {
      'dateTime': '2022-01-14T17:00:00-07:00',
      'timeZone': 'Asia/Dhaka',
    },
    'attendees': [],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };


  
  const auth = new google.auth.GoogleAuth({
    keyFile: 'essential-rider-377018-613ffaa30d55.json',
    scopes: 'https://www.googleapis.com/auth/calendar',
  });
  auth.getClient().then(a=>{
    calendar.events.insert({
      auth:a,
      calendarId: GOOGLE_CALENDAR_ID,
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.data);
      res.jsonp("Event successfully created!");
    });
  })
})




app.listen(3000, () => console.log(`App listening on port 3000!`));
