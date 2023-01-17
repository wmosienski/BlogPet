CREATE OR REPLACE PROCEDURE DELETE_BY_USER_ID_TOKEN(
    _user_id INT
)
LANGUAGE plpgsql    
AS $$
BEGIN
    DELETE FROM TOKEN
    WHERE AUTH_USER_ID = _user_id;
END;$$;