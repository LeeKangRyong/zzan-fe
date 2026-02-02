# 프로젝트 아키텍처 가이드 (zzan-fe)

이 문서는 디자인 요소를 코드로 구현할 때 준수해야 할 프로젝트 구조와 컨벤션에 대해 설명합니다. 본 프로젝트는 **Domain-based MVVM** 패턴을 따릅니다.

## 1. 기술 스택

- **Framework**: Expo (v54+)
- **Routing**: Expo Router (File-based Routing) + StackNavigator
- **Language**: TypeScript
- **Styling**: React Native StyleSheet (기본)
- **Icons**: `assets/icons/` 폴더 내 SVG 활용

## 2. 디렉토리 구조 및 역할

### 2.1 Core Directories

- **app/**: Expo Router 기반의 진입점 및 경로 정의. 레이아웃(`_layout.tsx`)을 관리하며, 하단 바가 필요 없는 스택 화면은 screen 옵션으로 제어함.
- **assets/**: 폰트(Kakao Sans), 아이콘(SVG), 이미지 리소스 관리.
- **shared/**: 도메인과 관계없이 전역에서 재사용되는 리소스.
  - `shared/constants/`: 색상(`Colors.ts`), 폰트(`Fonts.ts`) 등 상수 관리.
  - `shared/components/`: 버튼, 입력창 등 Atomic 단위의 공통 컴포넌트.
  - `shared/hooks/`: 포맷팅, 공통 유틸리티 커스텀 훅.
  - `shared/utils/`: 범용 도구 함수.
- **docs/**: Claude Code 및 협업을 위한 문서 관리.

### 2.2 Domains (Domain-based MVVM)

각 기능(Domain)은 `domains/` 폴더 하위에서 독립적으로 관리하며 MVVM 역할을 수행함.

- **domains/{domain}/ui/**: (**View**) 해당 기능의 UI 컴포넌트 및 스크린. UI 렌더링에만 집중함.
- **domains/{domain}/viewmodel/**: (**ViewModel**) 비즈니스 로직 및 상태 관리. 주로 `use{Domain}ViewModel.ts` 형태의 커스텀 훅으로 작성함.
- **domains/{domain}/model/**: (**Model**) 해당 도메인의 데이터 인터페이스(Type/Interface) 및 가공 로직.

## 3. 코드 작성 및 디자인 적용 컨벤션

- **컴포넌트**: 함수형 컴포넌트를 사용하며, 명시적인 Props 타입을 정의함.
- **스타일링**: 컴포넌트 하단에 `StyleSheet.create`를 사용함.
- **디자인 시스템**: 모든 색상은 `shared/constants/Colors.ts`를 참조하며, 없는 색상은 해당 파일에 추가 후 사용함.
- **폰트**: `assets/fonts/`의 Kakao Sans 계열을 사용하며 `shared/constants/Fonts.ts`를 통해 적용함.
- **아이콘**: `assets/icons/` 내의 SVG 파일을 우선적으로 사용함.

## 4. 디자인 시스템 적용 규칙

- 하드코딩된 수치 대신 시스템에서 정의한 간격(Spacing)과 타이포그래피 규칙을 준수함.
- 새로운 화면 생성 시 `app/` 폴더에는 최소한의 경로 코드만 작성하고, 실제 구현체는 `domains/` 내의 View와 ViewModel로 분리함.
