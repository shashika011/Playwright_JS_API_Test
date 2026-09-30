
import { test, expect } from '../../fixtures/testAPIFixture.js';

test("patch booking update", async ({ request, postCall01, bookingId }) => {
    const responseBody = await postCall01.json();
    const tokenid = responseBody.token
    const headersdata = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cookie': `token=${tokenid}` };

    const bodydata = { firstname: "James", lastname: "growing" };

    const res = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, { headers: headersdata, data: bodydata });


    await expect(await res.status()).toBe(200)
    await expect(res.statusText()).toBe("OK")

    const responseb = await res.json();
    await expect(responseb.firstname).toBe('James')
    await expect(responseb.lastname).toBe('growing')


})