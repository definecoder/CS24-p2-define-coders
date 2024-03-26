export function threshold(x: number): string {
    let circleColor = '#00FF00';
  
    if (x >= 40 && x <= 80) {
      circleColor = '#FFFF00'; // Yellow
    } else if (x > 80) {
      circleColor = '#FF0000'; // Red
    }
  
    return circleColor;
  }
  