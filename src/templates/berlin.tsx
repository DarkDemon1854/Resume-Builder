import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const BLUE = '#2563eb'
const YELLOW = '#eab308'
const RED_B = '#dc2626'
const TEXT = '#18181b'

export function BerlinTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)
  const contacts = [pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean)

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-2">
      <div className="h-5 w-5 rounded-full" style={{ backgroundColor: BLUE }} />
      <h2 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: TEXT }}>{title}</h2>
      <div className="ml-auto h-1 w-12" style={{ backgroundColor: YELLOW }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] overflow-hidden bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative px-10 py-8 text-white" style={{ backgroundColor: '#000000' }}>
        <div className="absolute right-8 top-4 h-20 w-20 rounded-full border-4" style={{ borderColor: YELLOW, opacity: 0.6 }} />
        <div className="absolute right-24 bottom-3 h-8 w-8" style={{ backgroundColor: RED_B, opacity: 0.7 }} />
        <div className="absolute right-6 bottom-6 h-12 w-3" style={{ backgroundColor: BLUE, opacity: 0.7 }} />
        <div className="relative flex items-center gap-6">
          {pi.avatar && <AvatarImage src={pi.avatar} size={80} avatarStyle="circle" wrapperClassName="shrink-0 border-4 p-0.5" wrapperStyle={{ borderColor: YELLOW }} />}
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-sm font-light tracking-wider" style={{ color: YELLOW }}>{pi.title}</p>}
            {contacts.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
                {contacts.map((c, i) => <span key={i}>{c}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 pt-6">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section>
            <SectionHeader title="Summary" />
            <div className="border-l-4 pl-4" style={{ borderColor: BLUE }}>
              <p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
            </div>
          </div>
        )}

        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: YELLOW }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: TEXT }}>{exp.position}</h3>
                    <span className="shrink-0 text-xs font-bold" style={{ color: BLUE }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm font-semibold" style={{ color: BLUE }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
                  {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ backgroundColor: RED_B }} />
                          <span dangerouslySetInnerHTML={{ __html: md(h) }} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('education') && resume.education.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Education" />
            <div className="space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id} className="border-l-4 pl-4" style={{ borderColor: BLUE }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: TEXT }}>{edu.degree}</h3>
                    <span className="shrink-0 text-xs" style={{ color: BLUE }}>{edu.period}</span>
                  </div>
                  {edu.institution && <p className="text-sm font-semibold" style={{ color: YELLOW }}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>}
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                  {edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ backgroundColor: RED_B }} />
                          <span dangerouslySetInnerHTML={{ __html: md(h) }} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Skills" />
            <div className="space-y-3">
              {resume.skills.map(skill => (
                <div key={skill.id}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: BLUE }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => (
                      <span key={i} className="border px-2.5 py-0.5 text-xs font-medium" style={{ borderColor: BLUE, color: TEXT }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Projects" />
            <div className="space-y-3">
              {resume.projects.map(proj => (
                <div key={proj.id} className="border-l-4 pl-4" style={{ borderColor: YELLOW }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: BLUE }}>{proj.name}</h3>
                    {proj.period && <span className="shrink-0 text-xs" style={{ color: BLUE }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => <span key={i} className="px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: BLUE }}>{t}</span>)}
                    </div>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ backgroundColor: RED_B }} />
                          <span dangerouslySetInnerHTML={{ __html: md(h) }} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Certifications" />
            <div className="space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold" style={{ color: TEXT }}>{cert.name}</span>
                    {cert.issuer && <span className="text-sm text-zinc-500"> — {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="shrink-0 text-xs font-bold" style={{ color: BLUE }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Languages" />
            <div className="flex flex-wrap gap-2">
              {resume.languages.map(lang => (
                <div key={lang.id} className="flex items-center gap-2 border px-3 py-1" style={{ borderColor: BLUE }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: YELLOW }} />
                  <span className="text-sm font-medium" style={{ color: TEXT }}>{lang.language}</span>
                  <span className="text-xs text-zinc-400">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Awards" />
            <div className="space-y-3">
              {resume.awards.map(award => (
                <div key={award.id} className="border-l-4 pl-4" style={{ borderColor: BLUE }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: TEXT }}>{award.title}</h3>
                    {award.date && <span className="shrink-0 text-xs" style={{ color: BLUE }}>{award.date}</span>}
                  </div>
                  {award.issuer && <p className="text-sm font-semibold" style={{ color: YELLOW }}>{award.issuer}</p>}
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
