CREATE OR REPLACE FUNCTION READ_AUTHOR(
    author_id INT
) RETURNS SETOF AUTHOR
LANGUAGE plpgsql    
AS $$
BEGIN
    RETURN QUERY
        SELECT * FROM AUTHOR
        WHERE ID = author_id;
END;$$;