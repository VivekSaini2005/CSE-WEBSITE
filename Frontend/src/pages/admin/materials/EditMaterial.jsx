import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMaterialById, updateMaterial } from '../../../api/admin/materialService';
import toast from 'react-hot-toast';

const EditMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    semester: '',
    subjects: []
  });

  useEffect(() => {
    const loadMaterial = async () => {
      try {
        const response = await fetchMaterialById(id);
        const data = response.data;
        if (data) {
          setFormData({
            semester: data.semester || '',
            subjects: data.subjects || []
          });
        }
      } catch (error) {
        toast.error('Failed to load material data');
        navigate('/admin/materials');
      } finally {
        setLoading(false);
      }
    };
    loadMaterial();
  }, [id, navigate]);

  const handleSemesterChange = (e) => {
    setFormData({ ...formData, semester: e.target.value });
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][field] = value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', resources: [{ title: '', link: '' }] }]
    });
  };

  const removeSubject = (index) => {
    if (formData.subjects.length === 1) {
      toast.error('At least one subject is required');
      return;
    }
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleResourceChange = (subIndex, resIndex, field, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[subIndex].resources[resIndex][field] = value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const addResource = (subIndex) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[subIndex].resources.push({ title: '', link: '' });
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const removeResource = (subIndex, resIndex) => {
    if (formData.subjects[subIndex].resources.length === 1) {
      toast.error('At least one resource is required per subject');
      return;
    }
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[subIndex].resources = updatedSubjects[subIndex].resources.filter((_, i) => i !== resIndex);
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const validateForm = () => {
    if (!formData.semester.trim()) {
      toast.error('Semester name is required');
      return false;
    }
    if (formData.subjects.length === 0) {
      toast.error('At least one subject is required');
      return false;
    }
    for (const sub of formData.subjects) {
      if (!sub.name.trim()) {
        toast.error('All subject names are required');
        return false;
      }
      if (sub.resources.length === 0) {
        toast.error(`At least one resource is required for subject: ${sub.name}`);
        return false;
      }
      for (const res of sub.resources) {
        if (!res.title.trim() || !res.link.trim()) {
          toast.error('All resource titles and links are required');
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      await updateMaterial(id, formData);
      toast.success('Material updated successfully');
      navigate('/admin/materials');
    } catch (error) {
      toast.error(error.message || 'Failed to update material');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/materials')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Edit Semester</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Semester Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Semester Name</label>
          <input 
            type="text" 
            placeholder="e.g. 1st Semester" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={formData.semester}
            onChange={handleSemesterChange}
            required
          />
        </div>

        {/* Subjects Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-700">Subjects</h2>
            <button 
              type="button"
              onClick={addSubject}
              className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Subject
            </button>
          </div>

          {formData.subjects.map((subject, subIndex) => (
            <div key={subIndex} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative animate-fadeIn">
              <button 
                type="button"
                onClick={() => removeSubject(subIndex)}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                title="Remove Subject"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Subject Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Engineering Mathematics-I" 
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(subIndex, 'name', e.target.value)}
                  required
                />
              </div>

              {/* Resources Sub-section */}
              <div className="pl-6 border-l-2 border-indigo-50 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-gray-500">Resources</h3>
                  <button 
                    type="button"
                    onClick={() => addResource(subIndex)}
                    className="text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Resource
                  </button>
                </div>

                {subject.resources.map((resource, resIndex) => (
                  <div key={resIndex} className="flex flex-wrap sm:flex-nowrap gap-3 items-end animate-slideRight">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Lecture Notes" 
                        className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-md outline-none focus:ring-1 focus:ring-indigo-500"
                        value={resource.title}
                        onChange={(e) => handleResourceChange(subIndex, resIndex, 'title', e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex-[2] min-w-[250px]">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Link / URL</label>
                      <input 
                        type="text" 
                        placeholder="e.g. https://..." 
                        className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-md outline-none focus:ring-1 focus:ring-indigo-500"
                        value={resource.link}
                        onChange={(e) => handleResourceChange(subIndex, resIndex, 'link', e.target.value)}
                        required
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeResource(subIndex, resIndex)}
                      className="p-2 text-gray-300 hover:text-red-400 transition-colors mb-0.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-8">
          <button 
            type="button"
            onClick={() => navigate('/admin/materials')}
            className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Updating...
              </>
            ) : 'Update Semester'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMaterial;
