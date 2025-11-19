# 자동 토큰 갱신 구현 가이드

## 개요

Forgather Admin 백오피스에 Refresh Token을 사용한 자동 Access Token 갱신 기능이 추가되었습니다. API 요청 시 401 Unauthorized 에러(Access Token 만료)가 발생하면 시스템이 자동으로:

1. Refresh Token API를 호출하여 새로운 Access Token 발급
2. localStorage의 Access Token 업데이트
3. 원래 API 요청을 새 토큰으로 자동 재시도
4. **모든 과정이 사용자 개입 없이 투명하게 처리됨**

## 아키텍처

### 파일 구조

```
backend/forgather/src/main/resources/static/js/admin/
├── auth.js          # Auth 객체 - 토큰 관리 및 refreshToken() 메서드
├── api.js           # API 래퍼 - 401 인터셉터 및 자동 재시도 로직
├── login.js         # 로그인 페이지 로직
└── spaces.js        # 스페이스 관리 페이지 (자동 갱신 사용)
```

### 컴포넌트 책임

#### 1. `auth.js` - 토큰 관리
- **저장**: localStorage에 Access Token과 Refresh Token 관리
- **검증**: JWT payload를 사용해 토큰 만료 확인
- **갱신**: `Auth.refreshToken()` 메서드로 `/api/admin/refresh` 엔드포인트 호출
- **보안**: 무한 루프 방지를 위해 직접 `fetch` 사용

#### 2. `api.js` - 401 인터셉터를 포함한 API 래퍼
- **자동 헤더**: 모든 인증 요청에 `Authorization: Bearer {token}` 자동 추가
- **401 감지**: 401 에러를 가로채서 토큰 갱신 트리거
- **동시성 제어**: `tokenRefreshPromise` 캐시로 중복 갱신 요청 방지
- **재시도 로직**: 토큰 갱신 성공 후 원래 요청 자동 재시도

#### 3. 비즈니스 로직 파일들 (예: `spaces.js`)
- 단순히 `API.get()`, `API.post()` 등을 호출
- 토큰 갱신은 백그라운드에서 자동 처리
- 401 에러를 수동으로 처리할 필요 없음

## 핵심 구현 상세

### 1. 무한 루프 방지

**문제**: `Auth.refreshToken()`이 `API.request()`를 사용하면, refresh API가 401을 반환할 때 무한 루프 발생.

**해결책**: `Auth.refreshToken()`은 `API.request()` 대신 직접 `fetch` 사용.

```javascript
// auth.js - Auth.refreshToken()
const response = await fetch('/api/admin/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
});
```

### 2. 동시성 제어

**문제**: Access Token이 만료되면 여러 동시 API 요청이 모두 401 에러를 받게 되어 여러 refresh token 요청이 발생할 수 있음.

**해결책**: 첫 번째 `Auth.refreshToken()` Promise를 캐시하고 이후 401 에러는 재사용.

```javascript
// api.js - tokenRefreshPromise 캐시
let tokenRefreshPromise = null;

// API.request() 내부:
if (!tokenRefreshPromise) {
    tokenRefreshPromise = Auth.refreshToken();
}
const newAccessToken = await tokenRefreshPromise;
tokenRefreshPromise = null; // 완료 후 초기화
```

**시나리오**:
```
시간  요청 A          요청 B          요청 C
0ms   GET /spaces     GET /detail     GET /stats
100ms → 401           → 401           → 401
101ms 갱신 시작       A 대기          A 대기
200ms ✓ 갱신 완료     ✓ 갱신 완료     ✓ 갱신 완료
201ms A 재시도        B 재시도        C 재시도
300ms ✓ 200 OK        ✓ 200 OK        ✓ 200 OK
```

3개의 요청이 실패해도 refresh token API 호출은 **단 1회**만 발생.

### 3. 재시도 플로우

**플로우**:
```
API.request(url, options)
    ↓
fetch(url, options)
    ↓
401 Unauthorized?
    ↓ YES
    Auth.refreshToken()
        ↓
    새 Access Token 발급
        ↓
    Authorization 헤더 업데이트
        ↓
    API.request(url, options, isRetry=true)
        ↓
    fetch(url, options)
        ↓
    또 401?
        ↓ YES → 재시도 중지, 로그인 페이지로 리다이렉트
        ↓ NO  → 응답 반환
```

**재시도 제한**: 무한 루프 방지를 위해 최대 1회만 재시도.

### 4. 에러 처리

