/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customVisionApiKey: '8b89ad75c8494a78a316eaa54e59f932',
    customVisionApiEndpoint:
      'https://wateringcanangledetection-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/93bdb3b2-3f81-4572-993b-f8068f49b62e/classify/iterations/object-angle-prediction/image',
  },
};

module.exports = nextConfig
