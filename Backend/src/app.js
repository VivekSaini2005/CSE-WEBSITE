const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const healthRoutes = require('./routes/healthRoute');
const achievementRoutes = require('./routes/achievementRoute');
const facultyRoutes = require('./routes/faculty.routes');
const alumniRoutes = require('./routes/alumni.routes');
const eventRoutes = require('./routes/event.routes');
const semesterRoutes = require('./routes/semester.routes');
const subjectRoutes = require('./routes/subject.routes');
const resourceRoutes = require('./routes/resource.routes');
const newsRoutes = require('./routes/news.routes');
const guideRoutes = require('./routes/guide.routes');
const projectRoutes = require('./routes/project.routes');
const publicationRoutes = require('./routes/publication.routes');
const researchAreaRoutes = require('./routes/researchArea.routes');
const syllabusRoutes = require('./routes/syllabus.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(cors({
	origin: allowedOrigin,
	credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/project-guides', guideRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/research-areas', researchAreaRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/testimonials', testimonialRoutes);
// Auth routes
app.use('/api/auth', authRoutes);

// 404 & Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
