CREATE OR REPLACE FUNCTION READ_AUTH_USER(
    user_id INT
) RETURNS SETOF AUTH_USER
LANGUAGE plpgsql    
AS $$
BEGIN
    RETURN QUERY
        SELECT * FROM AUTH_USER
        WHERE ID = user_id;
END;$$;