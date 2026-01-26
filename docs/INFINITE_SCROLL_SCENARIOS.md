# Infinite Scroll - Date Scenarios Examples

This document provides concrete examples of how the infinite scroll works in different date selection scenarios.

## Current Date: 2025-01-25 (for all examples)

---

## Scenario 1: No Dates Selected

### Initial Load
```
User Action: Opens page with no date filters
Query: startDate=2025-01-16, endDate=2025-01-25
Result: Shows records from Jan 16 - Jan 25 (10 days)
Cursor: Set to 2025-01-16
```

### First Scroll
```
User Action: Scrolls to bottom
Query: startDate=2025-01-06, endDate=2025-01-15
Result: Shows records from Jan 6 - Jan 15 (10 days)
Cursor: Set to 2025-01-06
Total Records: Jan 6 - Jan 25 (20 days)
```

### Second Scroll
```
User Action: Scrolls to bottom again
Query: startDate=2024-12-27, endDate=2025-01-05
Result: Shows records from Dec 27 - Jan 5 (10 days)
Cursor: Set to 2024-12-27
Total Records: Dec 27 - Jan 25 (30 days)
```

### Continues until earliestRecordDate from backend

---

## Scenario 2: Only Start Date Selected (e.g., 2025-01-10)

### Initial Load
```
User Action: Selects startDate = 2025-01-10
Query: startDate=2025-01-10, endDate=2025-01-25
Result: Shows records from Jan 10 - Jan 25 (16 days)
Cursor: Set to 2025-01-10
User Filter: startDate=2025-01-10
```

### First Scroll Attempt
```
User Action: Scrolls to bottom
Query Would Be: startDate=2025-01-01, endDate=2025-01-09
BUT: queryStartDate (2025-01-01) < userStartDate (2025-01-10)
Adjusted: startDate=2025-01-10, endDate=2025-01-09
Result: Invalid range (start >= end), stop pagination
hasMore: Set to false
Message: "စာရင်းမှတ်တမ်းအားလုံးပြီးပါပြီ" (All records loaded)
```

**Key Point**: When only startDate is selected, scrolling is blocked because we won't fetch data before the user's start date.

---

## Scenario 3: Only End Date Selected (e.g., 2025-01-25)

### Initial Load
```
User Action: Selects endDate = 2025-01-25
Query: startDate=2025-01-16, endDate=2025-01-25
Result: Shows records from Jan 16 - Jan 25 (10 days)
Cursor: Set to 2025-01-16
User Filter: endDate=2025-01-25, startDate=null
```

### First Scroll
```
User Action: Scrolls to bottom
Query: startDate=2025-01-06, endDate=2025-01-15
Result: Shows records from Jan 6 - Jan 15 (10 days)
Cursor: Set to 2025-01-06
Total Records: Jan 6 - Jan 25 (20 days)
```

### Second Scroll
```
User Action: Scrolls to bottom again
Query: startDate=2024-12-27, endDate=2025-01-05
Result: Shows records from Dec 27 - Jan 5 (10 days)
Cursor: Set to 2024-12-27
Total Records: Dec 27 - Jan 25 (30 days)
```

### Continues until earliestRecordDate from backend

**Key Point**: Can scroll back indefinitely (until DB limit) because no start date constraint.

---

## Scenario 4: Both Dates Selected (e.g., 2025-01-01 to 2025-01-25)

### Initial Load
```
User Action: Selects startDate = 2025-01-01, endDate = 2025-01-25
Query: startDate=2025-01-01, endDate=2025-01-25
Result: Shows records from Jan 1 - Jan 25 (25 days)
Cursor: Set to 2025-01-01
User Filter: startDate=2025-01-01, endDate=2025-01-25
```

### First Scroll Attempt
```
User Action: Scrolls to bottom
Query Would Be: startDate=2024-12-22, endDate=2024-12-31
BUT: queryStartDate (2024-12-22) < userStartDate (2025-01-01)
Adjusted: startDate=2025-01-01, endDate=2024-12-31
Result: Invalid range (start > end), stop pagination
hasMore: Set to false
Message: "စာရင်းမှတ်တမ်းအားလုံးပြီးပါပြီ" (All records loaded)
```

**Key Point**: When both dates are selected and range is small, all data loads initially and scrolling is disabled.

---

## Scenario 5: Both Dates Selected - Large Range (e.g., 2024-12-01 to 2025-01-25)

### Initial Load
```
User Action: Selects startDate = 2024-12-01, endDate = 2025-01-25
Query: startDate=2024-12-01, endDate=2025-01-25
Result: Shows records from Dec 1 - Jan 25 (56 days)
Cursor: Set to 2024-12-01
User Filter: startDate=2024-12-01, endDate=2025-01-25
```

### First Scroll Attempt
```
User Action: Scrolls to bottom
Query Would Be: startDate=2024-11-21, endDate=2024-11-30
BUT: queryStartDate (2024-11-21) < userStartDate (2024-12-01)
Adjusted: startDate=2024-12-01, endDate=2024-11-30
Result: Invalid range (start > end), stop pagination
hasMore: Set to false
Message: "စာရင်းမှတ်တမ်းအားလုံးပြီးပါပြီ" (All records loaded)
```

**Key Point**: Even with large range, if both dates selected, all data loads at once and scrolling is disabled. This is intentional - when user specifies exact range, they get exactly that range.

---

## Alternative Implementation Suggestion for Large Ranges

If you want to enable pagination even when both dates are selected (for very large date ranges), you can modify the initial load logic:

### Modified Scenario 5: Both Dates - Chunked Loading

```typescript
// In the initial fetch logic:
if (fromDate && toDate) {
  // Calculate range in days
  const startDateObj = new Date(fromDate);
  const endDateObj = new Date(toDate);
  const rangeDays = Math.floor((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
  
  if (rangeDays > 10) {
    // Large range: load in chunks starting from end
    queryEndDate = toDate;
    const startDateObj = subtractDays(new Date(toDate), 9);
    queryStartDate = formatDateToYYYYMMDD(startDateObj);
  } else {
    // Small range: load all at once
    queryStartDate = fromDate;
    queryEndDate = toDate;
  }
}
```

This would enable pagination for large date ranges while still loading small ranges all at once.

---

## Backend Response Examples

### Successful Response
```json
{
  "transferRecords": [
    {
      "date": "2025-01-25",
      "totalAmount": 150000,
      "totalFee": 5000,
      "records": [...]
    },
    {
      "date": "2025-01-24",
      "totalAmount": 200000,
      "totalFee": 7000,
      "records": [...]
    }
  ],
  "earliestRecordDate": "2024-01-01"
}
```

### No Records Response
```json
{
  "transferRecords": [],
  "earliestRecordDate": "2024-01-01"
}
```

### Reaching Earliest Date
When `queryStartDate <= earliestRecordDate`, the frontend sets `hasMore = false` and stops pagination.

---

## Testing Checklist

- [ ] Test Scenario 1: No dates, scroll multiple times
- [ ] Test Scenario 2: Only start date, verify scroll stops
- [ ] Test Scenario 3: Only end date, scroll multiple times
- [ ] Test Scenario 4: Both dates (small range), verify all loads at once
- [ ] Test Scenario 5: Both dates (large range), verify behavior
- [ ] Test payment type filter changes
- [ ] Test clearing date filters
- [ ] Test loading indicators appear correctly
- [ ] Test "end of data" message appears
- [ ] Test no duplicate records in list
- [ ] Test rapid scrolling doesn't cause multiple API calls
