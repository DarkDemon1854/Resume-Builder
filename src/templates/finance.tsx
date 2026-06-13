import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const GOLD = '#c4a747'
const NAVY = '#0f2044'

export function FinanceTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 border-b pb-1" style={{ borderColor: GOLD }}>
      <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: NAVY }}>{title}</h2>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="px-10 py-7" style={{ backgroundColor: NAVY }}>
        <div className="flex items-center gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={72} className="shrink-0" wrapperStyle={{ border: `2px solid ${GOLD}` }} />}
          <div className="text-white">
            <h1 className="text-2xl font-bold tracking-tight">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-0.5 text-sm font-medium" style={{ color: GOLD }}>{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
              {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-8">
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
                    <div><span className="text-sm font-bold" style={{ color: NAVY }}>{exp.position}</span>{exp.company && <span className="text-sm text-zinc-500"> | {exp.company}</span>}{exp.location && <span className="text-sm text-zinc-400">, {exp.location}</span>}</div>
                    <span className="shrink-0 text-xs font-bold" style={{ color: GOLD }}>{exp.period}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && <ul className="mt-1 space-y-0.5">{exp.highlights.map((h, i) => <li key={i} className="flex items-start gap-2 text-sm text-zinc-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} /><span dangerouslySetInnerHTML={{ __html: md(h) }} /></li>)}</ul>}
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
                    <div><span className="text-sm font-bold" style={{ color: NAVY }}>{edu.degree}</span>{edu.institution && <span className="text-sm text-zinc-500"> — {edu.institution}</span>}</div>
                    <span className="text-xs font-bold" style={{ color: GOLD }}>{edu.period}</span>
                  </div>
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Skills & Expertise" />
            <div className="space-y-1.5">
              {resume.skills.map(skill => (
                <div key={skill.id} className="flex text-sm">
                  <span className="w-36 shrink-0 font-semibold" style={{ color: NAVY }}>{skill.category}:</span>
                  <span className="text-zinc-600">{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Certifications & Licenses" />
            <div className="space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between text-sm">
                  <div><span className="font-bold" style={{ color: NAVY }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs font-bold" style={{ color: GOLD }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-bold" style={{ color: NAVY }}>{lang.language}</span><span className="text-zinc-500"> — {lang.proficiency}</span></span>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Awards & Honours" />
            <div className="space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: NAVY }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs font-bold" style={{ color: GOLD }}>{award.date}</span>}
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
