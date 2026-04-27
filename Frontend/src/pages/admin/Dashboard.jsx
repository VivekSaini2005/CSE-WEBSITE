import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../components/admin/DashboardCard';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const dashboardItems = [
    {
      title: "Events",
      description: "Manage department workshops, seminars, and hackathons.",
      route: "/admin/events",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Achievements",
      description: "Record and celebrate student and faculty milestones and awards.",
      route: "/admin/achievements",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "News",
      description: "Publish latest updates, announcements, and departmental news.",
      route: "/admin/news",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Faculty",
      description: "Maintain and update department faculty profiles and specializations.",
      route: "/admin/faculty",
      image: "https://www.himalayanuniversity.com/images/faculty.jpg"
    },
    {
      title: "Alumni",
      description: "Manage records and stay connected with our graduated professionals.",
      route: "/admin/alumni",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Project Guides",
      description: "Assign and coordinate final year project guides for students.",
      route: "/admin/guides",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Publications",
      description: "Catalog and manage research papers and journals published by the department.",
      route: "/admin/publications",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Research Areas",
      description: "Define and update the core research focuses of the department.",
      route: "/admin/research-areas",
      image: "https://opencv.org/wp-content/uploads/2024/02/Research-areas-in-Computer-vision.png"
    },
    {
      title: "Syllabus",
      description: "Upload and update course curriculum, schemes, and academic regulations.",
      route: "/admin/syllabus",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Testimonials",
      description: "Manage and display success stories from our students and alumni.",
      route: "/admin/testimonials",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Materials",
      description: "Organize and provide curated study resources and academic downloads.",
      route: "/admin/materials",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in-up">
      <div className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-3">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          Manage all sections from one place. Choose a module to update departmental content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <DashboardCard 
            key={index} 
            {...item} 
            onClick={() => navigate(item.route)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
