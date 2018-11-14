const esm = require('esm')(module);
const fs = require('fs');

module.exports = (root, {
  recursive = true,
  spreadIndex = true,
  pattern = /^.*\.js$/,
  filter = () => true,
} = {}, ...parsers) => {
  let tree = {};
  const extra = parsers.reduce((acc, item) => ({ ...acc, [item.name]: {} }), {});

  const dirToObj = (path, obj) => {
    fs.readdirSync(path).map(file => {
      const target = `${path}/${file}`;
      const node = fs.statSync(target);

      if (node.isFile()) {
        if (!pattern.test(file)) return;
        const [,fileName] = file.match(/^(.+)\.[^.]{2,4}$/);
        const module = esm(target);
        const data = module.default || module;

        if (!filter(data)) return;

        const [,clearPath] = path.match(new RegExp(`${root}(.*)`));

        parsers.map(({ name, map, key }) => extra[name][data[key]] = map(data, {
          path: clearPath || '/',
          file,
        }));

        if (spreadIndex && fileName === 'index') obj = Object.assign(obj, data);
        else obj[fileName] = data;

      } else if (recursive && node.isDirectory()) {
        obj[file] = {};
        dirToObj(target, obj[file]);
      }
    });
  };

  dirToObj(root, tree);

  return { tree, ...extra };
};
