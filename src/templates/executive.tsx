import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const CHARCOAL = '#2d3436'
const EMERALD = '#00b894'

export function ExecutiveTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3">
      <div className="mb-1 flex items-center gap-3">
        <div className="h-0.5 w-8" style={{ backgroundColor: EMERALD }} />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CHARCOAL }}>{title}</h2>
        <div className="h-0.5 flex-1" style={{ backgroundColor: '#e5e7eb' }} />
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="px-10 py-8">
        <div className="flex items-center gap-6">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={88} className="shrink-0" wrapperStyle={{ border: `3px solid ${EMERALD}` }} />}
          <div>
            <h1 className="text-3xl font-bold" style={{ color: CHARCOAL }}>{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-sm font-medium uppercase tracking-widest" style={{ color: EMERALD }}>{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
              {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
        <div className="mt-6 h-px" style={{ backgroundColor: EMERALD }} />
      </div>
      <div className="px-10 pb-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Executive Summary" /><p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Professional Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: CHARCOAL }}>{exp.position}</span>{exp.company && <span className="text-sm text-zinc-500"> — {exp.company}</span>}{exp.location && <span className="text-sm text-zinc-400">, {exp.location}</span>}</div>
                    <span className="shrink-0 text-xs font-medium" style={{ color: EMERALD }}>{exp.period}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && <ul className="mt-1 space-y-0.5">{exp.highlights.map((h, i) => <li key={i} className="flex items-start gap-2 text-sm text-zinc-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: EMERALD }} /><span dangerouslySetInnerHTML={{ __html: md(h) }} /></li>)}</ul>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('education') && resume.education.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Education" />
            <div className="space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: CHARCOAL }}>{edu.degree}</span>{edu.institution && <span className="text-sm text-zinc-500"> — {edu.institution}</span>}</div>
                    <span className="text-xs font-medium" style={{ color: EMERALD }}>{edu.period}</span>
                  </div>
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Core Competencies" />
            <div className="space-y-1.5">
              {resume.skills.map(skill => (
                <div key={skill.id} className="flex text-sm">
                  <span className="w-36 shrink-0 font-semibold" style={{ color: CHARCOAL }}>{skill.category}:</span>
                  <span className="text-zinc-600">{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Key Projects" />
            <div className="space-y-3">
              {resume.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: CHARCOAL }}>{proj.name}</span>
                    {proj.period && <span className="text-xs font-medium" style={{ color: EMERALD }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <p className="mt-0.5 text-xs text-zinc-400">Tech: {proj.technologies.join(', ')}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Certifications" />
            <div className="space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between text-sm">
                  <div><span className="font-bold" style={{ color: CHARCOAL }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs font-medium" style={{ color: EMERALD }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-bold" style={{ color: CHARCOAL }}>{lang.language}</span><span className="text-zinc-500"> — {lang.proficiency}</span></span>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Awards & Recognition" />
            <div className="space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: CHARCOAL }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs font-medium" style={{ color: EMERALD }}>{award.date}</span>}
                  </div>
                  {award.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
