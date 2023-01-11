DROP TABLE IF EXISTS AUTHOR CASCADE;

CREATE TABLE AUTHOR(
   ID         SERIAL PRIMARY KEY      NOT NULL,
   COUNTRY_ID INT REFERENCES COUNTRY (ID) NOT NULL,
   FIRSTNAME  CHAR(50)                    NOT NULL,
   LASTNAME   CHAR(50)                    NOT NULL
);