-- CREATE TABLE IF NOT EXISTS owner (
--     id boolean PRIMARY KEY DEFAULT TRUE,
--     owner int,
--     FOREIGN KEY (owner) REFERENCES users(id),
--     CONSTRAINT only_one_owner CHECK (owner.id)
--     );

-- INSERT INTO owner (id) VALUES 25;

-- DELIMITER $$
-- CREATE TRIGGER watch_users 
--     AFTER INSERT,UPDATE,DELETE 
--     ON users FOR EACH STATEMENT
--     BEGIN
--         SELECT * FROM users;
--     END;

-- $$
-- DELIMITER ;

-- $$


CREATE OR REPLACE FUNCTION notify_trigger_projects() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('projects', 'table projects changed');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



DROP TRIGGER IF EXISTS watch_projects ON projects CASCADE;

CREATE TRIGGER watch_projects AFTER INSERT OR UPDATE OR DELETE
    ON projects FOR EACH STATEMENT
    EXECUTE PROCEDURE notify_trigger_projects();


CREATE OR REPLACE FUNCTION notify_trigger_users() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('users', 'table users changed');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS watch_users ON users CASCADE;

CREATE TRIGGER watch_users AFTER INSERT OR UPDATE OR DELETE
    ON users FOR EACH STATEMENT
    EXECUTE PROCEDURE notify_trigger_users();
