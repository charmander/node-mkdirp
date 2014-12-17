'use strict';

var path = require('path');
var fs = require('fs');

function mkdirP(p, options, callback, made) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    } else if (!options || typeof options !== 'object') {
        options = { mode: options };
    }

    var mode = options.mode;
    var fs_ = options.fs || fs;

    if (mode === undefined) {
        mode = 0x1ff & ~process.umask();
    }

    if (!made) {
        made = null;
    }

    if (!callback) {
        callback = function () {};
    }

    p = path.resolve(p);

    fs_.mkdir(p, mode, function (error) {
        if (!error) {
            made = made || p;
            return callback(null, made);
        }

        if (error.code === 'ENOENT') {
            mkdirP(path.dirname(p), options, function (error, made) {
                if (error) {
                    callback(error, made);
                } else {
                    mkdirP(p, options, callback, made);
                }
            });

            return;
        }

        // In the case of any other error, just see if there's a dir
        // there already.  If so, then hooray!  If not, then something
        // is borked.
        fs_.stat(p, function (er2, stat) {
            // if the stat fails, then that's super weird.
            // let the original error be the failure reason.
            if (er2 || !stat.isDirectory()) {
                callback(error, made);
            } else {
                callback(null, made);
            }
        });
    });
}

module.exports = mkdirP;
