# AI Use Case Tracker

A ServiceNow scoped application built with **SDK v4.3.0** to track, manage, and report on AI initiatives across your organization.

## Features

- 📋 **Use Case Registry** — Track AI projects from idea to live with status, priority, owner, and value fields
- 🔔 **Status Change Notifications** — Automated email alerts to owners when status updates (Flow API)
- 📊 **Weekly Digest** — Monday morning summary email of all active use cases (ScheduledTrigger)
- 🖥️ **Workspace UI** — Modern ServiceNow Workspace with filtered list views

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | ServiceNow SDK v4.3.0 |
| Language | TypeScript 5.3 |
| Automation | Flow API (RecordTrigger + ScheduledTrigger) |
| UI | ServiceNow Workspace |
| CI/CD | GitHub Actions |

## Project Structure

```
ai-use-case-tracker/
├── src/
│   ├── tables/
│   │   └── ai_use_case.ts        # Data model (x_ai_uc_tracker_use_case)
│   ├── flows/
│   │   ├── notify_status_change.ts  # RecordTrigger flow
│   │   └── weekly_digest.ts         # ScheduledTrigger flow
│   ├── workspaces/
│   │   └── ai_uc_workspace.ts    # Workspace definition
│   └── index.ts                  # Exports
├── .github/workflows/
│   └── deploy.yml                # CI/CD pipeline
├── now.config.json               # App scope & SDK config
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 20.x
- ServiceNow SDK CLI: `npm install -g @servicenow/sdk@4.3.0`
- Access to a ServiceNow instance (Washington DC or later)

### Local Setup

```bash
git clone https://github.com/csuiter/ai-use-case-tracker.git
cd ai-use-case-tracker
npm install
npx @servicenow/cli build
```

### Deploy Manually

```bash
npx @servicenow/cli deploy \
  --instance https://your-instance.service-now.com \
  --username admin \
  --password yourpassword
```

## CI/CD Setup

Add these secrets to your GitHub repository (**Settings → Secrets and variables → Actions**):

| Secret | Description |
|---|---|
| `SN_DEV_INSTANCE_URL` | Dev instance URL (e.g. `https://dev12345.service-now.com`) |
| `SN_DEV_USERNAME` | Dev instance admin username |
| `SN_DEV_PASSWORD` | Dev instance admin password |
| `SN_PROD_INSTANCE_URL` | Prod instance URL |
| `SN_PROD_USERNAME` | Prod instance admin username |
| `SN_PROD_PASSWORD` | Prod instance admin password |

**Branch → Environment mapping:**
- `develop` → deploys to DEV
- `main` → deploys to PROD

## Use Case Fields

| Field | Type | Description |
|---|---|---|
| Name | String | Use case title |
| Description | String | Detailed description |
| Business Unit | String | Owning business unit |
| Owner | Reference | sys_user reference |
| Status | Choice | idea → in_review → approved → in_progress → live |
| Priority | Choice | High / Medium / Low |
| AI Technology | String | GenAI, ML, Agentic, NLP, etc. |
| Estimated Value | Currency | Projected business value |
| Actual Value | Currency | Realized business value |
| Target Go-Live | Date | Planned launch date |
| Actual Go-Live | Date | Actual launch date |
| Notes | String | Free-form notes |

## App Scope

`x_ai_uc_tracker` — all artifacts are scoped under this prefix.
