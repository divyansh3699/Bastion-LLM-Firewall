import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Filter,
  EyeOff,
  ScrollText,
  Gauge,
  Radio,
  Server,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  Github,
  FlaskConical,
  Layers,
  Sparkles,
  Boxes,
  BarChart3,
  FileLock2,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <Hero />
      <LogosStrip />
      <Architecture />
      <Features />
      <StackSection />
      <Metrics />
      <CTA />
      <Footer />
    </div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

function Nav() {
  const linkBase =
    "group inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold tracking-wide text-sm text-foreground/80 hover:text-ember hover:bg-ember/10 transition-all duration-200";
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/60 border-b border-hairline">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display font-semibold tracking-tight text-lg">
            Bastion
          </span>
          <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground border border-hairline px-1.5 py-0.5 rounded-sm">
            v0.1
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          <a href="#architecture" className={linkBase}>
            <Layers className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Architecture
          </a>
          <a href="#features" className={linkBase}>
            <Sparkles className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Features
          </a>
          <a href="#stack" className={linkBase}>
            <Boxes className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Stack
          </a>
          <Link to="/docs" className={linkBase}>
            <FileText className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Docs
          </Link>
          <Link to="/dashboard" className={linkBase}>
            <BarChart3 className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Analytics
          </Link>
          <Link to="/policies" className={linkBase}>
            <FileLock2 className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Policies
          </Link>
          <Link to="/sandbox" className={linkBase}>
            <FlaskConical className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Sandbox
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-4 h-4" /> Star
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 transition"
          >
            Deploy <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative w-7 h-7 rounded-md bg-gradient-to-br from-ember to-amber-glow flex items-center justify-center shadow-glow">
      <ShieldCheck className="w-4 h-4 text-ink" strokeWidth={2.5} />
    </div>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card/60 px-3 py-1 mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="relative flex w-1.5 h-1.5">
              <span className="pulse-ring absolute inset-0 rounded-full bg-ember" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-ember" />
            </span>
            Now intercepting prompts at the edge
          </div>
          <h1 className="mt-6 font-display font-bold text-5xl md:text-7xl leading-[0.95] tracking-tight">
            Cloudflare
            <span className="text-gradient-ember"> for LLMs.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Bastion sits between your users and any model — inspecting every
            prompt, redacting sensitive data, enforcing policy, and filtering
            outputs before a single token leaves your infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition shadow-glow"
            >
              Start protecting traffic <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-md border border-hairline bg-card/40 px-5 py-3 text-sm font-medium text-foreground hover:bg-card transition"
            >
              See how it works
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-ember" /> OpenAI compatible</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-ember" /> Anthropic, Bedrock, vLLM</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-ember" /> Self-hosted or managed</span>
          </div>
        </div>

        <TerminalCard />
      </div>
    </section>
  );
}

