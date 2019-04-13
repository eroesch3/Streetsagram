const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
require ('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});

AWS.config.setPromisesDependency(bluebird);

const s3=new AWS.S3();

const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.S3_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    }
    return s3.upload(params).promise()
};

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.post('/upload', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, async (error, fields, files) =>{
        if (error) throw new Error(error)
        try {
            const path = files.file[0].path
            const buffer = fs.readFileSync(path)
            const type = fileType(buffer)
            const timestamp = Date.now().toString()
            const fileName = `bucketFolder/${timestamp}-lg`
            const data = await uploadFile(buffer, fileName, type)
            return res.status(200).send(data)
        } catch (error) {
            return res.status(400).send(error)
        }
    })
});

app.get('/list', async (req, res) => {
    const params = {
        Bucket: 'streetstagram-juniper',
        MaxKeys: 1,
    }
    s3.listObjects(params, function(err, data){
        if (err) console.log(err)
        else console.log('data', data)
    })
    res.json({ msg: 'Express is running for awsServer, Streetstagram!' })
  });

app.listen(process.env.PORT || 3005);
console.log(`SERVER UP!`)