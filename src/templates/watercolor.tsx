import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#4c1d95'
const ACCENT = '#c084fc'
const WASH = '#f5f3ff'
const TEXT_DARK = '#374151'

export function WatercolorTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3">
      <h2 className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: PRIMARY }}>{title}</h2>
      <div className="mt-1 h-0.5 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] shadow-lg" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: WASH }}>
      <div className="relative overflow-hidden px-8 py-10 text-center">
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at top left, ${ACCENT}, transparent 60%), radial-gradient(ellipse at bottom right, ${PRIMARY}, transparent 60%)` }} />
        <div className="relative">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={88} className="mx-auto mb-4" wrapperStyle={{ border: `3px solid ${ACCENT}`, boxShadow: `0 4px 24px ${ACCENT}40` }} />}
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: PRIMARY }}>{pi.fullName || 'Your Name'}</h1>
          {pi.title && <p className="mt-1 text-sm font-medium" style={{ color: ACCENT }}>{pi.title}</p>}
          <div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-x-4 gap-y-1 text-xs" style={{ color: '#6d28d9' }}>
            {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>
      <div className="px-8 pb-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6 rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-sm" data-section>
            <SH title="About" />
            <p className="text-sm leading-relaxed" style={{ color: TEXT_DARK }} dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
          </div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6 rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-sm" data-section>
            <SH title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: ACCENT }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{exp.position}</span>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm" style={{ color: ACCENT }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
                  {exp.description && <p className="mt-1 text-sm" style={{ color: TEXT_DARK }} dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && <ul className="mt-1 list-disc pl-4">{exp.highlights.map((h, i) => <li key={i} className="text-sm" style={{ color: TEXT_DARK }} dangerouslySetInnerHTML={{ __html: md(h) }} />)}</ul>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('education') && resume.education.length > 0 && (
          <div className="mb-6 rounded-2xl bg-white/70 p-5 shadow-sm" data-section>
            <SH title="Education" />
            <div className="space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{edu.institution}</span>
                    <span className="text-xs" style={{ color: ACCENT }}>{edu.period}</span>
                  </div>
                  <p className="text-sm" style={{ color: TEXT_DARK }}>{edu.degree}</p>
                  {edu.gpa && <p className="text-xs" style={{ color: ACCENT }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6 rounded-2xl bg-white/70 p-5 shadow-sm" data-section>
            <SH title="Skills" />
            <div className="space-y-2">
              {resume.skills.map(skill => (
                <div key={skill.id}>
                  <p className="mb-1 text-xs font-bold" style={{ color: PRIMARY }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => <span key={i} className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white" style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6 rounded-2xl bg-white/70 p-5 shadow-sm" data-section>
            <SH title="Certifications" />
            <div className="space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between text-sm">
                  <div><span className="font-bold" style={{ color: PRIMARY }}>{cert.name}</span>{cert.issuer && <span style={{ color: TEXT_DARK }}> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs" style={{ color: ACCENT }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6 rounded-2xl bg-white/70 p-5 shadow-sm" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-2">
              {resume.languages.map(lang => <div key={lang.id} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm" style={{ border: `1px solid ${ACCENT}40` }}><span className="h-2 w-2 rounded-full" style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }} /><span className="font-medium" style={{ color: PRIMARY }}>{lang.language}</span><span style={{ color: TEXT_DARK }}>{lang.proficiency}</span></div>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6 rounded-2xl bg-white/70 p-5 shadow-sm" data-section>
            <SH title="Awards" />
            <div className="space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{award.title}</span>{award.issuer && <span className="text-sm" style={{ color: TEXT_DARK }}> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs" style={{ color: ACCENT }}>{award.date}</span>}
                  </div>
                  {award.description && <p className="mt-0.5 text-sm" style={{ color: TEXT_DARK }} dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
