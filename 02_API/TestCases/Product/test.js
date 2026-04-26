const baseStep = require("../../../CommonStep/Web/Web_Common_Step");

// console.log(new Date())
baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss")
let year = new Date().getFullYear();
let month = new Date().getMonth()+1;
let formatMonth  = ('0' + month).slice(-2);
let day = new Date().getDate();

// 1740326400
// 1740412799
// 1740390548297
// 1740326400000

console.log(year + '-' + formatMonth + '-' +day + "T00:00:00")
let a = new Date(year + '-' + formatMonth + '-' +day + "T00:00:00").getTime()/1000;
console.log(a)
// let b = a
// console.log(parseInt(b))
// console.log(baseStep.getDateFormat(new Date(1740390500000),"YYYY-MM-DD_HH:mm:ss"))

const randomNumber = new Date().getDay().toString()+new Date().getHours().toString()+new Date().getMinutes().toString()+new Date().getSeconds().toString()
console.log(randomNumber);