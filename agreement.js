
const fetch = require("./utilities/apiCaller");

class Agreement {
    constructor(data){
        this.data=data
        
        this.headers ={
            "Content-Type":"application/json",
            "Authorization":this.data.id_token,
            "X-App-Key":this.data.appKey,
        }
        

    }

    async createAgreement(payerReference, callbackURL){
        const body={
            "mode":"0000",
            "payerReference":payerReference,
            "callbackURL":callbackURL
        }

        const res= await fetch(`${this.data.BASE_URL}/create`,body,{"headers":this.headers})
        return res;

    }
    async executeAgreement(paymentID){
        const body={
            "paymentID":paymentID
        }
        

        const res= await fetch(`${this.data.BASE_URL}/execute`,body,{"headers":this.headers})
        return res;

    }

    async queryAgreement(agreementID){
        const body={
            "agreementID":agreementID
        }
        

        const res= await fetch(`${this.data.BASE_URL}/agreement/status`,body,{"headers":this.headers})
        return res;

    }

    async cancelAgreement(agreementID){
        const body={
            "agreementID":agreementID
        }
        

        const res= await fetch(`${this.data.BASE_URL}/agreement/cancel`,body,{"headers":this.headers})
        return res;

    }
    
    
}
module.exports=Agreement;