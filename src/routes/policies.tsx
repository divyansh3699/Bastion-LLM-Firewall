import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ShieldCheck,
  ArrowLeft,
  ShieldAlert,
  Lock,
  Filter,
  FlaskConical,
  Activity,
  Info,
  BookOpen,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useSecurity, type PolicyId } from "@/context/SecurityContext";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Policy Management — Bastion Firewall for LLMs" },
      {
        name: "description",
        content:
          "Toggle input guardrails, data privacy (DLP), and output filters for your LLM firewall — deployed live to the Envoy edge.",
      },
      { property: "og:title", content: "Policy Management — Bastion" },
      {
        property: "og:description",
        content:
          "Manage prompt injection, PII masking, and output filtering policies for your LLM edge.",
      },
    ],
  }),
  component: Policies,
});

type Rule = {
  id: PolicyId;
  label: string;
  description: string;
  reference?: string;
};

type Group = {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  rules: Rule[];
};

const GROUPS: Group[] = [
  {
    key: "input",
    title: "Input Guardrails",
    subtitle: "Inspect prompts before they reach the model",
    icon: <ShieldAlert className="w-4 h-4" />,
    accent: "text-ember",
    rules: [
      {
        id: "prompt_injection",
        label: "Prompt Injection Detection",
        description: "Detects instruction-hijacking patterns and adversarial prompts.",
        reference: "OWASP Top 10 for LLMs — LLM01",
      },
      {
        id: "jailbreak",
        label: "Jailbreak Defense",
        description: "Blocks known jailbreak templates (DAN, roleplay bypasses, obfuscation).",
        reference: "NeMo Guardrails · jailbreak_detection",
      },
      {
        id: "banned_keywords",
        label: "Banned Keyword List",
        description: "Rejects prompts containing terms on your custom blocklist.",
        reference: "Custom policy · edge dictionary",
      },
      {
        id: "excessive_agency",
        label: "Excessive Agency Control",
        description:
          "Intercepts agent tool calls attempting privileged actions (shell, SQL, file deletion).",
        reference: "OWASP Top 10 for LLMs — LLM08",
      },
    ],
  },

  {
    key: "dlp",
    title: "Data Privacy (DLP)",
    subtitle: "Redact sensitive data before it leaves your perimeter",
    icon: <Lock className="w-4 h-4" />,
    accent: "text-amber-glow",
    rules: [
      {
        id: "mask_emails",
        label: "Mask Emails",
        description: "Replaces RFC 5322 email addresses with [MASKED_PII].",
        reference: "DLP · Regex + validation",
      },
      {
        id: "mask_phones",
        label: "Mask Phone Numbers",
        description: "Detects E.164 and 10-digit local numbers, redacts before egress.",
        reference: "DLP · libphonenumber",
      },
      {
        id: "mask_ids",
        label: "Mask Financial / Govt IDs",
        description: "Masks credit cards, Aadhaar, SSN, IBAN and other 12–16 digit identifiers.",
        reference: "DLP · Luhn + entity detectors",
      },
    ],
  },
  {
    key: "output",
    title: "Output Guardrails",
    subtitle: "Inspect model responses before returning to the client",
    icon: <Filter className="w-4 h-4" />,
    accent: "text-purple-400",
    rules: [
      {
        id: "toxicity",
        label: "Hate Speech & Toxicity Filter",
        description: "Blocks responses that exceed the configured toxicity threshold.",
        reference: "Guardrails AI · ToxicLanguage",
      },
      {
        id: "secret_leak",
        label: "Secrets / API Key Leak Prevention",
        description: "Scans model output for API keys, tokens, and private keys.",
        reference: "Guardrails AI · SecretsPresent",
      },
      {
        id: "output_scan",
        label: "Output Response Scan",
        description:
          "Bi-directional scan of model output for hallucinations, compliance and safety violations. Muted responses are replaced with a redacted warning.",
        reference: "Guardrails AI · ProvenanceLLM + NeMo topical rails",
      },

    ],
  },
];

