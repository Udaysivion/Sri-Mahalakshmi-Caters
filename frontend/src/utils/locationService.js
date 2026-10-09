/**
 * Location Service
 * Uses HTML5 Geolocation API with GPS refinement (watchPosition)
 * + Multi-Provider High-Precision Reverse Geocoding (Nominatim zoom=18 + Photon + BigDataCloud)
 * to locate the customer's exact delivery position with clean, human-readable address formatting.
 */

/**
 * Accurately grabs coordinates using GPS refinement.
 * Mobile devices and browsers take 1-3 seconds to lock onto satellite GPS.
 * Instead of taking the first coarse cell-tower fix, this listens until accuracy is <= 25m
 * or returns the best fix recorded within 4.5 seconds.
 */
export const getCurrentPositionCoords = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }

    let bestPosition = null;
    let watchId = null;
    let timerId = null;

    const cleanup = () => {
      if (watchId !== null) {
        try { navigator.geolocation.clearWatch(watchId); } catch (_) {}
        watchId = null;
      }
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
    };

    const handleSuccess = (position) => {
      const accuracy = position.coords.accuracy;

      // Update best position found so far
      if (!bestPosition || accuracy < bestPosition.coords.accuracy) {
        bestPosition = position;
      }

      // If accuracy is high (under 25 meters), resolve immediately
      if (accuracy <= 25) {
        cleanup();
        resolve(position);
      }
    };

    const handleError = (error) => {
      // If we already have a fix, use it rather than failing
      if (bestPosition) {
        cleanup();
        return resolve(bestPosition);
      }

      cleanup();
      let msg = 'Unable to fetch your location.';
      if (error.code === 1) {
        msg = 'Location permission was denied. Please allow location access in your browser.';
      } else if (error.code === 2) {
        msg = 'Location unavailable. Please check your GPS / network connection.';
      } else if (error.code === 3) {
        msg = 'Location request timed out. Please try again.';
      }
      const err = new Error(msg);
      err.code = error.code;
      reject(err);
    };

    try {
      watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0,
          ...options
        }
      );

      // Wait up to 4.5 seconds to acquire the most accurate reading
      timerId = setTimeout(() => {
        cleanup();
        if (bestPosition) {
          resolve(bestPosition);
        } else {
          // One-shot fallback if watchPosition did not emit in time
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos),
            (err) => handleError(err),
            { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
          );
        }
      }, 4500);
    } catch (_) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
      });
    }
  });
};

/**
 * Reverse geocode coordinates to clean, human-readable street-level address
 * Queries OpenStreetMap Nominatim with zoom=18 (building level), then Photon, then BigDataCloud.
 */
export const reverseGeocode = async (latitude, longitude) => {
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  // 1. Primary: OpenStreetMap Nominatim with zoom=18 and addressdetails=1 for maximum street precision
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en'
        },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};

      const parts = [];

      // Landmark, building, or premises
      const landmark = addr.amenity || addr.shop || addr.building || addr.tourism || addr.office || addr.leisure || '';
      const houseNo = addr.house_number ? `#${addr.house_number}` : '';
      if (landmark && houseNo) parts.push(`${houseNo}, ${landmark}`);
      else if (landmark) parts.push(landmark);
      else if (houseNo) parts.push(houseNo);

      // Street / Road / Lane
      const road = addr.road || addr.street || addr.footway || addr.pedestrian || '';
      if (road && !parts.includes(road)) parts.push(road);

      // Neighbourhood / Colony / Suburb / Quarter
      const locality = addr.suburb || addr.neighbourhood || addr.residential || addr.quarter || addr.city_district || addr.colony || addr.hamlet || '';
      if (locality && !parts.includes(locality)) parts.push(locality);

      // City / Town / Village
      const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || '';
      if (city && !parts.includes(city)) parts.push(city);

      // State & Pincode
      const state = addr.state || '';
      const pincode = addr.postcode || '';
      if (state && pincode) {
        parts.push(`${state} - ${pincode}`);
      } else if (state) {
        parts.push(state);
      } else if (pincode) {
        parts.push(pincode);
      }

      // If parts formed a good structured address, use it; otherwise clean display_name
      let cleanAddress = '';
      if (parts.length >= 3) {
        cleanAddress = parts.join(', ');
      } else if (data.display_name) {
        // Strip trailing ", India" from display_name
        cleanAddress = data.display_name.replace(/,\s*India$/i, '').trim();
      } else if (parts.length > 0) {
        cleanAddress = parts.join(', ');
      }

      const shortArea = locality || road || city || landmark || 'Detected Location';

      if (cleanAddress) {
        return {
          addressText: cleanAddress,
          cleanAddress,
          shortArea,
          area: shortArea,
          city,
          state,
          pincode,
          mapsUrl
        };
      }
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode notice:', err.message);
  }

  // 2. Secondary High-Speed Fallback: Photon API (Komoot OpenStreetMap)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(
      `https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const p = data.features[0].properties || {};
        const parts = [];
        if (p.name) parts.push(p.name);
        if (p.housenumber) parts.push(`#${p.housenumber}`);
        if (p.street && !parts.includes(p.street)) parts.push(p.street);
        if (p.district && !parts.includes(p.district)) parts.push(p.district);
        if (p.city && !parts.includes(p.city)) parts.push(p.city);
        if (p.state && p.postcode) parts.push(`${p.state} - ${p.postcode}`);
        else if (p.state) parts.push(p.state);

        const cleanAddress = parts.length > 0 ? parts.join(', ') : '';
        const shortArea = p.name || p.street || p.district || p.city || 'Detected Area';

        if (cleanAddress) {
          return {
            addressText: cleanAddress,
            cleanAddress,
            shortArea,
            area: shortArea,
            city: p.city || '',
            state: p.state || '',
            pincode: p.postcode || '',
            mapsUrl
          };
        }
      }
    }
  } catch (err) {
    console.warn('Photon reverse geocode notice:', err.message);
  }

  // 3. Tertiary Fallback: BigDataCloud Client Reverse Geocode
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const parts = [];
      if (data.locality) parts.push(data.locality);
      if (data.city && data.city !== data.locality) parts.push(data.city);
      if (data.principalSubdivision) parts.push(data.principalSubdivision);
      if (data.postcode) parts.push(data.postcode);

      const cleanAddress = parts.length > 0 ? parts.join(', ') : '';
      const shortArea = data.locality || data.city || 'Detected Location';

      if (cleanAddress) {
        return {
          addressText: cleanAddress,
          cleanAddress,
          shortArea,
          area: shortArea,
          city: data.city || '',
          state: data.principalSubdivision || '',
          pincode: data.postcode || '',
          mapsUrl
        };
      }
    }
  } catch (err) {
    console.warn('BigDataCloud reverse geocode notice:', err.message);
  }

  // 4. Final coordinate fallback
  const coordText = `Location Coordinates (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
  return {
    addressText: coordText,
    cleanAddress: coordText,
    shortArea: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
    area: 'Detected Location',
    city: '',
    state: '',
    pincode: '',
    mapsUrl
  };
};

/**
 * Fetch current customer location and generate accurate address
 */
export const findCurrentLocation = async () => {
  const position = await getCurrentPositionCoords();
  const { latitude, longitude, accuracy } = position.coords;

  const geoData = await reverseGeocode(latitude, longitude);

  return {
    latitude,
    longitude,
    accuracy: Math.round(accuracy || 0),
    ...geoData
  };
};

export default {
  getCurrentPositionCoords,
  reverseGeocode,
  findCurrentLocation
};
