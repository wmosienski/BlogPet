CREATE OR REPLACE FUNCTION CREATE_AUTHOR(
    user_id INT,
    country_id INT,
    firstname CHAR(50),
    lastname CHAR(50)
) RETURNS INT
LANGUAGE plpgsql    
AS $$
DECLARE res INT;
BEGIN
    INSERT INTO AUTHOR(AUTH_USER_ID, COUNTRY_ID, FIRSTNAME, LASTNAME)
    VALUES(user_id, country_id, firstname, lastname)
    RETURNING ID INTO res;
    RETURN res;
END;$$;