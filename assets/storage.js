/* One localStorage write commits grades and AI reports together. Legacy stores remain readable. */
'use strict';
window.GradeStorage = (() => {
  const KEY = 'van-khe-state-v2';
  function read() {
    const text = localStorage.getItem(KEY);
    if (text !== null) {
      const data = JSON.parse(text);
      if (data.version !== 2 || !Array.isArray(data.students) || !Array.isArray(data.jobs)) throw new Error('Bản lưu không hợp lệ.');
      return data;
    }
    return {version:2, students:JSON.parse(localStorage.getItem('van-khe-grades-v1') || '[]'), jobs:JSON.parse(localStorage.getItem('van-khe-ai-results-v1') || '[]')};
  }
  function commit(students, jobs) {localStorage.setItem(KEY, JSON.stringify({version:2, students, jobs}));}
  function backupBeforeRosterUpdate(classId, revision) {
    const data=read();
    if (!data.students.some(s=>s.classId===classId && s.rosterRevision!==revision) && !data.jobs.some(j=>j.classId===classId && j.rosterRevision!==revision)) return;
    const key=`${KEY}-backup-${classId}-${revision}`;
    if (localStorage.getItem(key)===null) localStorage.setItem(key,JSON.stringify(data));
  }
  return {read,commit,backupBeforeRosterUpdate,saveStudents(students){commit(students,read().jobs);},saveJobs(jobs){commit(read().students,jobs);}};
})();
