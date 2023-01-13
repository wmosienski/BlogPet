CREATE OR REPLACE PROCEDURE UPDATE_COUNTRY(
    _id INT,
    _name CHAR(50),
    _code CHAR(50)
)
LANGUAGE plpgsql    
AS $$
BEGIN
    UPDATE COUNTRY SET
        NAME = _name,
        CODE = _code
    WHERE ID = _id;
END;$$;