var router = require('express').Router();
var fs = require('fs');
var sbuff = require('simple-bufferstream');
var path = require('path');
var crypto = require('crypto');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var keys = require(path.join(__dirname, '../../../env'));
var secret_s3_key = keys.S3.SECRET_KEY;
var access_s3_key = keys.S3.ACCESS_KEY;
var bucket_s3 = keys.S3.BUCKET;
var cloud_key = keys.CLOUD_CONVERT;
var cloudconvert = new (require('cloudconvert'))(cloud_key);

module.exports = router;

// Create AWS object
AWS.config.update({
    "accessKeyId"    : access_s3_key,
    "secretAccessKey": secret_s3_key
});
AWS.config.region = 'us-east-1';

router.post('/', function (req, res, next) {

    // Busboy Library parses the uploaded files
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

        //Creating a unique key for S3 storage;
        var s3Key = crypto.createHash(filename + Date.now());

        //Captures the uploaded files as a buffer;
        var body = new Buffer(0);
        file.on('data', function (chunk) {
            body = Buffer.concat([body, chunk]);
        });

        //Starts the processing of the file
        file.on('end', function () {
            // Declare S3 parameters, create a new S3 Object, upload the file as a buffer
            var uploadBufferToS3 = function uploadBufferToS3 (buffer) {
                var params = {
                    ACL        : 'public-read',
                    Bucket     : bucket_s3,
                    Body       : buffer,
                    ContentType: mimetype,
                    Key        : s3Key
                };

                s3.upload(params, function (err, data) {
                    if (err) next(err);
                    res.json(data.Location);
                });
            };

            // Determine the uploaded file type
            // If it's an image already, save it to S3, else convert it.
            if (mimetype.split('/')[0] === 'image') {
                uploadBufferToS3(body);
            } else {

                var extension = path.extname(filename);

                //Cloud Convert doesn't seem to accept our already captured buffer directly
                // I worked around it with these 3 steps.
                // 1. Save the file to our server temporarily...
                fs.writeFile(filename, body, function (err) {
                    if (err) next(err);
                    //... 2. upload the temp file here...
                    // Cloud Convert provides works well with S3
                    fs.createReadStream(filename).pipe(cloudconvert.convert({
                        "input"       : "upload",
                        "output"      : {
                            "s3": {
                                "accesskeyid"    : access_s3_key,
                                "secretaccesskey": secret_s3_key,
                                "bucket"         : bucket_s3,
                                "region"         : "us-east-1",
                                "key"            : s3Key,
                                "acl"            : "public-read"
                            }
                        },
                        "inputformat" : extension.slice(1),
                        "outputformat": "png"
                    }).on('error', function (err) {
                        next(err);
                    }).on('finished', function (data) {

                        //File conversion complete
                        // Cloud Convert does not return the public link for each image,
                        // so they are constructed here and sent to the client as an array.
                        var arrayLinks = data.output.files.map(function (filenameInS3) {
                            return 'https://s3.amazonaws.com/' + bucket_s3 + '/' + s3Key + '/' + filenameInS3;
                        });

                        //... 3. and delete the temp file once it has been successfully uploaded.
                        fs.unlink(filename, function (err) {
                            next(err)
                        });
                        res.json(arrayLinks);
                    }));
                });
            }
        });
    });

    req.pipe(req.busboy);
});
