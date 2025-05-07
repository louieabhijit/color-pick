declare module 'nearest-color' {
  interface NearestColorResult {
    name: string;
    value: string;
    rgb: { r: number; g: number; b: number };
    distance: number;
  }

  interface NearestColorFunction {
    (color: string): NearestColorResult;
    from(colors: Record<string, string>): NearestColorFunction;
  }

  const nearestColor: NearestColorFunction;
  export default nearestColor;
} 