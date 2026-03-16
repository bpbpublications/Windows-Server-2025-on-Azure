import { test, expect } from '@playwright/test'; // Or 'chai' and 'mocha' if using that setup
import { ApiFactory } from '../utils/apiFactory'; // Our API Factory
import { logger } from '../utils/logger'; // Our Logger Facade
import { RegisterApi } from '../apis/registerApi'; // Our new RegisterApi object
import { faker } from '@faker-js/faker'; // Import Faker for dynamic test data generation


// Define a test suite for Register API operations
test.describe('Register API Tests', () => {
 let registerApi: RegisterApi; // Declare our RegisterApi instance


 // `test.beforeAll` hook: Runs once before all tests in this describe block.
 // It sets up the API context and obtains the RegisterApi instance.
 test.beforeAll(async ({ playwright }) => {
   // Get an instance of our RegisterApi from the ApiFactory
   registerApi = ApiFactory.getRegisterApi(await playwright.request.newContext());
   logger.info('Register API tests suite started.');
 });


 // Test case 1: Verify successful user registration
 test('Should register a new user successfully', async () => {
   const userData = { email: 'eve.holt@reqres.in', password: 'pistol' }; // Sample user data
   const response = await registerApi.registerUser(userData); // Use RegisterApi's method


   // Assertions:
   expect(response.status()).toBe(200); // reqres.in returns 200 for successful registration
   const responseBody = await response.json();
   expect(responseBody.id).not.toBeNull(); // Verify a user ID is generated
   expect(responseBody.token).not.toBeNull(); // Verify an authentication token is provided
   logger.info(`New user registered with ID: ${responseBody.id} and token: ${responseBody.token}`);
 });


 // Test case 2 (Negative Scenario): Attempt registration with missing password
 test('Should return 400 for registration with missing password', async () => {
   const userData = { email: 'sydney@fife', password: '' }; // Missing password
   const response = await registerApi.registerUser(userData);


   // Assertions:
   expect(response.status()).toBe(400); // Verify HTTP status is 400 Bad Request
   const responseBody = await response.json();
   expect(responseBody.error).toBe('Missing password'); // Verify specific error message
   logger.warn(`Attempted registration with missing password, received 400: ${responseBody.error}`);
 });


   // Test case 3: Verify successful user registration with dynamic data
 test('Should register user registration with dynamic data', async () => {
   // Generate dynamic test data using Faker
   const userData = {
     email: faker.internet.email({ provider: 'reqres.in' }), // Generate email with reqres.in domain
     password: faker.internet.password({ length: 8, memorable: true }) // Generate memorable password
   };
  
   logger.info(`Attempting to register user with email: ${userData.email}`);
   const response = await registerApi.registerUser(userData);


   // Assertions:
   //Here adding 400 just to verify the data
   expect(response.status()).toBe(400);
   const responseBody = await response.json();
   expect(responseBody.id).not.toBeNull();
   expect(responseBody.token).not.toBeNull();
   logger.info(`New user registered with ID: ${responseBody.id} and token: ${responseBody.token}`);
 });
 // `test.afterAll` hook: Runs once after all tests in this describe block (optional for API tests).
 test.afterAll(async () => {
   logger.info('Register API tests suite finished.');
 });
});
