CREATE OR REPLACE PROCEDURE UPDATE_POST(
    _id INT,
    _title CHAR(50),
    _text TEXT
)
LANGUAGE plpgsql    
AS $$
BEGIN
    UPDATE POST SET
        TITLE = _title,
        TEXT = _text
    WHERE ID = _id;
END;$$;