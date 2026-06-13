import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const BLUE = '#0066cc'
const TEAL = '#0d9488'

export function CleanTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-6">
        <div className="flex items-center gap-4">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={64} className="shrink-0" style={{ border: `2px solid ${BLUE}` }} />}
          <div>
            <h1 className="text-2xl font-bold" style={{ color: BLUE }}>{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-0.5 text-base" style={{ color: TEAL }}>{pi.title}</p>}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500">
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
        <div className="mt-3 h-0.5 w-full rounded" style={{ background: `linear-gradient(90deg, ${BLUE}, ${TEAL})` }} />
      </div>

      {vis.has('summary') && pi.summary && (
        <div className="mb-5" data-section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: BLUE }}>Summary</h2>
          <p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
        </div>
      )}

      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-5" data-section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: BLUE }}>Experience</h2>
          <div className="space-y-4">
            {resume.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-zinc-800">{exp.position}</span>
                    {exp.company && <span className="text-sm" style={{ color: TEAL }}> | {exp.company}</span>}
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
        </div>
      )}

      {vis.has('education') && resume.education.length > 0 && (
        <div className="mb-5" data-section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: BLUE }}>Education</h2>
          <div className="space-y-3">
            {resume.education.map(edu => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-zinc-800">{edu.degree}</span>
                    {edu.institution && <span className="text-sm text-zinc-500"> – {edu.institution}</span>}
                    {edu.location && <span className="text-sm text-zinc-400"> , {edu.location}</span>}
                  </div>
                  <span className="shrink-0 text-xs text-zinc-400">{edu.period}</span>
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
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: BLUE }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.flatMap(skill =>
              skill.items.map((item, i) => (
                <span key={`${skill.id}-${i}`} className="rounded-full border px-3 py-0.5 text-xs font-medium" style={{ borderColor: TEAL, color: TEAL }}>{item}</span>
              ))
            )}
          </div>
        </div>
      )}

      {vis.has('projects') && resume.projects.length > 0 && (
        <div className="mb-5" data-section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: BLUE }}>Projects</h2>
          <div className="space-y-4">
            {resume.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold" style={{ color: TEAL }}>{proj.name}</span>
                  {proj.period && <span className="shrink-0 text-xs text-zinc-400">{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {proj.technologies.map((t, i) => <span key={i} className="rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ borderColor: TEAL, color: TEAL }}>{t}</span>)}
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
        </div>
      )}

      {vis.has('certifications') && resume.certifications.length > 0 && (
        <div className="mb-5" data-section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: BLUE }}>Certifications</h2>
          <div className="space-y-1.5">
            {resume.certifications.map(cert => (
              <div key={cert.id} className="flex items-baseline justify-between text-sm">
                <div>
                  <span className="font-semibold" style={{ color: BLUE }}>{cert.name}</span>
                  {cert.issuer && <span className="text-zinc-600"> – {cert.issuer}</span>}
                </div>
                {cert.date && <span className="shrink-0 text-xs text-zinc-400">{cert.date}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {vis.has('languages') && resume.languages.length > 0 && (
        <div className="mb-5" data-section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: BLUE }}>Languages</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {resume.languages.map(lang => (
              <span key={lang.id} className="text-sm">
                <span className="font-semibold" style={{ color: BLUE }}>{lang.language}</span>
                <span className="text-zinc-500"> – {lang.proficiency}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {vis.has('awards') && resume.awards.length > 0 && (
        <div className="mb-5" data-section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: BLUE }}>Awards</h2>
          <div className="space-y-2">
            {resume.awards.map(award => (
              <div key={award.id}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-semibold" style={{ color: BLUE }}>{award.title}</span>
                    {award.issuer && <span className="text-sm text-zinc-500"> – {award.issuer}</span>}
                  </div>
                  {award.date && <span className="shrink-0 text-xs text-zinc-400">{award.date}</span>}
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
