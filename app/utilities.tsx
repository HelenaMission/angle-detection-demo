export function drawPredictions(context: any, predictions: any, video: any) {
  if (predictions.length > 1) {
    const tagName = predictions[0].tagName;
    context.strokeStyle = 'yellow';
    context.font = '38px Arial';
    context.beginPath();
    context.lineWidth = 3;
    context.fillStyle = 'black';
    context.fillText(`${tagName}`, 150, 150);
    context.stroke();
  }
}

