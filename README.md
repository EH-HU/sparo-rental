# 토탈스테이션 장비 대여 사이트

무료로 운영 가능한 토탈스테이션 장비 대여 신청 웹사이트입니다.

## 📁 파일 구성

- `index.html` - 메인 페이지
- `styles.css` - 디자인 스타일시트
- `script.js` - 인터랙티브 기능

## 🚀 사용 방법

### 1. 로컬에서 테스트
- `index.html` 파일을 웹브라우저로 열기
- 모든 기능 확인

### 2. 무료 호스팅 배포

#### GitHub Pages (추천)
1. GitHub 계정 생성 (github.com)
2. 새 저장소 생성
3. 파일 업로드 (index.html, styles.css, script.js)
4. Settings → Pages → Source를 'main' 브랜치로 설정
5. 몇 분 후 `https://사용자명.github.io/저장소명` 접속

#### Netlify
1. netlify.com 가입
2. "New site from Git" 또는 드래그&드롭으로 파일 업로드
3. 자동으로 URL 생성

## 📧 Google Forms 연동 (무료 신청 접수)

### Google Forms 생성

1. **Google Forms 접속**
   - forms.google.com
   - "새 양식" 클릭

2. **양식 필드 추가** (아래 순서대로)
   - 장비 선택 (드롭다운)
     - Trimble SX12 - 스캐닝 토탈 스테이션
     - Trimble S9/S9HP - 정밀 토탈 스테이션
     - Trimble S7 - 통합형 토탈 스테이션
     - Trimble S5 - 자동형 토탈 스테이션
     - Trimble C5/C3 - 오토 포커스
     - Trimble DiNi - 디지털 레벨
   - 신청자명 (단답형, 필수)
   - 회사/소속 (단답형)
   - 연락처 (단답형, 필수)
   - 이메일 (단답형, 필수)
   - 대여 시작일 (날짜, 필수)
   - 대여 종료일 (날짜, 필수)
   - 사용 목적 (장문형)
   - 기타 요청사항 (장문형)

3. **응답 시트 연결**
   - "응답" 탭 → 스프레드시트 아이콘 클릭
   - 자동으로 Google Sheets 생성

4. **이메일 알림 설정**
   - Google Sheets 열기
   - 도구 → 알림 규칙
   - "사용자가 양식을 제출할 때" 선택
   - 이메일로 알림 받기

### 웹사이트 연동

#### 방법 1: 간단한 방법 (iframe 임베드)
`index.html`의 `<form>` 부분을 Google Forms iframe으로 교체:

```html
<div class="form-container">
    <h3>대여 신청서</h3>
    <iframe src="YOUR_GOOGLE_FORMS_EMBED_URL" width="100%" height="1200" frameborder="0" marginheight="0" marginwidth="0">로드 중...</iframe>
</div>
```

#### 방법 2: 직접 제출 (권장)
`script.js` 파일 수정:

```javascript
// 24번째 줄의 주석 처리된 URL을 실제 Google Forms URL로 교체
const googleFormsURL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

// 실제 제출 코드로 변경 (43-52번째 줄 교체)
fetch(googleFormsURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        'entry.XXXXXX': data.equipment,  // Google Forms의 entry ID로 교체
        'entry.XXXXXX': data.name,
        'entry.XXXXXX': data.company,
        'entry.XXXXXX': data.phone,
        'entry.XXXXXX': data.email,
        'entry.XXXXXX': data.startDate,
        'entry.XXXXXX': data.endDate,
        'entry.XXXXXX': data.purpose,
        'entry.XXXXXX': data.message,
    })
})
.then(() => {
    showMessage('신청이 완료되었습니다! 담당자가 곧 연락드리겠습니다.', 'success');
    this.reset();
})
.catch(() => {
    showMessage('제출 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
});
```

#### Entry ID 찾는 방법
1. Google Forms 편집 페이지에서 우클릭 → "검사"
2. Network 탭 열기
3. 양식 테스트 제출
4. formResponse 요청 확인
5. Payload에서 `entry.XXXXXX` 번호 복사

## ✏️ 커스터마이징

### 회사 정보 수정
`index.html` 파일에서:
- 43번째 줄: 전화번호
- 44번째 줄: 이메일
- 177번째 줄: 주소, 연락처

### 색상 변경
`styles.css` 파일에서:
- 파란색 계열: `#1e3c72`, `#2a5298`을 원하는 색상으로 교체

### 장비 이미지 추가
실제 장비 사진을 준비 후:
1. `images` 폴더 생성
2. 이미지 파일 저장 (예: sx12.jpg)
3. `index.html`에서 `https://via.placeholder.com/...` 부분을
   `images/sx12.jpg`로 교체

## 📱 기능

- ✅ 반응형 디자인 (모바일/태블릿/PC)
- ✅ 장비 목록 카드형 레이아웃
- ✅ 대여 신청 폼
- ✅ 날짜 유효성 검사
- ✅ 부드러운 스크롤 효과
- ✅ Google Forms 연동 가능

## 💰 비용

**완전 무료!**
- GitHub Pages 또는 Netlify 무료 호스팅
- Google Forms 무료 사용
- 코딩 지식 최소화

## 📞 지원

문제가 있으면 언제든지 문의하세요!
