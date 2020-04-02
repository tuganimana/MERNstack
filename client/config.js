var  path = require('path');

const config = {
  public: path.resolve(__dirname, '..', 'public'),
  uploads: path.resolve(__dirname, '..', 'public','uploads'),
  images: path.resolve(__dirname, '..', 'public','images'),
  secret: '98r04w54u3iuisjdfhsjyr33rywur',
  mailKey: "key-16c30b1c9922174304fa27775fd4d2fd",
  domain: 'tantine.rw',
  //baseUrl: 'http://www.tantine.rw/api/',
  //url: "http://www.tantine.rw/",
  baseUrl: '/api/',
  url: "/",
  S3AccessKey: "AKIAJ2BY6PUSLHG3HBTQ",
  S3SecretKey: "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",
  S3Bucket: "tantine",
  unused: 'unused',
  used: 'used',
  africasTalkingApiKey: 'ec70d072ea4ad3c527c7e1a9f63cabbf86b5291881a0008d42aa352034540f1b',
  africasTalkingUsername: 'tantine',
  sendGridApiKey: ''
}

module.exports = config;
