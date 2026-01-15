import { MapMarker, MapRegion } from '../model/mapModel';

const generateHtmlStructure = (apiKey: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}"></script>
      <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; }
        #map { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
  `.trim();
};

const generateMarkerScript = (markers: MapMarker[]) => {
  const markerData = JSON.stringify(markers);
  return `
    const markers = ${markerData};
    markers.forEach(marker => {
      const position = new kakao.maps.LatLng(marker.latitude, marker.longitude);
      const mapMarker = new kakao.maps.Marker({ position, map });

      kakao.maps.event.addListener(mapMarker, 'click', () => {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({type: 'markerPress', markerId: marker.id})
        );
      });
    });
  `;
};

const generateInitScript = (region: MapRegion, markers: MapMarker[]) => {
  return `
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(${region.latitude}, ${region.longitude}),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    ${generateMarkerScript(markers)}
  `;
};

export const generateMapHtml = (region: MapRegion, markers: MapMarker[], apiKey: string) => {
  const htmlStructure = generateHtmlStructure(apiKey);
  const initScript = generateInitScript(region, markers);
  return `
    ${htmlStructure}
    <script>${initScript}</script>
    </body>
    </html>
  `.trim();
};
