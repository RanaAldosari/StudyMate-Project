CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  image VARCHAR(500) NOT NULL,
  duration INTEGER NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  instructor VARCHAR(255),
  enrollment_count INTEGER DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample course data inserts for StudyMate platform
-- 20 courses across 4 categories: Programming, Design, Data Science, Business

INSERT INTO courses (name, description, price, image, duration, difficulty, category, instructor, enrollment_count, rating) VALUES
('Python for Beginners', 'Learn Python programming from scratch. Cover fundamentals including variables, loops, functions, and basic data structures. Perfect for those new to programming.', 49.99, 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400', 20, 'Beginner', 'Programming', 'Dr. Sarah Johnson', 1250, 4.7),

('Advanced React Patterns', 'Master advanced React concepts including hooks, context, performance optimization, and modern design patterns. Build scalable applications with confidence.', 89.99, 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', 35, 'Advanced', 'Programming', 'Michael Chen', 890, 4.8),

('UI/UX Design Fundamentals', 'Comprehensive introduction to user interface and experience design. Learn design principles, wireframing, prototyping, and user research methodologies.', 69.99, 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400', 25, 'Beginner', 'Design', 'Emma Rodriguez', 2100, 4.6),

('Data Science with Python', 'Explore data analysis, visualization, and machine learning using Python. Work with pandas, numpy, matplotlib, and scikit-learn on real-world datasets.', 99.99, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', 45, 'Intermediate', 'Data Science', 'Prof. James Wilson', 1580, 4.9),

('Digital Marketing Mastery', 'Complete guide to digital marketing including SEO, social media marketing, content strategy, email marketing, and analytics. Grow your online presence.', 79.99, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', 30, 'Beginner', 'Business', 'Lisa Anderson', 3200, 4.5),

('JavaScript Deep Dive', 'Go beyond basics to understand JavaScript at a fundamental level. Explore closures, prototypes, async programming, and modern ES6+ features.', 74.99, 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', 28, 'Intermediate', 'Programming', 'Alex Thompson', 1670, 4.7),

('Figma for Product Design', 'Master Figma from basics to advanced techniques. Create professional designs, build component systems, prototype interactions, and collaborate effectively.', 59.99, 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400', 22, 'Intermediate', 'Design', 'Sophie Turner', 1940, 4.8),

('SQL Database Design', 'Learn relational database design, normalization, complex queries, performance optimization, and best practices for building efficient database systems.', 64.99, 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400', 26, 'Intermediate', 'Programming', 'Dr. Robert Martinez', 1120, 4.6),

('Machine Learning A-Z', 'Comprehensive machine learning course covering supervised and unsupervised learning, neural networks, natural language processing, and computer vision.', 129.99, 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400', 60, 'Advanced', 'Data Science', 'Dr. Amanda Foster', 2300, 4.9),

('Business Strategy & Planning', 'Develop strategic thinking skills. Learn market analysis, competitive strategy, business model innovation, and strategic planning frameworks.', 84.99, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', 32, 'Intermediate', 'Business', 'John Davidson', 1450, 4.4),

('CSS Grid & Flexbox', 'Master modern CSS layout techniques. Build responsive layouts with Grid and Flexbox. Learn best practices for maintainable stylesheets.', 44.99, 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400', 15, 'Beginner', 'Programming', 'Maria Garcia', 2800, 4.7),

('Motion Graphics in After Effects', 'Create stunning animations and motion graphics. Learn keyframing, expressions, effects, and professional workflow for video production.', 94.99, 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400', 38, 'Intermediate', 'Design', 'Chris Williams', 1230, 4.6),

('Data Visualization with D3.js', 'Create interactive, dynamic data visualizations for the web. Master D3.js fundamentals, SVG manipulation, and advanced charting techniques.', 79.99, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', 30, 'Advanced', 'Data Science', 'Dr. Nina Patel', 890, 4.8),

('Entrepreneurship Essentials', 'Start your business journey. Learn ideation, validation, business planning, fundraising, and launch strategies from successful entrepreneurs.', 69.99, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400', 28, 'Beginner', 'Business', 'Mark Stevens', 2650, 4.5),

('Node.js Backend Development', 'Build scalable backend applications with Node.js. Cover Express, databases, authentication, RESTful APIs, and deployment strategies.', 89.99, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', 40, 'Intermediate', 'Programming', 'David Kim', 1890, 4.8),

('Graphic Design Principles', 'Foundations of visual communication. Learn typography, color theory, composition, branding, and create professional designs from concept to completion.', 64.99, 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400', 24, 'Beginner', 'Design', 'Rachel Green', 3100, 4.6),

('Deep Learning with TensorFlow', 'Advanced neural networks with TensorFlow. Build CNNs, RNNs, GANs, and transformers. Deploy production-ready deep learning models.', 139.99, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', 55, 'Advanced', 'Data Science', 'Prof. Li Wei', 1340, 4.9),

('Financial Analysis for Managers', 'Essential financial skills for decision-makers. Understand financial statements, budgeting, forecasting, and investment analysis.', 94.99, 'https://images.unsplash.com/photo-1554224311-beee4ece6c1f?w=400', 35, 'Intermediate', 'Business', 'Jennifer Walsh', 1760, 4.7),

('TypeScript Masterclass', 'Complete TypeScript guide from basics to advanced types. Build type-safe applications with confidence and leverage TypeScript full power.', 69.99, 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400', 26, 'Intermediate', 'Programming', 'Thomas Anderson', 2150, 4.8),

('3D Design with Blender', 'Create stunning 3D models and animations. Learn modeling, texturing, lighting, and rendering. Perfect for beginners and intermediate users.', 84.99, 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400', 42, 'Beginner', 'Design', 'Marcus Johnson', 1420, 4.5);

SELECT 
    category, 
    COUNT(*) as course_count,
    ROUND(AVG(rating)::numeric, 2) as avg_rating,
    ROUND(AVG(price)::numeric, 2) as avg_price
FROM courses 
GROUP BY category 
ORDER BY course_count DESC;

SELECT category, COUNT(*) as course_count, 
       ROUND(AVG(rating)::numeric, 2) as avg_rating
FROM courses 
GROUP BY category 
ORDER BY course_count DESC;