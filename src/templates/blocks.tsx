import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#37352f'
const ACCENT = '#2383e2'
const SUBTLE_BG = '#f7f6f3'

export function BlocksTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)
  const contacts = [pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin && `LinkedIn: ${pi.linkedin}`, pi.github && `GitHub: ${pi.github}`].filter(Boolean)

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-2 flex items-center gap-2">
      <span className="text-sm" style={{ color: '#9b9a97' }}>&#9654;</span>
      <h2 className="text-sm font-semibold" style={{ color: PRIMARY }}>{title}</h2>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-6">
        <div className="flex items-center gap-4">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={56} className="shrink-0" />}
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-0.5 text-sm" style={{ color: '#787774' }}>{pi.title}</p>}
          </div>
        </div>
        {contacts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs" style={{ color: '#787774' }}>
            {contacts.map((c, i) => <span key={i} className="rounded-sm px-2 py-0.5" style={{ backgroundColor: SUBTLE_BG }}>{c}</span>)}
          </div>
        )}
        <div className="mt-4 h-px w-full" style={{ backgroundColor: '#e3e2de' }} />
      </div>

      {vis.has('summary') && pi.summary && (
        <div className="mb-5" data-section>
          <SectionHeader title="Summary" />
          <div className="ml-5 rounded-md p-3" style={{ backgroundColor: SUBTLE_BG }}>
            <p className="text-sm leading-relaxed" style={{ color: PRIMARY }} dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
          </div>
        </div>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Experience" />
          <div className="ml-5 space-y-3">
            {resume.experience.map(exp => (
              <div key={exp.id} className="rounded-md border p-3" style={{ borderColor: '#e3e2de' }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: PRIMARY }}>{exp.position}</h3>
                  <span className="shrink-0 text-xs" style={{ color: '#9b9a97' }}>{exp.period}</span>
                </div>
                {exp.company && <p className="text-sm" style={{ color: ACCENT }}>{exp.company}{exp.location ? ` , ${exp.location}` : ''}</p>}
                {exp.description && <p className="mt-1 text-sm" style={{ color: '#787774' }} dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-4">
                    {exp.highlights.map((h, i) => <li key={i} className="text-sm" style={{ color: '#787774' }} dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('education') && resume.education.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Education" />
          <div className="ml-5 space-y-3">
            {resume.education.map(edu => (
              <div key={edu.id} className="rounded-md border p-3" style={{ borderColor: '#e3e2de' }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: PRIMARY }}>{edu.institution}</h3>
                  <span className="text-xs" style={{ color: '#9b9a97' }}>{edu.period}</span>
                </div>
                <p className="text-sm" style={{ color: '#787774' }}>{edu.degree}{edu.location ? ` , ${edu.location}` : ''}</p>
                {edu.gpa && <p className="text-xs" style={{ color: '#9b9a97' }}>GPA: {edu.gpa}</p>}
                {edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-4">
                    {edu.highlights.map((h, i) => <li key={i} className="text-sm" style={{ color: '#787774' }} dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('skills') && resume.skills.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Skills" />
          <div className="ml-5 overflow-hidden rounded-md border" style={{ borderColor: '#e3e2de' }}>
            <table className="w-full text-sm">
              <tbody>
                {resume.skills.map(skill => (
                  <tr key={skill.id} style={{ borderBottom: '1px solid #e3e2de' }}>
                    <td className="w-28 shrink-0 px-3 py-2 font-medium" style={{ color: PRIMARY, backgroundColor: SUBTLE_BG }}>{skill.category}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {skill.items.map((item, i) => (
                          <span key={i} className="rounded-sm px-2 py-0.5 text-xs" style={{ backgroundColor: `${ACCENT}12`, color: ACCENT }}>{item}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {vis.has('projects') && resume.projects.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Projects" />
          <div className="ml-5 space-y-3">
            {resume.projects.map(proj => (
              <div key={proj.id} className="rounded-md border p-3" style={{ borderColor: '#e3e2de' }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: ACCENT }}>{proj.name}</h3>
                  {proj.period && <span className="text-xs" style={{ color: '#9b9a97' }}>{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-1 text-sm" style={{ color: '#787774' }} dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {proj.technologies.map((t, i) => <span key={i} className="rounded-sm px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: SUBTLE_BG, color: '#787774' }}>{t}</span>)}
                  </div>
                )}
                {proj.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-4">
                    {proj.highlights.map((h, i) => <li key={i} className="text-sm" style={{ color: '#787774' }} dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('certifications') && resume.certifications.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Certifications" />
          <div className="ml-5 overflow-hidden rounded-md border" style={{ borderColor: '#e3e2de' }}>
            {resume.certifications.map((cert, idx) => (
              <div key={cert.id} className="flex items-baseline justify-between px-3 py-2" style={{ borderBottom: idx < resume.certifications.length - 1 ? '1px solid #e3e2de' : 'none' }}>
                <span className="text-sm font-medium" style={{ color: PRIMARY }}>{cert.name}</span>
                {(cert.issuer || cert.date) && <span className="text-xs" style={{ color: '#9b9a97' }}>{cert.issuer}{cert.issuer && cert.date ? ' | ' : ''}{cert.date}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('languages') && resume.languages.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Languages" />
          <div className="ml-5 overflow-hidden rounded-md border" style={{ borderColor: '#e3e2de' }}>
            <table className="w-full text-sm">
              <tbody>
                {resume.languages.map(lang => (
                  <tr key={lang.id} style={{ borderBottom: '1px solid #e3e2de' }}>
                    <td className="px-3 py-2 font-medium" style={{ color: PRIMARY }}>{lang.language}</td>
                    <td className="px-3 py-2 text-right" style={{ color: '#9b9a97' }}>{lang.proficiency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {vis.has('awards') && resume.awards.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Awards" />
          <div className="ml-5 space-y-3">
            {resume.awards.map(award => (
              <div key={award.id} className="rounded-md border p-3" style={{ borderColor: '#e3e2de' }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: PRIMARY }}>{award.title}</h3>
                  {award.date && <span className="text-xs" style={{ color: '#9b9a97' }}>{award.date}</span>}
                </div>
                {award.issuer && <p className="text-sm" style={{ color: '#9b9a97' }}>{award.issuer}</p>}
                {award.description && <p className="mt-1 text-sm" style={{ color: '#787774' }} dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