function TerminalCard() {
  return (
    <div className="mt-16 md:mt-20 grid md:grid-cols-5 gap-6">
      <div className="md:col-span-3 panel rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline bg-ink-2/60">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-glow/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-ember/70" />
          <span className="ml-3 mono text-xs text-muted-foreground">POST /v1/chat/completions</span>
        </div>
        <pre className="mono text-[13px] leading-relaxed p-5 overflow-x-auto">
{`> incoming request  ← client-web-42
  ├─ policy   : tenant/acme/prod
  ├─ model    : gpt-4o
  └─ tokens   : 812 in

`}
<span className="text-ember">[filter]</span>{` prompt-injection scan            ok  (12ms)
`}
<span className="text-ember">[mask]  </span>{` pii detected → 2 emails redacted
`}
<span className="text-ember">[policy]</span>{` "no medical advice" — passed
`}
<span className="text-ember">[route] </span>{` → upstream openai.com               ↑
`}
<span className="text-amber-glow">[output]</span>{` toxicity 0.03 · leakage 0.00 · ok
`}
<span className="text-ember">200 </span>{`streaming 1.2k tokens → client-web-42`}
        </pre>
      </div>

      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        <StatCard label="p50 overhead" value="3.1ms" hint="edge-local filters" />
        <StatCard label="Blocked" value="0.47%" hint="last 24h" />
        <StatCard label="PII masked" value="18.2k" hint="rolling 1h" />
        <StatCard label="Uptime" value="99.99%" hint="90d" />
      </div>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="panel rounded-xl p-4">
      <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

/* ───────────────────────── Logos ───────────────────────── */

function LogosStrip() {
  const items = ["OpenAI", "Anthropic", "Bedrock", "vLLM", "Mistral", "Together", "Groq"];
  return (
    <section className="border-y border-hairline bg-ink-2/30">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
        <span className="mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Compatible upstreams
        </span>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {items.map((n) => (
            <span key={n} className="font-display text-lg text-muted-foreground/80 hover:text-foreground transition-colors">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Architecture ───────────────────────── */

function Architecture() {
  return (
    <section id="architecture" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="Architecture"
          title="One hop between your users and any model."
          sub="Deploy Bastion as a sidecar, a gateway, or a managed edge — every request passes through a deterministic policy pipeline before reaching the upstream LLM."
        />

        <div className="mt-14 panel rounded-2xl p-6 md:p-10">
          <FlowDiagram />
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            <PipelineStep n="01" title="Ingress" desc="TLS termination, auth, tenant tagging, rate limits." />
            <PipelineStep n="02" title="Inspect" desc="Prompt-injection, jailbreak, and topic classifiers." />
            <PipelineStep n="03" title="Redact" desc="PII / secrets / customer data masked in-line." />
            <PipelineStep n="04" title="Enforce" desc="Declarative policies decide allow, transform, or deny." />
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowDiagram() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 1000 220" className="w-full h-auto" role="img" aria-label="Request flow diagram">
        <defs>
          <linearGradient id="lg" x1="0" x2="1">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="100%" stopColor="#0DFFB2" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        {/* Flow lines */}
        <path d="M 150 110 L 400 110" stroke="url(#lg)" strokeWidth="2" fill="none" className="flow-line" />
        <path d="M 600 110 L 850 110" stroke="url(#lg)" strokeWidth="2" fill="none" className="flow-line" />

        {/* User */}
        <g>
          <circle cx="100" cy="110" r="42" fill="#0F1320" stroke="#ffffff14" />
          <text x="100" y="115" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#e5e7eb">USER</text>
        </g>

        {/* Firewall */}
        <g>
          <rect x="380" y="40" width="240" height="140" rx="16" fill="#0F1320" stroke="url(#lg)" strokeWidth="1.5" />
          <rect x="380" y="40" width="240" height="140" rx="16" fill="url(#lg)" opacity="0.08" />
          <text x="500" y="70" textAnchor="middle" fontFamily="Space Grotesk" fontSize="16" fontWeight="600" fill="#00F2FE">BASTION</text>
          <text x="500" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#94a3b8" letterSpacing="2">FIREWALL</text>

          <g fontFamily="JetBrains Mono" fontSize="10" fill="#cbd5e1">
            <rect x="400" y="102" width="90" height="22" rx="6" fill="#0A0D14" stroke="#00F2FE22" />
            <text x="445" y="117" textAnchor="middle">filter</text>
            <rect x="500" y="102" width="90" height="22" rx="6" fill="#0A0D14" stroke="#00F2FE22" />
            <text x="545" y="117" textAnchor="middle">mask</text>
            <rect x="400" y="132" width="90" height="22" rx="6" fill="#0A0D14" stroke="#9D4EDD33" />
            <text x="445" y="147" textAnchor="middle">policy</text>
            <rect x="500" y="132" width="90" height="22" rx="6" fill="#0A0D14" stroke="#9D4EDD33" />
            <text x="545" y="147" textAnchor="middle">inspect</text>
          </g>
        </g>

        {/* LLM */}
        <g>
          <circle cx="900" cy="110" r="42" fill="#0F1320" stroke="url(#lg)" />
          <circle cx="900" cy="110" r="42" fill="url(#lg)" opacity="0.18" filter="url(#glow)" />
          <text x="900" y="115" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#00F2FE">LLM</text>
        </g>
      </svg>
    </div>
  );
}

function PipelineStep({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-hairline bg-ink-2/40 p-4">
      <div className="mono text-[10px] tracking-widest text-ember">{n}</div>
      <div className="mt-2 font-display font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

/* ───────────────────────── Features ───────────────────────── */

function Features() {
  const items = [
    {
      icon: Filter,
      title: "Prompt filtering",
      desc: "Detect prompt-injection, jailbreaks, malware, and off-topic requests using NeMo Guardrails and custom classifiers.",
      tag: "input",
    },
    {
      icon: EyeOff,
      title: "Output filtering",
      desc: "Scan model responses for toxicity, hallucinated PII, data leakage, and brand-safety violations before streaming to the client.",
      tag: "output",
    },
    {
      icon: Lock,
      title: "PII masking",
      desc: "Deterministic redaction of emails, phone numbers, secrets, and customer identifiers — with tokenized re-inflation on the return path.",
      tag: "privacy",
    },
    {
      icon: ScrollText,
      title: "Policy enforcement",
      desc: "Declarative YAML policies per tenant, model, and route. Decide allow, transform, deny, or shadow-log in one place.",
      tag: "governance",
    },
    {
      icon: Gauge,
      title: "Cost & rate control",
      desc: "Per-user, per-tenant, per-model token budgets with backpressure and graceful degradation to cheaper models.",
      tag: "ops",
    },
    {
      icon: Radio,
      title: "Full observability",
      desc: "OpenTelemetry traces, Prometheus metrics, and audit logs for every request — with prompt-safe sampling built in.",
      tag: "observe",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="Features"
          title="Everything a WAF does — for tokens."
          sub="A programmable pipeline built for the shape of LLM traffic: streaming, unstructured, expensive, and often untrusted on both ends."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  tag,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <div className="group panel rounded-xl p-6 hover:border-ember/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ember/20 to-amber-glow/10 border border-ember/30 flex items-center justify-center">
          <Icon className="w-5 h-5 text-ember" />
        </div>
        <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{tag}</span>
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

/* ───────────────────────── Stack ───────────────────────── */

function StackSection() {
  const groups = [
    { title: "Runtime", icon: Server, items: ["Envoy Proxy", "NGINX"] },
    { title: "AI Guardrails", icon: ShieldCheck, items: ["NeMo Guardrails", "Guardrails AI"] },
    { title: "Backend", icon: Zap, items: ["Python", "Rust"] },
    { title: "Monitoring", icon: Gauge, items: ["OpenTelemetry", "Prometheus"] },
  ];
  return (
    <section id="stack" className="py-24 md:py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="Tech stack"
          title="Boring where it counts. Novel where it matters."
          sub="Built on load-bearing infrastructure the internet already trusts, extended with best-in-class guardrail models."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.map((g) => (
            <div key={g.title} className="panel rounded-xl p-6">
              <div className="flex items-center gap-2">
                <g.icon className="w-4 h-4 text-ember" />
                <span className="mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {g.title}
                </span>
              </div>
              <ul className="mt-5 space-y-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center justify-between rounded-md border border-hairline bg-ink-2/40 px-3 py-2 text-sm"
                  >
                    <span className="font-medium">{it}</span>
                    <span className="mono text-[10px] text-muted-foreground">stable</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Metrics ───────────────────────── */

function Metrics() {
  return (
    <section className="py-24 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-4 gap-6 text-center md:text-left">
        {[
          ["<5ms", "median added latency"],
          ["120+", "detectors out of the box"],
          ["1.4B", "tokens inspected / day"],
          ["SOC 2", "controls mapped"],
        ].map(([v, l]) => (
          <div key={l}>
            <div className="font-display text-4xl md:text-5xl font-bold text-gradient-ember">{v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */

function CTA() {
  return (
    <section id="cta" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative panel rounded-2xl p-10 md:p-16 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-ember/20 blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
              Put a firewall in front of your <span className="text-gradient-ember">next prompt.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Point your OpenAI SDK at Bastion. Nothing else changes — except now
              every request is filtered, every response is inspected, and every
              policy is auditable.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition shadow-glow">
                Get early access <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-md border border-hairline bg-card/40 px-5 py-3 text-sm font-medium hover:bg-card transition">
                Read the docs
              </a>
            </div>
            <div className="mt-8 mono text-xs text-muted-foreground">
              $ curl https://api.openai.com/v1/... <span className="text-ember">→</span> https://edge.bastion.dev/v1/...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display font-semibold">Bastion</span>
          <span className="mono text-xs text-muted-foreground ml-3">© 2026 — the firewall for LLMs</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Security</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Utilities ───────────────────────── */

function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="mono text-[11px] uppercase tracking-widest text-ember">{kicker}</div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
        {sub}
      </p>
    </div>
  );
}
