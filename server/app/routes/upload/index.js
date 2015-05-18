var router = require('express').Router();
var fs = require('fs');
var AWS = require('aws-sdk');
var secrets = require('./keys.js');
var cloudconvert = new (require('cloudconvert'))(secrets.cloudKey);

module.exports = router;

router.post('/',function (req,res,next){

    AWS.config.update({
        "accessKeyId"    : secrets.access_key,
        "secretAccessKey": secrets.secret_key
    });
    AWS.config.region = 'us-east-1';

    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

        var body = new Buffer(0);

        function uploadBufferToS3 (buffer) {
            var s3Key = 'image' + Date.now();
            var params = {
                ACL: 'public-read',
                Bucket: secrets.bucket,
                Body: buffer,
                ContentType: mimetype,
                Key: s3Key
            };

            var s3 = new AWS.S3();
            s3.upload(params, function (err, data) {
                if (err) next(err);
                res.json (data.Location);
            });
        }

        file.on('data', function (chunk) {
            body = Buffer.concat([body, chunk]);
        });

        file.on('end', function () {
            var type = mimetype.split('/')[0];

            if (type === 'image') {
                uploadBufferToS3(body);
            } //else {
                //var extensionArray = filename.split(".");
                //var extension = extensionArray[extensionArray.length - 1];
                //console.log("Filename", filename, 'extension', extension, 'mime', mimetype);
                //// send to cloud convert,
                //fs.createReadStream(body).pipe(cloudconvert.convert({
                //    "input": "upload",
                //    "inputformat": extension,
                //    "outputformat": "png"
                //}).on('error', function(err) {
                //    console.error('Failed: ' + err);
                //}).on('finished', function(data) {
                //    console.log('Done: ' + data);
                //    res.json('Files converted. We made it to the end!')
                //}));
            //}
         });
    });

    req.pipe(req.busboy);

});
