const baseStep = require("../../../CommonStep/Web/Web_Common_Step");
console.log( baseStep.getDateFormat(new Date(new Date().setMonth(new Date().getMonth()+1)), "YYYY-MMM-DD"))
let aaa = new Date(new Date().setMonth(new Date().getMonth()+1));
let bbb = baseStep.getDateFormat(new Date(new Date(aaa).setDate(new Date(aaa).getDate()+31)), "YYYY-MMM-DD");
console.log(bbb)

