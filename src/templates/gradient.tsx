import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const ACCENT = '#a855f7'
const ACCENT2 = '#06b6d4'

export function GradientTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-2">
      <h2 className="bg-clip-text text-sm font-extrabold uppercase tracking-wider" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{title}</h2>
      <div className="h-0.5 flex-1" style={{ background: `linear-gradient(90deg, ${ACCENT}40, ${ACCENT2}40, transparent)` }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative overflow-hidden px-8 py-8 text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at top right, white, transparent)' }} />
        <div className="relative flex items-center gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={80} className="shrink-0" wrapperStyle={{ border: '3px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }} />}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-sm font-medium text-white/80">{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/70">
              {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin, pi.github].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
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
                    <span className="text-sm font-bold" style={{ color: ACCENT }}>{exp.position}</span>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm" style={{ color: ACCENT2 }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
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
                    <span className="text-sm font-bold" style={{ color: ACCENT }}>{edu.institution}</span>
                    <span className="text-xs text-zinc-400">{edu.period}</span>
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
            <SH title="Skills" />
            <div className="space-y-2">
              {resume.skills.map((skill, si) => (
                <div key={skill.id}>
                  <p className="mb-1 text-xs font-bold" style={{ color: si % 2 === 0 ? ACCENT : ACCENT2 }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => <span key={i} className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}>{item}</span>)}
                  </div>
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
                <div key={proj.id} className="rounded-lg p-3" style={{ border: `1px solid ${ACCENT}20`, background: `linear-gradient(135deg, ${ACCENT}05, ${ACCENT2}05)` }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: ACCENT }}>{proj.name}</span>
                    {proj.period && <span className="text-xs text-zinc-400">{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <div className="mt-1 flex flex-wrap gap-1">{proj.technologies.map((t, i) => <span key={i} className="rounded px-2 py-0.5 text-[10px] font-medium text-white" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}>{t}</span>)}</div>}
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
                  <div><span className="font-bold" style={{ color: ACCENT }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs text-zinc-400">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-2">
              {resume.languages.map(lang => <div key={lang.id} className="flex items-center gap-2 rounded-full px-3 py-1 text-sm" style={{ background: `linear-gradient(90deg, ${ACCENT}15, ${ACCENT2}15)` }}><span className="font-medium" style={{ color: ACCENT }}>{lang.language}</span><span className="text-zinc-400">{lang.proficiency}</span></div>)}
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
                    <div><span className="text-sm font-bold" style={{ color: ACCENT }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
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
