
const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const shortMonthBuilder = (d) => {
    const stripped = (d.split('-'));
    return `${monthNames[parseInt(stripped[1]) - 1]} ${stripped[0]}`;
};

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
        return parseInt(trueLength[0].padEnd(trueLength[1], "0")).toLocaleString() + " kilometres";}
};

export { heightBuilder }