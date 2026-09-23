# Kijani Growth Lab B8-1

**Fixture prepared. Do not start the scored run until connector write access is confirmed.**

Statsig project: https://console.statsig.com/H7zq0iHv0scPEXRMGF1C3/home

Project created and renamed to Kijani Growth Lab B8-1 on September 23, 2026. This is an isolated synthetic setup. The existing mico1 connectors project is not being changed.

The planned experiment compares standard onboarding with a three-step checklist in a fictional team-planning SaaS product. Launch allocation is 5% of eligible synthetic users, split 50/50 between Control (`onboarding_variant=standard`) and Guided checklist (`onboarding_variant=guided_checklist`). Each group gets roughly 2.5% of eligible users; the other 95% are outside the experiment and are not control participants. The model should create `b8_1_guided_onboarding` during the scored run. The experiment does not exist yet.

Exposure validation must use the Statsig SDK and actual ingestion evidence. Local output or synthetic event files alone do not establish that Statsig logged an experiment exposure. No experiment winner or production growth result can be inferred from this synthetic smoke test.

## Verified inputs

- [Eligibility gate](https://console.statsig.com/H7zq0iHv0scPEXRMGF1C3/gates/b8_1_synthetic_new_users): `test_fixture=b8_1`, `lifecycle=new`, production SDK environment. The gate's 100% pass rule defines eligibility, not experiment allocation.
- [Primary metric](https://console.statsig.com/H7zq0iHv0scPEXRMGF1C3/metrics/metrics_catalog/b8_1_workspace_activation/event_user): `b8_1_workspace_activation`, unique users logging `b8_1_workspace_created`, higher is better.
- [Error guardrail](https://console.statsig.com/H7zq0iHv0scPEXRMGF1C3/metrics/metrics_catalog/b8_1_onboarding_error_rate/event_user): unique users logging `b8_1_onboarding_error`, lower is better.
- [Help guardrail](https://console.statsig.com/H7zq0iHv0scPEXRMGF1C3/metrics/metrics_catalog/b8_1_help_request_rate/event_user): unique users logging `b8_1_help_requested`, lower is better.
- [Events](https://console.statsig.com/H7zq0iHv0scPEXRMGF1C3/metrics/events): 24 baseline events received, consisting of 15 workspace creations, 3 errors and 6 help requests. Thirty eligible synthetic users, two ineligible production users and one staging user were checked. All three negative cases were rejected. The event stream shows September 23, 2026, 20:32:15 EAT.
- [Experiments](https://console.statsig.com/H7zq0iHv0scPEXRMGF1C3/experiments): zero before testing. Three custom metrics plus seven default metrics exist.

## Connector preflight blocker

The key successfully created metrics and the gate through the Console API. The MCP endpoint reads the correct project. However, `Get_Context` reports `canWrite: true`, `mcpReadOnly: false` and `canManageKeys: false`, while `Search_Tools` returns `read_only` and `Get_Tool_Schema` refuses `Create_Experiment`. This is a setup finding, not a scored model failure. Reconnect the actual test platform to this project and confirm write tools before testing. Do not expand key-management permissions or disable review controls to work around it. The created key is project-scoped, not a verified personal OAuth key. Target Apps are unavailable on this plan and are not required.

## Evidence and traffic

Connection update: local Codex now has an enabled, authenticated OAuth connection named `statsig-kijani`. Authentication succeeded, but write-tool availability still needs verification in a refreshed Codex session. See [connection troubleshooting](evidence/Run1-before/B8-1_Statsig_Connection_Troubleshooting.md). This does not yet clear the preflight blocker or establish Claude Code access.

The [before evidence](evidence/Run1-before/) includes source configuration JSON, screenshots, received event rows, SDK checks and the exact MCP contradiction. Screenshots retain the original browser viewport; the CSV and JSON contain the complete field-level details. Statsig links require project access. Public files contain only synthetic data. Credentials are encrypted for the Windows account under `.private`, excluded from sharing.

After launch, open `C:/Users/wikim/Documents/Codex/statsig-b8-1` and run `./run-traffic.ps1 -Mode smoke -Run Run1-after`. This uses the official SDK to evaluate 1,000 eligible users, two ineligible production users and one staging user. It logs real SDK exposures and synthetic outcomes, reports actual assignments, and flushes events. Confirm ingestion separately in Statsig's exposure stream for both groups. Do not require exactly 50 enrolled users or an exact equal sample split. The script refuses to check an experiment that does not exist.

On another machine, install with `npm ci`, securely provide this project's SDK key through `STATSIG_SERVER_SECRET`, and run `node traffic.cjs smoke`. Never paste keys into chat or public files. This is synthetic instrumentation testing, not an actual product UI launch or evidence of business lift.

Before Run 2, preserve Run 1 evidence and restore an equivalent starting state with a fresh analysis period and distinguishable traffic IDs, or prepare a separate isolated project. Do not reuse Run 1 exposures as Run 2 evidence. Label each run separately.

See [TEST-PROMPT.md](TEST-PROMPT.md) for the draft prompt and expected result. Official references: [MCP setup](https://docs.statsig.com/integrations/mcp/manual-setup) and [Node SDK](https://docs.statsig.com/server-core/node-core).
