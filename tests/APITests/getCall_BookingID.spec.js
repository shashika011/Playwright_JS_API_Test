const{test,expect} = require('@playwright/test') 

test("validate get Call",async({request})=>{

const res= await request.get("https://jsonplaceholder.typicode.com/posts/1")

//validate status
await expect(res.status()).toBe(200)
await expect(res.statusText()).toBe("OK")

//validate header
//console.log(res.headers())
const headerdetails=res.headers()

await expect(headerdetails['content-type']).toBe("application/json; charset=utf-8")
await expect(headerdetails['transfer-encoding']).toBe('chunked')

console.log(await res.json())

const bodyData=await res.json()

await expect(bodyData.id).toBe(1)
await expect(bodyData.body).toContain("recusandae consequuntur expedita")

await expect(typeof bodyData.id).toBe("number")
await expect(typeof bodyData.title).toBe("string")
await expect(typeof bodyData.body).toBe("string")

})