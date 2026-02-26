import { Flow, RecordTrigger, SendEmail } from "@servicenow/sdk/flow";
import { AiUseCase } from "../tables/ai_use_case";

export const NotifyOnStatusChange = Flow({
  name: "x_ai_uc_tracker.notify_status_change",
  description: "Notify owner when use case status changes",
  runAs: "system",
  trigger: RecordTrigger({
    table: AiUseCase,
    condition: "updated",
    filter: (record) => record.status.changed()
  }),
  actions: [
    SendEmail({
      to: (record) => record.owner.email,
      subject: (record) => `AI Use Case Update: ${record.name}`,
      body: (record) => `
Hi ${record.owner.first_name},

Your AI use case "${record.name}" status has been updated.

New Status: ${record.status.getDisplayValue()}
Business Unit: ${record.business_unit}
Priority: ${record.priority.getDisplayValue()}

View record: ${record.getLink()}

- AI Use Case Tracker
      `
    })
  ]
});
