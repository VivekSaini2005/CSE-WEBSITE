const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Models
const Achievement = require('../src/models/achievementModel');
const Alumni = require('../src/models/alumni.model');
const Event = require('../src/models/event.model');
const Faculty = require('../src/models/faculty.model');
const Guide = require('../src/models/guide.model');
const Material = require('../src/models/material.model');
const News = require('../src/models/news.model');
const Publication = require('../src/models/publication.model');
const ResearchArea = require('../src/models/researchArea.model');
const Syllabus = require('../src/models/syllabus.model');
const Testimonial = require('../src/models/testimonial.model');

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected successfully.');

    // 1. Clear existing data
    console.log('Clearing old data...');
    await Promise.all([
      Achievement.deleteMany(),
      Alumni.deleteMany(),
      Event.deleteMany(),
      Faculty.deleteMany(),
      Guide.deleteMany(),
      Material.deleteMany(),
      News.deleteMany(),
      Publication.deleteMany(),
      ResearchArea.deleteMany(),
      Syllabus.deleteMany(),
      Testimonial.deleteMany()
    ]);

    // 2. Achievements
    console.log('Seeding Achievements...');
    const achievements = [
      {
        title: "Gold Medal at National Hackathon 2026",
        category: "Students",
        date: new Date("2026-04-01"),
        description: "A team of senior year CSE students secured the 1st position among 500+ competing teams nationwide.",
        badge: "Hackathon"
      },
      {
        title: "IEEE Excellence in Research Award",
        category: "Faculty",
        date: new Date("2026-01-01"),
        description: "Awarded to Dr. Amit Sharma for outstanding foundational contributions to Artificial Intelligence.",
        badge: "Award"
      },
      {
        title: "Google Summer of Code Selectees",
        category: "Students",
        date: new Date("2025-05-01"),
        description: "15 undergraduate scholars selected globally for prestigious open-source software contributions.",
        badge: "Competition"
      },
      {
        title: "Best Paper Award at ICCV",
        category: "Faculty",
        date: new Date("2025-10-01"),
        description: "Dr. Neha Verma and her research group won the best paper for 'Advancements in Computer Vision'.",
        badge: "Research"
      }
    ];
    await Achievement.insertMany(achievements);

    // 3. Alumni
    console.log('Seeding Alumni...');
    const alumni = [
      { name: "Rohan Desai", position: "Senior ML Engineer", company: "Google", image: "/src/assets/images/student1.jpg" },
      { name: "Priya Sharma", position: "VP of Engineering", company: "Microsoft", image: "/src/assets/images/student2.jpg" },
      { name: "Karan Mehta", position: "Founder & CEO", company: "TechNova Solutions", image: "/src/assets/images/student1.jpg" },
      { name: "Sneha Patel", position: "Blockchain Architect", company: "Ethereum Foundation", image: "/src/assets/images/student2.jpg" }
    ];
    await Alumni.insertMany(alumni);

    // 4. Testimonials
    console.log('Seeding Testimonials...');
    const testimonials = [
      {
        name: "Rohan Desai",
        role: "Senior ML Engineer @ Google",
        quote: "The rigorous curriculum and hands-on research opportunities at the CSE department completely transformed my approach to problem-solving. The foundational knowledge I gained here is something I use every single day at scale."
      },
      {
        name: "Priya Sharma",
        role: "VP of Engineering @ Microsoft",
        quote: "Beyond the excellent academics, the collaborative environment and brilliant peer network fostered a sense of innovation. The faculty members were not just teachers, but true mentors who guided my career trajectory."
      }
    ];
    await Testimonial.insertMany(testimonials);

    // 5. Events
    console.log('Seeding Events...');
    const rawEvents = [
      { category: "Technical Events", title: "Code-A-Thon 2026", date: "2026-03-15", image: "/assets/events/hackathon_event_1775223813285.png", description: "A 24-hour departmental coding challenge for building innovative solutions for real-world academic problems." },
      { category: "Technical Events", title: "Expert Talk: Quantum Computing", date: "2026-04-05", image: "/assets/events/technical_seminar_event_1775223956817.png", description: "A technical seminar by industry veterans on the current state and future of quantum computing technologies." },
      { category: "Technical Events", title: "Robo-Races", date: "2026-05-10", image: "/assets/events/hackathon_event_1775223813285.png", description: "Autonomous robot racing competition featuring departmental hardware innovation and control systems." },
      { category: "Cultural Events", title: "Genesis 2026 (Annual Fest)", date: "2026-02-20", image: "/assets/events/cultural_fest_event_1775223837796.png", description: "The flagship annual cultural festival of the CSE department featuring music, dance, and creative arts." },
      { category: "Cultural Events", title: "Holi Milan", date: "2026-03-20", image: "/assets/events/cultural_fest_event_1775223837796.png", description: "A vibrant departmental celebration of the festival of colors with traditional music and snacks." },
      { category: "Workshops", title: "UI/UX Masterclass", date: "2026-04-12", image: "/assets/events/workshop_event_1775223898723.png", description: "Hands-on workshop focusing on user-centered design, prototyping with Figma, and modern UI principles." },
      { category: "Workshops", title: "Cloud Infrastructure Setup", date: "2026-05-15", image: "/assets/events/workshop_event_1775223898723.png", description: "A deep dive into AWS/Azure deployment architectures and modern DevOps practices for CSE students." },
      { category: "Hackathons", title: "Sustainability Hack", date: "2026-06-05", image: "/assets/events/hackathon_event_1775223813285.png", description: "A 48-hour hackathon focused on building energy-efficient software and green technology solutions." },
      { category: "Hackathons", title: "Block-Thon", date: "2026-07-18", image: "/assets/events/hackathon_event_1775223813285.png", description: "A specialized hackathon for developing decentralized applications and smart contract innovations." }
    ];
    await Event.insertMany(rawEvents.map(e => ({ ...e, date: new Date(e.date) })));

    // 6. Faculty
    console.log('Seeding Faculty...');
    const facultyMembers = [
      { name: "Mr. A", designation: "Professor", specialization: "Data Structures & Algorithms", image: "/src/assets/images/student1.jpg", department: "CSE" },
      { name: "Mr. B", designation: "Associate Professor", specialization: "Operating Systems", image: "/src/assets/images/student2.jpg", department: "CSE" },
      { name: "Dr. C", designation: "Assistant Professor", specialization: "Artificial Intelligence", image: "/src/assets/images/student1.jpg", department: "CSE" }
    ];
    await Faculty.insertMany(facultyMembers);

    // 7. News
    console.log('Seeding News...');
    const newsItems = [
      { title: "National Hackathon 2026", date: new Date("2026-04-15"), description: "Join our flagship national level 48-hour hackathon to solve real-world problems. Great prizes and industry networking awaits." },
      { title: "Workshop on Generative AI", date: new Date("2026-03-28"), description: "Hands-on AI workshop for students focusing on the latest advancements in LLMs and generative scaling architectures." },
      { title: "Alumni Meet & Tech Symposium", date: new Date("2026-02-10"), description: "Connect with our distinguished alumni currently leading top tech corporations in a multi-day networking symposium." }
    ];
    await News.insertMany(newsItems);

    // 8. Project Guides
    console.log('Seeding Project Guides...');
    const guides = [
      { name: "Mr. A", domain: "Artificial Intelligence & ML", projects: ["Natural Language Processing for Healthcare", "Federated Learning in Edge Networks", "Automated Medical Image Segmentation"] },
      { name: "Mr. B", domain: "Cybersecurity & Cryptography", projects: ["Privacy-Preserving Protocols for Blockchain", "Robustness Analysis in Large Language Models", "Next-Gen Intrusion Detection Systems"] },
      { name: "Mr. C", domain: "Data Science & Analytics", projects: ["Scalable Traffic Analysis in SDN", "Big Data Frameworks for Smart City Analytics", "Anomaly Detection in Financial Data Streams"] },
      { name: "Mr. D", domain: "Cloud Computing & Distributed Systems", projects: ["Optimizing Serverless Computing Latency", "Distributed Storage for High-Performance Workloads", "Resource Allocation in Multi-Cloud Environments"] },
      { name: "Dr. E", domain: "Internet of Things & Embedded Systems", projects: ["Lightweight Primitives for IoT Security", "Edge Computing Architectures for Smart Energy", "Real-time Industrial Monitoring over NB-IoT"] }
    ];
    await Guide.insertMany(guides);

    // 9. Research Areas
    console.log('Seeding Research Areas...');
    const researchAreas = [
      { title: "Artificial Intelligence & ML", description: "Focusing on deep learning architectures, generative adversarial networks, and natural language processing to solve complex reasoning tasks." },
      { title: "Cybersecurity & Cryptography", description: "Developing robust cryptographic protocols and analyzing systematic vulnerabilities in distributed systems and cloud networks." },
      { title: "Data Science & Analytics", description: "Applying statistical models and big data frameworks to extract meaningful insights from massive, unstructured datasets." },
      { title: "Human-Computer Interaction", description: "Designing intuitive interfaces and studying the psychological impact of interactive digital environments." },
      { title: "Internet of Things (IoT)", description: "Building scalable sensor architectures and edge computing solutions for smart cities and industrial automation." },
      { title: "Quantum Computing", description: "Exploring quantum algorithms and their theoretical applications in fundamentally solving NP-hard problems." }
    ];
    await ResearchArea.insertMany(researchAreas);

    // 10. Publications
    console.log('Seeding Publications...');
    const publications = [
      { title: "Federated Learning over Wireless Channels: A Distributed Optimization Perspective", authors: "Dr. Neha Verma, A. Kumar", venue: "IEEE Transactions on Wireless Communications", year: "2025" },
      { title: "Adversarial Robustness in Large Language Models via Dynamic Prompting", authors: "Dr. Amit Sharma, R. Desai", venue: "NeurIPS", year: "2025" },
      { title: "Quantum-Resistant Key Exchange Mechanisms for Edge Networks", authors: "Dr. Rajesh Kumar", venue: "ACM Conference on Computer and Communications Security (CCS)", year: "2024" },
      { title: "Scalable Traffic Analysis in Software-Defined Networking", authors: "Dr. Neha Verma", venue: "Journal of Network and Computer Applications", year: "2024" }
    ];
    await Publication.insertMany(publications);

    // 11. Syllabus
    console.log('Seeding Syllabus...');
    const syllabusItems = [
      { subject: "B.Tech CSE - Semester 1 & 2 (First Year Common Core)", category: "Undergraduate", pdfUrl: "/data/btech-sem1-2.pdf" },
      { subject: "B.Tech CSE - Semester 3 to 4 Core Engineering (Second Year)", category: "Undergraduate", pdfUrl: "/data/btech-sem3-4.pdf" },
      { subject: "B.Tech CSE - Semester 5 to 6 Core Engineering (Third Year)", category: "Undergraduate", pdfUrl: "/data/btech-sem5-6.pdf" },
      { subject: "B.Tech CSE - Semester 7 to 8 Core Engineering (Fourth Year)", category: "Undergraduate", pdfUrl: "/data/btech-sem7-8.pdf" }
    ];
    await Syllabus.insertMany(syllabusItems);

    // 12. Materials (Study Materials)
    console.log('Seeding Materials...');
    const materialsData = [
      {
        semester: "Semester 1",
        subjects: [
          { name: "Engineering Mathematics-I", resources: [{ title: "Calculus & Linear Algebra Notes", link: "/data/math1-notes.pdf" }, { title: "Previous Year Question Papers", link: "/data/math1-pyq.pdf" }] },
          { name: "Programming in C", resources: [{ title: "C Programming Language (K&R) PDF", link: "/data/c-programming.pdf" }, { title: "GeeksforGeeks C Tutorial", link: "https://www.geeksforgeeks.org/c-programming-language/" }] }
        ]
      },
      {
        semester: "Semester 2",
        subjects: [
          { name: "Data Structures & Algorithms", resources: [{ title: "DSA Complete Notes", link: "/data/dsa-notes.pdf" }, { title: "MIT OCW - Introduction to Algorithms", link: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" }] }
        ]
      }
      // ... Adding more for completeness from the static file
    ];
    
    // Add the rest of semesters 3-8 (simplified for the script but full data in reality)
    const extraMaterials = [
      { semester: "Semester 3", subjects: [{ name: "Object Oriented Programming (Java)", resources: [{ title: "Java Core Concepts Notes", link: "/data/java-notes.pdf" }] }] },
      { semester: "Semester 4", subjects: [{ name: "Operating Systems", resources: [{ title: "Galvin's OS Concept PDF", link: "/data/os-notes.pdf" }] }] },
      { semester: "Semester 5", subjects: [{ name: "Design & Analysis of Algorithms", resources: [{ title: "DAA Comprehensive Notes", link: "/data/daa-notes.pdf" }] }] },
      { semester: "Semester 6", subjects: [{ name: "Artificial Intelligence", resources: [{ title: "AI Modern Approach PDF", link: "/data/ai-notes.pdf" }] }] },
      { semester: "Semester 7", subjects: [{ name: "Machine Learning", resources: [{ title: "ML Frameworks Notes", link: "/data/ml-notes.pdf" }] }] },
      { semester: "Semester 8", subjects: [{ name: "Cloud Computing", resources: [{ title: "AWS & Azure Blueprint PDF", link: "/data/cloud-notes.pdf" }] }] }
    ];
    
    await Material.insertMany([...materialsData, ...extraMaterials]);

    console.log('All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
