import { useMemo, useState } from "react";
import EmailPanel from "../components/EmailPanel";
import ResultPanel, { DeterministicPanel, SemanticPanel } from "../components/ResultPanel";
import { evaluateEmail } from "../lib/api";
import texCharacter from "../assets/tex_aegis.jpeg";

const DEMO_RECIPIENT = "external.recipient@example.com";
const DEMO_SENDER = "ai-agent@texaegis.local";

export default function TexAegisDemo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trimmedText = text.trim();
  const characterCount = text.length;

  const inputStatus = useMemo(() => {
    if (loading) return "Evaluating proposed outbound communication";
    if (!trimmedText) return "No draft loaded";
    return "Draft ready for policy evaluation";
  }, [loading, trimmedText]);

  async function handleEvaluate() {
    if (!trimmedText || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await evaluateEmail({
        subject: "Outbound Communication Review",
        recipient: DEMO_RECIPIENT,
        sender: DEMO_SENDER,
        body: trimmedText,
      });

      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Tex Aegis could not complete the evaluation."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.backgroundGrid} />
      <div style={styles.backgroundGlowTop} />

      <div className="tex-shell">
        <header style={styles.hero}>
          <div style={styles.heroBadge}>TEX AEGIS · ACTION INTELLIGENCE</div>

          <div className="tex-hero-content">
            <div style={styles.heroCopy}>
              <h1 style={styles.title}>
                Before AI acts, <span style={styles.gradientText}>Tex decides.</span>
              </h1>

              <p style={styles.subtitle}>
                Evaluate outbound AI communication before release. Tex applies
                deterministic enforcement, semantic review, and final decision
                logic before an external action is allowed to proceed.
              </p>

              <div className="tex-hero-meta-row">
                <div style={styles.metaCard}>
                  <div style={styles.metaLabel}>Mode</div>
                  <div style={styles.metaValue}>Outbound Message Review</div>
                </div>

                <div style={styles.metaCard}>
                  <div style={styles.metaLabel}>System Status</div>
                  <div style={styles.metaValue}>{inputStatus}</div>
                </div>

                <div style={styles.metaCard}>
                  <div style={styles.metaLabel}>Draft Size</div>
                  <div style={styles.metaValue}>{characterCount} chars</div>
                </div>
              </div>
            </div>

            <div style={styles.heroVisual}>
              <img src={texCharacter} alt="Tex Aegis" className="tex-character-image" />
            </div>
          </div>
        </header>

        <div style={styles.contextCard} className="tex-hide-mobile">
          <div style={styles.contextLabel}>EVALUATION CONTEXT</div>

          <div className="tex-context-grid">
            <div style={styles.contextItem}>
              <span style={styles.contextItemLabel}>Sender</span>
              <span style={styles.contextItemValue}>{DEMO_SENDER}</span>
            </div>

            <div style={styles.contextItem}>
              <span style={styles.contextItemLabel}>Recipient</span>
              <span style={styles.contextItemValue}>{DEMO_RECIPIENT}</span>
            </div>

            <div style={styles.contextItem}>
              <span style={styles.contextItemLabel}>Subject</span>
              <span style={styles.contextItemValue}>
                Outbound Communication Review
              </span>
            </div>

            <div style={styles.contextItem}>
              <span style={styles.contextItemLabel}>Pipeline</span>
              <span style={styles.contextItemValue}>
                Rules → Semantics → Final Decision
              </span>
            </div>
          </div>
        </div>

        <div className="tex-main-grid">
          <section style={styles.leftColumn}>
            <EmailPanel
              text={text}
              setText={setText}
              loading={loading}
              error={error}
              onEvaluate={handleEvaluate}
            />

            {result && <DeterministicPanel result={result} />}
          </section>

          <section style={styles.rightColumn}>
            <ResultPanel result={result} />
            {result && <SemanticPanel result={result} />}
          </section>
        </div>
      </div>
    </div>
  );
}

const panelBackground =
  "linear-gradient(180deg, rgba(10,12,20,0.94) 0%, rgba(7,9,15,0.98) 100%)";

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#010103",
    color: "#e7edf7",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  backgroundGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    opacity: 0.06,
    pointerEvents: "none",
  },

  backgroundGlowTop: {
    position: "absolute",
    top: -180,
    left: "30%",
    transform: "translateX(-50%)",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(124,240,255,0.10) 0%, rgba(159,132,255,0.06) 28%, rgba(0,0,0,0) 68%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },

  hero: {
    marginBottom: 34,
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(124, 240, 255, 0.16)",
    background: "rgba(124, 240, 255, 0.05)",
    color: "#9fc9d3",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 18,
  },

  heroCopy: {
    minWidth: 0,
  },

  title: {
    margin: 0,
    fontSize: "clamp(28px, 4.8vw, 58px)",
    lineHeight: 0.96,
    letterSpacing: -1.4,
    fontWeight: 800,
    color: "#f4f7fd",
    maxWidth: 820,
  },

  gradientText: {
    background: "linear-gradient(90deg, #91f5ff 0%, #b29aff 52%, #ff9de1 100%)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },

  subtitle: {
    margin: "18px 0 0 0",
    maxWidth: 760,
    fontSize: "clamp(14px, 2vw, 16px)",
    lineHeight: 1.75,
    color: "#99a3b7",
  },

  metaCard: {
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    padding: "14px 16px",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset",
    minWidth: 0,
  },

  metaLabel: {
    fontSize: 10,
    letterSpacing: 1.7,
    textTransform: "uppercase",
    color: "#667086",
    fontWeight: 800,
    marginBottom: 8,
  },

  metaValue: {
    fontSize: 13,
    lineHeight: 1.5,
    color: "#dde4ef",
    fontWeight: 600,
    wordBreak: "break-word",
  },

  heroVisual: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    minWidth: 0,
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    minWidth: 0,
  },

  contextCard: {
    border: "1px solid rgba(255,255,255,0.07)",
    background: panelBackground,
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.02) inset, 0 20px 60px rgba(0,0,0,0.25)",
  },

  contextLabel: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#687289",
    fontWeight: 800,
    marginBottom: 14,
  },

  contextItem: {
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    borderRadius: 14,
    padding: "12px 14px",
    minWidth: 0,
  },

  contextItemLabel: {
    display: "block",
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#667086",
    fontWeight: 800,
    marginBottom: 8,
  },

  contextItemValue: {
    display: "block",
    fontSize: 13,
    lineHeight: 1.55,
    color: "#dde4ef",
    fontWeight: 600,
    wordBreak: "break-word",
  },
};