create a .env file based on the .example_env file included

after installing connect-pgsimple, run `psql mydatabase < node_modules/connect-pg-simple/table.sql`

create a users table as below
```
CREATE TABLE users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   hash VARCHAR ( 255 ),
   salt VARCHAR ( 255 ),
   admin boolean
);
```