CREATE OR REPLACE PROCEDURE CREATE_POST(
    blog_id INT,
    title CHAR(50),
    text TEXT
)
LANGUAGE plpgsql    
AS $$
BEGIN
    INSERT INTO POST(BLOG_ID, TITLE, TEXT)
    VALUES(blog_id, title, text);
    commit;
END;$$;