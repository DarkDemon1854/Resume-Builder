import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const BG = '#111827'
const CYAN = '#22d3ee'
const VIOLET = '#a78bfa'
const TEXT = '#d1d5db'
const TEXT_DIM = '#9ca3af'

export function NeonTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)
  const contacts = [pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean)

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-3">
      <h2 className="text-sm font-extrabold uppercase tracking-widest" style={{ color: CYAN, textShadow: `0 0 10px ${CYAN}40` }}>{title}</h2>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${CYAN}40, transparent)` }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] overflow-hidden shadow-lg" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: BG }}>
      <div className="relative px-10 py-8" style={{ borderBottom: `2px solid ${CYAN}`, boxShadow: `0 2px 20px ${CYAN}40` }}>
        <div className="flex items-center gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={80} wrapperClassName="shrink-0 p-0.5" wrapperStyle={{ border: `2px solid ${CYAN}`, boxShadow: `0 0 12px ${CYAN}60` }} />}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: CYAN, textShadow: `0 0 20px ${CYAN}60` }}>{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-sm font-medium" style={{ color: VIOLET, textShadow: `0 0 10px ${VIOLET}40` }}>{pi.title}</p>}
            {contacts.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: TEXT_DIM }}>
                {contacts.map((c, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {c}{i < contacts.length - 1 && <span style={{ color: `${CYAN}40` }}>|</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 pt-6">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section>
            <SectionHeader title="Summary" />
            <div className="rounded-lg p-4" style={{ border: `1px solid ${CYAN}20`, backgroundColor: `${CYAN}08` }}>
              <p className="text-sm leading-relaxed" style={{ color: TEXT }} dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
            </div>
          </div>
        )}

        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SectionHeader title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id} className="rounded-lg p-4" style={{ border: `1px solid ${CYAN}20`, backgroundColor: `${CYAN}05` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: CYAN }}>{exp.position}</h3>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: BG, backgroundColor: VIOLET, boxShadow: `0 0 8px ${VIOLET}40` }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm font-medium" style={{ color: VIOLET }}>{exp.company}</p>}
                  {exp.description && <p className="mt-1 text-sm" style={{ color: TEXT }} dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: TEXT }}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: CYAN, boxShadow: `0 0 6px ${CYAN}` }} />
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
                <div key={edu.id} className="rounded-lg p-4" style={{ border: `1px solid ${VIOLET}20`, backgroundColor: `${VIOLET}05` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: CYAN }}>{edu.institution}</h3>
                    <span className="text-xs" style={{ color: TEXT_DIM }}>{edu.period}</span>
                  </div>
                  <p className="text-sm" style={{ color: TEXT }}>{edu.degree}</p>
                  {edu.gpa && <p className="text-xs" style={{ color: VIOLET }}>GPA: {edu.gpa}</p>}
                  {edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: TEXT }}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: VIOLET, boxShadow: `0 0 6px ${VIOLET}` }} />
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
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: VIOLET }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => (
                      <span key={i} className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ color: (si + i) % 2 === 0 ? CYAN : VIOLET, border: `1px solid ${(si + i) % 2 === 0 ? CYAN : VIOLET}40`, backgroundColor: `${(si + i) % 2 === 0 ? CYAN : VIOLET}10` }}>{item}</span>
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
                <div key={proj.id} className="rounded-lg p-4" style={{ border: `1px solid ${CYAN}20`, backgroundColor: `${CYAN}05` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: CYAN }}>{proj.name}</h3>
                    {proj.period && <span className="text-xs" style={{ color: TEXT_DIM }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-0.5 text-sm" style={{ color: TEXT }} dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ color: BG, backgroundColor: i % 2 === 0 ? CYAN : VIOLET, boxShadow: `0 0 6px ${i % 2 === 0 ? CYAN : VIOLET}40` }}>{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: TEXT }}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: CYAN, boxShadow: `0 0 6px ${CYAN}` }} />
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
                <div key={cert.id} className="rounded-lg px-4 py-2" style={{ border: `1px solid ${VIOLET}30`, backgroundColor: `${VIOLET}08` }}>
                  <p className="text-sm font-bold" style={{ color: CYAN }}>{cert.name}</p>
                  {(cert.issuer || cert.date) && <p className="text-xs" style={{ color: TEXT_DIM }}>{cert.issuer}{cert.issuer && cert.date ? ' | ' : ''}{cert.date}</p>}
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
                <div key={lang.id} className="flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: `1px solid ${CYAN}30` }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CYAN, boxShadow: `0 0 6px ${CYAN}` }} />
                  <span className="text-sm font-medium" style={{ color: CYAN }}>{lang.language}</span>
                  <span className="text-xs" style={{ color: TEXT_DIM }}>{lang.proficiency}</span>
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
                <div key={award.id} className="rounded-lg p-4" style={{ border: `1px solid ${CYAN}20`, backgroundColor: `${CYAN}05` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold" style={{ color: CYAN }}>{award.title}</h3>
                    {award.date && <span className="text-xs" style={{ color: TEXT_DIM }}>{award.date}</span>}
                  </div>
                  {award.issuer && <p className="text-sm" style={{ color: VIOLET }}>{award.issuer}</p>}
                  {award.description && <p className="mt-1 text-sm" style={{ color: TEXT }} dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
