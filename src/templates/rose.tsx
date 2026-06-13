import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#881337'
const ACCENT = '#be185d'
const ROSE_50 = '#fff1f2'
const ROSE_100 = '#ffe4e6'

export function RoseTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-2">
      <div className="h-0.5 w-6 rounded-full" style={{ backgroundColor: ACCENT }} />
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: PRIMARY }}>{title}</h2>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-8 rounded-2xl px-8 py-6 text-center" style={{ backgroundColor: ROSE_50 }}>
        {pi.avatar && <AvatarImage src={pi.avatar} size={80} avatarStyle="circle" className="mx-auto mb-3 border-3" style={{ borderColor: ACCENT }} />}
        <h1 className="text-2xl font-semibold tracking-wide" style={{ color: PRIMARY }}>{pi.fullName || 'Your Name'}</h1>
        {pi.title && <p className="mt-1 text-sm" style={{ color: ACCENT }}>{pi.title}</p>}
        <div className="mt-3 flex items-center justify-center gap-1">
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT, opacity: 0.4 }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT, opacity: 0.6 }} />
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT, opacity: 0.6 }} />
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT, opacity: 0.4 }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs" style={{ color: ACCENT }}>
          {pi.age && <span>{pi.age}</span>}
          {pi.gender && <span>{pi.gender}</span>}
          {pi.hometown && <span>{pi.hometown}</span>}
          {pi.maritalStatus && <span>{pi.maritalStatus}</span>}
          {pi.yearsOfExperience && <span>{pi.yearsOfExperience}</span>}
          {pi.educationLevel && <span>{pi.educationLevel}</span>}
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <span>{pi.phone}</span>}
          {pi.wechat && <span>{pi.wechat}</span>}
          {pi.location && <span>{pi.location}</span>}
          {pi.website && <span>{pi.website}</span>}
          {pi.linkedin && <span>LinkedIn: {pi.linkedin}</span>}
          {pi.github && <span>GitHub: {pi.github}</span>}
        </div>
      </div>

      {vis.has('summary') && pi.summary && (
        <div className="mb-6" data-section>
          <SectionHeader title="Summary" />
          <p className="rounded-xl px-4 py-3 text-sm italic leading-relaxed" style={{ backgroundColor: ROSE_50, color: '#57534e' }} dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
        </div>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-6" data-section>
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {resume.experience.map(exp => (
              <div key={exp.id} className="rounded-xl border p-4" style={{ borderColor: ROSE_100 }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: PRIMARY }}>{exp.position}</h3>
                  <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: ROSE_50, color: ACCENT }}>{exp.period}</span>
                </div>
                {exp.company && <p className="text-sm" style={{ color: ACCENT }}>{exp.company}</p>}
                {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
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
              <div key={edu.id} className="rounded-xl border p-4" style={{ borderColor: ROSE_100 }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: PRIMARY }}>{edu.degree}</h3>
                  <span className="shrink-0 text-xs" style={{ color: ACCENT }}>{edu.period}</span>
                </div>
                {edu.institution && <p className="text-sm" style={{ color: ACCENT }}>{edu.institution}</p>}
                {edu.gpa && <p className="text-xs" style={{ color: '#a8a29e' }}>GPA: {edu.gpa}</p>}
                {edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
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
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: PRIMARY }}>{skill.category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item, i) => (
                    <span key={i} className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: ROSE_50, color: ACCENT }}>{item}</span>
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
              <div key={proj.id} className="rounded-xl border p-4" style={{ borderColor: ROSE_100 }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: PRIMARY }}>{proj.name}</h3>
                  {proj.period && <span className="shrink-0 text-xs" style={{ color: ACCENT }}>{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {proj.technologies.map((t, i) => <span key={i} className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: ACCENT }}>{t}</span>)}
                  </div>
                )}
                {proj.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
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
              <div key={cert.id} className="rounded-xl border px-4 py-2" style={{ borderColor: ROSE_100 }}>
                <p className="text-sm font-semibold" style={{ color: PRIMARY }}>{cert.name}</p>
                {(cert.issuer || cert.date) && <p className="text-xs" style={{ color: ACCENT }}>{cert.issuer}{cert.issuer && cert.date ? ' | ' : ''}{cert.date}</p>}
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
              <div key={lang.id} className="flex items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: ROSE_50 }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                <span className="text-sm font-medium" style={{ color: PRIMARY }}>{lang.language}</span>
                <span className="text-xs" style={{ color: ACCENT }}>{lang.proficiency}</span>
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
              <div key={award.id} className="rounded-xl border p-4" style={{ borderColor: ROSE_100 }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: PRIMARY }}>{award.title}</h3>
                  {award.date && <span className="shrink-0 text-xs" style={{ color: ACCENT }}>{award.date}</span>}
                </div>
                {award.issuer && <p className="text-sm" style={{ color: ACCENT }}>{award.issuer}</p>}
                {award.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
