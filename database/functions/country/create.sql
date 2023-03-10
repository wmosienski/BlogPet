CREATE OR REPLACE FUNCTION CREATE_COUNTRY(
    name CHAR(50),
    code CHAR(50)
) RETURNS INT
LANGUAGE plpgsql    
AS $$
DECLARE res INT;
BEGIN
    INSERT INTO COUNTRY(NAME, CODE)
    VALUES(name, code)
    RETURNING ID INTO res;
    RETURN res;
END;$$;