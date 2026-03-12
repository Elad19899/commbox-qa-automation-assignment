# Software Test Design (STD) - Insights Overview

This document details the test cases for the **Insights Overview** feature, based on the provided functional specification.

## Test Case 01: Time Frame Filtering & Trend Accuracy
**Objective:** Verify that selecting a specific time range updates all KPI data and calculates the trend percentage correctly against the previous period.

| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to the Insights Overview dashboard. | Dashboard loads with default "Today" or "Last 7 Days" view. |
| 2 | Select "Yesterday" from the date picker/settings. | All cards (Conversations, Response Time, etc.) refresh instantly. |
| 3 | Compare the "Conversations" Total and Resolved numbers with raw database logs for that specific day (00:00-23:59). | Displayed numbers match the raw data for the 24-hour period. |
| 4 | Verify the Trend percentage (e.g., +12%). | The percentage reflects the change between "Yesterday" and the day before yesterday. Green indicator for increase, Red for decrease. |

---

## Test Case 02: "Active Channels" & Bot Inclusion Logic
**Objective:** Validate that the KPI calculations strictly adhere to business rules regarding active channels and bot messaging.

| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | In the system settings, identify one "Active" channel and one "Inactive" channel. | Channels identified for verification. |
| 2 | Generate 5 new conversations on the Active channel and 5 on the Inactive channel for "Today". | Data is processed by the backend. |
| 3 | Refresh the Insights Overview with the "Today" filter. | The "Total Conversations" count increases by exactly 5 (ignoring the inactive channel). |
| 4 | Verify "Total" count includes automated bot responses. | The count reflects both human-led and bot-led interactions as per spec. |

---

## Test Case 03: UI Navigation & Tooltip Accuracy
**Objective:** Ensure that all interactive elements redirect to the correct reports and display the mandatory descriptive tooltips.

| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Hover the mouse over the "Total" label in the Conversations card. | A tooltip appears with the text: "Total - Total conversations including bots." |
| 2 | Click on the numeric value under the "Resolved" section. | The system redirects the user to the "Conversations Report" page. |
| 3 | Observe the filters on the redirected page. | The report is automatically filtered by status "Resolved" and the time frame matches the dashboard selection. |

---

