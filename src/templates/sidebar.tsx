import type { TemplateProps } from './types'
import { AvatarImage } from './AvatarImage'
import { md } from './render-utils'

const SIDEBAR_BG = '#1e40af'
const ACCENT = '#3b82f6'

export function SidebarTemplate({ resume }: TemplateProps) {
  const pi = resume.personalInfo
  const vis = resume.visibleSections


  const SidebarHeader = ({ title }: { title: string }) => (
    <h2 className="mb-2 border-b border-white/20 pb-1 text-xs font-bold uppercase tracking-wider text-white">{title}</h2>
  )
  const MainHeader = ({ title }: { title: string }) => (
    <h2 className="mb-2 border-b-2 pb-1 text-sm font-bold uppercase tracking-wider" style={{ color: SIDEBAR_BG, borderColor: ACCENT }}>{title}</h2>
  )

  return (
    <div className="mx-auto flex max-w-[210mm] overflow-hidden bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif', minHeight: '297mm' }}>
      <div className="w-[35%] shrink-0 p-6 text-white" style={{ backgroundColor: SIDEBAR_BG }}>
        <div className="mb-6 text-center">
          {pi.avatar && <AvatarImage src={pi.avatar} size={80} avatarStyle="circle" wrapperClassName="mx-auto mb-3 w-fit overflow-hidden" />}
          <h1 className="text-xl font-bold tracking-tight text-white">{pi.fullName || 'Your Name'}</h1>
          {pi.title && <p className="mt-1 text-sm font-light text-blue-200">{pi.title}</p>}
        </div>
        <div className="mb-6 space-y-1.5 text-xs">
          {pi.age && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Age:</span><span>{pi.age}</span></div>}
          {pi.gender && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Gender:</span><span>{pi.gender}</span></div>}
          {pi.hometown && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Hometown:</span><span>{pi.hometown}</span></div>}
          {pi.maritalStatus && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Marital:</span><span>{pi.maritalStatus}</span></div>}
          {pi.yearsOfExperience && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Experience:</span><span>{pi.yearsOfExperience}</span></div>}
          {pi.educationLevel && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Education:</span><span>{pi.educationLevel}</span></div>}
          {pi.email && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Email:</span><span className="break-all">{pi.email}</span></div>}
          {pi.phone && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Phone:</span><span>{pi.phone}</span></div>}
          {pi.wechat && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">WeChat:</span><span>{pi.wechat}</span></div>}
          {pi.location && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Location:</span><span>{pi.location}</span></div>}
          {pi.website && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">Web:</span><span className="break-all">{pi.website}</span></div>}
          {pi.linkedin && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">LinkedIn:</span><span className="break-all">{pi.linkedin}</span></div>}
          {pi.github && <div className="flex items-start gap-2 text-blue-100"><span className="shrink-0 text-blue-300">GitHub:</span><span className="break-all">{pi.github}</span></div>}
        </div>

        {vis.includes('skills') && resume.skills.length > 0 && (
          <div className="mb-5" data-section>
            <SidebarHeader title="Skills" />
            <div className="space-y-2">
              {resume.skills.map(skill => (
                <div key={skill.id}>
                  <p className="text-xs font-semibold text-blue-100">{skill.category}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {skill.items.map((item, i) => (
                      <span key={i} className="rounded-sm px-1.5 py-0.5 text-[10px] text-blue-100" style={{ backgroundColor: 'rgba(59,130,246,0.3)' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.includes('languages') && resume.languages.length > 0 && (
          <div className="mb-5" data-section>
            <SidebarHeader title="Languages" />
            <div className="space-y-1.5">
              {resume.languages.map(lang => (
                <div key={lang.id} className="flex items-center justify-between text-xs">
                  <span className="text-blue-100">{lang.language}</span>
                  <span className="text-blue-300">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.includes('certifications') && resume.certifications.length > 0 && (
          <div className="mb-5" data-section>
            <SidebarHeader title="Certifications" />
            <div className="space-y-1.5">
              {resume.certifications.map(cert => (
                <div key={cert.id}>
                  <p className="text-xs font-semibold text-blue-100">{cert.name}</p>
                  {(cert.issuer || cert.date) && <p className="text-[10px] text-blue-300">{cert.issuer}{cert.date ? ` (${cert.date})` : ''}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.includes('awards') && resume.awards.length > 0 && (
          <div className="mb-5" data-section>
            <SidebarHeader title="Awards" />
            <div className="space-y-1.5">
              {resume.awards.map(award => (
                <div key={award.id}>
                  <p className="text-xs font-semibold text-blue-100">{award.title}</p>
                  {award.issuer && <p className="text-[10px] text-blue-300">{award.issuer}</p>}
                  {award.date && <p className="text-[10px] text-blue-300">{award.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-6">
        {vis.includes('summary') && pi.summary && (
          <div className="mb-5" data-section>
            <MainHeader title="Summary" />
            <p className="text-sm leading-relaxed text-zinc-600" dangerouslySetInnerHTML={{ __html: md(pi.summary) }} />
          </div>
        )}
        {vis.includes('experience') && resume.experience.length > 0 && (
          <div className="mb-5" data-section>
            <MainHeader title="Experience" />
            <div className="space-y-3">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-sm font-semibold text-zinc-800">{exp.position}</span>
                      {exp.company && <span className="text-sm" style={{ color: ACCENT }}> | {exp.company}</span>}
                    </div>
                    <span className="shrink-0 text-xs text-zinc-400">{exp.period}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(exp.description) }} />}
                  {exp.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-4">
                      {exp.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.includes('education') && resume.education.length > 0 && (
          <div className="mb-5" data-section>
            <MainHeader title="Education" />
            <div className="space-y-3">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-zinc-800">{edu.institution}</span>
                    <span className="shrink-0 text-xs text-zinc-400">{edu.period}</span>
                  </div>
                  <p className="text-sm text-zinc-600">{edu.degree}</p>
                  {edu.gpa && <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>}
                  {edu.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-4">
                      {edu.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {vis.includes('projects') && resume.projects.length > 0 && (
          <div className="mb-5" data-section>
            <MainHeader title="Projects" />
            <div className="space-y-3">
              {resume.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-zinc-800">{proj.name}</span>
                    {proj.period && <span className="shrink-0 text-xs text-zinc-400">{proj.period}</span>}
                  </div>
                  {proj.description && <p className="mt-1 text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(proj.description) }} />}
                  {proj.technologies.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => <span key={i} className="rounded-sm px-1.5 py-0.5 text-[10px] text-white" style={{ backgroundColor: ACCENT }}>{t}</span>)}
                    </div>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-4">
                      {proj.highlights.map((h, i) => <li key={i} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: md(h) }} />)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
