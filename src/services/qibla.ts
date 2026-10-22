/**
 * Qibla calculations and device orientation engine
 */

export const KAABA_COORDINATES = {
  latitude: 21.422487,
  longitude: 39.826206,
  name: 'Holy Kaaba, Makkah al-Mukarramah'
};

export class QiblaService {
  static getCardinalDirection(angle: number, language: 'en' | 'ur' = 'en'): string {
    const directions = language === 'ur'
      ? ['شمال', 'شمال مشرق', 'مشرق', 'جنوب مشرق', 'جنوب', 'جنوب مغرب', 'مغرب', 'شمال مغرب']
      : ['North', 'North-east', 'East', 'South-east', 'South', 'South-west', 'West', 'North-west'];
    return directions[Math.round(((angle % 360) + 360) % 360 / 45) % directions.length];
  }

  /**
   * Calculate forward azimuth angle to the Kaaba from user coordinates (0 - 360 degrees)
   */
  static calculateQiblaAngle(lat: number, lng: number): number {
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const kaabaLatRad = (KAABA_COORDINATES.latitude * Math.PI) / 180;
    const kaabaLngRad = (KAABA_COORDINATES.longitude * Math.PI) / 180;

    const deltaLng = kaabaLngRad - lngRad;

    const y = Math.sin(deltaLng);
    const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(deltaLng);

    let qibla = (Math.atan2(y, x) * 180) / Math.PI;
    return (qibla + 360) % 360;
  }

  /**
   * Calculate Haversine great-circle distance to the Kaaba in kilometers
   */
  static calculateDistanceToKaaba(lat: number, lng: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((KAABA_COORDINATES.latitude - lat) * Math.PI) / 180;
    const dLon = ((KAABA_COORDINATES.longitude - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
      Math.cos((KAABA_COORDINATES.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }
}
