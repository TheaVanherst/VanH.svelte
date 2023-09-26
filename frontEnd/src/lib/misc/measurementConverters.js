
const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const shortMonthBuilder = (d) => {
    const stripped = (d.split('-'));
    return `${monthNames[parseInt(stripped[1]) - 1]} ${stripped[0]}`;
};

function nFormatter(num, digits) {
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
}

export {shortMonthBuilder}

const heightBuilder = (h) => { //converts cm to inches
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
};

export { heightBuilder }