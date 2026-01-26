# Manual Testing Guide - Infinite Scroll

This guide provides step-by-step instructions for manually testing the infinite scroll implementation.

## Prerequisites

1. Start the development server: `npm run dev`
2. Navigate to the Transfer Records view page
3. Ensure backend API is running and accessible
4. Have test data spanning multiple months

## Test Scenarios

### Test 1: No Date Filters + Infinite Scroll

**Steps:**
1. Open the Transfer Records page
2. Do NOT select any dates (leave both empty)
3. Verify initial load shows last 10 days of records
4. Scroll to the bottom of the list
5. Verify loading spinner appears
6. Verify additional 10 days load (older records)
7. Repeat scrolling multiple times
8. Continue until "all records loaded" message appears

**Expected Results:**
- ✅ Initial load: Records from last 10 days
- ✅ Loading spinner shown during fetch
- ✅ Each scroll loads 10 more days (going backward in time)
- ✅ No duplicate records
- ✅ Records displayed in chronological order
- ✅ "စာရင်းမှတ်တမ်းအားလုံးပြီးပါပြီ" message at end

---

### Test 2: Only Start Date Selected

**Steps:**
1. Clear any existing filters
2. Select a start date (e.g., January 10, 2025)
3. Leave end date empty
4. Verify records load from selected date to today
5. Try to scroll down
6. Verify scroll is blocked with message

**Expected Results:**
- ✅ Records load from start date to today
- ✅ Scroll immediately shows "all records loaded" message
- ✅ No API calls made on scroll attempt
- ✅ Date range respects user's start date

---

### Test 3: Only End Date Selected

**Steps:**
1. Clear start date filter
2. Select an end date (e.g., January 25, 2025)
3. Leave start date empty
4. Verify records load for 10 days before end date
5. Scroll down multiple times
6. Verify older records continue loading

**Expected Results:**
- ✅ Initial load: 10 days before end date
- ✅ Each scroll loads 10 more days going backward
- ✅ Can scroll indefinitely (until DB limit)
- ✅ End date constraint respected

---

### Test 4: Both Dates Selected (Small Range)

**Steps:**
1. Select start date: January 20, 2025
2. Select end date: January 25, 2025
3. Verify all records in range load at once
4. Try to scroll down
5. Verify scroll is blocked

**Expected Results:**
- ✅ All records in 5-day range load immediately
- ✅ "All records loaded" message shows
- ✅ No additional API calls on scroll
- ✅ All dates within selected range

---

### Test 5: Both Dates Selected (Large Range)

**Steps:**
1. Select start date: December 1, 2024
2. Select end date: January 25, 2025
3. Verify all records load at once (56 days)
4. Note: Current implementation loads entire range
5. Check performance and loading time

**Expected Results:**
- ✅ All records in range load at once
- ✅ May take longer to load (large dataset)
- ✅ All records within date range
- ✅ Consider: If slow, may want to implement chunked loading

---

### Test 6: Payment Type Filter

**Steps:**
1. Set no date filters (default last 10 days)
2. Select a payment type (e.g., KBZ)
3. Verify only KBZ records show
4. Scroll down to load more
5. Verify additional records also filtered by KBZ
6. Change to different payment type
7. Verify records reset and reload

**Expected Results:**
- ✅ Only selected payment type shown
- ✅ Filter applied to all API calls
- ✅ Changing filter resets scroll position
- ✅ New data loads for new filter

---

### Test 7: Filter Changes

**Steps:**
1. Load records with one set of filters
2. Scroll down 2-3 times to load more data
3. Change the start date filter
4. Verify records reset (old records cleared)
5. Verify new records load based on new filter
6. Verify scroll position resets to top

**Expected Results:**
- ✅ Records list clears on filter change
- ✅ New data loads immediately
- ✅ Scroll position resets
- ✅ Loading state shown during fetch
- ✅ Cursor reset for new pagination

---

### Test 8: Rapid Scrolling

**Steps:**
1. Set default filters (no dates)
2. Rapidly scroll to bottom multiple times
3. Observe loading behavior
4. Check browser network tab

**Expected Results:**
- ✅ Only one API call at a time
- ✅ Loading guard prevents duplicate calls
- ✅ No race conditions
- ✅ Records load sequentially
- ✅ No duplicate records appear

---

### Test 9: Empty Results

**Steps:**
1. Select a date range with no records
2. Verify empty state shows
3. Verify no error messages
4. Try to scroll
5. Verify graceful handling

**Expected Results:**
- ✅ "စာရင်းမှတ်တမ်းမရှိသေးပါ" message shows
- ✅ No loading spinner
- ✅ No error messages
- ✅ Scroll has no effect

---

### Test 10: API Error Handling

**Steps:**
1. Stop the backend server
2. Try to load records
3. Observe error handling
4. Check browser console
5. Restart backend
6. Retry loading

**Expected Results:**
- ✅ Error logged to console
- ✅ Loading state ends
- ✅ Graceful degradation
- ✅ Can retry after backend restart
- ✅ No app crash

---

## Browser Testing Matrix

Test in multiple browsers:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Edge

## Mobile Testing

Test on mobile devices:
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Verify touch scrolling works
- [ ] Check responsive layout

## Performance Checks

Monitor during testing:
- [ ] Network requests (no unnecessary calls)
- [ ] Memory usage (no leaks)
- [ ] Scroll performance (smooth)
- [ ] Loading times (reasonable)

## Common Issues to Watch For

### Duplicates
- Check: Same record appears twice in list
- Cause: Overlapping date ranges
- Expected: No duplicates (ranges should not overlap)

### Infinite Loops
- Check: Continuous API calls without scrolling
- Cause: hasMore flag not set correctly
- Expected: Only fetch on scroll or filter change

### Missing Records
- Check: Gaps in date sequence
- Cause: Incorrect date calculations
- Expected: Continuous date coverage

### Loading States
- Check: Spinner stuck or missing
- Cause: Loading state not updating
- Expected: Spinner shows during fetch, hides when done

## Reporting Issues

If you find bugs, report with:
1. Steps to reproduce
2. Expected vs actual behavior
3. Browser/device information
4. Screenshots if applicable
5. Console error messages

---

## Testing Checklist

- [ ] Test 1: No dates + scroll
- [ ] Test 2: Only start date
- [ ] Test 3: Only end date
- [ ] Test 4: Both dates (small range)
- [ ] Test 5: Both dates (large range)
- [ ] Test 6: Payment filter
- [ ] Test 7: Filter changes
- [ ] Test 8: Rapid scrolling
- [ ] Test 9: Empty results
- [ ] Test 10: Error handling
- [ ] Browser compatibility
- [ ] Mobile devices
- [ ] Performance monitoring

---

**Last Updated**: January 26, 2026  
**Total Tests**: 10 scenarios  
**Estimated Testing Time**: 30-45 minutes
