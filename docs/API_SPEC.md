# API Specification & Mocking Guide

이 문서는 `zzan-fe` 프로젝트의 API 응답 구조 정의와 효율적인 프론트엔드 개발을 위한 Mock 데이터 활용 방법을 설명합니다.

## 1. Mock 데이터 플래그 설정
빠른 UI 개발을 위해 모든 API 호출부 및 ViewModel에서는 `.env`의 `USE_MOCK_DATA` 플래그를 참조합니다.

- **플래그 위치**: 프로젝트 루트의 `.env`
- **설정값**: 
  - `USE_MOCK_DATA=true`: 모든 데이터를 `domains/{domain}/model/mock.ts`에서 가져옴.
  - `USE_MOCK_DATA=false`: 실제 `api/` 클라이언트를 통해 서버와 통신함.

## 2. API 응답 공통 구조
백엔드 API 및 내부 데이터 인터페이스의 공통 형식입니다.

```typescript
interface ApiResponse<T> {
  status: number;      // HTTP 상태 코드
  message: string;     // 응답 메시지
  data: T;             // 실제 데이터 본문
  timestamp: string;   // 응답 시간 (ISO 8601)
}