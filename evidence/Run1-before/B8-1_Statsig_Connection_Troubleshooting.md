# Connection troubleshooting, September 23, 2026

This is setup evidence, not a scored benchmark run.

The project owner role and read/write Console key were confirmed. A fresh session using the official MCP SDK still reported conflicting permissions: Get_Context allowed writes, but Search_Tools and Get_Tool_Schema refused experiment creation as read-only. The saved FreshSession_Preflight JSON records these responses. No experiment was created.

A separate Statsig OAuth connection named `statsig-kijani` was added to local Codex using the official endpoint https://api.statsig.com/v1/mcp. The sign-in command completed with `Successfully logged in`, and `codex mcp list` reported the connection enabled with OAuth authentication. This confirms authentication only. Experiment write-tool availability through this new connection has not yet been verified in an active model session.

Before the scored run, reload Codex's MCP connections or restart Codex, then perform a read-only capability check against Kijani Growth Lab B8-1, project H7zq0iHv0scPEXRMGF1C3. Retrieve the Create_Experiment tool schema and confirm the intended project. Do not create the scored experiment during this check. Claude Code requires its own connection check; successful Codex authentication does not establish Claude access.

The browser still shows the three baseline event names and all 24 synthetic received events. The test inputs remain available. No changes to experiment allocation, review requirements or key-management permissions were made during troubleshooting.
