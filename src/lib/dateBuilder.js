
const
    publishedEmoji = "📰",
    EditedEmoji = "📑"

const createdPush = (creationDate, dateLength) => {
        return `${publishedEmoji} Published ${nth(new Date(creationDate), dateLength ? dateLength : "shortDate")}`;
    },

     updatedPush = (updatedDate) => {
         updatedDate = new Date(updatedDate);

         return `↳ ${EditedEmoji} Edited ${time_ago(updatedDate)}
             ${2419200 > relativeTime(updatedDate) ? 
                ` at ${new Intl.DateTimeFormat('en-GB', {timeStyle: 'short'}).format(updatedDate)}` : 
                `` }`;
    },

    dTypes = {
        fullDate : {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'},
        shortDate : {year: 'numeric', month: 'long', day: 'numeric'},
        tinyDate : {year: 'numeric', month: 'short', day: 'numeric'}
    },

    relativeTime = (time) => {
        return (+new Date() - time) / 1000;
    },

    shifter = (d) => {
        if (d > 3 && d < 21) {
                        return 'th';}
        switch (d % 10) {
            case 1:     return "st";
            case 2:     return "nd";
            case 3:     return "rd";
            default:    return "th";}
    },

    nth = (d,l) => {
        let spl = d.toLocaleDateString("en-GB", dTypes[l]).split(" ");
        return spl[1] + " " + spl[0] + shifter(parseInt(spl[0])) + ", " + spl[2];
    },

    time_ago = (time) => {
        let tFormats = [
            [60, 'seconds', 1],
            [120, 'a minute ago', 'a minute from now'],
            [3600, 'minutes', 60],
            [7200, 'an hour ago', 'an hour from now'],
            [86400, 'hours', 3600],
            [172800, 'yesterday', 'tomorrow'],
            [604800, 'days', 86400],
            [1209600, 'last week', 'next week'],
            [2419200, 'weeks', 604800],
            [4838400, 'last month', 'next month'],
            [29030400, 'months', 2419200],
            [58060800, 'last year', 'Next year'],
            [2903040000, 'years', 29030400],
            [5806080000, 'last century', 'next century'],
            [58060800000, 'centuries', 2903040000]];

        let secs = relativeTime(time);

        if (secs < 120) {
            return 'Just now';}

        let i = 0, form;
        while (form = tFormats[i++]) {
            if (secs < form[0]) {
                return typeof form[2] == 'string' ? form[1] : Math.floor(secs / form[2]) + ' ' + form[1] + ' ago';}}
    }

export { createdPush, updatedPush, relativeTime }