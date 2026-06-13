import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#0f172a'
const ACCENT = '#0891b2'
const BODY = '#334155'
const MUTED = '#64748b'

export function ScientistTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-2">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: ACCENT }}>⬡</div>
      <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>{title}</h2>
      <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: '#e2e8f0' }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="px-8 py-6" style={{ backgroundColor: PRIMARY }}>
        <div className="flex items-center gap-5 text-white">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={72} className="shrink-0" wrapperStyle={{ border: `2px solid ${ACCENT}` }} />}
          <div>
            <h1 className="text-2xl font-bold">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-0.5 text-sm font-medium" style={{ color: '#67e8f9' }}>{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
              {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6 rounded-lg p-4 text-sm leading-relaxed" style={{ border: `1px solid ${ACCENT}30`, backgroundColor: `${ACCENT}05`, color: BODY }} data-section>
            <SH title="Research Profile" />
            <p dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
          </div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{exp.position}</span>{exp.company && <span className="text-sm" style={{ color: ACCENT }}> | {exp.company}</span>}{exp.location && <span className="text-sm" style={{ color: MUTED }}>, {exp.location}</span>}</div>
                    <span className="shrink-0 rounded px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: ACCENT }}>{exp.period}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-sm" style={{ color: BODY }} dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && <ul className="mt-1 space-y-0.5">{exp.highlights.map((h, i) => <li key={i} className="flex items-start gap-2 text-sm" style={{ color: BODY }}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} /><span dangerouslySetInnerHTML={{ __html: md(h) }} /></li>)}</ul>}
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
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{edu.institution}</span></div>
                    <span className="text-xs" style={{ color: ACCENT }}>{edu.period}</span>
                  </div>
                  <p className="text-sm" style={{ color: BODY }}>{edu.degree}</p>
                  {edu.gpa && <p className="text-xs" style={{ color: MUTED }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Technical Skills" />
            <div className="space-y-2">
              {resume.skills.map(skill => (
                <div key={skill.id}>
                  <p className="mb-1 text-xs font-bold" style={{ color: PRIMARY }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => <span key={i} className="rounded px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}30` }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Research Projects" />
            <div className="space-y-3">
              {resume.projects.map(proj => (
                <div key={proj.id} className="rounded-lg p-3" style={{ border: `1px solid ${ACCENT}20` }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: ACCENT }}>{proj.name}</span>
                    {proj.period && <span className="text-xs" style={{ color: MUTED }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm" style={{ color: BODY }} dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <p className="mt-0.5 text-xs" style={{ color: MUTED }}>Methods: {proj.technologies.join(', ')}</p>}
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
                  <div><span className="font-bold" style={{ color: PRIMARY }}>{cert.name}</span>{cert.issuer && <span style={{ color: MUTED }}> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs" style={{ color: ACCENT }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-bold" style={{ color: PRIMARY }}>{lang.language}</span><span style={{ color: MUTED }}> — {lang.proficiency}</span></span>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Honors & Awards" />
            <div className="space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{award.title}</span>{award.issuer && <span style={{ color: MUTED }}> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs" style={{ color: ACCENT }}>{award.date}</span>}
                  </div>
                  {award.description && <p className="mt-0.5 text-sm" style={{ color: BODY }} dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
