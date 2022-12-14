# race-scorer

This is a coding challenge response

## Prerequisites

1. npm (tested with 8.19.2)
2. node (tested with 18.12.0)

## Usage

Start server:

```bash
cd code
npm start
```

Run tests:

```bash
cd code
npm test
```

## Development Notes

1. Code consistency and auto-formatting lacking
2. Not too happy with there being no easy way to verify in tests that parameters passed to child components are correct. Requires diving into the child component's implementation details (e.g. DOM elements) to verify expected behaviour in some cases. E.g. AddRaceTable.test.tsx
3. Thank you useReducer. However, one limitation that was obvious was that dispatches cannot be chained conditionally. In a scenario where a child component needs to conditionally trigger a navigation state change (which is managed at the top level) AFTER dispatching its own private state change, this would be challenging to implement.
4. Some TODO items left in tests. Not going to spend too much time completing this as the ideas and approach have been adequately conveyed thru the other tests.
5. Some files / functions are getting too long and should be broken up for readability.
6. Could do with more code comments.
7. Naming conventions could be improved (IMPORTANT for reasoning about the code)
8. Limitation: No browser back button support.

## License
[MIT](https://choosealicense.com/licenses/mit/)
