import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  ArrowLeft,
  BookOpen,
  Server,
  Network,
  Gauge,
  Layers,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Activity,
  FlaskConical,
  FileText,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Architecture & Docs — Bastion Firewall for LLMs" },
      {
        name: "description",
        content:
          "Understand how Bastion works under the hood: Envoy/NGINX edge proxy, NeMo Guardrails, real-time validation pipelines, and observability with OpenTelemetry & Prometheus.",
      },
      { property: "og:title", content: "Architecture & Docs — Bastion" },
      {
        property: "og:description",
        content:
          "Deep dive into the Bastion LLM Firewall architecture, monitoring stack, and project scope.",
      },
    ],
  }),
  component: DocsPage,
});

/* ─────────────── Page ─────────────── */

function DocsPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 text-xs text-muted-foreground mono">
            <BookOpen className="w-3.5 h-3.5" />
            DOCS
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-display font-semibold tracking-tight">
            Architecture & Documentation
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
            How Bastion secures enterprise Generative AI deployments under the hood — from edge proxy to policy enforcement.
          </p>
        </div>

        <div className="space-y-8">
          <ArchitectureSection />
          <MonitoringSection />
          <ScopeSection />
          <PipelineSection />
        </div>
      </main>
    </div>
  );
}

/* ─────────────── Header ─────────────── */

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/60 border-b border-hairline">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-ember to-amber-glow flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-ink" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold tracking-tight text-lg">Bastion</span>
          <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground border border-hairline px-1.5 py-0.5 rounded-sm">
            docs
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground inline-flex items-center gap-1.5">
            <Activity className="w-4 h-4" /> Analytics
          </Link>
          <Link to="/sandbox" className="hover:text-foreground inline-flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4" /> Sandbox
          </Link>
          <Link to="/" className="hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─────────────── Architecture Section ─────────────── */

