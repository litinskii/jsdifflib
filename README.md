# jsdifflib
jsdifflib is a Javascript library that provides  a partial reimplementation of Python's difflib module (specifically, the SequenceMatcher class). 

```sh
npm install https://github.com/w-site/jsdifflib.git
```

```js
import { getInlineDiffsArray, getSideBySideDiffsArray } from 'jsdifflib'
```

## API Reference
### getInlineDiffsArray(first, second) ⇒ <code>Array</code>
Returns array of inline diffs.

| Param | Type | Description |
| --- | --- | --- |
| first | <code>String</code>  | Base text to compare |
| second | <code>String</code> | New text to compare  |

### getSideBySideDiffsArray(first, second) ⇒ <code>Array</code>
Returns arrays of diff side by side, each item of array (ex. array[2]) have 2 items:
  - Fist - diff from base text
  - Second - diff from new text

| Param | Type | Description |
| --- | --- | --- |
| first | <code>String</code>  | Base text to compare |
| second | <code>String</code> | New text to compare  |