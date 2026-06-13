import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const RED = '#dc2626'
const TEXT = '#18181b'

export function SwissTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-4">
      <div className="h-0.5 w-8 shrink-0" style={{ backgroundColor: RED }} />
      <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: TEXT }}>{title}</h2>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="px-10 py-8" style={{ borderLeft: `8px solid ${RED}` }}>
        <div className="flex items-center gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={72} className="shrink-0" />}
          <div>
            <h1 className="text-4xl font-black tracking-[-0.02em] uppercase" style={{ color: TEXT }}>{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-sm font-medium uppercase tracking-[0.25em]" style={{ color: RED }}>{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: '#71717a' }}>
              {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin, pi.github].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 pb-8 pt-6" style={{ borderLeft: `8px solid ${RED}` }}>
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Profile" /><p className="text-sm leading-relaxed" style={{ color: '#374151' }} dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id} className="grid grid-cols-[7rem_1fr] gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: RED }}>{exp.period}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: TEXT }}>{exp.position}</p>
                    {exp.company && <p className="text-sm text-zinc-500">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
                    {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                    {exp.highlights.length > 0 && <ul className="mt-1 list-disc pl-4">{exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}</ul>}
                  </div>
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
                <div key={edu.id} className="grid grid-cols-[7rem_1fr] gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: RED }}>{edu.period}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: TEXT }}>{edu.institution}</p>
                    <p className="text-sm text-zinc-500">{edu.degree}</p>
                    {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Skills" />
            <div className="space-y-1">
              {resume.skills.map(skill => (
                <div key={skill.id} className="grid grid-cols-[7rem_1fr] gap-4 text-sm">
                  <div className="text-right font-bold" style={{ color: TEXT }}>{skill.category}</div>
                  <div className="text-zinc-600">{skill.items.join(', ')}</div>
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
                <div key={cert.id} className="grid grid-cols-[7rem_1fr] gap-4 text-sm">
                  <div className="text-right text-xs font-bold" style={{ color: RED }}>{cert.date}</div>
                  <div><span className="font-bold" style={{ color: TEXT }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="space-y-1">
              {resume.languages.map(lang => (
                <div key={lang.id} className="grid grid-cols-[7rem_1fr] gap-4 text-sm">
                  <div className="text-right font-bold" style={{ color: TEXT }}>{lang.language}</div>
                  <div className="text-zinc-500">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Awards" />
            <div className="space-y-2">
              {resume.awards.map(award => (
                <div key={award.id} className="grid grid-cols-[7rem_1fr] gap-4">
                  <div className="text-right text-xs font-bold" style={{ color: RED }}>{award.date}</div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: TEXT }}>{award.title}</p>
                    {award.issuer && <p className="text-sm text-zinc-500">{award.issuer}</p>}
                    {award.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
