import { Flow, ScheduledTrigger, SendEmail, Query } from "@servicenow/sdk/flow";
import { AiUseCase } from "../tables/ai_use_case";

export const WeeklyDigest = Flow({
  name: "x_ai_uc_tracker.weekly_digest",
  description: "Send weekly summary of active AI use cases",
  runAs: "system",
  trigger: ScheduledTrigger({
    frequency: "weekly",
    dayOfWeek: "monday",
    time: "08:00"
  }),
  actions: [
    Query({
      table: AiUseCase,
      filter: (r) => r.status.in(["approved", "in_progress", "in_review"]),
      orderBy: "priority",
      into: "activeUseCases"
    }),
    SendEmail({
      to: "ai-leadership@company.com",
      subject: "Weekly AI Use Case Digest",
      body: (vars) => `
Weekly AI Use Case Summary
Active: ${vars.activeUseCases.length} use cases

${vars.activeUseCases.map((r) =>
  `- [${r.status.getDisplayValue()}] ${r.name} | Owner: ${r.owner.name} | Priority: ${r.priority.getDisplayValue()}`
).join("\n")}
      `
    })
  ]
});
