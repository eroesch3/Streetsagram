const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird')
const multiparty = require('multiparty')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

AWS.config.setPromisesDependency(bluebird)

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
}

app.post('/test-upload', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, async (error, fields, files) =>{
        if (e) throw new Error(e)
        try {
            const path = files.file[0].path
            const buffer = fs.readFileSync(path)
            const type = fileType(buffer)
            const timestamp = Date.now().toString()
            const fileName = `bucketFolder/${timestamp}-lg`
            const data = await uploadFile(bugger, fileName, type)
            return res.status(200).send(data)
        } catch (e) {
            return Response.status(400).send(e)
        }
    })
})

app.listen(process.env.PORT || 9000)
console.log('SERVER UP!')