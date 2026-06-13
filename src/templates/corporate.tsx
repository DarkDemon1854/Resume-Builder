import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const NAVY = '#0f172a'
const BLUE = '#2563eb'

export function CorporateTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <h2 className="mb-3 border-l-4 pl-3 text-sm font-bold uppercase tracking-wider" style={{ color: NAVY, borderColor: BLUE }}>{title}</h2>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="px-8 py-7" style={{ backgroundColor: NAVY }}>
        <div className="flex items-center gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={72} className="shrink-0" wrapperStyle={{ border: `3px solid ${BLUE}` }} />}
          <div className="text-white">
            <h1 className="text-3xl font-extrabold tracking-tight">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-sm font-medium" style={{ color: '#93c5fd' }}>{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70">
              {[pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin, pi.github].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel].some(Boolean) && (
          <div className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600">
            {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        )}
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Summary" /><p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: NAVY }}>{exp.position}</span>{exp.company && <span className="text-sm text-zinc-500"> | {exp.company}</span>}{exp.location && <span className="text-sm text-zinc-400">, {exp.location}</span>}</div>
                    <span className="shrink-0 text-xs font-medium" style={{ color: BLUE }}>{exp.period}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && <ul className="mt-1 list-disc pl-4">{exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}</ul>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('education') && resume.education.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Education" />
            <div className="space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: NAVY }}>{edu.degree}</span>{edu.institution && <span className="text-sm text-zinc-500"> — {edu.institution}</span>}</div>
                    <span className="shrink-0 text-xs font-medium" style={{ color: BLUE }}>{edu.period}</span>
                  </div>
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                  {edu.highlights.length > 0 && <ul className="mt-1 list-disc pl-4">{edu.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}</ul>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Skills" />
            <div className="space-y-1.5">
              {resume.skills.map(skill => (
                <div key={skill.id} className="flex text-sm"><span className="w-32 shrink-0 font-semibold" style={{ color: NAVY }}>{skill.category}:</span><span className="text-zinc-600">{skill.items.join(', ')}</span></div>
              ))}
            </div>
          </div>
        )}
        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Projects" />
            <div className="space-y-3">
              {resume.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: NAVY }}>{proj.name}</span>
                    {proj.period && <span className="shrink-0 text-xs font-medium" style={{ color: BLUE }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <p className="mt-0.5 text-xs text-zinc-400">Tech: {proj.technologies.join(', ')}</p>}
                  {proj.highlights.length > 0 && <ul className="mt-1 list-disc pl-4">{proj.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}</ul>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Certifications" />
            <div className="space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between text-sm">
                  <div><span className="font-bold" style={{ color: NAVY }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="shrink-0 text-xs font-medium" style={{ color: BLUE }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-bold" style={{ color: NAVY }}>{lang.language}</span><span className="text-zinc-500"> — {lang.proficiency}</span></span>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Awards" />
            <div className="space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: NAVY }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="shrink-0 text-xs font-medium" style={{ color: BLUE }}>{award.date}</span>}
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
