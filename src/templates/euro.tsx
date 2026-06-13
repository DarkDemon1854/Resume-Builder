import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const BLUE = '#1e40af'

export function EuroTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <h2 className="mb-3 border-b-2 pb-1 text-sm font-bold uppercase tracking-wider text-white" style={{ borderColor: 'rgba(255,255,255,0.4)', backgroundColor: BLUE, paddingLeft: '12px', paddingTop: '4px', paddingBottom: '4px' }}>{title}</h2>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center gap-5 px-8 py-6" style={{ backgroundColor: BLUE }}>
        {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={80} className="shrink-0" wrapperStyle={{ border: '3px solid white' }} />}
        <div className="text-white">
          <h1 className="text-2xl font-bold">{pi.fullName || 'Your Name'}</h1>
          {pi.title && <p className="mt-0.5 text-sm font-medium text-blue-200">{pi.title}</p>}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-100">
            {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>
      <div className="p-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Profile" /><p className="mt-2 text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Work Experience" />
            <div className="mt-2 space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id} className="flex gap-4">
                  <div className="w-24 shrink-0 text-right text-xs text-zinc-400">{exp.period}</div>
                  <div className="flex-1 border-l-2 pl-4" style={{ borderColor: BLUE }}>
                    <p className="text-sm font-bold" style={{ color: BLUE }}>{exp.position}</p>
                    {exp.company && <p className="text-sm text-zinc-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
                    {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                    {exp.highlights.length > 0 && <ul className="mt-1 list-disc pl-4">{exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}</ul>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('education') && resume.education.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Education" />
            <div className="mt-2 space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id} className="flex gap-4">
                  <div className="w-24 shrink-0 text-right text-xs text-zinc-400">{edu.period}</div>
                  <div className="flex-1 border-l-2 pl-4" style={{ borderColor: BLUE }}>
                    <p className="text-sm font-bold" style={{ color: BLUE }}>{edu.degree}</p>
                    <p className="text-sm text-zinc-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Skills" />
            <div className="mt-2 space-y-1.5">
              {resume.skills.map(skill => (
                <div key={skill.id} className="flex text-sm">
                  <span className="w-32 shrink-0 font-semibold" style={{ color: BLUE }}>{skill.category}:</span>
                  <span className="text-zinc-600">{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Projects" />
            <div className="mt-2 space-y-3">
              {resume.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: BLUE }}>{proj.name}</span>
                    {proj.period && <span className="text-xs text-zinc-400">{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <p className="mt-0.5 text-xs text-zinc-500">Tech: {proj.technologies.join(', ')}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Certifications" />
            <div className="mt-2 space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between text-sm">
                  <div><span className="font-bold" style={{ color: BLUE }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs text-zinc-400">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-bold" style={{ color: BLUE }}>{lang.language}</span><span className="text-zinc-500"> — {lang.proficiency}</span></span>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Awards" />
            <div className="mt-2 space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: BLUE }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs text-zinc-400">{award.date}</span>}
                  </div>
                  {award.description && <p className="mt-0.5 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
