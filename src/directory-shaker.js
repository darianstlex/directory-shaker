const esm = require('esm')(module);
const fs = require('fs');

module.exports = (path, {
  recursive = true,
  spreadIndex = true,
  pattern = /^.*\.js$/,
  filter = () => true,
} = {}, ...parsers) => {
  let tree = {};
  const extra = parsers.reduce((acc, item) => ({ ...acc, [item.name]: {} }), {});

  const dirToObj = (path, obj) => {
    fs.readdirSync(path).map(name => {
      const target = `${path}/${name}`;
      const node = fs.statSync(target);

      if (node.isFile()) {
        if (!pattern.test(name)) return;
        const [,fileName] = name.match(/^(.+)\.[^.]{2,4}$/);
        const module = esm(target);
        const data = module.default || module;

        if (!filter(data)) return;

        parsers.map(({ name, map, key }) => extra[name][data[key]] = map(data));

        if (spreadIndex && fileName === 'index') obj = Object.assign(obj, data);
        else obj[fileName] = data;

      } else if (recursive && node.isDirectory()) {
        obj[name] = {};
        dirToObj(target, obj[name]);
      }
    });
  };

  dirToObj(path, tree);

  return { tree, ...extra };
};
