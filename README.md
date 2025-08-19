# 오픈마인드 (OpenMind)

## 📌 프로젝트 개요
오픈마인드는 **익명성을 기반으로 사용자 의견을 수집하고 피드백을 주고받을 수 있는 SNS형 웹 애플리케이션**입니다.  
CRUD(Create, Read, Update, Delete)를 중심으로 답변 작성, 수정, 삭제, 좋아요/싫어요 등의 상호작용을 제공하며, 사용자의 의견을 효과적으로 기록하고 공유할 수 있습니다.

## 🛠 기술 스택
<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"/>
</p>

- **데이터 저장**: LocalStorage (계정 생성 및 저장)  
- **API 연동**: Swagger 기반 API 명세 활용  

## 📂 폴더 구조
- **components/** – 공통 UI 컴포넌트
- **app/** – 라우팅 기반 페이지 구조 (Next.js App Router)
- **styles/** – SCSS 모듈 스타일 파일
- **services/** – API 요청 함수
- **hooks/** – 커스텀 훅 모음
- **types/** – 전역 타입 정의

## ✨ 주요 기능
- **UI/UX**
  - 반응형 UI: 다양한 해상도 대응  
  - 스켈레톤 UI: 로딩 시 사용자 경험 개선  

- **성능 최적화**
  - 재렌더링 최소화를 고려한 컴포넌트 구조  
  - 페이지네이션을 통한 대량 데이터 효율적 탐색  

- **계정 및 데이터 관리**
  - 로컬 계정 생성 (LocalStorage 활용)  
  - 동적 라우팅으로 게시글 및 상세 페이지 구현  

- **외부 연동**
  - 카카오톡 공유 기능

## 🚀 배포 링크
[OpenMind 바로가기](https://openmind-kimgayeongs-projects.vercel.app/)

## 🎨 디자인 & 문서
- [Figma 디자인](https://www.figma.com/design/sy1OrnQQF3y7E78ioeGsaM/OPENMIND?node-id=0-1&p=f&t=AF6lCOdT1lmZIgxd-0)  
- [Swagger API 문서](https://openmind-api.vercel.app/docs/)  
- [프로젝트 컨벤션](https://chivalrous-barberry-9bb.notion.site/OpenMind-254a83bcc886808b878ef679236ee7c5?source=copy_link)
