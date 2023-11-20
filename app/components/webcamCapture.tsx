import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { drawPredictions } from './../utilities';
import { handleFrameCapture } from '../api/handleFrameCapture';

interface WebcamCaptureProps {
  onFrameCapture: (imageDataUrl: string) => void;
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onFrameCapture,
}: {
  onFrameCapture: (imageDataUrl: string) => void;
}) => {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    const captureFrame = async () => {
      if (webcamRef.current && canvasRef.current) {
        const video = webcamRef.current.video;
        if (!video) return;
        const canvas = canvasRef.current;
        const imageDataUrl = canvas.toDataURL('image/jpeg');

        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

          try {
            const customVisionPredictions = await handleFrameCapture(imageDataUrl);
            setPredictions(customVisionPredictions);
          } catch (error) {
            console.error('Error sending image to Custom Vision API: ', error);
            setPredictions([]);
          }

          // Draw predictions on canvas
          drawPredictions(context, predictions, video);
          onFrameCapture(imageDataUrl);
        }
      }
    };

    captureFrame();
  }, [onFrameCapture, predictions]);

  return (
    <div style={{ display: 'flex' }}>
      <Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 1920,
          height: 1080,
          border: '1px solid red',
        }}
      />
    </div>
  );
};
