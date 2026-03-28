export default function EmailPanel({
  text,
  setText,
  loading,
  error,
  onEvaluate,
}) {
  const safeText = typeof text === "string" ? text : "";
  const trimmedText = safeText.trim();
  const isDisabled = loading || !trimmedText;
  const characterCount = safeText.length;
  const lineCount = safeText ? safeText.split("\n").length : 0;

  return (
    <section style={styles.wrapper}>
      <div style={styles.backgroundGlow} />
      <div style={styles.gridOverlay} />

      <div style={styles.content}>
        <div style={styles.headerRow}>
          <div style={styles.headerCopy}>
            <div style={styles.eyebrow}>INPUT SURFACE</div>
            <h2 style={styles.title}>Outbound message review</h2>
            <p style={styles.subtitle}>
              Route proposed AI-generated communication through Tex before
              release. The draft will be evaluated against deterministic policy
              checks first, then semantic review if available.
            </p>
          </div>

          <div style={styles.statusPill(loading)}>
            <span style={styles.statusDot(loading)} />
            {loading ? "Evaluating" : "Ready"}
          </div>
        </div>

        <div style={styles.metaRow}>
          <div style={styles.metaCard}>
            <span style={styles.metaLabel}>Character Count</span>
            <span style={styles.metaValue}>{characterCount}</span>
          </div>

          <div style={styles.metaCard}>
            <span style={styles.metaLabel}>Line Count</span>
            <span style={styles.metaValue}>{lineCount}</span>
          </div>

          <div style={styles.metaCard}>
            <span style={styles.metaLabel}>Review Mode</span>
            <span style={styles.metaValue}>Outbound Governance</span>
          </div>
        </div>

        <div style={styles.inputShell}>
          <div style={styles.inputHeader}>
            <label htmlFor="tex-email-input" style={styles.inputLabel}>
              Proposed outbound message
            </label>

            <div style={styles.inputHint}>
              Paste the AI-generated draft exactly as it would be sent.
            </div>
          </div>

          <div style={styles.textareaFrame}>
            <textarea
              id="tex-email-input"
              value={safeText}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste AI-generated email or outbound message..."
              spellCheck={false}
              style={styles.textarea}
            />
            <div style={styles.inputGlow} />
          </div>
        </div>

        <div style={styles.footerRow}>
          <button
            type="button"
            onClick={onEvaluate}
            disabled={isDisabled}
            style={styles.button(isDisabled)}
          >
            {loading ? "Running Through Tex..." : "Run Through Tex"}
          </button>

          <div style={styles.helperText}>
            Tex evaluates hard rules first, then semantic signals, then returns
            a final decision.
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}
      </div>
    </section>
  );
}

const panelBackground =
  "linear-gradient(180deg, rgba(12,15,24,0.96) 0%, rgba(7,9,15,1) 100%)";

const styles = {
  wrapper: {
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
    background: panelBackground,
    borderRadius: 18,
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.02) inset, 0 30px 80px rgba(0,0,0,0.35)",
  },

  backgroundGlow: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(circle at top right, rgba(124,240,255,0.09) 0%, rgba(159,132,255,0.05) 20%, rgba(0,0,0,0) 48%)",
  },

  gridOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.06,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
    backgroundSize: "36px 36px",
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: 22,
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 18,
    flexWrap: "wrap",
  },

  headerCopy: {
    minWidth: 0,
    maxWidth: 620,
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 2.4,
    color: "#667086",
    fontWeight: 800,
    marginBottom: 10,
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
    fontSize: 26,
    lineHeight: 1.08,
    color: "#eef3fb",
    fontWeight: 800,
  },

  subtitle: {
    margin: "10px 0 0 0",
    fontSize: 13,
    lineHeight: 1.7,
    color: "#8d97aa",
    maxWidth: 560,
  },

  statusPill: (loading) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    border: `1px solid ${
      loading ? "rgba(124, 240, 255, 0.18)" : "rgba(115, 126, 149, 0.18)"
    }`,
    background: loading
      ? "rgba(124, 240, 255, 0.07)"
      : "rgba(255,255,255,0.03)",
    color: loading ? "#7cf0ff" : "#a2acbe",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: 800,
    whiteSpace: "nowrap",
  }),

  statusDot: (loading) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: loading ? "#7cf0ff" : "#00e19a",
    boxShadow: loading
      ? "0 0 16px rgba(124,240,255,0.85)"
      : "0 0 16px rgba(0,225,154,0.65)",
    flexShrink: 0,
  }),

  metaRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
    marginBottom: 18,
  },

  metaCard: {
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.025)",
    borderRadius: 14,
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
  },

  metaLabel: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#697388",
    fontWeight: 800,
  },

  metaValue: {
    fontSize: 13,
    color: "#dfe6f1",
    fontWeight: 700,
    lineHeight: 1.4,
    wordBreak: "break-word",
  },

  inputShell: {
    marginTop: 2,
  },

  inputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 10,
    flexWrap: "wrap",
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: 800,
    color: "#dfe6f1",
    letterSpacing: 0.4,
  },

  inputHint: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#7d8799",
  },

  textareaFrame: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(124, 240, 255, 0.12)",
    background: "rgba(4, 6, 10, 0.96)",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.015)",
  },

  textarea: {
    width: "100%",
    minHeight: 300,
    resize: "vertical",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#eef3fb",
    padding: 18,
    fontSize: 14,
    lineHeight: 1.7,
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
  },

  inputGlow: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(circle at top right, rgba(124,240,255,0.09), transparent 35%)",
    zIndex: 1,
  },

  footerRow: {
    marginTop: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },

  button: (disabled) => ({
    border: "none",
    borderRadius: 12,
    padding: "13px 18px",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? "#7f8798" : "#071018",
    background: disabled
      ? "linear-gradient(90deg, rgba(54,59,70,1) 0%, rgba(42,46,56,1) 100%)"
      : "linear-gradient(90deg, #7cf0ff 0%, #9f84ff 100%)",
    boxShadow: disabled
      ? "none"
      : "0 0 30px rgba(124,240,255,0.16), 0 12px 28px rgba(0,0,0,0.3)",
    transition: "all 0.2s ease",
  }),

  helperText: {
    fontSize: 12,
    color: "#778194",
    lineHeight: 1.6,
    maxWidth: 420,
  },

  error: {
    marginTop: 16,
    border: "1px solid rgba(255, 77, 90, 0.18)",
    background: "rgba(255, 77, 90, 0.08)",
    color: "#ff8b97",
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 13,
    lineHeight: 1.6,
  },
};