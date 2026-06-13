import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#1e3a5f'
const ACCENT = '#2980b9'

export function ProfessionalTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-2">
      <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>{title}</h2>
      <div className="h-0.5 flex-1" style={{ backgroundColor: ACCENT }} />
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="px-10 py-7" style={{ borderTop: `6px solid ${PRIMARY}` }}>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={72} className="shrink-0" wrapperStyle={{ border: `2px solid ${PRIMARY}` }} />}
            <div>
              <h1 className="text-3xl font-bold" style={{ color: PRIMARY }}>{pi.fullName || 'Your Name'}</h1>
              {pi.title && <p className="mt-0.5 text-sm font-medium uppercase tracking-widest" style={{ color: ACCENT }}>{pi.title}</p>}
            </div>
          </div>
          <div className="text-right text-xs text-zinc-500">
            {[pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin, pi.github].filter(Boolean).map((c, i) => <p key={i}>{c}</p>)}
          </div>
        </div>
        {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel].some(Boolean) && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 border-t pt-3" style={{ borderColor: '#e2e8f0' }}>
            {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        )}
      </div>
      <div className="px-10 pb-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Professional Summary" /><p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Work Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{exp.position}</span>{exp.company && <span className="text-sm text-zinc-500"> | {exp.company}</span>}{exp.location && <span className="text-sm text-zinc-400">, {exp.location}</span>}</div>
                    <span className="shrink-0 text-xs font-medium" style={{ color: ACCENT }}>{exp.period}</span>
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
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{edu.degree}</span>{edu.institution && <span className="text-sm text-zinc-500"> — {edu.institution}</span>}</div>
                    <span className="text-xs font-medium" style={{ color: ACCENT }}>{edu.period}</span>
                  </div>
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
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
                <div key={skill.id} className="flex text-sm">
                  <span className="w-32 shrink-0 font-semibold" style={{ color: PRIMARY }}>{skill.category}:</span>
                  <span className="text-zinc-600">{skill.items.join(', ')}</span>
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
                    {proj.period && <span className="text-xs font-medium" style={{ color: ACCENT }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <p className="mt-0.5 text-xs text-zinc-400">Tech: {proj.technologies.join(', ')}</p>}
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
                  <div><span className="font-bold" style={{ color: PRIMARY }}>{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs font-medium" style={{ color: ACCENT }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-bold" style={{ color: PRIMARY }}>{lang.language}</span><span className="text-zinc-500"> — {lang.proficiency}</span></span>)}
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
                    <div><span className="text-sm font-bold" style={{ color: PRIMARY }}>{award.title}</span>{award.issuer && <span className="text-sm text-zinc-500"> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs font-medium" style={{ color: ACCENT }}>{award.date}</span>}
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
