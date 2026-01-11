/**
 * Figma API 연결 테스트 스크립트
 * 특정 파일 키로 Figma API에 연결되는지 확인합니다.
 */

const https = require('https');
require('dotenv').config();

const FILE_KEY = 'unTYs0Gy3ImXcfyPXD4Ewp';
const FIGMA_TOKEN = process.env.EXPO_PUBLIC_FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('❌ EXPO_PUBLIC_FIGMA_TOKEN이 설정되지 않았습니다.');
  console.error('   .env 파일에 EXPO_PUBLIC_FIGMA_TOKEN을 확인하세요.');
  process.exit(1);
}

console.log(`🔍 Figma 파일 연결 테스트 시작...`);
console.log(`📁 파일 키: ${FILE_KEY}`);
console.log(`🔑 토큰: ${FIGMA_TOKEN.substring(0, 10)}...`);
console.log('');

const options = {
  hostname: 'api.figma.com',
  port: 443,
  path: `/v1/files/${FILE_KEY}`,
  method: 'GET',
  headers: {
    'X-Figma-Token': FIGMA_TOKEN,
  },
};

const req = https.request(options, (res) => {
  let data = '';

  console.log(`📡 응답 상태: ${res.statusCode} ${res.statusMessage}`);
  console.log('');

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);

      if (res.statusCode === 200) {
        console.log('✅ 연결 성공!');
        console.log('');
        console.log('📋 파일 정보:');
        console.log(`   이름: ${response.name}`);
        console.log(`   버전: ${response.version}`);
        console.log(`   마지막 수정: ${response.lastModified}`);
        console.log(`   스키마 버전: ${response.schemaVersion}`);
        console.log('');

        if (response.document) {
          console.log('📄 문서 구조:');
          console.log(`   타입: ${response.document.type}`);
          console.log(`   이름: ${response.document.name}`);
          console.log(`   하위 페이지 수: ${response.document.children?.length || 0}`);

          if (response.document.children && response.document.children.length > 0) {
            console.log('');
            console.log('📑 페이지 목록:');
            response.document.children.forEach((page, index) => {
              console.log(`   ${index + 1}. ${page.name} (${page.type})`);
            });
          }
        }

        if (response.components) {
          const componentCount = Object.keys(response.components).length;
          console.log('');
          console.log(`🎨 컴포넌트 수: ${componentCount}개`);
          if (componentCount > 0) {
            console.log('   컴포넌트 목록:');
            Object.values(response.components).slice(0, 5).forEach((comp) => {
              console.log(`   - ${comp.name}`);
            });
            if (componentCount > 5) {
              console.log(`   ... 외 ${componentCount - 5}개`);
            }
          }
        }

        if (response.styles) {
          const styleCount = Object.keys(response.styles).length;
          console.log('');
          console.log(`🎨 스타일 수: ${styleCount}개`);
        }

      } else if (res.statusCode === 403) {
        console.log('❌ 접근 권한 없음');
        console.log('');
        console.log('가능한 원인:');
        console.log('1. Figma 토큰이 유효하지 않음');
        console.log('2. 토큰 소유자가 이 파일에 대한 접근 권한이 없음');
        console.log('3. 파일이 비공개이며 팀 멤버가 아님');
        console.log('');
        console.log('에러 메시지:', response.err || response.message);
      } else if (res.statusCode === 404) {
        console.log('❌ 파일을 찾을 수 없음');
        console.log('');
        console.log('가능한 원인:');
        console.log('1. 파일 키가 잘못되었음');
        console.log('2. 파일이 삭제되었음');
        console.log('3. URL에서 파일 키를 다시 확인하세요');
        console.log('');
        console.log('에러 메시지:', response.err || response.message);
      } else {
        console.log('❌ 요청 실패');
        console.log('');
        console.log('응답:', JSON.stringify(response, null, 2));
      }
    } catch (error) {
      console.log('❌ 응답 파싱 실패');
      console.log('');
      console.log('원본 응답:', data);
      console.log('에러:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ 네트워크 에러');
  console.log('');
  console.log('에러:', error.message);
  console.log('');
  console.log('가능한 원인:');
  console.log('1. 인터넷 연결 확인');
  console.log('2. 방화벽 설정 확인');
  console.log('3. Figma API 서버 상태 확인');
});

req.end();
