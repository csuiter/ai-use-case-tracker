import { Workspace } from "@servicenow/sdk/core";
import { AiUseCase } from "../tables/ai_use_case";

export const AiUseCaseWorkspace = Workspace({
  name: "x_ai_uc_tracker_workspace",
  label: "AI Use Case Tracker",
  primaryTable: AiUseCase,
  lists: [
    { label: "All Use Cases",   filter: {} },
    { label: "In Progress",     filter: { status: "in_progress" } },
    { label: "Awaiting Review", filter: { status: "in_review" } },
    { label: "Live",            filter: { status: "live" } }
  ]
});
