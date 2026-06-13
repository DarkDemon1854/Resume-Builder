import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const GRAY_700 = '#374151'
const BLUE_600 = '#2563eb'

export function ConsultantTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="mb-3 border-l-[3px] pl-3 text-sm font-bold uppercase tracking-wider" style={{ color: GRAY_700, borderColor: BLUE_600 }}>{title}</h2>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-6 h-1 w-full rounded" style={{ backgroundColor: BLUE_600 }} />
      <div className="mb-6">
        <div className="flex items-center gap-4">
          {pi.avatar && <AvatarImage src={pi.avatar} size={64} avatarStyle="circle" className="shrink-0" style={{ border: `2px solid ${BLUE_600}` }} />}
          <div>
            <h1 className="text-2xl font-bold" style={{ color: GRAY_700 }}>{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-0.5 text-sm font-medium" style={{ color: BLUE_600 }}>{pi.title}</p>}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
          {pi.linkedin && <span className="break-all">{pi.linkedin}</span>}
          {pi.github && <span className="break-all">{pi.github}</span>}
        </div>
      </div>

      {vis.has('summary') && pi.summary && (
        <div className="mb-6" data-section>
          <SectionHeader title="Summary" />
          <p className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
        </div>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-6" data-section>
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {resume.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold" style={{ color: GRAY_700 }}>{exp.position}</span>
                    {exp.company && <span className="text-sm text-gray-500"> | {exp.company}</span>}
                    {exp.location && <span className="text-sm text-gray-400">, {exp.location}</span>}
                  </div>
                  <span className="shrink-0 text-xs font-medium" style={{ color: BLUE_600 }}>{exp.period}</span>
                </div>
                {exp.description && <p className="mt-1 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: BLUE_600 }} />
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
              <div key={edu.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold" style={{ color: GRAY_700 }}>{edu.degree}</span>
                    {edu.institution && <span className="text-sm text-gray-500"> - {edu.institution}</span>}
                    {edu.location && <span className="text-sm text-gray-400">, {edu.location}</span>}
                  </div>
                  <span className="shrink-0 text-xs font-medium" style={{ color: BLUE_600 }}>{edu.period}</span>
                </div>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                {edu.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: BLUE_600 }} />
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
          <div className="space-y-1.5">
            {resume.skills.map(skill => (
              <div key={skill.id} className="flex text-sm">
                <span className="w-32 shrink-0 font-semibold" style={{ color: GRAY_700 }}>{skill.category}:</span>
                <span className="text-gray-600">{skill.items.join(', ')}</span>
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
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold" style={{ color: GRAY_700 }}>{proj.name}</span>
                  {proj.period && <span className="shrink-0 text-xs font-medium" style={{ color: BLUE_600 }}>{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-1 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && <p className="mt-0.5 text-xs text-gray-400">Tech: {proj.technologies.join(', ')}</p>}
                {proj.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: BLUE_600 }} />
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
              <div key={cert.id}>
                <span className="text-sm font-bold" style={{ color: GRAY_700 }}>{cert.name}</span>
                {(cert.issuer || cert.date) && <span className="text-sm text-gray-500">{cert.issuer && <> – {cert.issuer}</>}{cert.date && <> ({cert.date})</>}</span>}
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
              <div key={lang.id}>
                <span className="text-sm font-bold" style={{ color: GRAY_700 }}>{lang.language}</span>
                <span className="text-sm text-gray-500"> – {lang.proficiency}</span>
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
              <div key={award.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold" style={{ color: GRAY_700 }}>{award.title}</span>
                    {award.issuer && <span className="text-sm text-gray-500"> – {award.issuer}</span>}
                  </div>
                  {award.date && <span className="shrink-0 text-xs font-medium" style={{ color: BLUE_600 }}>{award.date}</span>}
                </div>
                {award.description && <p className="mt-0.5 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
