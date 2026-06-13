import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#18181b'
const MUTED = '#71717a'

export function MinimalTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 border-b border-zinc-200 pb-1">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">{title}</h2>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white p-10 shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={56} className="shrink-0" />}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>{pi.fullName || 'Your Name'}</h1>
              {pi.title && <p className="text-sm" style={{ color: MUTED }}>{pi.title}</p>}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: MUTED }}>
          {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin, pi.github].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      {vis.has('summary') && pi.summary && (
        <div className="mb-6" data-section><SH title="About" /><p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
      )}
      {vis.has('experience') && resume.experience.length > 0 && (
        <div className="mb-6" data-section>
          <SH title="Experience" />
          <div className="space-y-4">
            {resume.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <div><span className="text-sm font-semibold" style={{ color: PRIMARY }}>{exp.position}</span>{exp.company && <span className="text-sm" style={{ color: MUTED }}> · {exp.company}</span>}{exp.location && <span className="text-sm" style={{ color: MUTED }}>, {exp.location}</span>}</div>
                  <span className="shrink-0 text-xs" style={{ color: MUTED }}>{exp.period}</span>
                </div>
                {exp.description && <p className="mt-1 text-sm text-zinc-500" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                {exp.highlights.length > 0 && <ul className="mt-1 list-disc pl-4">{exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-500" dangerouslySetInnerHTML={{ __html: md(h) }} />)}</ul>}
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
                  <div><span className="text-sm font-semibold" style={{ color: PRIMARY }}>{edu.institution}</span>{edu.location && <span className="text-sm" style={{ color: MUTED }}>, {edu.location}</span>}</div>
                  <span className="text-xs" style={{ color: MUTED }}>{edu.period}</span>
                </div>
                <p className="text-sm" style={{ color: MUTED }}>{edu.degree}</p>
                {edu.gpa && <p className="text-xs" style={{ color: MUTED }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      {vis.has('skills') && resume.skills.length > 0 && (
        <div className="mb-6" data-section>
          <SH title="Skills" />
          <div className="space-y-1">
            {resume.skills.map(skill => (
              <div key={skill.id} className="flex text-sm">
                <span className="w-28 shrink-0 font-semibold" style={{ color: PRIMARY }}>{skill.category}</span>
                <span style={{ color: MUTED }}>{skill.items.join(' · ')}</span>
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
                  <span className="text-sm font-semibold" style={{ color: PRIMARY }}>{proj.name}</span>
                  {proj.period && <span className="text-xs" style={{ color: MUTED }}>{proj.period}</span>}
                </div>
                {proj.description && <p className="mt-0.5 text-sm" style={{ color: MUTED }} dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                {proj.technologies.length > 0 && <p className="mt-0.5 text-xs" style={{ color: MUTED }}>{proj.technologies.join(' · ')}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      {vis.has('certifications') && resume.certifications.length > 0 && (
        <div className="mb-6" data-section>
          <SH title="Certifications" />
          <div className="space-y-1">
            {resume.certifications.map(cert => (
              <div key={cert.id} className="flex items-baseline justify-between text-sm">
                <div><span className="font-semibold" style={{ color: PRIMARY }}>{cert.name}</span>{cert.issuer && <span style={{ color: MUTED }}> — {cert.issuer}</span>}</div>
                {cert.date && <span className="text-xs" style={{ color: MUTED }}>{cert.date}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
      {vis.has('languages') && resume.languages.length > 0 && (
        <div className="mb-6" data-section>
          <SH title="Languages" />
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-semibold" style={{ color: PRIMARY }}>{lang.language}</span><span style={{ color: MUTED }}> — {lang.proficiency}</span></span>)}
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
                  <div><span className="text-sm font-semibold" style={{ color: PRIMARY }}>{award.title}</span>{award.issuer && <span className="text-sm" style={{ color: MUTED }}> — {award.issuer}</span>}</div>
                  {award.date && <span className="text-xs" style={{ color: MUTED }}>{award.date}</span>}
                </div>
                {award.description && <p className="mt-0.5 text-sm" style={{ color: MUTED }} dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
