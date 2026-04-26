/**
 * Transforms flat backend data from semesters, subjects, and resources into 
 * a nested hierarchical structure for the frontend study materials display.
 * 
 * Target Format:
 * [
 *   {
 *     semesterId: "...",
 *     semester: "1st Semester",
 *     subjects: [
 *       {
 *         subjectId: "...",
 *         name: "Physics",
 *         resources: [ { _id: "...", title: "Unit 1", link: "..." } ]
 *       }
 *     ]
 *   }
 * ]
 */
export const formatMaterials = (semesters = [], subjects = [], resources = []) => {
  return semesters.map(sem => {
    // 1. Loop semesters and capture semester details
    const semesterId = sem._id;
    const semesterName = sem.name;

    // 2. Find subjects belonging to this semester
    const semSubjects = subjects
      .filter(sub => {
        const subSemId = sub.semester?._id || sub.semester;
        return subSemId === semesterId;
      })
      .map(sub => {
        // 3. Capture subject details and find resources belonging to it
        const subjectId = sub._id;
        const subjectName = sub.name;

        const subResources = resources
          .filter(res => {
            const resSubId = res.subject?._id || res.subject;
            return resSubId === subjectId;
          })
          .map(res => ({
            _id: res._id,
            title: res.title,
            link: res.link
          }));

        return {
          subjectId: subjectId,
          name: subjectName,
          resources: subResources
        };
      });

    // 4. Build nested structure
    return {
      semesterId: semesterId,
      semester: semesterName,
      subjects: semSubjects
    };
  });
};

export default formatMaterials;
