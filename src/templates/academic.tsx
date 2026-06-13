import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

export function AcademicTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)
  const contacts = [pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean)

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: '"Computer Modern", "CMU Serif", Georgia, "Times New Roman", serif' }}>
      <div className="mb-6">
        <div className={pi.avatar ? 'flex items-center gap-4' : 'text-center'}>
          {pi.avatar && (
            <AvatarImage src={pi.avatar} size={64} avatarStyle="circle" wrapperClassName="shrink-0 overflow-hidden" />
          )}
          <div>
            <h1 className="text-2xl font-bold text-zinc-900" style={{ letterSpacing: '0.02em' }}>{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-0.5 text-base text-zinc-700 italic">{pi.title}</p>}
            {contacts.length > 0 && (
              <p className="mt-1.5 text-xs text-zinc-600">
                {contacts.map((c, i) => <span key={i}>{c}{i < contacts.length - 1 ? ' · ' : ''}</span>)}
              </p>
            )}
          </div>
        </div>
        <div className="mt-3 border-b-2 border-zinc-800" />
      </div>

      {vis.has('summary') && pi.summary && (
        <div className="mb-4" data-section>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-800" style={{ borderBottom: '1px solid #d4d4d8', paddingBottom: '2px' }}>Summary</h2>
          <p className="text-sm leading-relaxed text-zinc-600 indent-8" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
        </div>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-4" data-section>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-800" style={{ borderBottom: '1px solid #d4d4d8', paddingBottom: '2px' }}>Experience</h2>
          <div className="space-y-2.5">
            {resume.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-zinc-800">{exp.position}</span>
                    {exp.company && <span className="text-sm text-zinc-600">, {exp.company}</span>}
                    {exp.location && <span className="text-sm text-zinc-500">, {exp.location}</span>}
                  </div>
                  <span className="shrink-0 text-xs text-zinc-500">{exp.period}</span>
                </div>
                {exp.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                {exp.highlights.length > 0 && (
                  <ul className="mt-0.5 list-disc pl-5">
                    {exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('education') && resume.education.length > 0 && (
        <div className="mb-4" data-section>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-800" style={{ borderBottom: '1px solid #d4d4d8', paddingBottom: '2px' }}>Education</h2>
          <div className="space-y-2.5">
            {resume.education.map(edu => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-zinc-800">{edu.degree}</span>
                  </div>
                  <span className="shrink-0 text-xs text-zinc-500">{edu.period}</span>
                </div>
                <p className="text-sm text-zinc-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                {edu.highlights.length > 0 && (
                  <ul className="mt-0.5 list-disc pl-5">
                    {edu.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('skills') && resume.skills.length > 0 && (
        <div className="mb-4" data-section>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-800" style={{ borderBottom: '1px solid #d4d4d8', paddingBottom: '2px' }}>Skills</h2>
          <div className="space-y-0.5">
            {resume.skills.map(skill => (
              <p key={skill.id} className="text-sm text-zinc-600">
                <span className="font-bold text-zinc-700">{skill.category}: </span>
                {skill.items.join(', ')}
              </p>
            ))}
          </div>
        </div>
      )}

      {vis.has('projects') && resume.projects.length > 0 && (
        <div className="mb-4" data-section>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-800" style={{ borderBottom: '1px solid #d4d4d8', paddingBottom: '2px' }}>Projects</h2>
          <div className="space-y-2.5">
            {resume.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-zinc-800">{proj.name}</span>
                    {proj.url && <span className="text-xs text-zinc-500 ml-1">[{proj.url}]</span>}
                  </div>
                  {proj.period && <span className="shrink-0 text-xs text-zinc-500">{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && <p className="text-xs text-zinc-500 italic">Technologies: {proj.technologies.join(', ')}</p>}
                {proj.highlights.length > 0 && (
                  <ul className="mt-0.5 list-disc pl-5">
                    {proj.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('certifications') && resume.certifications.length > 0 && (
        <div className="mb-4" data-section>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-800" style={{ borderBottom: '1px solid #d4d4d8', paddingBottom: '2px' }}>Certifications</h2>
          <div className="space-y-1">
            {resume.certifications.map(cert => (
              <p key={cert.id} className="text-sm text-zinc-600">
                <span className="font-bold text-zinc-700">{cert.name}</span>
                {cert.issuer && <span>, {cert.issuer}</span>}
                {cert.date && <span className="text-zinc-500"> ({cert.date})</span>}
              </p>
            ))}
          </div>
        </div>
      )}

      {vis.has('languages') && resume.languages.length > 0 && (
        <div className="mb-4" data-section>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-800" style={{ borderBottom: '1px solid #d4d4d8', paddingBottom: '2px' }}>Languages</h2>
          <p className="text-sm text-zinc-600">
            {resume.languages.map((lang, i) => (
              <span key={lang.id}>
                <span className="font-bold text-zinc-700">{lang.language}</span>
                <span> ({lang.proficiency})</span>
                {i < resume.languages.length - 1 ? '; ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}

      {vis.has('awards') && resume.awards.length > 0 && (
        <div className="mb-4" data-section>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-800" style={{ borderBottom: '1px solid #d4d4d8', paddingBottom: '2px' }}>Awards</h2>
          <div className="space-y-2">
            {resume.awards.map(award => (
              <div key={award.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-zinc-800">{award.title}</span>
                    {award.issuer && <span className="text-sm text-zinc-600">, {award.issuer}</span>}
                  </div>
                  {award.date && <span className="shrink-0 text-xs text-zinc-500">{award.date}</span>}
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
