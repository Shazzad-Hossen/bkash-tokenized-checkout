const axios = require('axios');
const fetch=async(api,body,config)=>{
    const response = await axios.post(`${api}`, body, config);
    return response.data;
}

module.exports = fetch;