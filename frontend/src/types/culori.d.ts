declare module 'culori' {
  export function oklch(color: string | number[]): {
    l: number;
    c: number;
    h: number;
    alpha?: number;
  };

  export function formatHex(color: any): string;
  export function formatRgb(color: any): string;
  export function formatHsl(color: any): string;
  export function formatOklch(color: any): string;
  
  export function interpolate(colors: string[]): (t: number) => string;
  export function interpolateOkhsl(colors: string[]): (t: number) => string;
  export function interpolateOklch(colors: string[]): (t: number) => string;
  
  export function parse(color: string): any;
  export function rgb(color: string | number[]): {
    r: number;
    g: number;
    b: number;
    alpha?: number;
  };
  
  export function hsl(color: string | number[]): {
    h: number;
    s: number;
    l: number;
    alpha?: number;
  };
} 