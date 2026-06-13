import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const CORAL = '#ff6b6b'
const NEUTRAL = '#1a1a1a'
const GRAY = '#374151'

export function DesignerTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-3">
      <h2 className="text-sm font-extrabold uppercase tracking-widest" style={{ color: CORAL }}>{title}</h2>
      <div className="h-0.5 flex-1" style={{ background: `linear-gradient(90deg, ${CORAL}, transparent)` }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative overflow-hidden bg-zinc-900 px-8 py-8 text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10" style={{ backgroundColor: CORAL }} />
        <div className="flex items-center gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={80} className="shrink-0" wrapperStyle={{ border: `3px solid ${CORAL}` }} />}
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-sm font-medium" style={{ color: CORAL }}>{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
              {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
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
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: CORAL }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: NEUTRAL }}>{exp.position}</span>
                    <span className="shrink-0 text-xs font-medium" style={{ color: CORAL }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm font-medium" style={{ color: CORAL }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
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
                    <span className="text-sm font-bold" style={{ color: NEUTRAL }}>{edu.institution}</span>
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
              {resume.skills.map(skill => (
                <div key={skill.id}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: CORAL }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => <span key={i} className="rounded px-2.5 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: NEUTRAL }}>{item}</span>)}
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
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: CORAL }}>{proj.name}</span>
                    {proj.period && <span className="text-xs text-zinc-400">{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <div className="mt-1 flex flex-wrap gap-1">{proj.technologies.map((t, i) => <span key={i} className="rounded px-2 py-0.5 text-[10px] text-white" style={{ backgroundColor: CORAL }}>{t}</span>)}</div>}
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
                  <div><span className="font-bold" style={{ color: NEUTRAL }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="shrink-0 text-xs text-zinc-400">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-2">
              {resume.languages.map(lang => <span key={lang.id} className="rounded px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: NEUTRAL }}>{lang.language} — {lang.proficiency}</span>)}
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
                    <div><span className="text-sm font-bold" style={{ color: NEUTRAL }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="shrink-0 text-xs text-zinc-400">{award.date}</span>}
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
