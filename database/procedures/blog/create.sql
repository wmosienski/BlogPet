CREATE OR REPLACE PROCEDURE CREATE_BLOG(
    author_id INT,
    title CHAR(50),
    description TEXT
)
LANGUAGE plpgsql    
AS $$
BEGIN
    INSERT INTO BLOG(AUTHOR_ID, TITLE, DESCRIPTION)
    VALUES(author_id, title, description);
    COMMIT;
END;$$;