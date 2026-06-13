import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const PRIMARY = '#1a1a1a'
const ACCENT = '#dc2626'
const SECONDARY = '#44403c'

export function MagazineTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 border-b-4 pb-1" style={{ borderColor: ACCENT }}>
      <h2 className="text-sm font-black uppercase tracking-widest" style={{ color: PRIMARY }}>{title}</h2>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="px-8 py-7">
        <div className="mb-4 h-2 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY})` }} />
        <div className="flex items-end gap-5">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={80} className="shrink-0" />}
          <div className="flex-1">
            <h1 className="text-4xl font-black uppercase tracking-tight leading-none" style={{ color: PRIMARY }}>{pi.fullName || 'Your Name'}</h1>
            {pi.title && <p className="mt-1 text-base font-medium uppercase tracking-widest" style={{ color: ACCENT }}>{pi.title}</p>}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-xs" style={{ color: SECONDARY, borderColor: '#e7e5e4' }}>
          {[pi.age, pi.gender, pi.hometown, pi.maritalStatus, pi.yearsOfExperience, pi.educationLevel, pi.email, pi.phone, pi.wechat, pi.location, pi.website, pi.linkedin, pi.github].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>
      <div className="px-8 pb-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section><SH title="Profile" /><p className="text-sm leading-relaxed" style={{ color: SECONDARY }} dangerouslySetInnerHTML={{ __html: md(pi.summary) }} /></div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-black" style={{ color: PRIMARY }}>{exp.position}</span>
                    <span className="shrink-0 text-xs font-bold" style={{ color: ACCENT }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm font-medium" style={{ color: SECONDARY }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
                  {exp.description && <p className="mt-1 text-sm" style={{ color: SECONDARY }} dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && <ul className="mt-1 list-disc pl-4">{exp.highlights.map((h, i) => <li key={i} className="text-sm" style={{ color: SECONDARY }} dangerouslySetInnerHTML={{ __html: md(h) }} />)}</ul>}
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
                    <span className="text-sm font-black" style={{ color: PRIMARY }}>{edu.institution}</span>
                    <span className="text-xs font-bold" style={{ color: ACCENT }}>{edu.period}</span>
                  </div>
                  <p className="text-sm" style={{ color: SECONDARY }}>{edu.degree}</p>
                  {edu.gpa && <p className="text-xs" style={{ color: SECONDARY }}>GPA: {edu.gpa}</p>}
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
                  <span className="w-32 shrink-0 font-black" style={{ color: PRIMARY }}>{skill.category}:</span>
                  <span style={{ color: SECONDARY }}>{skill.items.join(', ')}</span>
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
                    <span className="text-sm font-black" style={{ color: PRIMARY }}>{proj.name}</span>
                    {proj.period && <span className="text-xs font-bold" style={{ color: ACCENT }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm" style={{ color: SECONDARY }} dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <p className="mt-0.5 text-xs" style={{ color: ACCENT }}>Tech: {proj.technologies.join(', ')}</p>}
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
                  <div><span className="font-black" style={{ color: PRIMARY }}>{cert.name}</span>{cert.issuer && <span style={{ color: SECONDARY }}> — {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs font-bold" style={{ color: ACCENT }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span className="font-black" style={{ color: PRIMARY }}>{lang.language}</span><span style={{ color: SECONDARY }}> — {lang.proficiency}</span></span>)}
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
                    <div><span className="text-sm font-black" style={{ color: PRIMARY }}>{award.title}</span>{award.issuer && <span className="text-sm" style={{ color: SECONDARY }}> — {award.issuer}</span>}</div>
                    {award.date && <span className="text-xs font-bold" style={{ color: ACCENT }}>{award.date}</span>}
                  </div>
                  {award.description && <p className="mt-0.5 text-sm" style={{ color: SECONDARY }} dangerouslySetInnerHTML={{ __html: md(award.description) }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
