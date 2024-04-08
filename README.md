
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

## Bonous Features

- Authentication and authorization
- Rate limiting to the APIs


## API Testing

- To test the APIs, you can use either Postman or Swagger UI.
- For testing with Swagger UI, navigate to http://localhost:3000/api


## How to test APIs

To test the APIs:

- First, sign up for an account.
- Then, log in and use the token generated to authorize your requests. You can pass the token to the authorization section at the top of Swagger UI.
- After authorization, you can test the restricted APIs.