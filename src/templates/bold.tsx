import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

export function BoldTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-black px-8 py-8 text-white">
        <div className="flex items-center gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={80} className="shrink-0" style={{ border: '3px solid white' }} />}
          <div>
            <h1 className="text-4xl font-black tracking-tight">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-lg font-light text-zinc-400">{pi.title}</p>}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-400">
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

      <div className="p-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section>
            <h2 className="mb-3 border-b-4 border-black pb-1 text-lg font-black uppercase tracking-wider text-black">Summary</h2>
            <p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
          </div>
        )}

        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <h2 className="mb-3 border-b-4 border-black pb-1 text-lg font-black uppercase tracking-wider text-black">Experience</h2>
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-bold text-black">{exp.position}</span>
                      {exp.company && <span className="text-sm text-zinc-500"> | {exp.company}</span>}
                      {exp.location && <span className="text-sm text-zinc-400"> , {exp.location}</span>}
                    </div>
                    <span className="shrink-0 bg-black px-2 py-0.5 text-xs font-medium text-white">{exp.period}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-5">
                      {exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('education') && resume.education.length > 0 && (
          <div className="mb-6" data-section>
            <h2 className="mb-3 border-b-4 border-black pb-1 text-lg font-black uppercase tracking-wider text-black">Education</h2>
            <div className="space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-bold text-black">{edu.degree}</span>
                      {edu.institution && <span className="text-sm text-zinc-500"> – {edu.institution}</span>}
                      {edu.location && <span className="text-sm text-zinc-400"> , {edu.location}</span>}
                    </div>
                    <span className="shrink-0 text-xs text-zinc-400">{edu.period}</span>
                  </div>
                  {edu.gpa && <p className="text-sm text-zinc-500">GPA: {edu.gpa}</p>}
                  {edu.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-5">
                      {edu.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <h2 className="mb-3 border-b-4 border-black pb-1 text-lg font-black uppercase tracking-wider text-black">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.flatMap(skill =>
                skill.items.map((item, i) => (
                  <span key={`${skill.id}-${i}`} className="border-2 border-black px-3 py-1 text-xs font-bold text-black">{item}</span>
                ))
              )}
            </div>
          </div>
        )}

        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <h2 className="mb-3 border-b-4 border-black pb-1 text-lg font-black uppercase tracking-wider text-black">Projects</h2>
            <div className="space-y-4">
              {resume.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-bold text-black">{proj.name}</span>
                    {proj.period && <span className="shrink-0 text-xs text-zinc-400">{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => <span key={i} className="border border-zinc-300 px-2 py-0.5 text-[10px] font-medium text-zinc-500">{t}</span>)}
                    </div>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-5">
                      {proj.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <h2 className="mb-3 border-b-4 border-black pb-1 text-lg font-black uppercase tracking-wider text-black">Certifications</h2>
            <div className="space-y-2">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-black">{cert.name}</span>
                    {cert.issuer && <span className="text-sm text-zinc-500"> – {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="shrink-0 bg-black px-2 py-0.5 text-xs font-medium text-white">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <h2 className="mb-3 border-b-4 border-black pb-1 text-lg font-black uppercase tracking-wider text-black">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {resume.languages.map(lang => (
                <span key={lang.id} className="border-2 border-black px-3 py-1 text-xs font-bold text-black">{lang.language} – {lang.proficiency}</span>
              ))}
            </div>
          </div>
        )}

        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <h2 className="mb-3 border-b-4 border-black pb-1 text-lg font-black uppercase tracking-wider text-black">Awards</h2>
            <div className="space-y-3">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-bold text-black">{award.title}</span>
                      {award.issuer && <span className="text-sm text-zinc-500"> – {award.issuer}</span>}
                    </div>
                    {award.date && <span className="shrink-0 text-xs text-zinc-400">{award.date}</span>}
                  </div>
                  {award.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
