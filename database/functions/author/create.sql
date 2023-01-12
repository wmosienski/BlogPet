CREATE OR REPLACE FUNCTION CREATE_AUTHOR(
    country_id INT,
    firstname CHAR(50),
    lastname CHAR(50)
) RETURNS INT
LANGUAGE plpgsql    
AS $$
DECLARE res INT;
BEGIN
    INSERT INTO AUTHOR(COUNTRY_ID, FIRSTNAME, LASTNAME)
    VALUES(country_id, firstname, lastname)
    RETURNING ID INTO res;
    RETURN res;
END;$$;