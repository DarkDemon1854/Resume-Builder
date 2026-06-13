import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#1e293b'
const ACCENT1 = '#f59e0b'
const ACCENT2 = '#10b981'
const ACCENT3 = '#6366f1'

const ACCENTS = [ACCENT1, ACCENT2, ACCENT3]

export function MosaicTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title, idx = 0 }: { title: string; idx?: number }) => {
    const color = ACCENTS[idx % ACCENTS.length]
    return (
      <div className="mb-3 flex items-center gap-2">
        <div className="h-6 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: PRIMARY }}>{title}</h2>
        <div className="h-px flex-1" style={{ backgroundColor: '#e2e8f0' }} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="px-8 py-6" style={{ backgroundColor: PRIMARY }}>
        <div className="flex items-center gap-5 text-white">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={72} className="shrink-0" wrapperStyle={{ border: `3px solid ${ACCENT1}` }} />}
          <div>
            <h1 className="text-2xl font-black">{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-0.5 text-sm font-medium" style={{ color: ACCENT1 }}>{pi.title}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
              {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-1">
          {ACCENTS.map((a, i) => <div key={i} className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: a }} />)}
        </div>
      </div>
      <div className="p-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Summary" idx={0} /><p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Experience" idx={1} />
            <div className="space-y-4">
              {resume.experience.map((exp, ei) => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: ACCENTS[ei % ACCENTS.length] }}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{exp.position}</span>{exp.company && <span className="text-sm text-zinc-500"> | {exp.company}</span>}</div>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={{ backgroundColor: ACCENTS[ei % ACCENTS.length] }}>{exp.period}</span>
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
            <SH title="Education" idx={2} />
            <div className="space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{edu.institution}</span>{edu.location && <span className="text-sm text-zinc-400">, {edu.location}</span>}</div>
                    <span className="text-xs" style={{ color: ACCENT2 }}>{edu.period}</span>
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
            <SH title="Skills" idx={0} />
            <div className="space-y-2">
              {resume.skills.map((skill, si) => (
                <div key={skill.id}>
                  <p className="mb-1 text-xs font-bold" style={{ color: ACCENTS[si % ACCENTS.length] }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => <span key={i} className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: ACCENTS[(si + i) % ACCENTS.length] }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Projects" idx={1} />
            <div className="space-y-3">
              {resume.projects.map((proj, pi2) => (
                <div key={proj.id} className="rounded-lg p-3" style={{ border: `1px solid ${ACCENTS[pi2 % ACCENTS.length]}30`, borderLeft: `3px solid ${ACCENTS[pi2 % ACCENTS.length]}` }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: PRIMARY }}>{proj.name}</span>
                    {proj.period && <span className="text-xs" style={{ color: ACCENTS[pi2 % ACCENTS.length] }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <div className="mt-1 flex flex-wrap gap-1">{proj.technologies.map((t, i) => <span key={i} className="rounded px-2 py-0.5 text-[10px] text-white" style={{ backgroundColor: ACCENTS[(pi2 + i) % ACCENTS.length] }}>{t}</span>)}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Certifications" idx={2} />
            <div className="space-y-1.5">
              {resume.certifications.map((cert, ci) => (
                <div key={cert.id} className="flex items-baseline justify-between text-sm">
                  <div><span className="font-bold" style={{ color: PRIMARY }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs font-semibold" style={{ color: ACCENTS[ci % ACCENTS.length] }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" idx={0} />
            <div className="flex flex-wrap gap-2">
              {resume.languages.map((lang, li) => <div key={lang.id} className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ border: `1px solid ${ACCENTS[li % ACCENTS.length]}40` }}><span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENTS[li % ACCENTS.length] }} /><span className="text-sm font-medium" style={{ color: PRIMARY }}>{lang.language}</span><span className="text-xs text-zinc-400">{lang.proficiency}</span></div>)}
            </div>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Awards" idx={1} />
            <div className="space-y-2">
              {resume.awards.map((award, ai) => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs font-semibold" style={{ color: ACCENTS[ai % ACCENTS.length] }}>{award.date}</span>}
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
