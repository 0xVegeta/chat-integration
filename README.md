# chat-integration
A Chat Integration system with both frontend and backend, with features such as storing user chats as well as allowing integration of multiple hosts. 

## Technology Stack
- *Server Enviornment* - NodeJS
- *Framework* - ExpressJS, Socket.io
- *Database* - MongoDB
- *Cloud database service* - MongoDB Atlas
- *Authorizatiion* - JWT

## ⬇️ Installation


- Clone this repo.

```
git clone https://github.com/0xVegeta/chat-integration.git
```

- Then execute the following command on your terminal in the project directory:


```
npm install
npm start (or npm run dev)
```

```
# Make a .env file and include the Database details
MONGO_URI=YOUR_MONGO_URI
```

- Now to install frontend at port 3000


```
cd client
npm install
npm run dev (open localhost:3000)

```






## Server API Reference

`/chats`

| REQUEST METHODS | ENDPOINTS | DESCRIPTION |
| :-------------- | :-------: | ------------------: |
| POST | /create |  Create a chat message |
| POST | /room| Create a chat room (can only be done by end user)|
| GET | /room/:id | Fetch information about the chats including all it's messages |

`/hosts`

| REQUEST METHODS | ENDPOINTS | DESCRIPTION |
| :-------------- | :-------: | ------------------: |
| POST | / |  Create a new host |
| POST | /:id| Fetch all the information about the host |
| GET | /login | Login as a particular host |

`/users`

| REQUEST METHODS | ENDPOINTS | DESCRIPTION |
| :-------------- | :-------: | ------------------: |
| POST | /log | Create a user if not created (if user exists send all related info) |

## Client Route Endpoint Reference

`/signup`
- Lets hosts create their account
  
`/login`
- Lets hosts log in
  
`/host`
- UI displaying the chat interface and chat history of hosts
  
`/embed-chat`
- an example of the widget placed inside a webpage
  
`/admin`
- displays all the hosts present in the system

## Ports

 Default client port: 3000
 
 Default server port: 5000


