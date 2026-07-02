# Bastion: Cloudflare for LLMs 🛡️🤖

Bastion is a secure, enterprise-grade AI Web Application Firewall (WAF) and API Gateway that intercepts, inspects, and scrubs malicious traffic at the edge before it reaches large language models (LLMs). It helps organizations mitigate risks associated with the OWASP Top 10 for LLMs while ensuring complete data compliance.

---

## 🚀 Key Features

*   **Prompt Injection Detection:** Real-time interception and blocking of instruction-hijacking and adversary prompts (e.g., system overrides, developer mode bypasses).
*   **Data Loss Prevention (DLP):** Automatic PII masking (emails, phone numbers, governance IDs) to prevent sensitive data leakage to external providers.
*   **Jailbreak Defense:** Pattern-matching rules integrated with advanced guardrails (inspired by NeMo Guardrails) to eliminate exploit attempts.
*   **Real-time Obseravability:** Dynamic dashboard visualizing blocked threats, traffic volumes, active policy counts, and latency overhead analytics.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend/Dashboard:** React.js, Vite, Tailwind CSS, Lucide Icons, Recharts
*   **Routing/Proxy Layers (Proposed Core):** NGINX / Envoy Proxy
*   **AI Safety Layer (Proposed Engine):** NeMo Guardrails / Guardrails AI
*   **Observability Pipeline:** OpenTelemetry & Prometheus

### 📋 Data Flow Architecture
`User` ➔ `Envoy Proxy / WAF Gateway` ➔ `Bastion Security Pipelines (Prompt Filter & PII Masking)` ➔ `Target LLM` ➔ `Output Filter Check` ➔ `Client Response`

---

## 💻 Local Installation & Setup

Ensure you have **Bun** or **Node.js** installed on your machine.

1. Clone the repository:
   ```bash
   git clone [https://github.com/divyansh3699/Bastion-LLM-Firewall.git](https://github.com/divyansh3699/Bastion-LLM-Firewall.git)

bun install
# OR
npm install 

bun run dev
# OR
npm run dev

