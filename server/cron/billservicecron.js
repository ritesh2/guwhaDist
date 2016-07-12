'use strict';

var cron = require('node-schedule');
/* run the job at 18:55:30 on Dec. 14 2018*/
var date = new Date(2018, 11, 14, 18, 56, 30);
/* This runs at the 30th mintue of every hour. */
cron.scheduleJob('2 * * * * *', function () {
    console.log('This runs at the 2th mintue of every hour.');
});
//# sourceMappingURL=billservicecron.js.map
