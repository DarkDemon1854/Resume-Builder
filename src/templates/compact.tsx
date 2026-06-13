import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const LEFT_SECTIONS = new Set(['skills', 'languages', 'certifications', 'awards'])

export function CompactTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = resume.visibleSections

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="border-b border-zinc-200 px-6 py-4">
        <div className="flex items-center gap-3">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={48} className="shrink-0" />}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-zinc-900">{pi.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-500">
              {pi.title && <span className="font-medium text-zinc-700">{pi.title}</span>}
              {pi.age && <><span className="text-zinc-300">|</span><span>{pi.age}</span></>}
              {pi.gender && <><span className="text-zinc-300">|</span><span>{pi.gender}</span></>}
              {pi.hometown && <><span className="text-zinc-300">|</span><span>{pi.hometown}</span></>}
              {pi.maritalStatus && <><span className="text-zinc-300">|</span><span>{pi.maritalStatus}</span></>}
              {pi.yearsOfExperience && <><span className="text-zinc-300">|</span><span>{pi.yearsOfExperience}</span></>}
              {pi.educationLevel && <><span className="text-zinc-300">|</span><span>{pi.educationLevel}</span></>}
              {pi.email && <><span className="text-zinc-300">|</span><span>{pi.email}</span></>}
              {pi.phone && <><span className="text-zinc-300">|</span><span>{pi.phone}</span></>}
              {pi.wechat && <><span className="text-zinc-300">|</span><span>{pi.wechat}</span></>}
              {pi.location && <><span className="text-zinc-300">|</span><span>{pi.location}</span></>}
              {pi.website && <><span className="text-zinc-300">|</span><span>{pi.website}</span></>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-[32%] shrink-0 border-r border-zinc-100 bg-zinc-50 p-4">
          {vis.includes('skills') && resume.skills.length > 0 && (
            <div className="mb-4" data-section>
              <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Skills</h2>
              <div className="space-y-1.5">
                {resume.skills.map(skill => (
                  <div key={skill.id}>
                    <p className="text-[10px] font-semibold text-zinc-600">{skill.category}</p>
                    <p className="text-[10px] text-zinc-500">{skill.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {vis.includes('languages') && resume.languages.length > 0 && (
            <div className="mb-4" data-section>
              <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Languages</h2>
              <div className="space-y-0.5">
                {resume.languages.map(lang => (
                  <div key={lang.id} className="flex items-center justify-between text-[10px]">
                    <span className="font-medium text-zinc-700">{lang.language}</span>
                    <span className="text-zinc-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {vis.includes('certifications') && resume.certifications.length > 0 && (
            <div className="mb-4" data-section>
              <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Certifications</h2>
              <div className="space-y-1">
                {resume.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-[10px] font-semibold text-zinc-700">{cert.name}</p>
                    {(cert.issuer || cert.date) && <p className="text-[9px] text-zinc-400">{cert.issuer}{cert.date ? ` (${cert.date})` : ''}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {vis.includes('awards') && resume.awards.length > 0 && (
            <div className="mb-4" data-section>
              <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Awards</h2>
              <div className="space-y-1.5">
                {resume.awards.map(award => (
                  <div key={award.id}>
                    <p className="text-[10px] font-semibold text-zinc-700">{award.title}</p>
                    {award.issuer && <p className="text-[9px] text-zinc-500">{award.issuer}</p>}
                    {award.date && <p className="text-[9px] text-zinc-400">{award.date}</p>}
                    {award.description && <p className="text-[9px] text-zinc-400" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 p-4">
          {vis.includes('summary') && pi.summary && (
            <div className="mb-4" data-section>
              <h2 className="mb-1.5 border-b border-zinc-200 pb-0.5 text-xs font-bold uppercase tracking-wider text-zinc-700">Summary</h2>
              <p className="text-xs leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
            </div>
          )}
          {vis.includes('experience') && resume.experience.length > 0 && (
            <div className="mb-4" data-section>
              <h2 className="mb-1.5 border-b border-zinc-200 pb-0.5 text-xs font-bold uppercase tracking-wider text-zinc-700">Experience</h2>
              <div className="space-y-2.5">
                {resume.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs font-bold text-zinc-800">{exp.position}</span>
                        {exp.company && <span className="text-xs text-zinc-500"> | {exp.company}</span>}
                        {exp.location && <span className="text-xs text-zinc-400">, {exp.location}</span>}
                      </div>
                      <span className="shrink-0 text-[10px] text-zinc-400">{exp.period}</span>
                    </div>
                    {exp.description && <p className="mt-0.5 text-xs text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                    {exp.highlights.length > 0 && (
                      <ul className="mt-0.5 list-disc pl-3.5">
                        {exp.highlights.map((h, i) => <li key={i} className="text-xs text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {vis.includes('education') && resume.education.length > 0 && (
            <div className="mb-4" data-section>
              <h2 className="mb-1.5 border-b border-zinc-200 pb-0.5 text-xs font-bold uppercase tracking-wider text-zinc-700">Education</h2>
              <div className="space-y-2">
                {resume.education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs font-bold text-zinc-800">{edu.degree}</span>
                        {edu.institution && <span className="text-xs text-zinc-500"> – {edu.institution}</span>}
                        {edu.location && <span className="text-xs text-zinc-400">, {edu.location}</span>}
                      </div>
                      <span className="shrink-0 text-[10px] text-zinc-400">{edu.period}</span>
                    </div>
                    {edu.gpa && <p className="text-[10px] text-zinc-500">GPA: {edu.gpa}</p>}
                    {edu.highlights.length > 0 && (
                      <ul className="mt-0.5 list-disc pl-3.5">
                        {edu.highlights.map((h, i) => <li key={i} className="text-xs text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {vis.includes('projects') && resume.projects.length > 0 && (
            <div className="mb-4" data-section>
              <h2 className="mb-1.5 border-b border-zinc-200 pb-0.5 text-xs font-bold uppercase tracking-wider text-zinc-700">Projects</h2>
              <div className="space-y-2">
                {resume.projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-zinc-800">{proj.name}</span>
                      {proj.period && <span className="shrink-0 text-[10px] text-zinc-400">{proj.period}</span>}
                    </div>
                    {proj.description && <p className="mt-0.5 text-xs text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                    {proj.technologies.length > 0 && <p className="mt-0.5 text-[10px] text-zinc-400">Tech: {proj.technologies.join(', ')}</p>}
                    {proj.highlights.length > 0 && (
                      <ul className="mt-0.5 list-disc pl-3.5">
                        {proj.highlights.map((h, i) => <li key={i} className="text-xs text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
