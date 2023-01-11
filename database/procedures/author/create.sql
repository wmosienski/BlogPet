CREATE OR REPLACE PROCEDURE CREATE_AUTHOR(
    country_id INT,
    firstname CHAR(50),
    lastname CHAR(50)
)
LANGUAGE plpgsql    
AS $$
BEGIN
    INSERT INTO AUTHOR(COUNTRY_ID, FIRSTNAME, LASTNAME)
    VALUES(country_id, firstname, lastname);
    COMMIT;
END;$$;