function ArchitectureSection() {
  return (
    <section className="panel rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-md bg-ember/15 flex items-center justify-center">
          <Network className="w-4 h-4 text-ember" />
        </div>
        <h2 className="text-xl font-display font-semibold tracking-tight">Architecture</h2>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        Bastion is deployed as a reverse proxy between your users and any upstream LLM. Every request passes through a hardened edge gateway before touching the model.
      </p>

      {/* Flow diagram */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 mb-8">
        <FlowNode icon={<Server className="w-4 h-4" />} label="User" sub="Client App / API" />
        <FlowArrow />
        <FlowNode icon={<Layers className="w-4 h-4" />} label="Envoy / NGINX" sub="WAF Gateway" accent />
        <FlowArrow />
        <FlowNode icon={<ShieldCheck className="w-4 h-4" />} label="NeMo / Guardrails AI" sub="Policy Engine" accent />
        <FlowArrow />
        <FlowNode icon={<FileText className="w-4 h-4" />} label="Target LLM" sub="OpenAI / Anthropic / Bedrock" />
      </div>

      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Edge Proxy — Envoy / NGINX</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The edge layer terminates TLS, applies rate limits, and routes traffic to the correct guardrail pipeline. Envoy’s extensible filter chain lets us inject custom C++ or Lua checks before the request body is parsed. NGINX acts as a fallback load balancer for high-throughput deployments.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Policy Engine — NeMo Guardrails / Guardrails AI</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The core inspection layer runs on a Python/Rust backend. NeMo Guardrails handles dialogue management and topic control, while Guardrails AI performs structural validation (e.g., regex, JSON schema, PII detectors). Both engines run as sidecars so they can scale independently of the edge proxy.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Target LLM Routing</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              After passing all guardrails, the sanitized prompt is forwarded to the target model — whether that is OpenAI GPT-4, Anthropic Claude, AWS Bedrock, or a self-hosted Llama endpoint. Response headers carry trace IDs so the output filter can correlate its checks with the original request.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

/* ─────────────── Monitoring Section ─────────────── */

function MonitoringSection() {
  return (
    <section className="panel rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-md bg-ember/15 flex items-center justify-center">
          <Gauge className="w-4 h-4 text-ember" />
        </div>
        <h2 className="text-xl font-display font-semibold tracking-tight">Monitoring & Observability</h2>
      </div>

      <Alert className="mb-6 border-ember/30 bg-ember/5">
        <AlertTriangle className="w-4 h-4 text-ember" />
        <AlertTitle className="text-ember">Latency Budget</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Guardrail checks add measurable overhead. Baseline target is +42 ms p99 for prompt classification and +18 ms for output filtering. Anything above +100 ms triggers an automatic alert.
        </AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="mon-1">
          <AccordionTrigger>OpenTelemetry Instrumentation</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every pipeline stage emits spans via OpenTelemetry: edge routing, policy evaluation, LLM round-trip, and output filtering. Traces are exported to Jaeger or any OTLP-compatible backend so SRE teams can pinpoint latency regressions across the stack.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mon-2">
          <AccordionTrigger>Prometheus Metrics</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A Prometheus scrape endpoint exposes counters for requests, blocks, and PII masks; histograms for guardrail latency; and gauges for active policy count. AlertManager rules fire when block-rate spikes exceed 3 standard deviations or when p99 latency crosses the +100 ms threshold.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mon-3">
          <AccordionTrigger>Alert Triggers</AccordionTrigger>
          <AccordionContent>
            <ul className="text-muted-foreground text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>
                <strong className="text-foreground">Latency Spike:</strong> p99 guardrail overhead &gt; +100 ms for 2 minutes.
              </li>
              <li>
                <strong className="text-foreground">Attack Surge:</strong> Blocked request rate &gt; 3σ above 24-hour baseline.
              </li>
              <li>
                <strong className="text-foreground">Policy Drift:</strong> Active policy count changes unexpectedly (indicates a config push or rollback).
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

/* ─────────────── Scope Section ─────────────── */

function ScopeSection() {
  return (
    <section className="panel rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-md bg-ember/15 flex items-center justify-center">
          <Layers className="w-4 h-4 text-ember" />
        </div>
        <h2 className="text-xl font-display font-semibold tracking-tight">Project Scope</h2>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        This prototype demonstrates the proxy middleware layer running real-time validation pipelines to secure enterprise Generative AI deployments.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-hairline bg-card/40 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">In Scope</span>
          </div>
          <ul className="text-muted-foreground text-sm space-y-1 list-disc pl-4">
            <li>Prompt injection detection & jailbreak defense</li>
            <li>PII / secrets masking before LLM ingress</li>
            <li>Toxicity & API-key leak filtering on egress</li>
            <li>Policy configuration UI with live toggles</li>
            <li>Real-time analytics dashboard & logs</li>
          </ul>
        </div>

        <div className="rounded-lg border border-hairline bg-card/40 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-glow" />
            <span className="text-sm font-medium">Future Roadmap</span>
          </div>
          <ul className="text-muted-foreground text-sm space-y-1 list-disc pl-4">
            <li>Fine-grained RBAC & multi-tenant policy isolation</li>
            <li>Custom model adapters for on-premise LLMs</li>
            <li>Auto-remediation & quarantine workflows</li>
            <li>Federated learning for threat signature updates</li>
            <li>SLA-backed edge regions for sub-20 ms overhead</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Pipeline Section ─────────────── */

function PipelineSection() {
  const steps = [
    {
      title: "User Input",
      desc: "Raw prompt arrives at the edge proxy via HTTP/2 or gRPC. Request headers include model routing hints and tenant IDs.",
      icon: <Server className="w-4 h-4" />,
    },
    {
      title: "Firewall Inspection",
      desc: "The prompt is scanned for injection patterns (OWASP LLM01), jailbreak attempts, and banned keywords. A parallel PII detector masks emails, phone numbers, and financial/government IDs.",
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      title: "LLM Processing",
      desc: "Sanitized payload is forwarded to the target LLM. Response streaming is buffered just enough to enable output filtering without harming Time-To-First-Token (TTFT).",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      title: "Output Filter",
      desc: "The raw model output is checked for toxic language, leaked secrets, and policy violations before it is released to the user.",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      title: "Final User Response",
      desc: "Clean response is returned with full trace metadata (latency breakdown, policy version, and mask count) in response headers.",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  return (
    <section className="panel rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-md bg-ember/15 flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-ember" />
        </div>
        <h2 className="text-xl font-display font-semibold tracking-tight">End-to-End Pipeline</h2>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-8 bottom-8 w-px bg-hairline" />
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="relative flex items-start gap-4">
              <div className="relative z-10 w-10 h-10 rounded-full bg-card border border-hairline flex items-center justify-center shrink-0 text-ember">
                {s.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Helpers ─────────────── */

function FlowNode({
  icon,
  label,
  sub,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1 min-w-[140px]">
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center border",
          accent
            ? "bg-ember/15 border-ember/30 text-ember"
            : "bg-card border-hairline text-muted-foreground"
        )}
      >
        {icon}
      </div>
      <span className="text-xs font-semibold text-foreground mt-1">{label}</span>
      <span className="text-[10px] text-muted-foreground leading-tight max-w-[120px]">{sub}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden md:flex items-center justify-center text-muted-foreground">
      <ArrowRight className="w-4 h-4" />
    </div>
  );
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
