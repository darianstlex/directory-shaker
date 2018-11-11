const path = require('path');
const getTreeObj = require('../src/directory-shaker');

const store = path.resolve(__dirname, 'store');

describe('Directory Shaker', () => {
  it('should return correct tree by default', () => {
    expect(getTreeObj(store)).toMatchSnapshot();
  });

  it('should return correct tree if not recursive', () => {
    expect(getTreeObj(store, { recursive: false })).toMatchSnapshot();
  });

  it('should return correct tree if index not spreaded', () => {
    expect(getTreeObj(store, {
      recursive: false,
      spreadIndex: false,
    })).toMatchSnapshot();
  });

  it('should return correct tree on provided pattern', () => {
    expect(getTreeObj(store, { pattern: /^.+\.mjs$/ })).toMatchSnapshot();
  });

  it('should return correct tree on filter', () => {
    expect(getTreeObj(store, { filter: ({ name }) => name })).toMatchSnapshot();
  });

  it('should return correct tree and extra data', () => {
    expect(getTreeObj(store, {
      filter: ({ name }) => name
    }, {
      name: 'paths',
      key: 'name',
      map: ({ path, name, page }) => ({ path, name, page }),
    })).toMatchSnapshot();
  });

  it('should return correct tree and more extra data', () => {
    expect(getTreeObj(store, {
      filter: ({ name }) => name
    }, {
      name: 'paths',
      key: 'name',
      map: ({ path, name, page }) => ({ path, name, page }),
    }, {
      name: 'pages',
      key: 'name',
      map: ({ path }) => path,
    })).toMatchSnapshot();
  });
});
