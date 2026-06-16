import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#1e293b'
const ACCENT = '#8b5cf6'
const ALT_BG = '#f5f3ff'

export function ZigzagTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title, alt = false }: { title: string; alt?: boolean }) => (
    <div className="mb-3 -mx-8 px-8 py-2" style={{ backgroundColor: alt ? ALT_BG : `${ACCENT}10` }}>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rotate-45 shrink-0" style={{ backgroundColor: ACCENT }} />
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>{title}</h2>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] overflow-hidden bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative overflow-hidden" style={{ backgroundColor: PRIMARY }}>
        <div className="absolute inset-0">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="absolute h-full w-1 opacity-10" style={{ left: `${String(20 * i)}%`, backgroundColor: ACCENT }} />
          ))}
        </div>
        <div className="relative flex items-center gap-5 px-8 py-7 text-white">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={72} className="shrink-0" wrapperStyle={{ border: `3px solid ${ACCENT}` }} />}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-0.5 text-sm font-medium" style={{ color: ACCENT }}>{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
              {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 pb-8 pt-4">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Summary" alt={false} /><p className="mt-2 text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Experience" alt={true} />
            <div className="mt-2 space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{exp.position}</span>{exp.company && <span className="text-sm" style={{ color: ACCENT }}> | {exp.company}</span>}</div>
                    <span className="shrink-0 rotate-1 rounded px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: ACCENT }}>{exp.period}</span>
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
            <SH title="Education" alt={false} />
            <div className="mt-2 space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{edu.institution}</span></div>
                    <span className="text-xs" style={{ color: ACCENT }}>{edu.period}</span>
                  </div>
                  <p className="text-sm text-zinc-600">{edu.degree}</p>
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Skills" alt={true} />
            <div className="mt-2 space-y-2">
              {resume.skills.map(skill => (
                <div key={skill.id}>
                  <p className="mb-1 text-xs font-bold" style={{ color: PRIMARY }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => <span key={i} className="rounded px-2.5 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: ACCENT }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Projects" alt={false} />
            <div className="mt-2 space-y-3">
              {resume.projects.map(proj => (
                <div key={proj.id} className="rounded-lg p-3" style={{ border: `1px solid ${ACCENT}30`, borderLeft: `3px solid ${ACCENT}` }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{proj.name}</span>
                    {proj.period && <span className="text-xs" style={{ color: ACCENT }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <div className="mt-1 flex flex-wrap gap-1">{proj.technologies.map((t, i) => <span key={i} className="rounded px-2 py-0.5 text-[10px] text-white font-semibold" style={{ backgroundColor: ACCENT }}>{t}</span>)}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Certifications" alt={true} />
            <div className="mt-2 space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between text-sm">
                  <div><span className="font-bold" style={{ color: PRIMARY }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs" style={{ color: ACCENT }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" alt={false} />
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-bold" style={{ color: PRIMARY }}>{lang.language}</span><span className="text-zinc-500"> — {lang.proficiency}</span></span>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Awards" alt={true} />
            <div className="mt-2 space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs" style={{ color: ACCENT }}>{award.date}</span>}
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
