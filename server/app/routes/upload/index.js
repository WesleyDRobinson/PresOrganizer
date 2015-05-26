var router = require('express').Router();
var fs = require('fs');
var AWS = require('aws-sdk');
var sbuff = require('simple-bufferstream');
var path = require('path');

var secret_s3_key = require(path.join(__dirname, '../../../env')).S3.SECRET_KEY;
var access_s3_key = require(path.join(__dirname, '../../../env')).S3.ACCESS_KEY;
var bucket_s3 = require(path.join(__dirname, '../../../env')).S3.BUCKET;
var cloud_key = require(path.join(__dirname, '../../../env')).CLOUD_CONVERT;
var cloudconvert = new (require('cloudconvert'))(cloud_key);

module.exports = router;

router.post('/', function (req, res, next) {

    AWS.config.update({
        "accessKeyId"    : access_s3_key,
        "secretAccessKey": secret_s3_key
    });
    AWS.config.region = 'us-east-1';

    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

        var body = new Buffer(0);

        file.on('data', function (chunk) {
            body = Buffer.concat([body, chunk]);
        });

        file.on('end', function () {
            var type = mimetype.split('/')[0];
            var s3Key = 'image' + Date.now();

            function uploadBufferToS3 (buffer) {
                var params = {
                    ACL        : 'public-read',
                    Bucket     : bucket_s3,
                    Body       : buffer,
                    ContentType: mimetype,
                    Key        : s3Key
                };

                var s3 = new AWS.S3();
                s3.upload(params, function (err, data) {
                    if (err) next(err);
                    res.json(data.Location);
                });
            }

            if (type === 'image') {
                console.log("This is an image, so we're uploading it to S3 right away!");
                uploadBufferToS3(body);
            } else {
                console.log("This is not an image, so we're converting it to a png then uploading it to S3!");

                var extension = path.extname(filename);
                // send to cloud convert,
                fs.writeFile(filename, body, function (err) {
                    if (err) next(err);
                    fs.createReadStream(filename).pipe(cloudconvert.convert({
                        "input": "upload",
                        "output": {
                            "s3": {
                                "accesskeyid": access_s3_key,
                                "secretaccesskey": secret_s3_key,
                                "bucket": bucket_s3,
                                "region": "us-east-1",
                                "key": s3Key,
                                "acl": "public-read"
                            }
                        },
                        "inputformat": extension.slice(1),
                        "outputformat": "png"
                    }).on('error', function(err) {
                        console.error('Failed: ' + err);
                    }).on('finished', function(data) {
                        console.log('Done: ' + data.message);
                        //console.log("full data object: ", data);
                        var arrayLinks = [];
                        data.output.files.forEach( function (filenameInS3) {
                            var link = 'https://s3.amazonaws.com/' + bucket_s3 + '/' + s3Key + '/' + filenameInS3;
                            arrayLinks.push(link);
                        });
                        fs.unlink(filename);
                        res.json(arrayLinks);
                    }));

                });
            }
        });
    });

    req.pipe(req.busboy);

});
