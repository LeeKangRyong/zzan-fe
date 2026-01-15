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
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
        #map { width: 100%; height: 100%; position: absolute; }
      </style>
    </head>
    <body>
      <div id="map"></div>
  `.trim();
};

const generateInitScript = (region: MapRegion, markers: MapMarker[]) => {
  return `
    (function() {
      function sendLog(message, data) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'log',
          message: message + (data ? ' ' + JSON.stringify(data) : '')
        }));
      }

      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(${region.latitude}, ${region.longitude}),
        level: 3
      };
      const map = new kakao.maps.Map(container, options);
      window.kakaoMap = map; // 전역 참조 저장

      // 마커 렌더링
      const markersData = ${JSON.stringify(markers)};
      markersData.forEach(marker => {
        const position = new kakao.maps.LatLng(marker.latitude, marker.longitude);
        const m = new kakao.maps.Marker({ position, map });
        kakao.maps.event.addListener(m, 'click', function() {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'markerPress', 
            markerId: marker.id
          }));
        });
      });

      // 지도 이동 로직
      function moveToCenter(lat, lng) {
        const moveLatLon = new kakao.maps.LatLng(lat, lng);
        window.kakaoMap.panTo(moveLatLon);
        sendLog('[WebView] PanTo Success', {lat, lng});
      }

      // 메시지 리스너 (Android & iOS 통합)
      function onMessage(e) {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'moveCenter') {
            moveToCenter(data.latitude, data.longitude);
          }
        } catch (err) {
          sendLog('[WebView] Error parsing message', err.message);
        }
      }

      window.addEventListener('message', onMessage);
      document.addEventListener('message', onMessage);
      
      sendLog('[WebView] Initialized', {lat: ${region.latitude}, lng: ${region.longitude}});
    })();
  `;
};

export const generateMapHtml = (region: MapRegion, markers: MapMarker[], apiKey: string) => {
  return `
    ${generateHtmlStructure(apiKey)}
    <script>${generateInitScript(region, markers)}</script>
    </body>
    </html>
  `.trim();
};