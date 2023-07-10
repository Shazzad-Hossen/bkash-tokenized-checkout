
const fetch = require("./utilities/apiCaller");

class Payment {
    constructor(data){
        this.data=data
        
        this.headers ={
            "Content-Type":"application/json",
            "Authorization":this.data.id_token,
            "X-App-Key":this.data.appKey,
        }
        

    }

    async createPayment(payerReference, callbackURL,agreementID,amount,currency,intent,merchantInvoiceNumber ){
        const body={
            "mode":"0001",
            "payerReference":payerReference,
            "callbackURL":callbackURL,
            "agreementID":agreementID,
            "amount":amount,
            "currency":currency,
            "intent":intent,
            "merchantInvoiceNumber":merchantInvoiceNumber,
        }

        const res= await fetch(`${this.data.BASE_URL}/create`,body,{"headers":this.headers})
        return res;

    }

    async executePayment(paymentID){
        const body={
            paymentID
        }

        const res= await fetch(`${this.data.BASE_URL}/execute`,body,{"headers":this.headers})
        return res;

    }

    async queryPayment(paymentID){
        const body={
            "paymentID": paymentID
        }

        const res= await fetch(`${this.data.BASE_URL}/payment/status`,body,{"headers":this.headers})
        return res;

    }
    
    
}
module.exports=Payment;