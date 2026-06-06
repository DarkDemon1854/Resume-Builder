import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { produce } from 'immer'
import { STORAGE_KEYS, type ResumeSectionKey, type TemplateId } from '@/constants'
import { generateId } from '@/utils'
import type {
  Resume,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
  Award,
} from '@/types/resume'

type ResumeState = {
  resumes: Resume[]
  activeResumeId: string | null
  isLoading: boolean
}

type ResumeActions = {
  createResume: (title: string, templateId?: TemplateId) => string
  duplicateResume: (id: string) => string
  updateResume: (id: string, updates: Partial<Omit<Resume, 'id' | 'createdAt'>>) => void
  deleteResume: (id: string) => void
  resetResume: (id: string) => void
  setActiveResume: (id: string | null) => void

  updatePersonalInfo: (resumeId: string, data: Partial<PersonalInfo>) => void

  addExperience: (resumeId: string, data: Omit<Experience, 'id'>) => string
  updateExperience: (resumeId: string, expId: string, data: Partial<Omit<Experience, 'id'>>) => void
  removeExperience: (resumeId: string, expId: string) => void
  reorderExperience: (resumeId: string, orderedIds: string[]) => void

  addEducation: (resumeId: string, data: Omit<Education, 'id'>) => string
  updateEducation: (resumeId: string, eduId: string, data: Partial<Omit<Education, 'id'>>) => void
  removeEducation: (resumeId: string, eduId: string) => void
  reorderEducation: (resumeId: string, orderedIds: string[]) => void

  addSkill: (resumeId: string, data: Omit<Skill, 'id'>) => string
  updateSkill: (resumeId: string, skillId: string, data: Partial<Omit<Skill, 'id'>>) => void
  removeSkill: (resumeId: string, skillId: string) => void
  reorderSkills: (resumeId: string, orderedIds: string[]) => void

  addProject: (resumeId: string, data: Omit<Project, 'id'>) => string
  updateProject: (resumeId: string, projectId: string, data: Partial<Omit<Project, 'id'>>) => void
  removeProject: (resumeId: string, projectId: string) => void
  reorderProjects: (resumeId: string, orderedIds: string[]) => void

  addCertification: (resumeId: string, data: Omit<Certification, 'id'>) => string
  updateCertification: (resumeId: string, certId: string, data: Partial<Omit<Certification, 'id'>>) => void
  removeCertification: (resumeId: string, certId: string) => void
  reorderCertifications: (resumeId: string, orderedIds: string[]) => void

  addLanguage: (resumeId: string, data: Omit<Language, 'id'>) => string
  updateLanguage: (resumeId: string, langId: string, data: Partial<Omit<Language, 'id'>>) => void
  removeLanguage: (resumeId: string, langId: string) => void
  reorderLanguages: (resumeId: string, orderedIds: string[]) => void

  addAward: (resumeId: string, data: Omit<Award, 'id'>) => string
  updateAward: (resumeId: string, awardId: string, data: Partial<Omit<Award, 'id'>>) => void
  removeAward: (resumeId: string, awardId: string) => void
  reorderAwards: (resumeId: string, orderedIds: string[]) => void

  reorderSections: (resumeId: string, sections: ResumeSectionKey[]) => void
  setLoading: (loading: boolean) => void
}

type ResumeStore = ResumeState & ResumeActions

const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  github: '',
  avatar: '',
  summary: '',
}

const defaultSections: ResumeSectionKey[] = [
  'personalInfo',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
]

function buildResume(title: string, templateId: TemplateId): Resume {
  const now = new Date().toISOString()
  return {
    id: generateId(),
    title,
    templateId,
    sections: defaultSections,
    personalInfo: { ...defaultPersonalInfo },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    createdAt: now,
    updatedAt: now,
  }
}

function touch(resume: Resume): void {
  resume.updatedAt = new Date().toISOString()
}

