# App

Gympass style app, a simple API REST using the concepts of SOLID e Design Patterns in a Node.JS environment

### Tools used
  - Prisma
  - Fastify
  - Vitest
  - Docker
  - PostgreSQL

## FRs (Functional Requirements)

- [X] Should be able register users;
- [X] Should be able authenticate users;
- [X] Should be able get the profile of a logged in user;
- [X] Should be able get the numbers of check-ins performed by the logged in user;
- [X] Should be able the user gets their check-ins history;
- [X] Should be able the user searches nearby gyms (up to 10 kilometers);
- [X] Should be able the user searches gyms by name;
- [X] Should be able the user performs check-in in a gym; 
- [X] Should be able validate the user's check-in;
- [X] Should be able register a gym.

## BRs (Business Rules)

- [X] The user should not be able to register with a duplicate e-mail;
- [X] The user should not be able to perform 2 check-ins on the same day;
- [X] The user should not be able to perfomr check-in if they are not near to gym;
- [X] The check-in can only be validated up to 20 minutes after it is created;
- [X] The check-in can only be validated by administrators;
- [X] The gym can only be registered by administrators;

## RNFs (Non-functional Requirements)

- [X] The user's password must be encrypted;
- [X] The application data must be persisted in a PostgreSQL database;
- [X] The all data lists must be paginated with 20 items per page;
- [X] The user must be identified by a JWT (Json Web Token)
