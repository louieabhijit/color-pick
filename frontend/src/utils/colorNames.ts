import { colornames } from 'color-name-list';
import nearestColor from 'nearest-color';

// Create a map for exact color matching
const exactColorMap = new Map(colornames.map(color => [color.hex.toLowerCase(), color.name]));

// Create nearest-color matcher
const colorsForNearest = colornames.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
const nearest = nearestColor.from(colorsForNearest);

export function getColorName(hex: string): string {
  // Ensure consistent format (lowercase, with #)
  const normalizedHex = hex.toLowerCase();
  const hexWithoutHash = normalizedHex.startsWith('#') ? normalizedHex.slice(1) : normalizedHex;
  const hexWithHash = '#' + hexWithoutHash;

  // Try to find exact match first
  const exactMatch = exactColorMap.get(hexWithHash);
  if (exactMatch) {
    return exactMatch;
  }

  // If no exact match, find nearest color
  try {
    const nearestMatch = nearest(hexWithHash);
    return typeof nearestMatch === 'string' ? nearestMatch : nearestMatch.name;
  } catch (error) {
    console.error('Error finding nearest color:', error);
    return ''; // Return empty string if something goes wrong
  }
} 