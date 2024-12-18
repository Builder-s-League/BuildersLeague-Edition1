-- Inserting sample data into Users table
INSERT INTO Users (name, email, contact_info, password, admin_id, created_at, updated_at, isActive, role)
VALUES 
  ('Admin User', 'admin@example.com', '123-456-7890', 'securepassword', NULL, NOW(), NOW(), TRUE, 0),
  ('Org User', 'org@example.com', '234-567-8901', 'securepassword', 1, NOW(), NOW(), TRUE, 1),
  ('Employee User', 'employee@example.com', '345-678-9012', 'securepassword', 1, NOW(), NOW(), TRUE, 2);

-- Inserting sample data into Notes table
INSERT INTO Notes (textrange, note_content, topic_id, employee_id, is_public, is_approved_cbh, is_approved_emp, created_at, updated_at)
VALUES 
  (ARRAY[0, 5], 'This is a public note', 1, 3, TRUE, TRUE, TRUE, NOW(), NOW()),
  (ARRAY[6, 15], 'This is a private note', 1, 3, FALSE, FALSE, FALSE, NOW(), NOW());

-- Inserting sample data into TopicProgress table
INSERT INTO TopicProgress (topic_id, employee_id, content_id, created_at, updated_at)
VALUES 
  (1, 3, 1, NOW(), NOW()),
  (2, 3, 2, NOW(), NOW());

-- Inserting sample data into Feedbacks table
INSERT INTO Feedbacks (content, employee_id, created_at, updated_at)
VALUES 
  ('Great progress!', 3, NOW(), NOW()),
  ('Needs improvement on the latest topic.', 3, NOW(), NOW());

-- Inserting sample data into Schedules table
-- INSERT INTO Schedules (topic_id, organization_id, cbh_admin_id, schedule_at, created_at, updated_at)
-- VALUES 
--   (1, 2, 1, '2024-10-10 10:00:00', NOW(), NOW()),
--   (2, 2, 1, '2024-10-12 14:00:00', NOW(), NOW());

-- Inserting sample data into CBH_banned_words table
INSERT INTO CBH_banned_words (banned_word, cbh_admin_id, created_at, updated_at)
VALUES 
  ('inappropriate_word_1', 1, NOW(), NOW()),
  ('inappropriate_word_2', 1, NOW(), NOW());

-- Inserting sample data into Organization_Banned_Words table
INSERT INTO Organization_Banned_Words (banned_word, organization_id, created_at, updated_at)
VALUES 
  ('organization_word_1', 2, NOW(), NOW()),
  ('organization_word_2', 2, NOW(), NOW());

-- Inserting sample data into Survey table
INSERT INTO Survey (link, organization_id, created_at, updated_at)
VALUES 
  ('https://example.com/survey1', 2, NOW(), NOW()),
  ('https://example.com/survey2', 2, NOW(), NOW());
