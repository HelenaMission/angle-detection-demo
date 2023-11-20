'use client';

import { WebcamCapture } from './components/webcamCapture';
import { handleFrameCapture } from './api/handleFrameCapture';

export default function Home() {
  return (
    <main>
      <h1>Real-Time Object Detection</h1>
      <WebcamCapture onFrameCapture={handleFrameCapture} />
    </main>
  );
}
