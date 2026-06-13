import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const BG = '#282c34'
const GREEN = '#98c379'
const BLUE = '#61afef'
const ORANGE = '#e5c07b'
const TEXT = '#abb2bf'
const TEXT_DIM = '#5c6370'

export function DeveloperTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = new Set(resume.visibleSections)

  const SH = ({ title }: { title: string }) => (
    <div className="mb-3 flex items-center gap-2">
      <span className="font-mono text-sm" style={{ color: GREEN }}>{'function'}</span>
      <span className="font-mono text-sm font-bold" style={{ color: BLUE }}>{title.replace(/\s+/g, '')}</span>
      <span className="font-mono text-sm text-white/40">{'() {'}</span>
    </div>
  )

  return (
    <div className="mx-auto max-w-[210mm] overflow-hidden shadow-lg" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", backgroundColor: BG }}>
      <div className="px-8 py-6">
        <div className="flex items-center gap-4">
          {pi.avatar && <AvatarImage src={pi.avatar} avatarStyle="circle" size={64} className="shrink-0" wrapperStyle={{ border: `2px solid ${GREEN}` }} />}
          <div>
            <div className="mb-1 flex gap-2">
              <span className="text-sm" style={{ color: TEXT_DIM }}>{'// '}</span>
              <span className="text-sm font-bold" style={{ color: ORANGE }}>{pi.fullName || 'Your Name'}</span>
            </div>
            {pi.title && <p className="text-sm" style={{ color: GREEN }}>{pi.title}</p>}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: TEXT_DIM }}>
              {[pi.email, pi.phone, pi.wechat, pi.location, pi.github].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {vis.has('summary') && pi.summary && (
          <div className="mb-6" data-section>
            <SH title="Summary" />
            <p className="text-sm leading-relaxed" style={{ color: TEXT }} dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
            <p className="mt-1 text-sm" style={{ color: TEXT_DIM }}>{'}'}</p>
          </div>
        )}
        {vis.has('experience') && resume.experience.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Experience" />
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: ORANGE }}>{exp.position}</span>
                    <span className="shrink-0 text-xs" style={{ color: TEXT_DIM }}>{exp.period}</span>
                  </div>
                  {exp.company && <p className="text-sm" style={{ color: BLUE }}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>}
                  {exp.description && <p className="mt-1 text-sm" style={{ color: TEXT }} dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && <ul className="mt-1 space-y-0.5">{exp.highlights.map((h, i) => <li key={i} className="flex items-start gap-2 text-sm" style={{ color: TEXT }}><span style={{ color: GREEN }}>→</span><span dangerouslySetInnerHTML={{ __html: md(h) }} /></li>)}</ul>}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm" style={{ color: TEXT_DIM }}>{'}'}</p>
          </div>
        )}
        {vis.has('education') && resume.education.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Education" />
            <div className="space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: ORANGE }}>{edu.institution}</span>
                    <span className="text-xs" style={{ color: TEXT_DIM }}>{edu.period}</span>
                  </div>
                  <p className="text-sm" style={{ color: TEXT }}>{edu.degree}</p>
                  {edu.gpa && <p className="text-xs" style={{ color: TEXT_DIM }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm" style={{ color: TEXT_DIM }}>{'}'}</p>
          </div>
        )}
        {vis.has('skills') && resume.skills.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Skills" />
            <div className="space-y-2">
              {resume.skills.map(skill => (
                <div key={skill.id} className="flex text-sm">
                  <span className="w-36 shrink-0 font-bold" style={{ color: BLUE }}>{skill.category}:</span>
                  <span style={{ color: GREEN }}>[{skill.items.join(', ')}]</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm" style={{ color: TEXT_DIM }}>{'}'}</p>
          </div>
        )}
        {vis.has('projects') && resume.projects.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Projects" />
            <div className="space-y-3">
              {resume.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: ORANGE }}>{proj.name}</span>
                    {proj.period && <span className="text-xs" style={{ color: TEXT_DIM }}>{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-0.5 text-sm" style={{ color: TEXT }} dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && <p className="mt-1 text-xs" style={{ color: GREEN }}>// {proj.technologies.join(' | ')}</p>}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm" style={{ color: TEXT_DIM }}>{'}'}</p>
          </div>
        )}
        {vis.has('certifications') && resume.certifications.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Certifications" />
            <div className="space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id} className="flex items-baseline justify-between text-sm">
                  <div><span className="font-bold" style={{ color: ORANGE }}>{cert.name}</span>{cert.issuer && <span style={{ color: TEXT_DIM }}> // {cert.issuer}</span>}</div>
                  {cert.date && <span className="text-xs" style={{ color: TEXT_DIM }}>{cert.date}</span>}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm" style={{ color: TEXT_DIM }}>{'}'}</p>
          </div>
        )}
        {vis.has('languages') && resume.languages.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Languages" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {resume.languages.map(lang => <span key={lang.id} className="text-sm"><span style={{ color: BLUE }}>{lang.language}</span><span style={{ color: TEXT_DIM }}> = '{lang.proficiency}'</span></span>)}
            </div>
            <p className="mt-2 text-sm" style={{ color: TEXT_DIM }}>{'}'}</p>
          </div>
        )}
        {vis.has('awards') && resume.awards.length > 0 && (
          <div className="mb-6" data-section>
            <SH title="Awards" />
            <div className="space-y-2">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold" style={{ color: ORANGE }}>{award.title}</span>
                    {award.date && <span className="text-xs" style={{ color: TEXT_DIM }}>{award.date}</span>}
                  </div>
                  {award.issuer && <p className="text-sm" style={{ color: BLUE }}>{award.issuer}</p>}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm" style={{ color: TEXT_DIM }}>{'}'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
