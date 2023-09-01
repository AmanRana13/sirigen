// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
jest.setTimeout(30000);
afterEach(() => jest.clearAllMocks());
if (!global.google) {
  // do something
  global.google = {
    maps: {
      places: {
        Autocomplete: class {
          addListener() {
            return;
          }
        },
      },
      Size: class {},
      LatLngBounds: class {
        extend() {
          return;
        }
      },
      Map: class {
        fitBounds() {
          return;
        }
        addListener() {
          return;
        }
        setZoom() {
          return;
        }
        setCenter() {
          return;
        }
      },
      LatLng: class {},
      Marker: class {
        setMap() {
          return;
        }
      },
      Geocoder: class {
        geocode() {
          return Promise.resolve();
        }
      },
    },
  };
}
