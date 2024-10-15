-- CREATE TABLE Users (
--   id SERIAL PRIMARY KEY,
--   password VARCHAR(255),
--   email VARCHAR(255) UNIQUE,
--   created_at TIMESTAMP,
--   updated_at TIMESTAMP
-- );

-- CREATE TABLE Users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255),
--   address VARCHAR(255),
--   contact_info VARCHAR(255),
--   hr_name VARCHAR(255) UNIQUE,
--   hr_email VARCHAR(255),
--   password VARCHAR(255),
--   isActive BOOLEAN,
--   cbh_admin_id INT REFERENCES Users(id),
--   created_at TIMESTAMP,
--   updated_at TIMESTAMP
-- );

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    contact_info VARCHAR(255),
    password VARCHAR(255),
    admin_id INT REFERENCES Users (id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    isActive BOOLEAN,
    role INT -- 0 -> admin, 1 -> org , 2 -> user
);

CREATE TABLE Notes (
    id SERIAL PRIMARY KEY,
    textrange INT ARRAY,
    note_content TEXT,
    topic_id INT,
    employee_id INT REFERENCES Users (id),
    is_public BOOLEAN,
    is_approved_cbh BOOLEAN,
    is_approved_emp BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE TopicProgress (
    topic_id INT,
    employee_id INT REFERENCES Users (id),
    content_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Feedbacks (
    id SERIAL PRIMARY KEY,
    content TEXT,
    employee_id INT REFERENCES Users (id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Schedules (
  id SERIAL PRIMARY KEY,
  topic_id VARCHAR(255),
  -- organization_id INT REFERENCES Users(id),
  cbh_admin_id INT REFERENCES Users(id),
  schedule_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE Schedule_Organizations (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES Schedules(id) ON DELETE CASCADE,
  organization_id INT REFERENCES Users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE CBH_banned_words (
    id SERIAL PRIMARY KEY,
    banned_word VARCHAR(255),
    cbh_admin_id INT REFERENCES Users (id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Organization_Banned_Words (
    id SERIAL PRIMARY KEY,
    banned_word VARCHAR(255),
    organization_id INT REFERENCES Users (id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Survey (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255),
    organization_id INT REFERENCES Users (id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    status BOOLEAN
);