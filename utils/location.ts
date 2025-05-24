export async function getLocationData() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}

// Map of country codes to language codes
export const countryToLanguage: { [key: string]: string } = {
  'TR': 'tr', // Turkey
  'DE': 'de', // Germany
  'ES': 'es', // Spain
  'SA': 'ar', // Saudi Arabia
  'CN': 'zh', // China
  // Add more mappings as needed
};

// Default language if country is not in the mapping
export const DEFAULT_LANGUAGE = 'en'; 