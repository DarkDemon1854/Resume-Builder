export default function PreviewEmptyState() {
  return (
    <div className="preview-empty-state">
      <div className="preview-empty-illustration" aria-hidden="true">
        <div className="preview-empty-doc">
          <div className="preview-empty-line preview-empty-line--title" />
          <div className="preview-empty-line preview-empty-line--wide" />
          <div className="preview-empty-spacer" />
          <div className="preview-empty-line preview-empty-line--medium" />
          <div className="preview-empty-line preview-empty-line--wide" />
          <div className="preview-empty-line preview-empty-line--narrow" />
          <div className="preview-empty-spacer" />
          <div className="preview-empty-line preview-empty-line--medium" />
          <div className="preview-empty-line preview-empty-line--wide" />
        </div>
      </div>

      <div className="preview-empty-text">
        <p className="preview-empty-headline">Your resume will appear here</p>
        <p className="preview-empty-sub">
          Start filling in your details on the left to see a live preview in real time.
        </p>
      </div>

      <div className="preview-empty-hints" aria-hidden="true">
        <span className="preview-empty-hint-pill">Name</span>
        <span className="preview-empty-hint-arrow">→</span>
        <span className="preview-empty-hint-pill">Experience</span>
        <span className="preview-empty-hint-arrow">→</span>
        <span className="preview-empty-hint-pill">Skills</span>
      </div>
    </div>
  )
}
