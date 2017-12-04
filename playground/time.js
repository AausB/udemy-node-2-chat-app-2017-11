/**
 * Play around with time
 */

// UNIX epic: 01.01.1970 00:00:00 UTC

// JS stores timestamps in millisecs, UNIX in secs
// Timestamp: -1000 = 1 sec in the past -> 31.12.1969 23:59:59

const moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

moment.locale('de');

var date = moment();
console.log(date.format());
console.log(date.format('MMM, YYYY'));
console.log(date.format('DD.MM.YYYY'));
console.log(date.format('DD.MM.YYYY, HH:mm:ss'));

var date = moment();
date.add(1, 'year');
console.log(date.format('DD.MM.YYYY, HH:mm:ss'));

date.subtract(5, 'months');
console.log(date.format('DD.MM.YYYY, HH:mm:ss'));

// example 10:35 am
console.log(date.format('hh:mm a'));

var createdAt = 1234;
var date2 = moment(createdAt);
console.log(date2.format('hh:mm a'));

// same timestamp as new Date().getTime()
var momentTimestamp = moment().valueOf();
console.log(momentTimestamp);