function reorderById<T extends { id: string }>(items: T[], orderedIds: string[]): T[] {
  const map = new Map(items.map(item => [item.id, item]))
  return orderedIds.reduce<T[]>((acc, id) => {
    const item = map.get(id)
    if (item) acc.push(item)
    return acc
  }, [])
}

function findResume(state: ResumeStore, id: string): Resume | undefined {
  return state.resumes.find(r => r.id === id)
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumes: [],
      activeResumeId: null,
      isLoading: false,

      createResume: (title, templateId = 'default') => {
        const resume = buildResume(title, templateId)
        set(
          produce((state: ResumeStore) => {
            state.resumes.push(resume)
            state.activeResumeId = resume.id
          })
        )
        return resume.id
      },

      duplicateResume: id => {
        const source = findResume(get(), id)
        if (!source) return ''
        const now = new Date().toISOString()
        const copy: Resume = {
          ...(JSON.parse(JSON.stringify(source)) as Resume),
          id: generateId(),
          title: `${source.title} (Copy)`,
          createdAt: now,
          updatedAt: now,
        }
        set(
          produce((state: ResumeStore) => {
            state.resumes.push(copy)
          })
        )
        return copy.id
      },

      updateResume: (id, updates) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, id)
            if (!resume) return
            Object.assign(resume, updates)
            touch(resume)
          })
        )
      },

      deleteResume: id => {
        set(
          produce((state: ResumeStore) => {
            state.resumes = state.resumes.filter(r => r.id !== id)
            if (state.activeResumeId === id) {
              state.activeResumeId = state.resumes[0]?.id ?? null
            }
          })
        )
      },

      resetResume: id => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, id)
            if (!resume) return
            const now = new Date().toISOString()
            resume.personalInfo = { ...defaultPersonalInfo }
            resume.experience = []
            resume.education = []
            resume.skills = []
            resume.projects = []
            resume.certifications = []
            resume.languages = []
            resume.awards = []
            resume.sections = [...defaultSections]
            resume.updatedAt = now
          })
        )
      },

      setActiveResume: id => {
        set(
          produce((state: ResumeStore) => {
            state.activeResumeId = id
          })
        )
      },

      updatePersonalInfo: (resumeId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            Object.assign(resume.personalInfo, data)
            touch(resume)
          })
        )
      },

      addExperience: (resumeId, data) => {
        const id = generateId()
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.experience.push({ id, ...data })
            touch(resume)
          })
        )
        return id
      },

      updateExperience: (resumeId, expId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            const exp = resume.experience.find(e => e.id === expId)
            if (!exp) return
            Object.assign(exp, data)
            touch(resume)
          })
        )
      },

      removeExperience: (resumeId, expId) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.experience = resume.experience.filter(e => e.id !== expId)
            touch(resume)
          })
        )
      },

      reorderExperience: (resumeId, orderedIds) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.experience = reorderById(resume.experience, orderedIds)
            touch(resume)
          })
        )
      },

      addEducation: (resumeId, data) => {
        const id = generateId()
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.education.push({ id, ...data })
            touch(resume)
          })
        )
        return id
      },

      updateEducation: (resumeId, eduId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            const edu = resume.education.find(e => e.id === eduId)
            if (!edu) return
            Object.assign(edu, data)
            touch(resume)
          })
        )
      },

      removeEducation: (resumeId, eduId) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.education = resume.education.filter(e => e.id !== eduId)
            touch(resume)
          })
        )
      },

      reorderEducation: (resumeId, orderedIds) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.education = reorderById(resume.education, orderedIds)
            touch(resume)
          })
        )
      },

      addSkill: (resumeId, data) => {
        const id = generateId()
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.skills.push({ id, ...data })
            touch(resume)
          })
        )
        return id
      },

      updateSkill: (resumeId, skillId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            const skill = resume.skills.find(s => s.id === skillId)
            if (!skill) return
            Object.assign(skill, data)
            touch(resume)
          })
        )
      },

      removeSkill: (resumeId, skillId) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.skills = resume.skills.filter(s => s.id !== skillId)
            touch(resume)
          })
        )
      },

      reorderSkills: (resumeId, orderedIds) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.skills = reorderById(resume.skills, orderedIds)
            touch(resume)
          })
        )
      },

      addProject: (resumeId, data) => {
        const id = generateId()
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.projects.push({ id, ...data })
            touch(resume)
          })
        )
        return id
      },

      updateProject: (resumeId, projectId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            const project = resume.projects.find(p => p.id === projectId)
            if (!project) return
            Object.assign(project, data)
            touch(resume)
          })
        )
      },

      removeProject: (resumeId, projectId) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.projects = resume.projects.filter(p => p.id !== projectId)
            touch(resume)
          })
        )
      },

      reorderProjects: (resumeId, orderedIds) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.projects = reorderById(resume.projects, orderedIds)
            touch(resume)
          })
        )
      },

      addCertification: (resumeId, data) => {
        const id = generateId()
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.certifications.push({ id, ...data })
            touch(resume)
          })
        )
        return id
      },

      updateCertification: (resumeId, certId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            const cert = resume.certifications.find(c => c.id === certId)
            if (!cert) return
            Object.assign(cert, data)
            touch(resume)
          })
        )
      },

      removeCertification: (resumeId, certId) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.certifications = resume.certifications.filter(c => c.id !== certId)
            touch(resume)
          })
        )
      },

      reorderCertifications: (resumeId, orderedIds) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.certifications = reorderById(resume.certifications, orderedIds)
            touch(resume)
          })
        )
      },

      addLanguage: (resumeId, data) => {
        const id = generateId()
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.languages.push({ id, ...data })
            touch(resume)
          })
        )
        return id
      },

      updateLanguage: (resumeId, langId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            const lang = resume.languages.find(l => l.id === langId)
            if (!lang) return
            Object.assign(lang, data)
            touch(resume)
          })
        )
      },

      removeLanguage: (resumeId, langId) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.languages = resume.languages.filter(l => l.id !== langId)
            touch(resume)
          })
        )
      },

      reorderLanguages: (resumeId, orderedIds) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.languages = reorderById(resume.languages, orderedIds)
            touch(resume)
          })
        )
      },

      addAward: (resumeId, data) => {
        const id = generateId()
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.awards.push({ id, ...data })
            touch(resume)
          })
        )
        return id
      },

      updateAward: (resumeId, awardId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            const award = resume.awards.find(a => a.id === awardId)
            if (!award) return
            Object.assign(award, data)
            touch(resume)
          })
        )
      },

      removeAward: (resumeId, awardId) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.awards = resume.awards.filter(a => a.id !== awardId)
            touch(resume)
          })
        )
      },

      reorderAwards: (resumeId, orderedIds) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.awards = reorderById(resume.awards, orderedIds)
            touch(resume)
          })
        )
      },

      reorderSections: (resumeId, sections) => {
        set(
          produce((state: ResumeStore) => {
            const resume = findResume(state, resumeId)
            if (!resume) return
            resume.sections = sections
            touch(resume)
          })
        )
      },

      setLoading: isLoading => {
        set(
          produce((state: ResumeStore) => {
            state.isLoading = isLoading
          })
        )
      },
    }),
    {
      name: STORAGE_KEYS.RESUME,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
      }),
    }
  )
)

export const selectResumes = (state: ResumeStore) => state.resumes
export const selectActiveResumeId = (state: ResumeStore) => state.activeResumeId
export const selectIsLoading = (state: ResumeStore) => state.isLoading
export const selectActiveResume = (state: ResumeStore) =>
  state.resumes.find(r => r.id === state.activeResumeId) ?? null
export const selectResumeById = (id: string) => (state: ResumeStore) =>
  state.resumes.find(r => r.id === id) ?? null

export type { ResumeStore }
export type {
  Resume,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
  Award,
} from '@/types/resume'
