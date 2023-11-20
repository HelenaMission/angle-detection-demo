import React, { useState } from 'react';
import { sendFrameToCustomVision } from './customVisionApi';

export async function handleFrameCapture(imageDataUrl: string) {

  const blob = await fetch(imageDataUrl).then((res) => res.blob());
  try {
    const customVisionPredictions = await sendFrameToCustomVision(blob);
    console.log('Custom Vision API Response:', customVisionPredictions);
    return customVisionPredictions;
  } catch (error: any) {
    return [];
  }
}
