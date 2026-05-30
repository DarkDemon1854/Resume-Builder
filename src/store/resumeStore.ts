import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { produce } from 'immer'
import { STORAGE_KEYS, type ResumeSectionKey, type TemplateId } from '@/constants'
import { generateId } from '@/utils'

type PersonalInfo = {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  avatar: string
  summary: string
}

type Experience = {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  highlights: string[]
}

type Education = {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa: string
  highlights: string[]
}

type Skill = {
  id: string
  category: string
  items: string[]
}

type Project = {
  id: string
  name: string
  description: string
  technologies: string[]
  url: string
  github: string
  startDate: string
  endDate: string
  current: boolean
  highlights: string[]
}

type Certification = {
  id: string
  name: string
  issuer: string
  date: string
  url: string
  credentialId: string
}

type Language = {
  id: string
  language: string
  proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'beginner'
}

type Award = {
  id: string
  title: string
  issuer: string
  date: string
  description: string
}

type Resume = {
  id: string
  title: string
  templateId: TemplateId
  sections: ResumeSectionKey[]
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
  awards: Award[]
  createdAt: string
  updatedAt: string
}

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
  setActiveResume: (id: string | null) => void
  updatePersonalInfo: (id: string, data: Partial<PersonalInfo>) => void
  addExperience: (id: string, data: Omit<Experience, 'id'>) => void
  updateExperience: (resumeId: string, expId: string, data: Partial<Experience>) => void
  removeExperience: (resumeId: string, expId: string) => void
  addEducation: (id: string, data: Omit<Education, 'id'>) => void
  updateEducation: (resumeId: string, eduId: string, data: Partial<Education>) => void
  removeEducation: (resumeId: string, eduId: string) => void
  addSkill: (id: string, data: Omit<Skill, 'id'>) => void
  updateSkill: (resumeId: string, skillId: string, data: Partial<Skill>) => void
  removeSkill: (resumeId: string, skillId: string) => void
  addProject: (id: string, data: Omit<Project, 'id'>) => void
  updateProject: (resumeId: string, projectId: string, data: Partial<Project>) => void
  removeProject: (resumeId: string, projectId: string) => void
  addCertification: (id: string, data: Omit<Certification, 'id'>) => void
  updateCertification: (
    resumeId: string,
    certId: string,
    data: Partial<Certification>
  ) => void
  removeCertification: (resumeId: string, certId: string) => void
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

export const useResumeStore = create<ResumeStore>()(
  persist(
    set => ({
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
        let newId = ''
        set(
          produce((state: ResumeStore) => {
            const source = state.resumes.find(r => r.id === id)
            if (!source) return
            const now = new Date().toISOString()
            const copy: Resume = {
              ...(JSON.parse(JSON.stringify(source)) as Resume),
              id: generateId(),
              title: `${source.title} (Copy)`,
              createdAt: now,
              updatedAt: now,
            }
            newId = copy.id
            state.resumes.push(copy)
          })
        )
        return newId
      },

      updateResume: (id, updates) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === id)
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

      setActiveResume: id => {
        set(
          produce((state: ResumeStore) => {
            state.activeResumeId = id
          })
        )
      },

      updatePersonalInfo: (id, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === id)
            if (!resume) return
            Object.assign(resume.personalInfo, data)
            touch(resume)
          })
        )
      },

      addExperience: (id, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === id)
            if (!resume) return
            resume.experience.push({ id: generateId(), ...data })
            touch(resume)
          })
        )
      },

      updateExperience: (resumeId, expId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === resumeId)
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
            const resume = state.resumes.find(r => r.id === resumeId)
            if (!resume) return
            resume.experience = resume.experience.filter(e => e.id !== expId)
            touch(resume)
          })
        )
      },

      addEducation: (id, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === id)
            if (!resume) return
            resume.education.push({ id: generateId(), ...data })
            touch(resume)
          })
        )
      },

      updateEducation: (resumeId, eduId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === resumeId)
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
            const resume = state.resumes.find(r => r.id === resumeId)
            if (!resume) return
            resume.education = resume.education.filter(e => e.id !== eduId)
            touch(resume)
          })
        )
      },

      addSkill: (id, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === id)
            if (!resume) return
            resume.skills.push({ id: generateId(), ...data })
            touch(resume)
          })
        )
      },

      updateSkill: (resumeId, skillId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === resumeId)
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
            const resume = state.resumes.find(r => r.id === resumeId)
            if (!resume) return
            resume.skills = resume.skills.filter(s => s.id !== skillId)
            touch(resume)
          })
        )
      },

      addProject: (id, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === id)
            if (!resume) return
            resume.projects.push({ id: generateId(), ...data })
            touch(resume)
          })
        )
      },

      updateProject: (resumeId, projectId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === resumeId)
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
            const resume = state.resumes.find(r => r.id === resumeId)
            if (!resume) return
            resume.projects = resume.projects.filter(p => p.id !== projectId)
            touch(resume)
          })
        )
      },

      addCertification: (id, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === id)
            if (!resume) return
            resume.certifications.push({ id: generateId(), ...data })
            touch(resume)
          })
        )
      },

      updateCertification: (resumeId, certId, data) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === resumeId)
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
            const resume = state.resumes.find(r => r.id === resumeId)
            if (!resume) return
            resume.certifications = resume.certifications.filter(c => c.id !== certId)
            touch(resume)
          })
        )
      },

      reorderSections: (resumeId, sections) => {
        set(
          produce((state: ResumeStore) => {
            const resume = state.resumes.find(r => r.id === resumeId)
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
}
