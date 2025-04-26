-- SQL queries for tasks
SELECT * FROM students;
SELECT * FROM courses;
SELECT * FROM enrollments;

-- List all students with their average grade across all courses
SELECT s.name, AVG(e.grade) AS average_grade
FROM students s
JOIN enrollments e ON s.id = e.student_id
GROUP BY s.name;

-- List students enrolled in the course 'SQL Basics'
SELECT s.name
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE c.title = 'SQL Basics';

-- Top-1 student with the highest average grade
SELECT s.name, AVG(e.grade) AS average_grade
FROM students s
JOIN enrollments e ON s.id = e.student_id
GROUP BY s.name
ORDER BY average_grade DESC
LIMIT 1;

-- Count the number of students in each course
SELECT c.title, COUNT(e.student_id) AS student_count
FROM courses c
JOIN enrollments e ON c.id = e.course_id
GROUP BY c.title;

-- List course titles where the average grade is greater than 85
SELECT c.title
FROM courses c
JOIN enrollments e ON c.id = e.course_id
GROUP BY c.title
HAVING AVG(e.grade) > 85;