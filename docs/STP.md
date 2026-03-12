Software Test Plan (STP) - Insights Overview

1. Introduction
   This document outlines the testing strategy for the Insights Overview feature. The goal is to provide executives and managers with accurate, real-time KPI cards that enable deep business understanding through a single, intuitive view.

2. Scope of Testing
   The testing will cover the following main areas:

Data Accuracy: Validating KPI calculations (Total, Resolved, Individual Customers).

Dynamic Filtering: Verifying that all data and trends update correctly according to the selected time frame.

Interaction & Navigation: Ensuring all card elements redirect to the correct detailed reports.

Business Logic: Confirming that calculations are based strictly on active channels and include bots where specified.

3. Documented Assumptions
   As per the assignment requirements, the following assumptions are made regarding the feature's behavior:

Timezone: All date-related filters (e.g., "Today", "Yesterday") are calculated based on the account’s configured timezone.

Data Freshness: Since data aggregation is performed on-demand, the KPIs reflect the most recent data available at the moment of request/refresh.

Trend Basis: The trend percentage is calculated by comparing the selected period to the immediate previous period of equal length.

Access Control: The feature is accessible only to users with "Executive" or "Manager" permissions.

4. Test Strategy & Methodology
   Functional Testing: Manual verification of each KPI box against raw data and existing reports.

UI/UX Testing: Validation of Tooltip text accuracy and visual indicators for trends (Green for positive change, Red for negative).

API Validation: Using browser developer tools to inspect the JSON responses from the "on-demand" calculation requests to ensure they match the UI display.

Regression Testing: Ensuring that the redirection to the "Conversations Report" maintains all existing filters and data integrity.

5. Risk Assessment
   Performance: Potential delays in data display due to the "on-demand" calculation of large datasets.

Calculation Edge Cases: Potential discrepancies when comparing periods with unequal days (e.g., a 31-day month vs. a 30-day month).

Connectivity: Ensuring the UI gracefully handles scenarios where the API request for data fails or times out.
