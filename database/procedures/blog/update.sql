CREATE OR REPLACE PROCEDURE UPDATE_BLOG(
    _id INT,
    _title CHAR(50),
    _description TEXT
)
LANGUAGE plpgsql    
AS $$
BEGIN
    UPDATE BLOG SET
        TITLE = _title,
        DESCRIPTION = _description
    WHERE ID = _id;
END;$$;