# App

Gympass style app

## RFs (Requisitos funcionais)

- [ ] Should be able register users;
- [ ] Should be able authenticate users;
- [ ] Should be able get the profile of a logged in user;
- [ ] Should be able get the numbers of check-ins performed by the logged in user;
- [ ] Should be able the user gets their check-ins history;
- [ ] Should be able the user searches nearby gyms;
- [ ] Should be able the user searches gyms by name;
- [ ] Should be able the user performs check-in in a gym; 
- [ ] Should be able validate the user's check-in;
- [ ] Should be able register a gym.

## RNs (Regras de negócio)

- [ ] The user should not be able to register with a duplicate e-mail;
- [ ] The user should not be able to perform 2 check-ins on the same day;
- [ ] The user should not be able to perfomr check-in if they are not near to gym;
- [ ] The check-in can only be validated up to 20 minutes after it is created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## RNFs (Requisitos não-funcionais)

- [ ] The user's password must be encrypted;
- [ ] The application data must be persisted in a PostgreSQL database;
- [ ] The all data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (Json Web Token)