
const
    nFormatter = (num, digits) => {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: " thousand" },
            { value: 1e6, symbol: " million" },
            { value: 1e9, symbol: " billion" },
            { value: 1e12, symbol: " trillion" },
            { value: 1e15, symbol: " quadrillion" },
            { value: 1e18, symbol: " quintillion" },
            { value: 1e21, symbol: " sextillion" },
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        let item = lookup.slice().reverse().find(function(item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    },
    heightBuilder = (h) => { //converts cm to inches
        if (h < 1000) {
            let feetDiv = 	((h * 0.393700) / 12),
                feet = 		Math.floor(feetDiv),
                inches = 	Math.round((feetDiv - feet) * 12);
            return feet + "'" + inches + "''";}

        else if (h < 100000) {
            return (parseInt(h / 100).toLocaleString()) + " metres";}

        else {
            let trueLength = h.toString().split('.');
            let rawNumber = parseInt(trueLength[0].padEnd(trueLength[1], "0"));
            return nFormatter(rawNumber,2) + " kilometres";
        }
    },
    readingTime = (a = "") => {
        const wpm = 225;
        const words = a.map(o => o.children).map(a => a.map(e => e.text)).flat().join().trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    };

export { heightBuilder, readingTime }

const
    standardTinyhand = (n) => {
        return new Date(n).toLocaleDateString('en-GB', {
            month: 'short',
            year:  'numeric',
        });
    },
    standardShorthand = (n) => {
        return new Date(n).toLocaleDateString('en-GB', {
            day:   'numeric',
            month: 'short',
            year:  'numeric',
        });
    };

export { standardTinyhand, standardShorthand }
