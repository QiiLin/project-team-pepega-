const path = require("path");
const config = require("config");
const db = config.get("mongoURI");
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require("mongoose");
let gfs;

let gfs_prim = new Promise(function (resolve, reject) {
    mongoose.connection.once('open', () => {
        // Init stream
        gfs = Grid(mongoose.connection.db, mongoose.mongo);
        gfs.collection('fs');
        return resolve(gfs);
    });
});

// Create storage engine
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'fs'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({storage});

module.exports = {
    gfs_prim , upload
};
