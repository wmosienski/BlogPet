CREATE OR REPLACE FUNCTION READ_POST(
    post_id INT
) RETURNS SETOF POST
LANGUAGE plpgsql    
AS $$
BEGIN
    RETURN QUERY
        SELECT * FROM POST
        WHERE ID = post_id;
END;$$;