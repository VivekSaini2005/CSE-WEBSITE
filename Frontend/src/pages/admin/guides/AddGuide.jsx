import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGuide } from '../../../api/admin/guideService';
import toast from 'react-hot-toast';

const AddGuide = () => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
  });
  const [projects, setProjects] = useState(['']); // Start with one empty project field
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (index, value) => {
    const newProjects = [...projects];
    newProjects[index] = value;
    setProjects(newProjects);
  };

  const addProjectField = () => {
    setProjects([...projects, '']);
  };

  const removeProjectField = (index) => {
    if (projects.length === 1) {
      toast.error('At least one project is required');
      return;
    }
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const filteredProjects = projects.filter(p => p.trim() !== '');
    if (filteredProjects.length === 0) {
      toast.error('Please add at least one project');
      return;
    }

    setLoading(false); // Reset loading in case of retry
    setLoading(true);
    try {
      await createGuide({
        ...formData,
        projects: filteredProjects
      });
      toast.success('Guide added successfully');
      navigate('/admin/guides');
    } catch (error) {
      toast.error(error.message || 'Failed to add guide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add Project Guide</h1>
        <p className="text-gray-500 mt-1">Register a new project guide and their projects</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Guide Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter guide name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Domain</label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. Machine Learning, Cloud Computing"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-gray-700">Projects</label>
              <button
                type="button"
                onClick={addProjectField}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
              >
                + Add Project
              </button>
            </div>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={project}
                    onChange={(e) => handleProjectChange(index, e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder={`Project ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeProjectField(index)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Create Guide'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/guides')}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuide;
