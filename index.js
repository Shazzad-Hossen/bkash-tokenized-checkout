const Agreement = require('./agreement');
const Base = require('./base');

require('dotenv').config();
const username= process.env.BKASH_USERNAME;
const password= process.env.BKASH_PASSWORD;
const appKey= process.env.BKASH_APP_KEY;
const appSecret= process.env.BKASH_APP_SECRET;



    

(async()=>{
    bkash=  await new Base(username, password, appKey, appSecret,true).init();
    
    const res= await bkash.agreement.createAgreement("01770618575","http://shazzad.online");
    console.log(res.bkashURL)
    setTimeout(async()=>{
        const {agreementID}= await bkash.agreement.executeAgreement(res.paymentID)
    

    const res3= await bkash.agreement.queryAgreement(agreementID);
    console.log("res3:",res3);

    // const res4= await bkash.agreement.cancelAgreement(agreementID);
    // console.log(res4);
    const res5= await bkash.payment.createPayment("01770618575","http://shazzad.online",agreementID,"12","BDT","sale","SH123456789");
    console.log(res5.bkashURL)
    

   setTimeout(async()=>{
    const res6= await bkash.payment.executePayment(res5.paymentID);
    console.log("res6:",res6)

    const res7= await bkash.payment.queryPayment(res6.paymentID)
    console.log("res7:",res7);

    const res8= await bkash.transaction.searchTransaction(res7.trxID);
    console.log("res8:",res8);

    const res9= await bkash.transaction.refundTransaction(res6.paymentID, res8.amount, res8.trxID, "SmartPhone","Wrong Product");
    console.log("res9:",res9);

    const refRes= await bkash.transaction.refundStatus(res6.paymentID,res6.trxID)
    console.log(refRes);
   },30000)


    },30000)
   })();
