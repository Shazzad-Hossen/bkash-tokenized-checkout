
const Transaction = require("./Transaction");
const Agreement = require("./agreement");
const Payment = require("./payment");
const fetch = require("./utilities/apiCaller");

class Base {

    SANDBOX= "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
    LIVE= "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout";
    

    constructor(username, password, appKey, appSecret,isDev){
        this.username=username;
        this.password=password;
        this.appKey=appKey;
        this.appSecret=appSecret;
        this.BASE_URL=isDev?this.SANDBOX:this.LIVE;
        

        }
        
async init(){
    return new Promise((resolve) => {
        const headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username":this.username,
            "password":this.password,
    
        }
        const body= {
            "app_key":this.appKey,
            "app_secret":this.appSecret,
        }
        fetch(`${this.BASE_URL}/token/grant`,body,{headers})
        .then(res=>{
            this.token_type=res.token_type;
            this.refresh_token=res.refresh_token;
            this.id_token=res.id_token;
            this.agreement= new Agreement(this);
            this.payment= new Payment(this);
            this.transaction= new Transaction(this);


            resolve(this);
            
            
            
        })

        
        
        
    })

    
}


           
            




}

module.exports=Base;