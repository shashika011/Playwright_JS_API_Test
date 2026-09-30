import { test, expect } from '../../fixtures/testAPIFixture.js';

test("delete booking", async ({ request, postCall01, bookingId }) => {
    const responseBody = await postCall01.json();
    const tokenid = responseBody.token
    const headersdata = { 'Content-Type': 'application/json', 'Cookie': `token=${tokenid}` };


    const res = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, { headers: headersdata });


    await expect(await res.status()).toBe(201)
    await expect(await res.text()).toBe('Created');

})
