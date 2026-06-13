import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#18181b'
const ACCENT = '#6366f1'
const CARD_BG = '#fafafa'

export function CardTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)
  const contacts = [pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean)

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-4" data-section>
      <div className="rounded-lg p-4 shadow-sm" style={{ backgroundColor: CARD_BG, border: '1px solid #e4e4e7' }}>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: PRIMARY }}>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-6 text-center">
        {pi.avatar && <AvatarImage src={pi.avatar} size={80} avatarStyle="circle" className="mx-auto mb-3" style={{ border: `3px solid ${ACCENT}` }} />}
        <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>{pi.fullName || 'Your Name'}</h1>
        {pi.title && <p className="mt-1 text-sm font-medium" style={{ color: ACCENT }}>{pi.title}</p>}
        {(contacts.length > 0 || pi.linkedin || pi.github) && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
            {contacts.map((c, i) => <span key={i}>{c}</span>)}
            {pi.linkedin && <span>LinkedIn: {pi.linkedin}</span>}
            {pi.github && <span>GitHub: {pi.github}</span>}
          </div>
        )}
      </div>

      {vis.has('summary') && pi.summary && (
        <Section title="Summary">
          <p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
        </Section>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-3">
            {resume.experience.map(exp => (
              <div key={exp.id} className="rounded-md bg-white p-3" style={{ border: '1px solid #f4f4f5' }}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-semibold" style={{ color: PRIMARY }}>{exp.position}</span>
                    {exp.company && <span className="text-sm" style={{ color: ACCENT }}> | {exp.company}</span>}
                    {exp.location && <span className="text-sm text-zinc-400"> , {exp.location}</span>}
                  </div>
                  <span className="shrink-0 text-xs text-zinc-400">{exp.period}</span>
                </div>
                {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-4">
                    {exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {vis.has('education') && resume.education.length > 0 && (
        <Section title="Education">
          <div className="space-y-3">
            {resume.education.map(edu => (
              <div key={edu.id} className="rounded-md bg-white p-3" style={{ border: '1px solid #f4f4f5' }}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold" style={{ color: PRIMARY }}>{edu.institution}</span>
                  <span className="shrink-0 text-xs text-zinc-400">{edu.period}</span>
                </div>
                <p className="text-sm text-zinc-600">{edu.degree}{edu.location ? ` , ${edu.location}` : ''}</p>
                {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                {edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-4">
                    {edu.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {vis.has('skills') && resume.skills.length > 0 && (
        <Section title="Skills">
          <div className="space-y-2">
            {resume.skills.map(skill => (
              <div key={skill.id}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">{skill.category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item, i) => (
                    <span key={i} className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: ACCENT }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {vis.has('projects') && resume.projects.length > 0 && (
        <Section title="Projects">
          <div className="space-y-3">
            {resume.projects.map(proj => (
              <div key={proj.id} className="rounded-md bg-white p-3" style={{ border: '1px solid #f4f4f5' }}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold" style={{ color: ACCENT }}>{proj.name}</span>
                  {proj.period && <span className="shrink-0 text-xs text-zinc-400">{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {proj.technologies.map((t, i) => <span key={i} className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600">{t}</span>)}
                  </div>
                )}
                {proj.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-4">
                    {proj.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {vis.has('certifications') && resume.certifications.length > 0 && (
        <Section title="Certifications">
          <div className="space-y-2">
            {resume.certifications.map(cert => (
              <div key={cert.id} className="flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-semibold" style={{ color: PRIMARY }}>{cert.name}</span>
                  {cert.issuer && <span className="text-sm text-zinc-600"> – {cert.issuer}</span>}
                </div>
                {cert.date && <span className="text-xs text-zinc-400">{cert.date}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {vis.has('languages') && resume.languages.length > 0 && (
        <Section title="Languages">
          <div className="flex flex-wrap gap-3">
            {resume.languages.map(lang => (
              <div key={lang.id} className="flex items-center gap-2 rounded-full bg-white px-3 py-1" style={{ border: '1px solid #e4e4e7' }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                <span className="text-sm font-medium" style={{ color: PRIMARY }}>{lang.language}</span>
                <span className="text-xs text-zinc-400">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {vis.has('awards') && resume.awards.length > 0 && (
        <Section title="Awards">
          <div className="space-y-2">
            {resume.awards.map(award => (
              <div key={award.id} className="rounded-md bg-white p-3" style={{ border: '1px solid #f4f4f5' }}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold" style={{ color: PRIMARY }}>{award.title}</span>
                  {award.date && <span className="text-xs text-zinc-400">{award.date}</span>}
                </div>
                {award.issuer && <p className="text-sm text-zinc-500">{award.issuer}</p>}
                {award.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}
