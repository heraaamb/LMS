INSERT INTO categories (id, name, code, description) VALUES
('CAT001', 'Computer Science', 'CS', 'Computer Science and Information Technology books'),
('CAT002', 'Artificial Intelligence', 'AI', 'AI, Machine Learning and Data Science'),
('CAT003', 'Programming', 'PRG', 'Programming languages and software development'),
('CAT004', 'Database Systems', 'DB', 'Database design and management'),
('CAT005', 'Networking', 'NET', 'Computer Networks and Communication'),
('CAT006', 'Cyber Security', 'SEC', 'Information Security and Ethical Hacking'),
('CAT007', 'Software Engineering', 'SE', 'Software Development and Engineering'),
('CAT008', 'Mathematics', 'MATH', 'Engineering Mathematics'),
('CAT009', 'Electronics', 'ECE', 'Electronics and Digital Systems'),
('CAT010', 'General', 'GEN', 'General Knowledge and Others');

INSERT INTO authors (id, name, nationality) VALUES
('AUT001', 'Thomas H. Cormen', 'American'),
('AUT002', 'Andrew S. Tanenbaum', 'Dutch'),
('AUT003', 'Herbert Schildt', 'American'),
('AUT004', 'Robert C. Martin', 'American'),
('AUT005', 'Ian Goodfellow', 'American'),
('AUT006', 'Silberschatz', 'American'),
('AUT007', 'Bjarne Stroustrup', 'Danish'),
('AUT008', 'Eric Matthes', 'American'),
('AUT009', 'Kurose', 'American'),
('AUT010', 'Charles Petzold', 'American');

INSERT INTO publishers (id, name, location, website) VALUES
('PUB001', 'Pearson', 'India', 'https://www.pearson.com'),
('PUB002', 'McGraw Hill', 'USA', 'https://www.mheducation.com'),
('PUB003', 'O''Reilly Media', 'USA', 'https://www.oreilly.com'),
('PUB004', 'Packt Publishing', 'UK', 'https://www.packtpub.com'),
('PUB005', 'MIT Press', 'USA', 'https://mitpress.mit.edu');

INSERT INTO books (
    id,
    isbn,
    title,
    author_id,
    publisher_id,
    category_id,
    edition,
    publish_year,
    total_copies,
    available_copies,
    borrowed_copies,
    reserved_copies,
    rack_number,
    shelf_number,
    description,
    rating,
    tags,
    pages,
    language
) VALUES
('BK001','9780262033848','Introduction to Algorithms','AUT001','PUB001','CAT001','4th',2022,10,7,3,0,'A1','S1','Comprehensive algorithms textbook',4.9,ARRAY['Algorithms','DSA'],1312,'English'),

('BK002','9780132126953','Computer Networks','AUT002','PUB001','CAT005','5th',2019,8,5,3,0,'A1','S2','Networking fundamentals',4.8,ARRAY['Networking','TCP/IP'],960,'English'),

('BK003','9781260463415','Java: The Complete Reference','AUT003','PUB002','CAT003','12th',2021,12,9,3,0,'A2','S1','Complete Java programming guide',4.7,ARRAY['Java','Programming'],1248,'English'),

('BK004','9780132350884','Clean Code','AUT004','PUB001','CAT007','1st',2008,6,4,2,0,'A2','S2','Best practices for writing clean code',4.9,ARRAY['Software Engineering','Coding'],464,'English'),

('BK005','9780262035613','Deep Learning','AUT005','PUB005','CAT002','1st',2018,5,3,2,0,'A3','S1','Deep learning concepts and applications',4.8,ARRAY['AI','Deep Learning'],800,'English'),

('BK006','9780078022159','Database System Concepts','AUT006','PUB002','CAT004','7th',2020,10,8,2,0,'A3','S2','Fundamentals of database systems',4.7,ARRAY['SQL','DBMS'],1376,'English'),

('BK007','9780321563842','The C++ Programming Language','AUT007','PUB001','CAT003','4th',2013,7,5,2,0,'A4','S1','Definitive guide to C++',4.8,ARRAY['C++','Programming'],1376,'English'),

('BK008','9781593279288','Python Crash Course','AUT008','PUB003','CAT003','3rd',2023,9,9,0,0,'A4','S2','Beginner-friendly Python programming',4.8,ARRAY['Python','Programming'],544,'English'),

('BK009','9780136681557','Computer Networking: A Top-Down Approach','AUT009','PUB001','CAT005','8th',2021,6,5,1,0,'A5','S1','Modern networking concepts',4.7,ARRAY['Networking','Internet'],864,'English'),

('BK010','9780735611313','Code: The Hidden Language of Computer Hardware and Software','AUT010','PUB003','CAT001','2nd',2022,4,4,0,0,'A5','S2','Understanding how computers work',4.9,ARRAY['Computer Science','Hardware'],448,'English');