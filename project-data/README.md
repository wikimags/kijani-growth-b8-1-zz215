# Kijani Growth Lab B8-1 project data

Synthetic project data captured on September 23, 2026. Project ID: H7zq0iHv0scPEXRMGF1C3.

- [Received events](received-events.csv): 24 records, comprising 15 workspace creations, three onboarding errors and six help requests. Received September 23 at 20:32:15 EAT.
- [Eligibility gate](gates.json): synthetic new users with test_fixture=b8_1 and lifecycle=new in the production SDK environment.
- [Metric definitions](metrics.json): catalog export, including the user-based workspace activation primary metric and onboarding error and help-request guardrails. Use the event_user definitions for the experiment.
- [Existing experiments](experiments.json): the separate unstarted dashboard diagnostic. The intended b8_1_guided_onboarding experiment was absent when this snapshot was captured.
- [Baseline SDK checks](baseline-sdk-checks.json): checks for 30 eligible users, two ineligible production users and one staging user. Baseline events are not experiment exposures.
- [Intended experiment configuration](experiment-plan.json): hypothesis, planned 5% allocation, equal variant split and metric IDs. This is a plan, not a deployed experiment.

This folder contains project data and its description only. All records are fictional test inputs. No credentials are included. These are dated snapshots, not a live view of Statsig.
