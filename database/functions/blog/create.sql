CREATE OR REPLACE FUNCTION CREATE_BLOG(
    author_id INT,
    title CHAR(50),
    description TEXT
) RETURNS INT
LANGUAGE plpgsql    
AS $$
DECLARE res INT;
BEGIN
    INSERT INTO BLOG(AUTHOR_ID, TITLE, DESCRIPTION)
    VALUES(author_id, title, description)
    RETURNING ID INTO res;
    RETURN res;
END;$$;