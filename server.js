
//code working fine with POST command

/* 
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  }
});

const upload = multer({ storage }).single('image');

app.post('/upload', upload, (req, res) => {
  const myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];
  const key = `${uuidv4()}.${fileType}`;

  if (!process.env.AWS_BUCKET_NAME) {
    console.error('AWS_BUCKET_NAME is not set in environment variables.');
    return res.status(500).send({ message: 'Server error' });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: req.file.buffer
  };

  s3.upload(params, (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }

    res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
*/
//.......................................................................................................................................
//this code works for both POST AND GET.. 
/*
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  }
});

const upload = multer({ storage }).single('image');

app.post('/upload', upload, (req, res) => {
  const myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];
  const key = `${uuidv4()}.${fileType}`;

  if (!process.env.AWS_BUCKET_NAME) {
    console.error('AWS_BUCKET_NAME is not set in environment variables.');
    return res.status(500).send({ message: 'Server error' });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: req.file.buffer
  };

  s3.upload(params, (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }

    res.status(200).send(data);
  });
});

app.get('/download/:key', (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.params.key
  };

  s3.getObject(params, (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }

    res.setHeader('Content-Type', data.ContentType);
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.key}"`);
    res.send(data.Body);
  });
});

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
*/
//.......................................................................................................................................

require('dotenv').config();

const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  }
});

const upload = multer({ storage }).single('image');

app.post('/upload', upload, (req, res) => {
  const myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];
  const key = `${uuidv4()}.${fileType}`;

  if (!process.env.AWS_BUCKET_NAME) {
    console.error('AWS_BUCKET_NAME is not set in environment variables.');
    return res.status(500).send({ message: 'Server error' });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: req.file.buffer
  };

  s3.upload(params, (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }

    res.status(200).send(data);
  });
});

app.get('/download/:key', (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.params.key
  };

  s3.getObject(params, (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }

    console.log(`Downloaded file name: ${req.params.key}`);
    res.setHeader('Content-Type', data.ContentType);
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.key}"`);
    res.send(data.Body);
  });
});

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});

