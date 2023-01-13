DROP TABLE IF EXISTS POST CASCADE;

CREATE TABLE POST(
   ID      SERIAL PRIMARY KEY,
   BLOG_ID INT REFERENCES BLOG (ID) NOT NULL,
   TITLE   CHAR(50)                 NOT NULL,
   TEXT    TEXT                     NOT NULL
);