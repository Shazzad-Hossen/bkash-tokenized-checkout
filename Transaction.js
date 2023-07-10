
const fetch = require("./utilities/apiCaller");

class Transaction {
    constructor(data){
        this.data=data
        
        this.headers ={
            "Content-Type":"application/json",
            "Authorization":this.data.id_token,
            "X-App-Key":this.data.appKey,
        }
        

    }

    async searchTransaction(trxID ){
        const body={
            "trxID":trxID,
        }
        console.log(body)

    const res= await fetch(`${this.data.BASE_URL}/general/searchTransaction`,body,{"headers":this.headers})
        return res;

    }

    async refundTransaction(paymentID, amount, trxID, sku, reason ){
        const body={
            paymentID,
            amount,
            trxID,
            sku,
            reason,
        }

       

    const res= await fetch(`${this.data.BASE_URL}/payment/refund`,body,{"headers":this.headers})
        return res;

    }

    async refundStatus(paymentID, trxID ){
        const body={
            paymentID,
            trxID,
        }


    const res= await fetch(`${this.data.BASE_URL}/payment/refund`,body,{"headers":this.headers})
        return res;

    }


    
    
    
}
module.exports=Transaction;