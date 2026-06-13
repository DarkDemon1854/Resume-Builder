import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#1e1b4b'
const ACCENT = '#f43f5e'
const HIGHLIGHT = '#fbbf24'

export function ArtisticTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)
  const contacts = [pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean)

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-2 flex items-center gap-2">
      <h2 className="text-sm font-extrabold uppercase tracking-widest" style={{ color: PRIMARY }}>{title}</h2>
      <div className="h-0.5 flex-1" style={{ borderTop: `2px dashed ${ACCENT}40` }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] overflow-hidden bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative px-10 py-8 text-white" style={{ background: PRIMARY }}>
        <div className="absolute right-6 top-4 h-24 w-24 rounded-full opacity-20" style={{ backgroundColor: ACCENT }} />
        <div className="absolute right-16 bottom-2 h-12 w-12 rounded-full opacity-30" style={{ backgroundColor: HIGHLIGHT }} />
        <div className="absolute left-0 bottom-0 h-2 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${HIGHLIGHT})` }} />
        <div className="relative flex items-center gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={80} wrapperClassName="shrink-0 p-1" wrapperStyle={{ border: `3px dashed ${HIGHLIGHT}` }} />}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-sm font-medium" style={{ color: HIGHLIGHT }}>{pi.title}</p>}
            {contacts.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/70">
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
            <div className="rounded-lg p-4" style={{ border: `2px dashed ${ACCENT}30`, backgroundColor: `${PRIMARY}05` }}>
              <p className="text-sm leading-relaxed text-zinc-600 italic" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
            </div>
          </div>
        )}

        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id} className="relative rounded-lg p-4" style={{ border: `1px dashed ${ACCENT}30` }}>
                  <div className="absolute -left-1.5 top-4 h-3 w-3 rounded-full" style={{ backgroundColor: ACCENT }} />
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: PRIMARY }}>{exp.position}</h3>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={{ backgroundColor: ACCENT }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm font-medium" style={{ color: ACCENT }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
                  {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: HIGHLIGHT }} />
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
                <div key={edu.id} className="rounded-lg p-4" style={{ border: `1px dashed ${ACCENT}30` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: PRIMARY }}>{edu.institution}</h3>
                    <span className="text-xs text-zinc-400">{edu.period}</span>
                  </div>
                  <p className="text-sm text-zinc-600">{edu.degree}{edu.location ? ` – ${edu.location}` : ''}</p>
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                  {edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: HIGHLIGHT }} />
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
              {resume.skills.map((skill, si) => (
                <div key={skill.id}>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span key={i} className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: `${PRIMARY}10`, color: PRIMARY }}>
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: (si + i) % 2 === 0 ? ACCENT : HIGHLIGHT }} />
                        {item}
                      </span>
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
                <div key={proj.id} className="rounded-lg p-4" style={{ border: `1px dashed ${ACCENT}30` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: PRIMARY }}>{proj.name}</h3>
                    {proj.period && <span className="text-xs text-zinc-400">{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: i % 2 === 0 ? ACCENT : PRIMARY }}>{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: HIGHLIGHT }} />
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
            <div className="flex flex-wrap gap-2">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="rounded-lg px-4 py-2" style={{ border: `1px dashed ${ACCENT}30`, backgroundColor: `${HIGHLIGHT}10` }}>
                  <p className="text-sm font-bold" style={{ color: PRIMARY }}>{cert.name}</p>
                  {(cert.issuer || cert.date) && <p className="text-xs text-zinc-500">{cert.issuer}{cert.issuer && cert.date ? ' | ' : ''}{cert.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Languages" />
            <div className="flex flex-wrap gap-3">
              {resume.languages.map(lang => (
                <div key={lang.id} className="flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: `2px dashed ${ACCENT}30` }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                  <span className="text-sm font-medium" style={{ color: PRIMARY }}>{lang.language}</span>
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
                <div key={award.id} className="rounded-lg p-4" style={{ border: `1px dashed ${ACCENT}30` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: PRIMARY }}>{award.title}</h3>
                    {award.date && <span className="text-xs text-zinc-400">{award.date}</span>}
                  </div>
                  {award.issuer && <p className="text-sm" style={{ color: ACCENT }}>{award.issuer}</p>}
                  {award.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
