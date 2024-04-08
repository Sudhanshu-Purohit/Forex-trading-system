
# Finmo Assignment (SDE BACKEND)
This Forex trading system is developed using **Nest.js** and comprises APIs that enable users to perform various actions such as topping up their account, fetching live FX conversion rates, executing FX conversions, and checking their account balances.


## Run Locally

Clone the project:

```bash
  git clone https://github.com/Sudhanshu-Purohit/Forex-trading-system.git
```


Install dependencies:

```bash
  npm install
```

Set up necessary environment variables:
```bash
  DB_URI=
  JWT_SECRET=
  JWT_EXPIRE=
  ALPHADVANTAGE_API=
```

Start the server:

```bash
  npm run start:dev
```


## Features

- Top up account
- Check balance
- Perform FX conversion
- Proper error handling
- APIs documented using swagger
- Unit tests

## Bonous Features

- Authentication and authorization
- Rate limiting to the APIs
- Caching mechanism using cache manager


## API Testing

- To test the APIs, you can use either Postman or Swagger UI.
- For testing with Swagger UI, navigate to http://localhost:3000/api



## API Testing

- To test the APIs, you can use either Postman or Swagger UI.
- For testing with Swagger UI, navigate to http://localhost:3000/api


## How to test APIs

**To test APIs without opening MongoDB, follow these steps:**

- Log in with the following email and password:

```bash
  Email: temp@gmail.com
  Password: hello@123
```
- After logging in, use the generated JWT token to authorize your requests. You can find the authorization section at the top of the Swagger UI. Paste the token there to unlock the restricted APIs.

- To check the balance, use the provided user ID: 661428d525fcf99126264b22.

- Similarly, for top-up functionality, use the same user ID: 661428d525fcf99126264b22.

**If you have MongoDB:**

- First Sign using your credentials.

- Now log in , and use the generated token to authorize your requests in Swagger UI.

- Once authorized, you can test the restricted APIs.

- To check the balance, retrieve your user ID from MongoDB.

- For the top-up feature, also retrieve the user ID from MongoDB.