export function md(text: string): string {
  if (!text) return ''
  let s = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
  if (!s.includes('\n')) return s
  const lines = s.split('\n')
  let html = ''
  let inList = false
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      if (inList) { html += '</ul>'; inList = false }
      continue
    }
    const lm = line.match(/^[-–•]\s+(.*)/)
    if (lm) {
      if (!inList) { html += '<ul style="margin:2px 0;padding-left:1.5em;list-style-type:disc">'; inList = true }
      html += `<li>${lm[1]}</li>`
    } else {
      if (inList) { html += '</ul>'; inList = false }
      html += (html && !html.endsWith('>') ? '<br>' : '') + line
    }
  }
  if (inList) html += '</ul>'
  return html
}