function Policies() {
  const { policies, setPolicy } = useSecurity();
  const [activeTab, setActiveTab] = useState<string>("input");

  const totalEnabled = GROUPS.reduce(
    (acc, g) => acc + g.rules.filter((r) => policies[r.id]).length,
    0,
  );
  const totalRules = GROUPS.reduce((acc, g) => acc + g.rules.length, 0);

  function toggleRule(rule: Rule, next: boolean) {
    setPolicy(rule.id, next);
    toast.success("Firewall rules updated on Envoy Proxy/WAF Gateway successfully", {
      description: `${rule.label} → ${next ? "ENABLED" : "DISABLED"}`,
    });
  }

  const activeGroup = GROUPS.find((g) => g.key === activeTab) ?? GROUPS[0];

  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/60 border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-ember to-amber-glow flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-ink" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold tracking-tight text-lg">Bastion</span>
            <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground border border-hairline px-1.5 py-0.5 rounded-sm">
              policies
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground inline-flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Analytics
            </Link>
            <Link to="/docs" className="hover:text-foreground inline-flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Docs
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

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 text-xs text-muted-foreground mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYNCED · edge-prod-01
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-display font-semibold tracking-tight">
              Policy Management
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Toggle guardrails on or off. Changes propagate to your Envoy edge and WAF gateway in
              real time.
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-card/40 backdrop-blur px-5 py-3">
            <div className="text-[11px] mono uppercase tracking-widest text-muted-foreground">
              Active Rules
            </div>
            <div className="mt-1 text-2xl font-display font-semibold tracking-tight">
              {totalEnabled}
              <span className="text-muted-foreground text-sm mono"> / {totalRules}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-hairline">
          {GROUPS.map((g) => {
            const enabled = g.rules.filter((r) => policies[r.id]).length;
            const isActive = g.key === activeTab;
            return (
              <button
                key={g.key}
                onClick={() => setActiveTab(g.key)}
                className={`relative px-4 py-3 text-sm flex items-center gap-2 transition ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={isActive ? g.accent : ""}>{g.icon}</span>
                {g.title}
                <span className="ml-1 mono text-[10px] uppercase tracking-widest text-muted-foreground border border-hairline px-1.5 py-0.5 rounded">
                  {enabled}/{g.rules.length}
                </span>
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 bg-gradient-to-r from-ember to-amber-glow rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active tab card */}
        <section className="mt-6 rounded-xl border border-hairline bg-card/40 backdrop-blur">
          <div className="px-6 py-5 border-b border-hairline flex items-start gap-3">
            <span className={`mt-0.5 ${activeGroup.accent}`}>{activeGroup.icon}</span>
            <div>
              <h2 className="text-base font-medium">{activeGroup.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{activeGroup.subtitle}</p>
            </div>
          </div>
          <ul className="divide-y divide-hairline">
            {activeGroup.rules.map((rule) => {
              const isEnabled = policies[rule.id];
              return (
                <li
                  key={rule.id}
                  className="px-6 py-4 flex items-start justify-between gap-6 hover:bg-ember/[0.03] transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{rule.label}</span>
                      <span
                        className={`mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                          isEnabled
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            : "border-hairline bg-muted/30 text-muted-foreground"
                        }`}
                      >
                        {isEnabled ? "Active" : "Off"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{rule.description}</p>
                    {rule.reference && (
                      <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] mono text-muted-foreground">
                        <Info className="w-3 h-3" />
                        {rule.reference}
                      </div>
                    )}
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(next) => toggleRule(rule, next)}
                    aria-label={`Toggle ${rule.label}`}
                  />
                </li>
              );
            })}
          </ul>
        </section>

        <p className="mt-4 text-[11px] mono text-muted-foreground">
          Changes are pushed to Envoy edge nodes within ~200ms via the control plane.
        </p>
      </main>
    </div>
  );
}
