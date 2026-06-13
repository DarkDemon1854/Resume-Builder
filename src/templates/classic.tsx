import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

export function ClassicTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="mb-2 border-b border-zinc-300 pb-1 text-sm font-bold uppercase tracking-wider text-zinc-800">{title}</h2>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-6 border-b-2 border-zinc-800 pb-4">
        <div className="flex items-center justify-center gap-4">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={64} className="shrink-0" />}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-lg text-zinc-600">{pi.title}</p>}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-500">
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
        </div>
      </div>

      {vis.has('summary') && pi.summary && (
        <div className="mb-5" data-section>
          <SectionHeader title="Summary" />
          <p className="text-sm text-zinc-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
        </div>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Experience" />
          <div className="space-y-3">
            {resume.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-semibold text-zinc-800 text-sm">{exp.position}</span>
                    {exp.company && <span className="text-sm text-zinc-600"> at {exp.company}</span>}
                    {exp.location && <span className="text-sm text-zinc-400"> , {exp.location}</span>}
                  </div>
                  <span className="text-xs text-zinc-400">{exp.period}</span>
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
        </div>
      )}

      {vis.has('education') && resume.education.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {resume.education.map(edu => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-semibold text-zinc-800 text-sm">{edu.degree}</span>
                    {edu.institution && <span className="text-sm text-zinc-600"> - {edu.institution}</span>}
                    {edu.location && <span className="text-sm text-zinc-400"> , {edu.location}</span>}
                  </div>
                  <span className="text-xs text-zinc-400">{edu.period}</span>
                </div>
                {edu.gpa && <p className="text-sm text-zinc-500">GPA: {edu.gpa}</p>}
                {edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-4">
                    {edu.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
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
          <div className="space-y-1">
            {resume.skills.map(skill => (
              <div key={skill.id} className="flex text-sm">
                <span className="font-medium text-zinc-700 w-28 shrink-0">{skill.category}:</span>
                <span className="text-zinc-600">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('projects') && resume.projects.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {resume.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-zinc-800 text-sm">{proj.name}</span>
                  {proj.period && <span className="text-xs text-zinc-400">{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && <p className="mt-0.5 text-xs text-zinc-400">Tech: {proj.technologies.join(', ')}</p>}
                {proj.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-4">
                    {proj.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
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
          <div className="space-y-1">
            {resume.certifications.map(cert => (
              <div key={cert.id}>
                <span className="font-semibold text-zinc-800 text-sm">{cert.name}</span>
                {(cert.issuer || cert.date) && <span className="text-sm text-zinc-600">{cert.issuer && <> – {cert.issuer}</>}{cert.date && <> ({cert.date})</>}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('languages') && resume.languages.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Languages" />
          <div className="space-y-1">
            {resume.languages.map(lang => (
              <div key={lang.id}>
                <span className="font-semibold text-zinc-800 text-sm">{lang.language}</span>
                <span className="text-sm text-zinc-600"> – {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('awards') && resume.awards.length > 0 && (
        <div className="mb-5" data-section>
          <SectionHeader title="Awards" />
          <div className="space-y-2">
            {resume.awards.map(award => (
              <div key={award.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-semibold text-zinc-800">{award.title}</span>
                    {award.issuer && <span className="text-sm text-zinc-500"> – {award.issuer}</span>}
                  </div>
                  {award.date && <span className="text-xs text-zinc-400">{award.date}</span>}
                </div>
                {award.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
