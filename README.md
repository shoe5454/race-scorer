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
3. Thank you useReducer.
4. Some TODO items left in tests. Not going to spend too much time completing this as the ideas and approach have been adequately conveyed thru the other tests.
5. Some files / functions are getting too long and should be broken up for readability.
6. Could do with lots more code comments.

## License
[MIT](https://choosealicense.com/licenses/mit/)
