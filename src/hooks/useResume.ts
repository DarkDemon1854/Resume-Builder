import { useResumeStore } from '@/store/resumeStore'

export function useResume(resumeId?: string) {
  const resumes = useResumeStore(state => state.resumes)
  const activeResumeId = useResumeStore(state => state.activeResumeId)
  const isLoading = useResumeStore(state => state.isLoading)

  const createResume = useResumeStore(state => state.createResume)
  const duplicateResume = useResumeStore(state => state.duplicateResume)
  const updateResume = useResumeStore(state => state.updateResume)
  const deleteResume = useResumeStore(state => state.deleteResume)
  const resetResume = useResumeStore(state => state.resetResume)
  const setActiveResume = useResumeStore(state => state.setActiveResume)

  const updatePersonalInfo = useResumeStore(state => state.updatePersonalInfo)

  const addExperience = useResumeStore(state => state.addExperience)
  const updateExperience = useResumeStore(state => state.updateExperience)
  const removeExperience = useResumeStore(state => state.removeExperience)
  const reorderExperience = useResumeStore(state => state.reorderExperience)

  const addEducation = useResumeStore(state => state.addEducation)
  const updateEducation = useResumeStore(state => state.updateEducation)
  const removeEducation = useResumeStore(state => state.removeEducation)
  const reorderEducation = useResumeStore(state => state.reorderEducation)

  const addSkill = useResumeStore(state => state.addSkill)
  const updateSkill = useResumeStore(state => state.updateSkill)
  const removeSkill = useResumeStore(state => state.removeSkill)
  const reorderSkills = useResumeStore(state => state.reorderSkills)

  const addProject = useResumeStore(state => state.addProject)
  const updateProject = useResumeStore(state => state.updateProject)
  const removeProject = useResumeStore(state => state.removeProject)
  const reorderProjects = useResumeStore(state => state.reorderProjects)

  const addCertification = useResumeStore(state => state.addCertification)
  const updateCertification = useResumeStore(state => state.updateCertification)
  const removeCertification = useResumeStore(state => state.removeCertification)
  const reorderCertifications = useResumeStore(state => state.reorderCertifications)

  const addLanguage = useResumeStore(state => state.addLanguage)
  const updateLanguage = useResumeStore(state => state.updateLanguage)
  const removeLanguage = useResumeStore(state => state.removeLanguage)
  const reorderLanguages = useResumeStore(state => state.reorderLanguages)

  const addAward = useResumeStore(state => state.addAward)
  const updateAward = useResumeStore(state => state.updateAward)
  const removeAward = useResumeStore(state => state.removeAward)
  const reorderAwards = useResumeStore(state => state.reorderAwards)

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
    resetResume,
    setActiveResume,

    updatePersonalInfo,

    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,

    addEducation,
    updateEducation,
    removeEducation,
    reorderEducation,

    addSkill,
    updateSkill,
    removeSkill,
    reorderSkills,

    addProject,
    updateProject,
    removeProject,
    reorderProjects,

    addCertification,
    updateCertification,
    removeCertification,
    reorderCertifications,

    addLanguage,
    updateLanguage,
    removeLanguage,
    reorderLanguages,

    addAward,
    updateAward,
    removeAward,
    reorderAwards,

    reorderSections,
  }
}
