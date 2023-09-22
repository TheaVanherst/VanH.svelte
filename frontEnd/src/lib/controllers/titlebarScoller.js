
import { writable } from "svelte/store";

const
    websiteTag = "𝖁𝖆𝖓𝖍.𝖆𝖗𝖙 //", //𝖁𝖆𝖓𝖍.𝖆𝖗𝖙
    loadingIco = "Loading...", // 𝙻𝚘𝚊𝚍𝚒𝚗𝚐...

    pageName =      writable("𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚝𝚘"), //𝚆𝚎𝚕𝚌𝚘𝚖𝚎
    pageTitlebar =  writable(undefined);

export { websiteTag, loadingIco, pageName, pageTitlebar }

let headerArray = [],
    headerString = "",
    offsetArray = [];

// TODO: Misc

let timeout;

const
    unicodeArrFragmenter = (str) => {
        let returnArray = [];
        let rawParse = str.split('');

        let unicodeLoop = 0,
            trueLength = 0;

        for (let i = 0; i < rawParse.length; i++) {
            let parsedUnicode = rawParse[i].charCodeAt(0).toString(16).toUpperCase();

            if (parsedUnicode.length > 2 && unicodeLoop < 1){
                returnArray[trueLength] = 2;
                unicodeLoop++
            } else {
                if (unicodeLoop !== 1) {
                    returnArray[trueLength] = 1;}
                trueLength++
                unicodeLoop = 0;}}

        return returnArray;
    };

const
    titlebarScroller = (pageName) => {
        clearTimeout(timeout);

        headerArray = pageName;
        offsetArray = unicodeArrFragmenter(`${headerArray}`);
        headerArray = headerArray.split("");
        headerString = headerArray.join("");
        pageTitlebar.set(headerString);

        timeout = setTimeout(() => {
            printUpdate();
        },250);
    };

const
    offsetShift = (a) => {
        let o = a[0]
        a.shift();
        a.push(o);
    },

    printUpdate = () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (offsetArray[0] === 1){
                offsetShift(offsetArray);
                offsetShift(headerArray);}
            else {
                offsetShift(offsetArray);
                offsetShift(headerArray);
                offsetShift(headerArray);}

            headerString = headerArray.join("");
            pageTitlebar.set(headerString);
            printUpdate();
        },500);
    };

export { titlebarScroller };