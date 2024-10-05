CREATE TABLE CBH_Admins (
  id SERIAL PRIMARY KEY,
  password VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE Organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  contact_info VARCHAR(255),
  hr_name VARCHAR(255) UNIQUE,
  hr_email VARCHAR(255),
  password VARCHAR(255),
  isActive BOOLEAN,
  cbh_admin_id INT REFERENCES CBH_Admins(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE Employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  organization_id INT REFERENCES Organizations(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE Notes (
  id SERIAL PRIMARY KEY,
  topic_id INT,
  employee_id INT REFERENCES Employees(id),
  is_public BOOLEAN,
  is_approval_cbh BOOLEAN,
  is_approva_emp BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE EmployeeTopicProgress (
  topic_id INT,
  employee_id INT REFERENCES Employees(id),
  content_id INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE Feedbacks (
  id SERIAL PRIMARY KEY,
  content TEXT,
  employee_id INT REFERENCES Employees(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE Schedules (
  id SERIAL PRIMARY KEY,
  topic_id INT,
  organization_id INT REFERENCES Organizations(id),
  cbh_admin_id INT REFERENCES CBH_Admins(id),
  schedule_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE CBH_banned_words (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  cbh_admin_id INT REFERENCES CBH_Admins(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE Organization_Banned_Words (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  organization_id INT REFERENCES Organizations(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE Survey (
  id SERIAL PRIMARY KEY,
  link VARCHAR(255),
  organization_id INT REFERENCES Organizations(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
