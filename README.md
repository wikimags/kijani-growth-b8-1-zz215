# Kijani Growth Lab B8-1

Source materials for the Statsig connector benchmark, prepared September 23, 2026. The task is to create and launch a small growth experiment through the connector, then verify exposure logging. This repository contains synthetic data only. No scored experiment was created or launched while preparing this pack.

- [Source guide, current before screenshots and exports](source-pack/README.md)
- [Prompt, expected result and keywords](TEST-PROMPT.md)
- [Scenario and intended configuration](fixture-plan.json)
- [Statsig project](https://console.statsig.com/H7zq0iHv0scPEXRMGF1C3/home)
- [Download source pack](B8-1_Run1_Statsig_SourceMaterials.zip)

The intended experiment, b8_1_guided_onboarding, remains absent. One separate dashboard diagnostic, b8_1_dashboard_creation_check, exists in Not Started status and must remain untouched. Historical empty-experiment screenshots in evidence/Run1-before predate that diagnostic; use the fresh experiment-list screenshot in source-pack for the current before state.

The source data includes one eligibility gate, three custom user-based metrics and 24 received baseline events. The gate limits eligibility to synthetic B8-1 new users in the production SDK environment. The experiment should allocate 5% of that cohort, split equally between standard onboarding and a guided checklist. Gate eligibility at 100% does not mean experiment allocation at 100%.

## Known connector limitations

The named statsig-kijani connection reached Kijani but returned: "MCP tool Create_Experiment is unavailable because this user has read-only MCP access." Separately, the Statsig plugin exposed in the preparation chat returned project 2OZ8YjwbrfFIWk2bSRhu03, named mico1 connectors. That is not the test project. These are different connection paths and must not be treated as interchangeable. The scored run should check its own connection and report any limitation. Browser creation or direct Console API writes cannot stand in for connector success.

## Exposure check after a successful connector launch

On this prepared Windows machine, open C:/Users/wikim/Documents/Codex/statsig-b8-1 and run ./run-traffic.ps1 -Mode smoke -Run Run1-after. This evaluates 1,000 eligible synthetic users, two ineligible production users and one staging user using the official SDK. It generates automatic SDK exposure events and synthetic outcomes, then saves actual assignments and flush status. It does not create or launch experiments. Confirm receipt separately in Statsig; local output and a successful flush alone do not prove ingestion. Exact enrolled and group counts vary, and this sample cannot establish business lift.

On another machine, install dependencies with npm ci, securely provide the project's SDK key through STATSIG_SERVER_SECRET, and run node traffic.cjs smoke. Credentials are not included in this repository. The Windows wrapper uses locally encrypted credentials and is not portable to another Windows account.

For Run 2, preserve Run 1 output and prepare an equivalent starting state with distinct traffic IDs or a separate isolated project. Do not label old baseline or Run 1 exposure records as Run 2 evidence. Capture the actual post-run state before resetting anything.
