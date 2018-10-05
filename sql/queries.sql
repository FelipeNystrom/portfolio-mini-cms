CREATE TABLE IF NOT EXISTS owner (
    id boolean PRIMARY KEY DEFAULT TRUE,
    owner int,
    FOREIGN KEY (owner) REFERENCES users(id),
    CONSTRAINT only_one_owner CHECK (owner.id)
    );

INSERT INTO owner (id) VALUES 25;