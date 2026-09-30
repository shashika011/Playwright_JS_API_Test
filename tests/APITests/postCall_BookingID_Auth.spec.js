import { request } from 'node:http';
const{test,expect}= require ('@playwright/test')

// refer https://restful-booker.herokuapp.com/apidoc/index.html site 
async function callresponse(request, jsonbody, headerRequest) {

    const resp = await request.post( "https://restful-booker.herokuapp.com/auth",{headers: headerRequest,data: jsonbody});

    return  resp;
}

module.exports = { callresponse };



test(" validate valid login with token" ,async({request})=>{
   
    let jsonbodyr={username: 'admin',password : 'password123'}
    let headerRequestr={'Content-Type': 'application/json'}

    const res= await callresponse(request,jsonbodyr,headerRequestr)
   
    // validate response status
    await expect(res.status()).toBe(200)
    await expect(res.statusText()).toBe("OK")

     // validate response headers
    //console.log(res.headers())
    const jsonHeader= res.headers()
    
    await expect(jsonHeader['content-type']).toBe('application/json; charset=utf-8')
    const jsonHeaderlength=Number(jsonHeader['content-length'])
    await expect(jsonHeaderlength).toBeGreaterThanOrEqual(27)

     const jsonbodydata= await res.json()
    // console.log(jsonbodydata.token)
    
     const token=jsonbodydata.token

     await expect(token).not.toBeUndefined()
     //await expect(jsonbodydata).toContain("OK")
     

})


test(" validate invalid login" ,async({request})=>{

    let jsonbodyr={username: 'admin1243',password : 'password123'}
    let headerRequestr={'Content-Type': 'application/json'}

    const res= await callresponse(request,jsonbodyr,headerRequestr)
    

    // validate response status
    await expect(res.status()).toBe(200)
    await expect(res.statusText()).toBe("OK")
    
    const jsonbodydata= await res.json()
    //console.log(jsonbodydata.reason)
    
    await expect(jsonbodydata.reason).toBe('Bad credentials')
    const token=jsonbodydata.token

     await expect(token).toBeUndefined()
     //await expect(jsonbodydata).toContain("OK")
     

})