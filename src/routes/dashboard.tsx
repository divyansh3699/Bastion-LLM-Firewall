import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  ShieldCheck,
  ShieldAlert,
  ScrollText,
  Timer,
  ArrowLeft,
  FlaskConical,
  CheckCircle2,
  Ban,
  X,
  BookOpen,
  VolumeX,
  Bot,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
} from "recharts";
import { useSecurity, bucketLogsByHour, type SecurityLog, type LogStatus } from "@/context/SecurityContext";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Analytics — Bastion Firewall for LLMs" },
      {
        name: "description",
        content:
          "Real-time analytics for your LLM firewall: threats blocked, request volume, policy enforcement, and latency overhead.",
      },
      { property: "og:title", content: "Analytics — Bastion" },
      {
        property: "og:description",
        content: "Monitor prompt injections, PII leaks, and toxic output blocks in real time.",
      },
    ],
  }),
  component: Dashboard,
});

/* ─────────────── Component ─────────────── */

type LogRow = SecurityLog;

function Dashboard() {
  const { logs, policies } = useSecurity();
  const [tab, setTab] = useState<"threats" | "trend">("threats");
  const [selected, setSelected] = useState<LogRow | null>(null);

  const threatData = useMemo(() => bucketLogsByHour(logs, 24), [logs]);

  const totalBlocked = useMemo(
    () => logs.filter((l) => l.status === "Blocked" || l.status === "Muted").length,
    [logs],
  );
  const totalRequests = logs.length;
  const piiBlocked = useMemo(
    () => logs.filter((l) => l.category === "pii" && l.status !== "Allowed").length,
    [logs],
  );
  const injectionBlocked = useMemo(
    () => logs.filter((l) => l.category === "injection").length,
    [logs],
  );
  const agentBlocked = useMemo(
    () => logs.filter((l) => l.category === "agent").length,
    [logs],
  );
  const outputMuted = useMemo(
    () =>
      logs.filter(
        (l) =>
          l.status === "Muted" ||
          (l.status === "Blocked" && (l.category === "output" || l.category === "toxicity" || l.category === "secret")),
      ).length,
    [logs],
  );
  const activePolicies = useMemo(
    () => Object.values(policies).filter(Boolean).length,
    [policies],
  );
  const totalPolicies = Object.keys(policies).length;

  // Dynamic latency overhead: base + ~6ms per active guardrail
  const latencyOverhead = 22 + activePolicies * 6;
  const p95Overhead = latencyOverhead + 29;

  const stats = useMemo(
    () => [
      {
        label: "Total Requests",
        value: totalRequests.toLocaleString(),
        delta: `${logs.filter((l) => l.source === "sandbox").length} from sandbox`,
        icon: <Activity className="w-4 h-4" />,
        tone: "neutral" as const,
      },
      {
        label: "Blocked Attacks",
        value: totalBlocked.toLocaleString(),
        delta: `${injectionBlocked} injection · ${piiBlocked} PII`,
        icon: <ShieldAlert className="w-4 h-4" />,
        tone: "danger" as const,
      },
      {
        label: "Agent Tools Blocked",
        value: agentBlocked.toLocaleString(),
        delta: "OWASP LLM08 · Excessive Agency",
        icon: <Bot className="w-4 h-4" />,
        tone: "danger" as const,
      },
      {
        label: "Output Violations Deflected",
        value: outputMuted.toLocaleString(),
        delta: "Toxicity · Secrets · Compliance",
        icon: <VolumeX className="w-4 h-4" />,
        tone: "danger" as const,
      },
      {
        label: "Active Policies",
        value: `${activePolicies}`,
        delta: `${activePolicies}/${totalPolicies} enabled`,
        icon: <ScrollText className="w-4 h-4" />,
        tone: "ok" as const,
      },
      {
        label: "Avg. Latency Overhead",
        value: `+${latencyOverhead}ms`,
        delta: `p95 +${p95Overhead}ms · scales with policies`,
        icon: <Timer className="w-4 h-4" />,
        tone: "neutral" as const,
      },
    ],
    [
      totalRequests,
      totalBlocked,
      piiBlocked,
      injectionBlocked,
      agentBlocked,
      outputMuted,
      activePolicies,
      totalPolicies,
      latencyOverhead,
      p95Overhead,
      logs,
    ],
  );


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
              analytics
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link to="/docs" className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold tracking-wide text-sm text-foreground/80 hover:text-ember hover:bg-ember/10 transition-all duration-200">
              <BookOpen className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Docs
            </Link>
            <Link to="/sandbox" className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold tracking-wide text-sm text-foreground/80 hover:text-ember hover:bg-ember/10 transition-all duration-200">
              <FlaskConical className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Sandbox
            </Link>
            <Link to="/" className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold tracking-wide text-sm text-foreground/80 hover:text-ember hover:bg-ember/10 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 transition-colors duration-200 group-hover:text-ember" strokeWidth={1.5} /> Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 text-xs text-muted-foreground mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE • last 24h
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-display font-semibold tracking-tight">
            Firewall Analytics
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Real-time observability into your LLM edge — traffic, threats blocked, active policies,
            and guardrail latency.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-hairline bg-card/40 backdrop-blur p-4"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs mono uppercase tracking-widest">{s.label}</span>
                <span
                  className={
                    s.tone === "danger"
                      ? "text-red-300"
                      : s.tone === "ok"
                        ? "text-emerald-300"
                        : "text-ember"
                  }
                >
                  {s.icon}
                </span>
              </div>
              <div className="mt-2 text-2xl font-display font-semibold tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground mono">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <section className="mt-8 rounded-xl border border-hairline bg-card/40 backdrop-blur p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium">Threats Blocked over Time</h2>
              <p className="text-[11px] text-muted-foreground mono">
                Categorized by policy violation type
              </p>
            </div>
            <div className="inline-flex rounded-md border border-hairline overflow-hidden">
              {(["threats", "trend"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`px-3 py-1.5 text-xs mono uppercase tracking-wider transition ${
                    tab === k
                      ? "bg-ember/20 text-ember"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {k === "threats" ? "Bar" : "Trend"}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {tab === "threats" ? (
                <BarChart data={threatData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="injection"
                    stackId="a"
                    fill="#00F2FE"
                    name="Prompt Injection"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar dataKey="pii" stackId="a" fill="#0DFFB2" name="PII Leaks" />
                  <Bar dataKey="toxicity" stackId="a" fill="#9D4EDD" name="Toxicity" />
                  <Bar dataKey="secret" stackId="a" fill="#22D3EE" name="Secret Leak" />
                  <Bar dataKey="agent" stackId="a" fill="#FF3B6B" name="Agent Tool" />
                  <Bar
                    dataKey="output"
                    stackId="a"
                    fill="#7C3AED"
                    name="Output Muted"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>

              ) : (
                <LineChart data={threatData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}
                    iconType="circle"
                  />
                  <Line
                    type="monotone"
                    dataKey="injection"
                    stroke="#00F2FE"
                    strokeWidth={2}
                    dot={false}
                    name="Prompt Injection"
                  />
                  <Line
                    type="monotone"
                    dataKey="pii"
                    stroke="#0DFFB2"
                    strokeWidth={2}
                    dot={false}
                    name="PII Leaks"
                  />
                  <Line
                    type="monotone"
                    dataKey="toxicity"
                    stroke="#9D4EDD"
                    strokeWidth={2}
                    dot={false}
                    name="Toxicity"
                  />
                  <Line
                    type="monotone"
                    dataKey="agent"
                    stroke="#FF3B6B"
                    strokeWidth={2}
                    dot={false}
                    name="Agent Tool"
                  />
                  <Line
                    type="monotone"
                    dataKey="output"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dot={false}
                    name="Output Muted"
                  />
                </LineChart>

              )}
            </ResponsiveContainer>
          </div>
        </section>

        {/* Live logs */}
        <section className="mt-8 rounded-xl border border-hairline bg-card/40 backdrop-blur overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
            <div>
              <h2 className="text-sm font-medium">Live Traffic Logs</h2>
              <p className="text-[11px] text-muted-foreground mono">
                Click any row for full inspection details
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Streaming
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[11px] mono uppercase tracking-widest text-muted-foreground bg-background/40">
                <tr>
                  <th className="text-left px-5 py-2.5 font-medium">Time</th>
                  <th className="text-left px-5 py-2.5 font-medium">Source IP</th>
                  <th className="text-left px-5 py-2.5 font-medium">Prompt</th>
                  <th className="text-left px-5 py-2.5 font-medium">Status</th>
                  <th className="text-left px-5 py-2.5 font-medium">Policy</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelected(log)}
                    className="border-t border-hairline hover:bg-ember/5 cursor-pointer transition"
                  >
                    <td className="px-5 py-3 mono text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(log.ts).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-3 mono text-xs">{log.ip}</td>
                    <td className="px-5 py-3 max-w-[380px] truncate">{log.prompt}</td>
                    <td className="px-5 py-3">
                      <StatusPill status={log.status} />
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{log.policy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {selected && <LogDialog log={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function StatusPill({ status }: { status: LogStatus }) {
  if (status === "Blocked") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 mono text-[10px] uppercase tracking-widest bg-red-500/15 text-red-300 border border-red-500/30">
        <Ban className="w-3 h-3" /> Blocked
      </span>
    );
  }
  if (status === "Muted") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 mono text-[10px] uppercase tracking-widest bg-purple-500/15 text-purple-300 border border-purple-500/30">
        <VolumeX className="w-3 h-3" /> Muted
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 mono text-[10px] uppercase tracking-widest bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
      <CheckCircle2 className="w-3 h-3" /> Allowed
    </span>
  );
}


function LogDialog({ log, onClose }: { log: LogRow; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-hairline bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-hairline">
          <div className="flex items-center gap-2">
            <StatusPill status={log.status} />
            <span className="mono text-xs text-muted-foreground">{log.id}</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4 text-sm">
          <Detail label="Timestamp" value={new Date(log.ts).toLocaleString()} mono />
          <Detail label="Source IP" value={log.ip} mono />
          <Detail label="Model" value={log.model} mono />
          <Detail label="Latency" value={`${log.latencyMs} ms`} mono />
          <div>
            <div className="text-[11px] mono uppercase tracking-widest text-muted-foreground mb-1">
              Prompt
            </div>
            <pre className="rounded-md border border-hairline bg-background/60 p-3 text-xs mono whitespace-pre-wrap break-words">
              {log.prompt}
            </pre>
          </div>
          <Detail label="Policy" value={String(log.policy)} />
          <Detail label="Action" value={log.action} />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[11px] mono uppercase tracking-widest text-muted-foreground pt-0.5">
        {label}
      </span>
      <span className={`text-right ${mono ? "mono text-xs" : ""}`}>{value}</span>
    </div>
  );
}