| 시나리오 | Auth.refreshToken() | API.request() | 사용자 경험 |
|----------|---------------------|---------------|------------|
| Access Token 만료 | N/A | 401 감지, 갱신 호출, 재시도 | 끊김 없이 자연스러움 |
| Refresh Token 만료 | 401/404 반환, 로그인 페이지로 이동 | 에러 발생 | 로그인 페이지로 리다이렉트 |
| 네트워크 에러 | 에러 발생 | 에러 발생 | 에러 메시지 표시 |
| 서버 에러 (500) | 에러 발생 | 에러 발생 | 에러 메시지 표시 |

## API 명세

### Refresh Token 엔드포인트

**엔드포인트**: `POST /api/admin/refresh`

**요청**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**성공 응답 (200)**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."  // Optional: 새 refresh token
}
```

**에러 응답**:
- `401 Unauthorized`: Refresh Token 만료 또는 유효하지 않음
- `404 Not Found`: Admin user를 찾을 수 없음
- `500 Internal Server Error`: 서버 에러

## 사용 예시

### Before (수동 토큰 처리)

```javascript
// spaces.js - 기존 방식 (수동 에러 처리)
async function fetchSpaces(page, size) {
    const accessToken = Auth.getAccessToken();

    try {
        const response = await fetch(`/api/admin/spaces?page=${page}&size=${size}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (response.status === 401) {
            // 수동 토큰 갱신
            await Auth.refreshToken();
            // 수동 재시도
            return fetchSpaces(page, size);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed:', error);
    }
}
```

### After (자동 토큰 갱신)

```javascript
// spaces.js - 새로운 방식 (자동 처리)
async function loadSpaces() {
    try {
        const response = await API.getSpaces(currentPage, currentPageSize);
        renderSpacesTable(response.spaces);
    } catch (error) {
        showError(error.message);
    }
}
```

**장점**:
- 수동 401 처리 불필요
- 수동 재시도 로직 불필요
- 토큰 갱신이 백그라운드에서 자동 처리
- 더 깔끔하고 유지보수하기 쉬운 코드

## 테스트 가이드

### 1. 기본 토큰 갱신 테스트

1. 어드민 패널에 로그인
2. 브라우저 DevTools → Application → Local Storage 열기
3. Access Token을 수동으로 만료시키기:
   - Access Token 값 복사
   - https://jwt.io 에서 디코딩
   - `exp` 필드를 과거 시간으로 수정
   - 다시 인코딩하여 localStorage에 저장
4. Spaces 페이지로 이동하거나 아무 API 액션 수행
5. **예상 결과**: 로그인 페이지로 리다이렉트되지 않고 정상적으로 페이지 로드

**검증용 콘솔 로그**:
```
[API] 401 Unauthorized 감지: /api/admin/spaces
[API] Access Token 갱신 시도...
[Auth] Access Token 갱신 시도 중...
[Auth] Access Token이 성공적으로 갱신되었습니다.
[API] Access Token 갱신 완료. 원래 요청 재시도: /api/admin/spaces
```

### 2. 동시 요청 테스트

1. 어드민 패널에 로그인
2. Access Token 만료시키기 (위와 동일)
3. Spaces 페이지 새로고침 (여러 API 호출 트리거)
4. **예상 결과**: Network 탭에서 refresh token API 호출이 **단 1회**만 발생

**Network 탭 검증**:
```
POST /api/admin/refresh  ← 단 1회만 요청
GET /api/admin/spaces (401) → 재시도 → 200
GET /api/admin/spaces/{code} (401) → 재시도 → 200
```

### 3. Refresh Token 만료 테스트

1. 어드민 패널에 로그인
2. localStorage에서 두 토큰 모두(Access + Refresh) 만료시키기
3. 아무 API 액션 수행
4. **예상 결과**: 로그인 페이지로 리다이렉트

**콘솔 로그**:
```
[API] 401 Unauthorized 감지: /api/admin/spaces
[API] Access Token 갱신 시도...
[Auth] Access Token 갱신 시도 중...
[Auth] Refresh Token이 만료되었습니다. 재로그인이 필요합니다.
[API] Token 갱신 실패: Refresh token expired
```

### 4. 무한 루프 방지 테스트

**시나리오**: Refresh token API가 401을 반환 (무한 재시도하면 안 됨)

1. Refresh API를 401 반환하도록 모킹
2. Access Token 만료시키기
3. 아무 API 액션 수행
4. **예상 결과**: 1회 갱신 시도 후 로그인 페이지로 리다이렉트 (무한 재시도 없음)

## 보안 고려사항

### 1. 토큰 저장
- 토큰은 `localStorage`에 저장 (지속성을 위해 `sessionStorage` 미사용)
- 키: `admin_access_token`, `admin_refresh_token`
- **위험**: XSS 공격으로 토큰 탈취 가능
- **완화**: 모든 사용자 입력 검증 및 이스케이프 처리

### 2. 토큰 로깅
- **실제 토큰 값을 절대 로그에 출력하지 않음** (보안 위험)
- 로그는 작업 상태만 표시: "Token 갱신 시도", "Token 갱신 완료"

### 3. HTTPS
- 모든 토큰 전송은 반드시 HTTPS 사용
- HTTP 요청의 토큰은 중간자 공격에 취약

### 4. 토큰 만료
- Access Token: 짧은 수명 (예: 15분)
- Refresh Token: 긴 수명 (예: 7일)
- 강화된 보안을 위해 Refresh Token 로테이션 권장

## 디버깅 팁

### 자주 발생하는 문제

#### 1. 무한 리다이렉트 루프
**증상**: 페이지가 계속 로그인 페이지로 리다이렉트됨

**가능한 원인**:
- 백엔드에 Refresh Token API가 구현되지 않음
- Refresh Token API 엔드포인트가 잘못됨 (`/api/admin/refresh`여야 함)
- Refresh Token이 localStorage에 저장되지 않음

**디버그**:
```javascript
// 콘솔에서 토큰 확인
console.log('Access Token:', Auth.getAccessToken());
console.log('Refresh Token:', Auth.getRefreshToken());
```

#### 2. 여러 번의 Refresh 요청
**증상**: Network 탭에 `/api/admin/refresh` 호출이 여러 번 나타남

**가능한 원인**:
- `tokenRefreshPromise` 캐시가 작동하지 않음
- 여러 401 에러가 같은 Promise를 공유하지 않음

**디버그**:
```javascript
// api.js에 로깅 추가
console.log('tokenRefreshPromise 존재?', !!tokenRefreshPromise);
```

#### 3. 재시도 후에도 401 발생
**증상**: 토큰 갱신 후에도 요청이 401로 실패

**가능한 원인**:
- Authorization 헤더가 새 토큰으로 업데이트되지 않음
- 백엔드가 새 Access Token을 인식하지 못함

**디버그**:
```javascript
// 재시도 시 헤더 확인
console.log('재시도 헤더:', options.headers);
```

## 마이그레이션 체크리스트

다른 API 호출에 이 기능을 추가해야 한다면:

- [ ] `auth.js`가 `api.js`보다 먼저 로드되는지 확인
- [ ] `api.js`가 비즈니스 로직 파일보다 먼저 로드되는지 확인
- [ ] 직접 `fetch` 호출을 `API.get()`, `API.post()` 등으로 교체
- [ ] 비즈니스 로직의 수동 401 처리 제거
- [ ] 만료된 토큰으로 테스트
- [ ] 동시 요청으로 테스트
- [ ] 디버깅을 위한 콘솔 로그 확인

## 코드 품질

### 이해해야 할 핵심 주석

1. **`auth.js:158-166`**: 왜 `Auth.refreshToken()`이 직접 fetch를 사용하는지 (무한 루프 방지)
2. **`api.js:7-25`**: `tokenRefreshPromise`가 어떻게 중복 refresh 요청을 방지하는지
3. **`api.js:77-80`**: `isRetry` 플래그가 어떻게 무한 재시도를 방지하는지
4. **`api.js:109-119`**: 동시성 제어 로직

### 설계 원칙

1. **관심사 분리**: Auth 로직은 `auth.js`, API 로직은 `api.js`, 비즈니스 로직은 별도
2. **단일 책임**: 각 함수는 하나의 명확한 목적을 가짐
3. **방어적 프로그래밍**: 모든 에러 케이스를 명시적으로 처리
4. **사용자 경험**: 사용자 개입 없이 백그라운드에서 끊김 없는 토큰 갱신
5. **개발자 경험**: 간단한 API 사용법, 자동 에러 처리

## 향후 개선사항

1. **백그라운드 토큰 갱신**: Access Token이 만료되기 전에 미리 갱신 (사전 갱신)
2. **Refresh Token 로테이션**: Access Token 갱신 시마다 새 Refresh Token 발급
3. **토큰 만료 경고**: Refresh Token 만료 임박 시 경고 표시
4. **지수 백오프 재시도**: 네트워크 에러 시
5. **요청 큐**: 토큰 갱신 중 API 요청을 대기하는 대신 큐에 저장

## 결론

자동 토큰 갱신 기능은 어드민 사용자에게 끊김 없는 인증 경험을 제공합니다. 백엔드 개발자는 이제 401 에러 처리를 걱정하지 않고 새 API 호출을 추가할 수 있습니다. API 래퍼가 자동으로 처리하기 때문입니다.

궁금한 점이나 문제가 있으면 `auth.js`와 `api.js`의 상세 주석을 참고하세요.
