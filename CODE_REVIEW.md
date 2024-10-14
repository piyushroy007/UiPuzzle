#Though Code is very much organized,few sugestion that I have after code review are :

    1. ngOnDestroy or OnDestroy hook could have been used to unsubscribe the subscriptions created in book-search.component.ts [FIXED]
    2. search fields accepts any input combination .some validation can be used as per rquirements and an error message can be displayed to user.
    3. for searchBooksFailure,only state is modified .For better user experience, some toster message or snack bar can be used to let user know about it.
    4. Few HTML meta tags are missing. [FIXED]
    5. A spinner can be added while api result for input field is fetched.

Lighthouse Accessibility issues found :

    1.Buttons do not have an accessible name [FIXED]
    2.Background and foreground colors do not have a sufficient contrast ratio. [FIXED]

Manual Accessibility Issues found :

    1. In the img tag alt text was missing. [FIXED]
    2. Keyboard navigation was not working [FIXED]
    3. Missing aria-label for Screen Reader [FIXED]