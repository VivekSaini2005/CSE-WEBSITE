/**
 * Transforms consolidated backend material data into the format 
 * expected by the frontend components.
 * 
 * Backend Format:
 * [
 *   {
 *     _id: "...",
 *     semester: "1st Semester",
 *     subjects: [
 *       {
 *         _id: "...",
 *         name: "Physics",
 *         resources: [ { _id: "...", title: "Unit 1", link: "..." } ]
 *       }
 *     ]
 *   }
 * ]
 */
export const formatMaterials = (materials = []) => {
  return materials.map(mat => ({
    semesterId: mat._id,
    semester: mat.semester,
    subjects: (mat.subjects || []).map(sub => ({
      subjectId: sub._id,
      name: sub.name,
      resources: sub.resources || []
    }))
  }));
};

export default formatMaterials;
