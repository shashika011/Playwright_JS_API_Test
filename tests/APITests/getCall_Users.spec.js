const{test,expect}= require('@playwright/test')

test("call get method",async({request})=>{

   const resp= await request.get("https://jsonplaceholder.typicode.com/users")
  //console.log(resp)
   
   //validate status
   await expect(resp.status()).toBe(200)
   await expect(resp.statusText()).toBe("OK")
   
   const responseheaders=resp.headers();
   //console.log(responseheaders)

   
  
   //headers validation
    await expect(responseheaders ["content-type"]).toBe("application/json; charset=utf-8")

    let contentlength=Number(responseheaders ["content-length"])
    await expect(contentlength).toBeGreaterThanOrEqual(1000) //content length
    
    await expect(responseheaders ["access-control-allow-credentials"]).toBe("true")
    await expect(responseheaders ["content-encoding"]).toBe("gzip")


   const jbody=await resp.json();
   
   console.log(jbody)


   
   // validate bodydata datatype
   for(let i=0;i<=jbody.length-1;i++)
   {
     await expect(typeof jbody[i].id).toBe("number")
     await expect(typeof jbody[i].name).toBe("string")
     await expect(typeof jbody[i].email).toBe("string")
     await expect(typeof jbody[i].address.street).toBe("string")
     await expect(typeof jbody[i].address.suite).toBe("string")
     await expect(typeof jbody[i].address.city).toBe("string")
     await expect(typeof jbody[i].address.zipcode).toBe("string")
     await expect(typeof jbody[i].address.geo.lat).toBe("string")
     await expect(typeof jbody[i].address.geo.lng).toBe("string")
     await expect(typeof jbody[i].phone).toBe("string")
     await expect(typeof jbody[i].website).toBe("string")
     await expect(typeof jbody[i].company.name).toBe("string")
     await expect(typeof jbody[i].company.catchPhrase).toBe("string")
     await expect(typeof jbody[i].company.bs).toBe("string")

   }


   //mandatory data validation
   for(let i=0;i<=jbody.length-1;i++)
   {
     await expect(jbody[i].id).not.toBeNull()
     await expect(jbody[i].name).not.toBeNull()
     await expect(jbody[i].email).not.toBeNull()
     await expect(jbody[i].address.street).not.toBeNull()
     await expect(jbody[i].address.suite).not.toBeNull()
     await expect(jbody[i].address.city).not.toBeNull()
     await expect(jbody[i].address.zipcode).not.toBeNull()
     await expect(jbody[i].phone).not.toBeNull()
     await expect(jbody[i].website).not.toBeNull()
     await expect(jbody[i].company.name).not.toBeNull()
     await expect(jbody[i].company.catchPhrase).not.toBeNull()
     await expect(jbody[i].company.bs).not.toBeNull()
   }
   
   //validate keydata
     for(let i=0;i<=jbody.length-1;i++)
     {
        await expect(jbody[i].email).toContain("@")
        await expect(jbody[i].id).toBeGreaterThanOrEqual(1)
     }
   
   
   

})