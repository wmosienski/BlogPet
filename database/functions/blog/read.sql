CREATE OR REPLACE FUNCTION READ_BLOG(
    blog_id INT
) RETURNS SETOF BLOG
LANGUAGE plpgsql    
AS $$
BEGIN
    RETURN QUERY
        SELECT * FROM BLOG
        WHERE ID = blog_id;
END;$$;