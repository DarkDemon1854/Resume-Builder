import { memo } from 'react'
import PersonalInfoForm from '@/components/resume/forms/PersonalInfoForm'
import ExperienceForm from '@/components/resume/forms/ExperienceForm'
import EducationForm from '@/components/resume/forms/EducationForm'
import SkillsForm from '@/components/resume/forms/SkillsForm'
import ProjectsForm from '@/components/resume/forms/ProjectsForm'
import CertificationsForm from '@/components/resume/forms/CertificationsForm'
import SectionWrapper from '@/components/resume/SectionWrapper'
import TextArea from '@/components/TextArea'
import { useResume } from '@/hooks/useResume'
import type { ResumeSectionKey } from '@/constants'

type Props = {
  sectionKey: ResumeSectionKey
  resumeId: string
}

function SectionRendererInner({ sectionKey, resumeId }: Props) {
  switch (sectionKey) {
    case 'personalInfo':
      return <PersonalInfoForm resumeId={resumeId} />
    case 'summary':
      return <SummarySection resumeId={resumeId} />
    case 'experience':
      return <ExperienceForm resumeId={resumeId} />
    case 'education':
      return <EducationForm resumeId={resumeId} />
    case 'skills':
      return <SkillsForm resumeId={resumeId} />
    case 'projects':
      return <ProjectsForm resumeId={resumeId} />
    case 'certifications':
      return <CertificationsForm resumeId={resumeId} />
    case 'languages':
      return <LanguagesPlaceholder />
    case 'awards':
      return <AwardsPlaceholder />
    default:
      return null
  }
}

export default memo(SectionRendererInner)

function SummarySection({ resumeId }: { resumeId: string }) {
  const { activeResume, updatePersonalInfo } = useResume(resumeId)
  const summary = activeResume?.personalInfo.summary ?? ''

  return (
    <SectionWrapper
      title="Professional Summary"
      description="Write a compelling 2–4 sentence overview of your career"
      icon={<FileTextIcon />}
    >
      <TextArea
        value={summary}
        onChange={(e) => { updatePersonalInfo(resumeId, { summary: e.target.value }) }}
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
        rows={5}
      />
    </SectionWrapper>
  )
}

function LanguagesPlaceholder() {
  return (
    <SectionWrapper
      title="Languages"
      description="Add languages you speak and your proficiency level"
      icon={<GlobeIcon />}
    >
      <div className="flex flex-col items-center gap-4 py-10 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/40">
        <GlobeIcon />
        <span className="text-sm text-neutral-500">Languages section — coming in Week 4</span>
      </div>
    </SectionWrapper>
  )
}

function AwardsPlaceholder() {
  return (
    <SectionWrapper
      title="Awards & Honors"
      description="Showcase any awards or recognitions you have received"
      icon={<TrophyIcon />}
    >
      <div className="flex flex-col items-center gap-4 py-10 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/40">
        <TrophyIcon />
        <span className="text-sm text-neutral-500">Awards section — coming in Week 4</span>
      </div>
    </SectionWrapper>
  )
}

function FileTextIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
