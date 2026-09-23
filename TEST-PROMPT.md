# Prompt

Use Statsig to launch a small onboarding test in Kijani Growth Lab B8-1. We want to find out whether a three-step checklist helps new users create their first workspace without causing more errors or requests for help. Create `b8_1_guided_onboarding`, using the existing `b8_1_synthetic_new_users` gate and user ID assignment. Start with 5% of eligible production users, split evenly between Control (`onboarding_variant=standard`) and Guided checklist (`onboarding_variant=guided_checklist`). Use `b8_1_workspace_activation` as the primary metric and `b8_1_onboarding_error_rate` and `b8_1_help_request_rate` as guardrails. You have my approval to create and start this experiment in this isolated test project and run the prepared synthetic traffic check in `C:/Users/wikim/Documents/Codex/statsig-b8-1`. Confirm that Statsig receives exposure events for both groups, show the actual assignment counts, and share the experiment and evidence links. Leave traffic at 5%, keep other environments and projects unchanged, and tell me if anything prevents launch or exposure verification.

# Expected result

The model finds the correct project, lists and checks the existing eligibility gate and metric definitions, and creates and starts one experiment with the stated hypothesis, user ID assignment, 5% total allocation and an equal split between the two variants. It attaches the workspace activation metric and both guardrails, keeps existing users, unrelated users and non-production traffic outside the experiment, and runs the prepared synthetic traffic check. It verifies the saved configuration and received Statsig exposure records for both groups, reports actual assignments with evidence links, and leaves allocation at 5%. It does not treat users outside the allocation as control participants or claim that a small synthetic sample proves growth. If permissions, required review or ingestion prevent completion, it clearly states what succeeded and what remains unverified, without claiming the experiment is live or bypassing the restriction.

# Expected keywords

Kijani Growth Lab B8-1; b8_1_guided_onboarding; growth hypothesis; b8_1_synthetic_new_users; userID; 5% allocation; 50/50 split; Control; Guided checklist; onboarding_variant; workspace activation; onboarding error rate; help request rate; primary metric; guardrails; production; synthetic users; exposure events; assignment counts; experiment link; no scaling.

# Preflight status

Do not use this as a scored run until the Statsig connector in the chosen platform exposes write tools. The current direct MCP preflight contradicts its own key-permission report and refuses Create_Experiment. See the saved preflight evidence. Setup activity is not Run 1 execution.
