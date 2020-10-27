// Setup test db.
process.env.TEST = true;

// supertest
const supertest = require('supertest');
const app = require('../server/server');
const agent = supertest.agent(app);

// pool
const pool = require('../server/modules/pool');

describe('Updating user pet', () => {
  let user;
  let address;

  beforeEach(async() => {
    
    await pool.query('DELETE FROM "user"')

    let registerResponse = await agent
      .post(`/api/user/register`)
      .send({
        username: 'davidgould',
        password: '123',
        firstName: 'David',
        lastName: 'Gould',
        street: '101 Test Lane',
        city: 'Test City',
        state: 'MN',
        zip: '55449',
      });
    expect(registerResponse.statusCode).toBe(201);
    user = registerResponse.body.user;
    address = registerResponse.body.addressId;
    expect(user.username).toBe('davidgould');

    let loginResponse = await agent
      .post(`/api/user/login`)
      .send({username: 'davidgould', password: '123'});
    expect(loginResponse.statusCode).toBe(200);
  });

  test('should add pet to user profile', async() => {
    let postResponse = await agent
      .post(`/api/pet`)
      .send({
        petName: 'Jake',
        age: '3',
        size: 'Small',
        image_url: 'www.test.com/test',
        dogAddress: `${address.id}`
      });
    expect(postResponse.statusCode).toBe(201);
  });
});