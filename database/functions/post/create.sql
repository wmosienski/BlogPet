CREATE OR REPLACE FUNCTION CREATE_POST(
    blog_id INT,
    title CHAR(50),
    text TEXT
) RETURNS INT
LANGUAGE plpgsql    
AS $$
DECLARE res INT;
BEGIN
    INSERT INTO POST(BLOG_ID, TITLE, TEXT)
    VALUES(blog_id, title, text)
    RETURNING ID INTO res;
    RETURN res;
END;$$;