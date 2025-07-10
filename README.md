# 오픈마인드 (OpenMind)

## 프로젝트 개요
오픈마인드는 익명성을 기반으로 사용자 의견을 수집하고 피드백을 주고받을 수 있는 SNS형 웹 애플리케이션입니다.
CRUD(Create, Read, Update, Delete) 기능을 중심으로, 답변 작성, 수정, 삭제, 좋아요/싫어요 등의 상호작용 요소를 포함하여, 사용자 반응을 유기적으로 기록하고 공유할 수 있습니다.

## 기술 스택
- 프론트엔드 : HTML5, SCSS Module(CSS Modules), JavaScript, React, Next.js
- 버전 관리 : GitHub
- 데이터 저장 : LocalStorage (계정 생성 및 저장)

## 폴더 구조
- **components/** – 공통 UI 컴포넌트
- **app/** – 라우팅 기반 페이지 구조 (Next.js App Router)
- **styles/** – SCSS 모듈 스타일 파일
- **services/** – API 요청 함수
- **hooks/** – 커스텀 훅 모음
- **types/** – 전역 타입 정의

## 주요 기능 및 구현 포인트
- 재렌더링 최적화: 성능 개선을 고려한 컴포넌트 구조
- 반응형 UI: 다양한 해상도에 대응하는 사용자 인터페이스
- 스켈레톤 UI: 데이터 로딩 시 사용자 경험 향상
- 로컬 계정 생성: LocalStorage를 활용한 간편한 계정 관리
- 페이지네이션: 많은 데이터도 효율적으로 탐색 가능
- 동적 라우팅: 사용자의 게시글 및 상세 페이지 구현
- 카카오톡 공유 기능: 외부 플랫폼과의 연동을 위한 API 직접 리서치 및 적용

## 배포 링크
https://openmind-kimgayeongs-projects.vercel.app/

---

## 디자인 문서
오픈마인드 UI/UX 디자인 파일은 아래 Figma 링크에서 확인 가능합니다.  
- [Figma 디자인 보기](https://www.figma.com/design/sy1OrnQQF3y7E78ioeGsaM/OPENMIND?node-id=0-1&p=f&t=AF6lCOdT1lmZIgxd-0)
## API 문서
오픈마인드 API 명세는 Swagger로 작성되어 있으며, 다음 URL에서 확인할 수 있습니다.  
- [Swagger API 문서](https://openmind-api.vercel.app/docs/)
