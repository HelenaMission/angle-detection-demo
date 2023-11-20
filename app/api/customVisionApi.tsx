import axios from 'axios';

export async function sendFrameToCustomVision(blob: any) {
  const apiKey = process.env.customVisionApiKey || '';
  const endpoint = process.env.customVisionApiEndpoint || '';

  const formData = new FormData();
  formData.append('image', blob);

  try {
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Prediction-Key': apiKey,
        'Content-Type': 'application/octet-stream',
      },
    });
    return response.data.predictions;
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    return [];
  }
}
