//Import Playwright's test and rename it to base
import { test as base } from '@playwright/test'; 
//Create a custom test
export const test = base.extend({
  /*Define your custom fixture. "postCall01" is the fixture name
    "Create a fixture named postCall01. When Playwright runs it, give me the request object, 
    and give me a use function so I can pass a value to the test."
  */
  postCall01: async ({ request }, use) => {
    const jsonbody = {username: 'admin',password: 'password123'};
    const headerRequest = {'Content-Type': 'application/json'};

    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      headers: headerRequest,
      data: jsonbody,
    });
    await use(response);
  },
  bookingId: async ({ request }, use) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast',
      },
    });

    if (!response.ok()) {
      throw new Error(`Booking setup failed with status ${response.status()}`);
    }

    const booking = await response.json();
    await use(booking.bookingid);
  }
});

export { expect } from '@playwright/test';