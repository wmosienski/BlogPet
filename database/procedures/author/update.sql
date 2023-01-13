CREATE OR REPLACE PROCEDURE UPDATE_AUTHOR(
    _id INT,
    _firstname CHAR(50),
    _lastname CHAR(50)
)
LANGUAGE plpgsql    
AS $$
BEGIN
    UPDATE AUTHOR SET
        FIRSTNAME = _firstname, 
        LASTNAME = _lastname
    WHERE ID = _id;
END;$$;