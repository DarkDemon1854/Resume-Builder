import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const GOLD = '#d4af37'
const PRIMARY = '#1a1a1a'

export function ElegantTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3">
      <h2 className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>{title}</h2>
      <div className="mt-1 h-px" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div className="mb-6 border-b pb-8 pt-8 text-center" style={{ borderColor: GOLD }}>
        {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={80} className="mx-auto mb-4" wrapperStyle={{ border: `2px solid ${GOLD}` }} />}
        <h1 className="text-3xl font-bold tracking-widest" style={{ color: PRIMARY }}>{pi.fullName || 'Your Name'}</h1>
        {pi.title && <p className="mt-2 text-sm uppercase tracking-[0.3em]" style={{ color: GOLD }}>{pi.title}</p>}
        <div className="mx-auto mt-4 max-w-lg flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-zinc-500">
          {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>
      <div className="px-8 pb-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Profile" /><p className="text-sm leading-relaxed text-zinc-600 italic" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{exp.position}</span>
                    <span className="shrink-0 text-xs" style={{ color: GOLD }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm italic text-zinc-500">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
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
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{edu.institution}</span>
                    <span className="text-xs" style={{ color: GOLD }}>{edu.period}</span>
                  </div>
                  <p className="text-sm italic text-zinc-500">{edu.degree}</p>
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Expertise" />
            <div className="space-y-1.5">
              {resume.skills.map(skill => (
                <div key={skill.id} className="flex text-sm">
                  <span className="w-32 shrink-0 font-bold" style={{ color: PRIMARY }}>{skill.category}:</span>
                  <span className="text-zinc-600 italic">{skill.items.join(', ')}</span>
                </div>
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
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{proj.name}</span>
                    {proj.period && <span className="text-xs" style={{ color: GOLD }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <p className="mt-0.5 text-xs italic text-zinc-500">{proj.technologies.join(', ')}</p>}
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
                  <div><span className="font-bold" style={{ color: PRIMARY }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500 italic"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs" style={{ color: GOLD }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-bold" style={{ color: PRIMARY }}>{lang.language}</span><span className="text-zinc-500 italic"> — {lang.proficiency}</span></span>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Honours & Awards" />
            <div className="space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{award.title}</span>{award.issuer && <span className="text-sm italic text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs" style={{ color: GOLD }}>{award.date}</span>}
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
