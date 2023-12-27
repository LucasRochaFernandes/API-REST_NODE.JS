# App

Gympass style app

## RFs (Requisitos funcionais)

- [X] Should be able register users;
- [X] Should be able authenticate users;
- [X] Should be able get the profile of a logged in user;
- [X] Should be able get the numbers of check-ins performed by the logged in user;
- [X] Should be able the user gets their check-ins history;
- [X] Should be able the user searches nearby gyms (up to 10 kilometers);
- [X] Should be able the user searches gyms by name;
- [X] Should be able the user performs check-in in a gym; 
- [ ] Should be able validate the user's check-in;
- [X] Should be able register a gym.

## RNs (Regras de negócio)

- [X] The user should not be able to register with a duplicate e-mail;
- [X] The user should not be able to perform 2 check-ins on the same day;
- [X] The user should not be able to perfomr check-in if they are not near to gym;
- [ ] The check-in can only be validated up to 20 minutes after it is created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## RNFs (Requisitos não-funcionais)

- [X] The user's password must be encrypted;
- [X] The application data must be persisted in a PostgreSQL database;
- [X] The all data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (Json Web Token)