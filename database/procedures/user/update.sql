CREATE OR REPLACE PROCEDURE UPDATE_AUTH_USER(
    _id INT,
    _email CHAR(50),
    _password TEXT
)
LANGUAGE plpgsql    
AS $$
BEGIN
    UPDATE AUTH_USER SET
        EMAIL = _email, 
        PASSWORD = _password
    WHERE ID = _id;
END;$$;