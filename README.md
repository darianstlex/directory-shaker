> Directory Shaker

Convert JS files (include ES6) structure into object, extract data

### Installation

```code
npm install directory-shaker
```

### Usage

```code
const path = require('path');
const getTreeObj = require('directory-shaker');

.........

const folder = path.resolve(__dirname, 'folder');

const { tree, parserName1, parserName2 } = getTreeObj(folder, {
 recursive: true,
 spreadIndex: true,
 pattern: /^.*\.js$/,
 filter: () => true,
}, { // parser }, { // another parser} )

.........
```
### Arguments

- **`path: string:`** path to the root folder to start with 
- **`options: object:`** configuration options 
- **`parser: object:`** parser to extract data separately

### Options

- **`recursive: boolean: true`** deep object construction
- **`spreadIndex: boolean: true`** assign index props to root or in separate node
- **`pattern: RegExp: /^.*\.js$/`** file pattern to be included in the tree
- **`filter: function: true`** filer files to be included in the tree

### Parser

```code
{
  name: 'paths',
  key: 'name',
  map: ({ name, page }) => ({ name, page }),
}
```

- **`name: string:`** name of the object to be returned
- **`key: string:`** key in the result object to assign result of the map function 
- **`map: string:`** function to prepare object data to be returned, as argument receives file default exported object

### Limitations

See 'esm' library documentation for the limitations
