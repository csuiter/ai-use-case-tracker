import { Table } from "@servicenow/sdk/core";

export const AiUseCase = Table({
  name: "x_ai_uc_tracker_use_case",
  label: "AI Use Case",
  fields: {
    name:            { type: "string",   label: "Use Case Name",       mandatory: true },
    description:     { type: "string",   label: "Description",         max_length: 1000 },
    business_unit:   { type: "string",   label: "Business Unit",       mandatory: true },
    owner:           { type: "reference",label: "Owner",               reference: "sys_user" },
    status:          { type: "choice",   label: "Status",              choices: [
                         { label: "Idea",        value: "idea" },
                         { label: "In Review",   value: "in_review" },
                         { label: "Approved",    value: "approved" },
                         { label: "In Progress", value: "in_progress" },
                         { label: "Live",        value: "live" },
                         { label: "Cancelled",   value: "cancelled" }
                       ], default: "idea" },
    priority:        { type: "choice",   label: "Priority",            choices: [
                         { label: "High",   value: "1_high" },
                         { label: "Medium", value: "2_medium" },
                         { label: "Low",    value: "3_low" }
                       ], default: "2_medium" },
    ai_technology:   { type: "string",   label: "AI Technology",       hint: "e.g. GenAI, ML, Agentic, NLP" },
    estimated_value: { type: "currency", label: "Estimated Value ($)" },
    actual_value:    { type: "currency", label: "Actual Value ($)" },
    target_go_live:  { type: "date",     label: "Target Go-Live Date" },
    actual_go_live:  { type: "date",     label: "Actual Go-Live Date" },
    notes:           { type: "string",   label: "Notes",               max_length: 4000 }
  }
});
