import { useResumeStore } from '@/store/resumeStore'

export function useResume(resumeId?: string) {
  const resumes = useResumeStore(state => state.resumes)
  const activeResumeId = useResumeStore(state => state.activeResumeId)
  const isLoading = useResumeStore(state => state.isLoading)
  const createResume = useResumeStore(state => state.createResume)
  const duplicateResume = useResumeStore(state => state.duplicateResume)
  const updateResume = useResumeStore(state => state.updateResume)
  const deleteResume = useResumeStore(state => state.deleteResume)
  const setActiveResume = useResumeStore(state => state.setActiveResume)
  const updatePersonalInfo = useResumeStore(state => state.updatePersonalInfo)
  const addExperience = useResumeStore(state => state.addExperience)
  const updateExperience = useResumeStore(state => state.updateExperience)
  const removeExperience = useResumeStore(state => state.removeExperience)
  const addEducation = useResumeStore(state => state.addEducation)
  const updateEducation = useResumeStore(state => state.updateEducation)
  const removeEducation = useResumeStore(state => state.removeEducation)
  const addSkill = useResumeStore(state => state.addSkill)
  const updateSkill = useResumeStore(state => state.updateSkill)
  const removeSkill = useResumeStore(state => state.removeSkill)
  const addProject = useResumeStore(state => state.addProject)
  const updateProject = useResumeStore(state => state.updateProject)
  const removeProject = useResumeStore(state => state.removeProject)
  const addCertification = useResumeStore(state => state.addCertification)
  const updateCertification = useResumeStore(state => state.updateCertification)
  const removeCertification = useResumeStore(state => state.removeCertification)
  const reorderSections = useResumeStore(state => state.reorderSections)

  const targetId = resumeId ?? activeResumeId
  const activeResume = resumes.find(r => r.id === targetId) ?? null

  return {
    resumes,
    activeResume,
    activeResumeId,
    isLoading,
    createResume,
    duplicateResume,
    updateResume,
    deleteResume,
    setActiveResume,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    reorderSections,
  }
}
