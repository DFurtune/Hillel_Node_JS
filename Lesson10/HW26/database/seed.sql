-- SQL script to seed tables with test data
INSERT INTO students (name) VALUES ('John Doe'), ('Jane Smith');
INSERT INTO courses (title) VALUES ('Math 101'), ('History 201');
INSERT INTO enrollments (student_id, course_id) VALUES (1, 1), (2, 2);

-- Adding 3 students
INSERT INTO students (name) VALUES ('Alice Johnson'), ('Bob Brown'), ('Charlie Davis');

-- Adding 3 courses
INSERT INTO courses (title) VALUES ('SQL Basics'), ('JavaScript Fundamentals'), ('Data Structures');

-- Adding enrollments
INSERT INTO enrollments (student_id, course_id, grade) VALUES 
(1, 1, 90), 
(1, 2, 85), 
(2, 1, 88), 
(2, 3, 92), 
(3, 2, 78), 
(3, 3, 95);