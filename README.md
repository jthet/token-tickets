# Ticket Tokens

An event ticketing market place powered by the transpacency and efficiency of Hedera's hashgraph network. 

How to use:

## Step 1: Env vars
In root (`token-ticket/`)
Create the required environment variables:
```
>> touch .env
```

then add these values:
* notes:
    * The generate sourcemap flag is optional. 
    * The project ID here is given by hashconnect [here](https://github.com/Hashpack/hashconnect/blob/main/example/react-dapp/src/services/hashconnect.ts). If this doesn't work, you'll have to create your own project ID [here](https://cloud.reown.com/sign-in). You can also follow this [quick start tutorial](https://www.npmjs.com/package/hashconnect#project-id) to get a better idea of the development process.
    * The backend config should be local host or 127.0.0.1 if you run locally, and the port can be any open port as logn as the front end and backend ports are the same (see backend .env file). The API key can also be whatever you want as long as it matches backend/.env.

```sh
# # Example .env file (you can just copy this over with no changes)
# npm options, speeds up build
GENERATE_SOURCEMAP=false

# React env variables
REACT_APP_HASHCONNECT_PROJECT_ID=bfa190dbe93fcf30377b932b31129d05

# Database
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_API_KEY=example
```

Next configure the backend/.env:
* If you want to use the backend, you need a mongodb URI that points to your DB. If you don't have this, then the website will still work but you won't be able see features like seeing the other events that organizers have posted on this application. You will still be able to act as a use and create and mint tokens. 
```
>> touch backend/.env
```

```sh
MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@<Rest of your URI>

REACT_APP_BACKEND_URL=http://localhost # must be same as root .env
PORT=5000 # must be same as root .env

API_KEY=example # must be same as root .env
```

## Step 2:
### Install necessary packages:

In `token-tickets/backend`:
```
>> npm install
```
In `token-tickets`:
```
>> npm install
```
## Step 3:
### Run the application:
In `token-tickets/backend`:
```
>> node server.js
```
In `token-tickets`:
```
>> npm start
```

