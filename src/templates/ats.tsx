import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

export function AtsTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)
  const contacts = [pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean)

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="mb-1.5 border-b border-black pb-0.5 text-base font-bold uppercase text-black">{title}</h2>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className={`mb-4 ${pi.avatar ? 'flex items-center gap-4' : 'text-center'}`}>
        {pi.avatar && <AvatarImage src={pi.avatar} size={64} avatarStyle="circle" wrapperClassName="shrink-0 overflow-hidden" />}
        <div>
          <h1 className="text-2xl font-bold text-black">{pi.fullName || 'Your Name'}</h1>
          {pi.title && <p className="mt-0.5 text-base text-zinc-800">{pi.title}</p>}
          {contacts.length > 0 && <p className="mt-1 text-sm text-zinc-700">{contacts.join(' | ')}</p>}
          {(pi.linkedin || pi.github) && (
            <p className="mt-0.5 text-sm text-zinc-700">
              {[pi.linkedin && `LinkedIn: ${pi.linkedin}`, pi.github && `GitHub: ${pi.github}`].filter(Boolean).join(' | ')}
            </p>
          )}
        </div>
      </div>

      <hr className="mb-4 border-black" />

      {vis.has('summary') && pi.summary && (
        <div className="mb-4" data-section>
          <SectionHeader title="Summary" />
          <p className="text-sm leading-relaxed text-zinc-700" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
        </div>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-4" data-section>
          <SectionHeader title="Experience" />
          <div className="space-y-3">
            {resume.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-black">{exp.position}</span>
                    {exp.company && <span className="text-sm text-zinc-700">, {exp.company}</span>}
                    {exp.location && <span className="text-sm text-zinc-500">, {exp.location}</span>}
                  </div>
                  <span className="shrink-0 text-sm text-zinc-600">{exp.period}</span>
                </div>
                {exp.description && <p className="mt-0.5 text-sm text-zinc-700" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-5">
                    {exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-700" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('education') && resume.education.length > 0 && (
        <div className="mb-4" data-section>
          <SectionHeader title="Education" />
          <div className="space-y-2">
            {resume.education.map(edu => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-black">{edu.degree}</span>
                    {edu.institution && <span className="text-sm text-zinc-700">, {edu.institution}</span>}
                    {edu.location && <span className="text-sm text-zinc-500">, {edu.location}</span>}
                  </div>
                  <span className="shrink-0 text-sm text-zinc-600">{edu.period}</span>
                </div>
                {edu.gpa && <p className="text-sm text-zinc-600">GPA: {edu.gpa}</p>}
                {edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-5">
                    {edu.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-700" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('skills') && resume.skills.length > 0 && (
        <div className="mb-4" data-section>
          <SectionHeader title="Skills" />
          <div className="space-y-1">
            {resume.skills.map(skill => (
              <p key={skill.id} className="text-sm text-zinc-700">
                <span className="font-bold text-black">{skill.category}: </span>
                {skill.items.join(', ')}
              </p>
            ))}
          </div>
        </div>
      )}

      {vis.has('projects') && resume.projects.length > 0 && (
        <div className="mb-4" data-section>
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {resume.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-black">{proj.name}</span>
                  {proj.period && <span className="shrink-0 text-sm text-zinc-600">{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-0.5 text-sm text-zinc-700" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && <p className="text-sm text-zinc-600">Technologies: {proj.technologies.join(', ')}</p>}
                {proj.highlights.length > 0 && (
                  <ul className="mt-1 list-disc pl-5">
                    {proj.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-700" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('certifications') && resume.certifications.length > 0 && (
        <div className="mb-4" data-section>
          <SectionHeader title="Certifications" />
          <div className="space-y-1">
            {resume.certifications.map(cert => (
              <p key={cert.id} className="text-sm text-zinc-700">
                <span className="font-bold text-black">{cert.name}</span>
                {cert.issuer && <span> - {cert.issuer}</span>}
                {cert.date && <span> ({cert.date})</span>}
              </p>
            ))}
          </div>
        </div>
      )}

      {vis.has('languages') && resume.languages.length > 0 && (
        <div className="mb-4" data-section>
          <SectionHeader title="Languages" />
          <p className="text-sm text-zinc-700">
            {resume.languages.map((lang, i) => (
              <span key={lang.id}>{lang.language} ({lang.proficiency}){i < resume.languages.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
        </div>
      )}

      {vis.has('awards') && resume.awards.length > 0 && (
        <div className="mb-4" data-section>
          <SectionHeader title="Awards" />
          <div className="space-y-2">
            {resume.awards.map(award => (
              <div key={award.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-black">{award.title}</span>
                    {award.issuer && <span className="text-sm text-zinc-600"> - {award.issuer}</span>}
                  </div>
                  {award.date && <span className="shrink-0 text-sm text-zinc-600">{award.date}</span>}
                </div>
                {award.description && <p className="mt-0.5 text-sm text-zinc-700" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
