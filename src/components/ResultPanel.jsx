import FindingTag from "./FindingTag";
import ScoreRow from "./ScoreRow";
import VerdictBanner from "./VerdictBanner";

export default function ResultPanel({ result }) {
  if (!result) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyLabel}>DECISION SURFACE</div>
        <div style={styles.emptyTitle}>Awaiting evaluation...</div>
        <div style={styles.emptyText}>
          Tex will render the final decision, rationale, deterministic findings,
          and semantic review signals here.
        </div>
      </div>
    );
  }

  const finalDecision = result?.final_decision ?? {};
  const decision = normalizeDecision(finalDecision?.decision);
  const summary = safeText(finalDecision?.summary, "No summary returned.");

  const reasons = Array.isArray(finalDecision?.reasons)
    ? finalDecision.reasons.filter(Boolean)
    : [];

  const findings = Array.isArray(result?.deterministic_findings)
    ? result.deterministic_findings.filter(Boolean)
    : [];

  const semanticRows = getSemanticRows(result?.semantic_evaluation);

  return (
    <div style={styles.wrapper}>
      <VerdictBanner decision={decision} />

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionLabel}>FINAL SUMMARY</div>
        </div>

        <div style={styles.summary}>{summary}</div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionLabel}>DECISION REASONS</div>
          <div style={styles.sectionMeta}>{reasons.length} signal(s)</div>
        </div>

        {reasons.length === 0 ? (
          <div style={styles.mutedText}>No reasons returned.</div>
        ) : (
          <div style={styles.reasonList}>
            {reasons.map((reason, index) => {
              const source = safeText(reason?.source, "unknown");
              const dimension = safeText(reason?.dimension, "");
              const message = safeText(reason?.message, "No reason message returned.");
              const evidence = safeText(reason?.evidence, "");

              return (
                <div key={`${source}-${index}`} style={styles.reasonCard}>
                  <div style={styles.reasonTopRow}>
                    <span style={styles.sourcePill}>{source}</span>

                    {dimension && (
                      <span style={styles.dimensionPill}>{dimension}</span>
                    )}
                  </div>

                  <div style={styles.reasonMessage}>{message}</div>

                  {evidence && <div style={styles.evidenceBlock}>{evidence}</div>}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionLabel}>DETERMINISTIC FINDINGS</div>
          <div style={styles.sectionMeta}>{findings.length} rule hit(s)</div>
        </div>

        {findings.length === 0 ? (
          <div style={styles.mutedText}>No hard-rule findings were triggered.</div>
        ) : (
          <div style={styles.findingList}>
            {findings.map((finding, index) => (
              <FindingTag
                key={`${finding?.type || "finding"}-${index}`}
                type={safeText(finding?.type, "Finding")}
                severity={normalizeSeverity(finding?.severity)}
                message={safeText(
                  finding?.message,
                  "A deterministic finding was returned without a message."
                )}
              />
            ))}
          </div>
        )}
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionLabel}>SEMANTIC LAYER</div>
          <div style={styles.sectionMeta}>
            {semanticRows.length > 0 ? `${semanticRows.length} dimension(s)` : "Unavailable"}
          </div>
        </div>

        {semanticRows.length > 0 ? (
          <div style={styles.semanticList}>
            {semanticRows.map((row) => (
              <ScoreRow
                key={row.key}
                label={row.label}
                score={row.score}
                finding={row.finding}
                evidence={row.evidence}
              />
            ))}
          </div>
        ) : (
          <div style={styles.semanticUnavailable}>
            Semantic evaluation was not returned. Tex is relying on
            deterministic checks and final decision fallback behavior.
          </div>
        )}
      </section>
    </div>
  );
}

function getSemanticRows(semanticEvaluation) {
  if (!semanticEvaluation || typeof semanticEvaluation !== "object") {
    return [];
  }

  const dimensions = semanticEvaluation?.dimensions;

  if (!dimensions || typeof dimensions !== "object") {
    return [];
  }

  const rows = [];

  for (const [key, value] of Object.entries(dimensions)) {
    if (!value || typeof value !== "object") continue;

    rows.push({
      key,
      label: formatSemanticLabel(key),
      score: typeof value.score === "number" ? value.score : 0,
      finding: safeText(value.finding, ""),
      evidence: safeText(value.evidence, ""),
    });
  }

  return rows;
}

function normalizeDecision(decision) {
  const value = safeText(decision, "UNKNOWN").trim().toUpperCase();

  if (value === "PERMIT" || value === "FORBID" || value === "ABSTAIN") {
    return value;
  }

  return "UNKNOWN";
}

function normalizeSeverity(severity) {
  const value = safeText(severity, "INFO").trim().toUpperCase();

  if (["CRITICAL", "ELEVATED", "CLEAR", "INFO"].includes(value)) {
    return value;
  }

  return "INFO";
}

function formatSemanticLabel(value) {
  return safeText(value, "Unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function safeText(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

const sectionBackground =
  "linear-gradient(180deg, rgba(11,14,22,0.94) 0%, rgba(7,9,15,0.98) 100%)";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    minWidth: 0,
  },

  emptyState: {
    minHeight: 420,
    border: "1px solid rgba(255,255,255,0.07)",
    background: sectionBackground,
    borderRadius: 18,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.02) inset, 0 24px 60px rgba(0,0,0,0.28)",
  },

  emptyLabel: {
    fontSize: 10,
    letterSpacing: 2.2,
    color: "#5f6880",
    fontWeight: 800,
    marginBottom: 12,
    textTransform: "uppercase",
  },

  emptyTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: "#e4ebf6",
    marginBottom: 10,
    lineHeight: 1.05,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#8e98ac",
    maxWidth: 460,
  },

  section: {
    border: "1px solid rgba(255,255,255,0.07)",
    background: sectionBackground,
    borderRadius: 18,
    padding: 18,
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.02) inset, 0 18px 44px rgba(0,0,0,0.22)",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
    flexWrap: "wrap",
  },

  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2.2,
    color: "#5f6880",
    fontWeight: 800,
    textTransform: "uppercase",
  },

  sectionMeta: {
    fontSize: 11,
    color: "#8d97aa",
    fontWeight: 700,
    letterSpacing: 0.4,
  },

  summary: {
    fontSize: 14,
    lineHeight: 1.75,
    color: "#d3dbe8",
  },

  mutedText: {
    fontSize: 13,
    lineHeight: 1.65,
    color: "#7f889c",
  },

  reasonList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  reasonCard: {
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    borderRadius: 14,
    padding: 14,
  },

  reasonTopRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 10,
  },

  sourcePill: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1.3,
    color: "#aab4c6",
    background: "rgba(122, 134, 160, 0.12)",
    border: "1px solid rgba(122, 134, 160, 0.18)",
    padding: "4px 8px",
    borderRadius: 999,
    fontWeight: 800,
  },

  dimensionPill: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1.3,
    color: "#7cf0ff",
    background: "rgba(124, 240, 255, 0.08)",
    border: "1px solid rgba(124, 240, 255, 0.16)",
    padding: "4px 8px",
    borderRadius: 999,
    fontWeight: 800,
  },

  reasonMessage: {
    fontSize: 13,
    lineHeight: 1.68,
    color: "#d5dcea",
  },

  evidenceBlock: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 1.65,
    color: "#919caf",
    borderLeft: "2px solid rgba(124, 240, 255, 0.24)",
    paddingLeft: 10,
  },

  findingList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  semanticList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  semanticUnavailable: {
    fontSize: 13,
    lineHeight: 1.65,
    color: "#e8a817",
  },
};