
const
    readingTime = (a = "") => {
        const wpm = 265;
        const words = a.map(o => o.children).map(a => a.map(e => e.text)).flat().join().trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    };

export { readingTime }

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
