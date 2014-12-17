# mkdirp

Like `mkdir -p`, but in node.js!

[![build status][]][travis]

# example

## pow.js

```js
var mkdirp = require('less-mkdirp');

mkdirp('/tmp/foo/bar/baz', function (error) {
    if (error) {
        console.error(err);
    } else {
        console.log('pow!');
    }
});
```

Output

```
pow!
```

And now /tmp/foo/bar/baz exists, huzzah!

# methods

```js
var mkdirp = require('less-mkdirp');
```

## mkdirp(path, \[options\], callback)

Create a new directory and any necessary subdirectories at `path` with octal
permission string `options.mode`. If `options` is a non-object, it will be
treated as the `options.mode`.

If `options.mode` isn't specified, it defaults to `0777 & (~process.umask())`.

`cb(err, made)` fires with the error or the first directory `made`
that had to be created, if any.

You can optionally pass in an alternate `fs` implementation by passing in
`options.fs`. Your implementation should have
`options.fs.mkdir(path, mode, cb)` and `options.fs.stat(path, cb)`.

# install

With [npm][] do:

```
npm install less-mkdirp
```

# license

MIT


  [npm]: https://www.npmjs.com/
  [travis]: https://travis-ci.org/charmander/node-mkdirp
  [build status]: https://api.travis-ci.org/charmander/node-mkdirp.svg
