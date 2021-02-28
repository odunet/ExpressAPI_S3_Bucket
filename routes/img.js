var express = require('express');
var router = express.Router();
var awsConfig = require('aws-config');
var AWS = require('aws-sdk');
var fs = require('fs');

/* GET users listing. */
router.get('/' , function(req, res, next) {
  var file = 'random_data/map.jpg';
  console.log('Trying to download file', file);

  //Initialize S3 Object
  var s3 = new AWS.S3({});

  //Bucket configuration
  var options = {
      Bucket: 'odunet-teststorage-2021',
      Key: file,
  };

  //Call method to query S3 bucket, handles error and return data from S3 bucket 
  s3.getObject(options, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      //save csv file in uploads directory. Converts buffer to jpg
      fs.writeFile(__dirname + '/../uploads/map.jpg', data.Body,'base64', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      //save file to local disc when client loads
      res.attachment(file);
      res.send(data.Body);
    }
  }); 
});

module.exports = router;
