//import { request } from 'node:http';
//import { test, expect } from '../../fixtures/testAPIFixture';
import { test } from '../../fixtures/testAPIFixture';
import { expect } from '@playwright/test';

async function getTokeb ( {postCall01} ) {
   /*
"Take the HTTP response stored in postCall01, read its response body as JSON, wait for that 
operation to finish, and store the resulting JavaScript object in responseBody."
Because the HTTP response body is not automatically a JavaScript object. If the API returns JSON, 
you need to parse it before you can conveniently access its fields.
   */
   const responseBody = await postCall01.json();
   return responseBody.token

}

test("create booking",async({request, postCall01 })=>{

const tokenid= getTokeb({postCall01})
const bodydata={ "firstname" : "Jim","lastname" : "Brown","totalprice" : 111, "depositpaid" : true,"bookingdates" : {"checkin" : "2018-01-01","checkout" : "2019-01-01"},"additionalneeds" : "Breakfast"}
const headerdata={'Content-Type': 'application/json'}
const res= await request.post("https://restful-booker.herokuapp.com/booking ",{headers:headerdata,data:bodydata,token:tokenid})

console.log(await res.json())

//validate status
await expect(res.statusText()).toBe("OK")
await expect(res.status()).toBe(200)

//validate headeers

await expect(res.headers()['content-type']).toBe('application/json; charset=utf-8')

const contentLength=Number(res.headers()['content-length'])
await expect(contentLength).toBeGreaterThanOrEqual(100)

const jsonbody= await res.json()
const bookingID= Number(jsonbody.bookingid)

await expect(bookingID).toBeGreaterThanOrEqual(100)
await expect(jsonbody.booking.firstname).toBe('Jim')
await expect(jsonbody.booking.lastname).toBe('Brown')

const bookingtotal= Number(jsonbody.booking.totalprice)
await expect(bookingtotal).toBe(111)

const deposited=Boolean(jsonbody.booking.depositpaid)
await expect(deposited).toBeTruthy()

await expect( typeof jsonbody.bookingid).toBe("number")
await expect( typeof jsonbody.booking.firstname).toBe("string")
await expect( typeof jsonbody.booking.lastname).toBe("string")
await expect( typeof jsonbody.booking.additionalneeds).toBe("string")
await expect( typeof jsonbody.booking.bookingdates.checkin).toBe("string")
await expect( typeof jsonbody.booking.bookingdates.checkout).toBe("string")

await expect(jsonbody.bookingid).not.toBeNull()
await expect(jsonbody.booking.firstname).not.toBeNull()
await expect(jsonbody.booking.lastname).not.toBeNull()
await expect(jsonbody.booking.additionalneeds).not.toBeNull()
await expect(jsonbody.booking.bookingdates.checkin).not.toBeNull()
await expect(jsonbody.booking.bookingdates.checkout).not.toBeNull()




})

