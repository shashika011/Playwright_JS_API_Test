import { test, expect } from '../../fixtures/testAPIFixture.js';

test("update booking", async ({ request, postCall01, bookingId }) => {

    const responseBody = await postCall01.json();
    const tokenid = responseBody.token
    const headersdata = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cookie': `token=${tokenid}` };

    const bodydata = {
        firstname: "James", lastname: "growing", totalprice: 111, depositpaid: true,
        bookingdates: { checkin: "2026-01-01", checkout: "2026-01-10" },
        additionalneeds: "Breakfast"
    };

    const res = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, { headers: headersdata, data: bodydata });

    //console.log(`https://restful-booker.herokuapp.com/booking/${id}`, {headers:headersdata,data:bodydata});

   

    await expect(await res.status()).toBe(200)
    await expect(res.statusText()).toBe("OK")

    const responseb = await res.json();
    await expect(responseb.firstname).toBe('James')
    await expect(responseb.lastname).toBe('growing')

    const billprice = Number(responseb.totalprice)
    await expect(billprice).toBe(111)
    const depositpaid = Boolean(responseb.depositpaid)
    await expect(depositpaid).toBeTruthy()
    
})