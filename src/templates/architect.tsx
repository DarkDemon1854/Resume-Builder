import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#1e3a5f'
const ACCENT = '#1d4ed8'
const GRID = '#dbeafe'
const BODY_TEXT = '#374151'
const MUTED = '#6b7280'

export function ArchitectTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-3">
      <div className="h-2.5 w-2.5 rotate-45" style={{ backgroundColor: ACCENT }} />
      <h2 className="text-sm font-bold uppercase tracking-[0.15em]" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', color: PRIMARY }}>{title}</h2>
      <div className="h-px flex-1" style={{ backgroundColor: PRIMARY, opacity: 0.3 }} />
    </div>
  )

  return (
    <div
      className="mx-auto max-w-[210mm] bg-white shadow-lg"
      style={{
        fontFamily: 'Inter, sans-serif',
        backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <div className="mb-6 border-b-2 pb-5" style={{ borderColor: PRIMARY }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {pi.avatar && <AvatarImage src={pi.avatar} size={64} avatarStyle="circle" className="shrink-0" style={{ border: `2px solid ${PRIMARY}` }} />}
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', color: PRIMARY }}>
                {pi.fullName || 'Your Name'}
              </h1>
              {pi.title && <p className="mt-1 text-sm font-medium uppercase tracking-widest" style={{ color: ACCENT }}>{pi.title}</p>}
            </div>
          </div>
          <div className="shrink-0 border-l-2 pl-4 text-right" style={{ borderColor: ACCENT }}>
            <div className="space-y-0.5 text-xs" style={{ color: MUTED }}>
              {pi.age && <p>{pi.age}</p>}
              {pi.gender && <p>{pi.gender}</p>}
              {pi.hometown && <p>{pi.hometown}</p>}
              {pi.maritalStatus && <p>{pi.maritalStatus}</p>}
              {pi.yearsOfExperience && <p>{pi.yearsOfExperience}</p>}
              {pi.educationLevel && <p>{pi.educationLevel}</p>}
              {pi.email && <p>{pi.email}</p>}
              {pi.phone && <p>{pi.phone}</p>}
              {pi.wechat && <p>{pi.wechat}</p>}
              {pi.location && <p>{pi.location}</p>}
              {pi.website && <p>{pi.website}</p>}
              {pi.linkedin && <p>{pi.linkedin}</p>}
              {pi.github && <p>{pi.github}</p>}
            </div>
          </div>
        </div>
      </div>

      {vis.has('summary') && pi.summary && (
        <div className="mb-6" data-section>
          <SectionHeader title="Summary" />
          <p className="border-l-2 pl-4 text-sm leading-relaxed" style={{ color: BODY_TEXT, borderColor: GRID }} dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
        </div>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-6" data-section>
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {resume.experience.map(exp => (
              <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: ACCENT }}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{exp.position}</span>
                    {exp.company && <span className="text-sm" style={{ color: ACCENT }}> | {exp.company}</span>}
                    {exp.location && <span className="text-sm" style={{ color: MUTED }}>, {exp.location}</span>}
                  </div>
                  <span className="shrink-0 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', color: MUTED, backgroundColor: GRID }}>
                    {exp.period}
                  </span>
                </div>
                {exp.description && <p className="mt-1 text-sm" style={{ color: BODY_TEXT }} dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: BODY_TEXT }}>
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: ACCENT }} />
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
              <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: ACCENT }}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{edu.degree}</span>
                    {edu.institution && <span className="text-sm" style={{ color: MUTED }}> – {edu.institution}</span>}
                    {edu.location && <span className="text-sm" style={{ color: MUTED }}>, {edu.location}</span>}
                  </div>
                  <span className="shrink-0 text-xs" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', color: MUTED }}>{edu.period}</span>
                </div>
                {edu.gpa && <p className="text-xs" style={{ color: MUTED }}>GPA: {edu.gpa}</p>}
                {edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: BODY_TEXT }}>
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: ACCENT }} />
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
          <div className="space-y-2">
            {resume.skills.map(skill => (
              <div key={skill.id} className="flex text-sm">
                <span className="w-32 shrink-0 font-bold uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', color: PRIMARY, fontSize: '11px' }}>
                  {skill.category}:
                </span>
                <span style={{ color: BODY_TEXT }}>{skill.items.join(' / ')}</span>
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
              <div key={proj.id} className="border-l-2 pl-4" style={{ borderColor: ACCENT }}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold" style={{ color: PRIMARY }}>{proj.name}</span>
                  {proj.period && <span className="shrink-0 text-xs" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', color: MUTED }}>{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-1 text-sm" style={{ color: BODY_TEXT }} dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 text-[10px] font-medium" style={{ backgroundColor: GRID, color: ACCENT, fontFamily: 'JetBrains Mono, Consolas, monospace' }}>{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: BODY_TEXT }}>
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: ACCENT }} />
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
              <div key={cert.id} className="flex items-baseline gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: ACCENT }} />
                <span className="text-sm font-medium" style={{ color: PRIMARY }}>{cert.name}</span>
                {(cert.issuer || cert.date) && (
                  <span className="text-sm" style={{ color: MUTED }}>
                    {cert.issuer && <> – {cert.issuer}</>}{cert.date && <> ({cert.date})</>}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('languages') && resume.languages.length > 0 && (
        <div className="mb-6" data-section>
          <SectionHeader title="Languages" />
          <div className="space-y-1.5">
            {resume.languages.map(lang => (
              <div key={lang.id} className="flex items-baseline gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: ACCENT }} />
                <span className="text-sm font-medium" style={{ color: PRIMARY }}>{lang.language}</span>
                <span className="text-sm" style={{ color: MUTED }}> – {lang.proficiency}</span>
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
              <div key={award.id} className="border-l-2 pl-4" style={{ borderColor: ACCENT }}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{award.title}</span>
                    {award.issuer && <span className="text-sm" style={{ color: MUTED }}> – {award.issuer}</span>}
                  </div>
                  {award.date && <span className="shrink-0 text-xs" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', color: MUTED }}>{award.date}</span>}
                </div>
                {award.description && <p className="mt-1 text-sm" style={{ color: BODY_TEXT }} dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
