// Wave height patterns based on time of day and seasonal factors
export function getWavePattern(hour: number, baseHeight: number): number {
  // Waves are typically larger in the morning and evening
  const timeOfDayFactor = Math.sin((hour / 24) * Math.PI * 2) * 0.3 + 1;
  const now = Date.now();

  // More frequent updates for real-time feel
  const fastVariation = Math.sin(now / 1000) * 0.15; // Every second
  const mediumVariation = Math.sin(now / 3000) * 0.2; // Every 3 seconds
  const slowVariation = Math.sin(now / 5000) * 0.1; // Every 5 seconds
  const microVariation = Math.sin(now / 500) * 0.05; // Every half second
  const randomFactor =
    fastVariation + mediumVariation + slowVariation + microVariation;

  return baseHeight * timeOfDayFactor + randomFactor;
}

// Wind patterns based on time of day
export function getWindPattern(hour: number, baseSpeed: number): number {
  // Wind typically picks up in the afternoon
  const timeOfDayFactor = Math.sin((hour / 24 - 0.25) * Math.PI * 2) * 0.5 + 1;
  const now = Date.now();

  // More frequent wind variations
  const fastWindVar = Math.sin(now / 800) * 1.5; // Quick gusts
  const mediumWindVar = Math.sin(now / 2000) * 2; // Medium changes
  const slowWindVar = Math.sin(now / 5000) * 1; // Slow trends
  const microWindVar = Math.sin(now / 300) * 0.5; // Micro variations
  const randomFactor = fastWindVar + mediumWindVar + slowWindVar + microWindVar;

  return baseSpeed * timeOfDayFactor + randomFactor;
}

// Temperature patterns based on time of day
export function getTemperaturePattern(hour: number, baseTemp: number): number {
  // Temperature peaks in the afternoon
  const timeOfDayFactor = Math.sin((hour / 24 - 0.25) * Math.PI * 2) * 5;
  const now = Date.now();

  // More dynamic temperature variations
  const fastTempVar = Math.sin(now / 2000) * 0.5; // Fast changes
  const mediumTempVar = Math.sin(now / 5000) * 1; // Medium fluctuations
  const slowTempVar = Math.sin(now / 10000) * 0.8; // Slow trends
  const tempVariation = fastTempVar + mediumTempVar + slowTempVar;

  return baseTemp + timeOfDayFactor + tempVariation;
}

// Crowd level prediction based on conditions and time
export function predictCrowdLevel(
  hour: number,
  waveHeight: number,
  temperature: number,
): "low" | "medium" | "high" {
  // Score based on various factors
  let score = 0;

  // Time factor - people prefer mid-morning to afternoon
  if (hour >= 9 && hour <= 16) score += 2;
  if (hour >= 6 && hour < 9) score += 1;

  // Wave height factor - ideal waves attract more people
  if (waveHeight >= 1 && waveHeight <= 2) score += 2;
  if (waveHeight > 2) score -= 1;

  // Temperature factor
  if (temperature >= 23 && temperature <= 28) score += 2;
  if (temperature > 28) score -= 1;

  // Convert score to crowd level
  if (score >= 4) return "high";
  if (score >= 2) return "medium";
  return "low";
}
