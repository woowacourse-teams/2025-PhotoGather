# 어드민 백오피스 페이지 배포 가이드

## 목차
- [개요](#개요)
- [현재 구현 구조](#현재-구현-구조)
- [배포 아키텍처 시나리오](#배포-아키텍처-시나리오)
  - [시나리오 A: 단일 도메인 배포 (권장)](#시나리오-a-단일-도메인-배포-권장)
  - [시나리오 B: 별도 도메인 배포](#시나리오-b-별도-도메인-배포)
- [환경별 설정](#환경별-설정)
- [CORS 설정 가이드](#cors-설정-가이드)
- [트러블슈팅](#트러블슈팅)

---

## 개요

ForGather 프로젝트의 백오피스 어드민 페이지는 Thymeleaf를 사용한 서버 사이드 렌더링(SSR) 방식으로 구현되어 있습니다.

### 주요 엔드포인트
- `/admin/login` - 어드민 로그인 페이지
- `/admin/spaces` - Space 목록 관리 페이지
- `/api/back-office/*` - 어드민 REST API

### 기술 스택
- **템플릿 엔진**: Thymeleaf
- **인증 방식**: JWT (localStorage 저장)
- **API 통신**: Fetch API

---

## 현재 구현 구조

### API 호출 방식
어드민 페이지의 JavaScript는 **상대 경로**를 사용하여 API를 호출합니다.

**파일**: `src/main/resources/static/js/admin/api.js`

```javascript
const API = {
    BASE_URL: '/api/back-office',

    async get(endpoint, params = {}, includeAuth = true) {
        // window.location.origin을 기준으로 절대 URL 생성
        const url = new URL(this.BASE_URL + endpoint, window.location.origin);
        // ...
    }
}
```

### 동작 방식
- HTML이 `https://api.forgather.app/admin/login`에서 로드되면
- API 호출은 `https://api.forgather.app/api/back-office/login`으로 전송됨
- `window.location.origin` = 현재 페이지가 로드된 도메인

---

## 배포 아키텍처 시나리오

### 시나리오 A: 단일 도메인 배포 (권장)

**구조:**
```
api.forgather.app (Spring Boot 백엔드 서버)
├── /admin/login          → Thymeleaf 어드민 페이지 (SSR)
├── /admin/spaces         → Thymeleaf 어드민 페이지 (SSR)
├── /api/back-office/*    → 어드민 REST API
└── /api/*                → 일반 사용자 REST API

forgather.app (프론트엔드 사용자 앱)
└── React/Vue/Next.js 등으로 구현된 일반 사용자 앱
```

#### 장점
- ✅ **CORS 설정 불필요** (Same-Origin 요청)
- ✅ 간단한 배포 구조
- ✅ 현재 코드 수정 없이 즉시 사용 가능
- ✅ 인증 토큰 관리 간편 (쿠키 사용 시 도메인 이슈 없음)
- ✅ SSL 인증서 하나만 필요

#### 설정 방법
**추가 작업 없음!** 현재 코드를 그대로 배포하면 됩니다.

#### 운영 환경 설정 확인
`src/main/resources/application-prod.yml`:
```yaml
cors:
  allowed-origins:
    - "https://forgather.app"      # 사용자 앱에서의 API 호출 허용
    - "https://api.forgather.app"  # 자기 자신 (옵션)
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
    - PATCH
    - OPTIONS
  allowed-headers:
    - Authorization
    - Content-Type
    - X-Requested-With
    - Trace-Id
  allow-credentials: false
  max-age: 3600

api:
  base-url: https://api.forgather.app
```

---

### 시나리오 B: 별도 도메인 배포

**구조:**
```
admin.forgather.app (정적 파일 서버 - Nginx 등)
└── /admin/*              → Thymeleaf HTML, CSS, JS 파일 서빙

api.forgather.app (Spring Boot 백엔드 서버)
├── /api/back-office/*    → 어드민 REST API
└── /api/*                → 일반 사용자 REST API
```

#### 장점
- ✅ 어드민 페이지와 API 서버 독립적 배포 가능
- ✅ CDN을 통한 정적 파일 캐싱 최적화
- ✅ 서브도메인으로 권한 분리

#### 단점
- ❌ CORS 설정 필수
- ❌ 코드 수정 필요
- ❌ 추가 인프라 비용 (도메인, SSL 인증서 등)
- ❌ 배포 복잡도 증가

#### 설정 방법

##### 1. JavaScript 코드 수정

**파일**: `src/main/resources/static/js/admin/api.js`

**방법 1: Thymeleaf로 서버 설정 주입 (권장)**

먼저 `base.html`에 서버 설정 추가:
```html
<!-- src/main/resources/templates/admin/layout/base.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <!-- ... 기존 코드 ... -->

    <!-- API Base URL 주입 -->
    <script th:inline="javascript">
        // 환경별 API Base URL 설정
        window.API_CONFIG = {
            BASE_URL: /*[[${@environment.getProperty('api.base-url')}]]*/ 'http://localhost:8080'
        };
    </script>
</head>
<!-- ... -->
```

그리고 `api.js` 수정:
```javascript
const API = {
    // 환경 변수 또는 기본값 사용
    BASE_URL: (window.API_CONFIG?.BASE_URL || window.location.origin) + '/api/back-office',

    async get(endpoint, params = {}, includeAuth = true) {
        // BASE_URL이 이미 절대 경로이므로 endpoint만 추가
        const url = new URL(endpoint, this.BASE_URL);

        // 쿼리 파라미터 추가
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        });

        return this.request(url.toString(), {
            method: this.METHOD.GET,
            headers: this.getHeaders(includeAuth)
        });
    },

    async post(endpoint, data = {}, includeAuth = true) {
        // BASE_URL이 이미 절대 경로이므로 그대로 사용
        const url = this.BASE_URL + endpoint;

        return this.request(url, {
            method: this.METHOD.POST,
            headers: this.getHeaders(includeAuth),
            body: JSON.stringify(data)
        });
    },
    // ... 나머지 메서드도 동일하게 수정
}
```

**방법 2: 환경 변수로 분기 처리**

```javascript
const API = {
    // 환경별 BASE_URL 설정
    BASE_URL: (() => {
        const hostname = window.location.hostname;

        // 로컬 개발 환경
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8080/api/back-office';
        }

        // 운영 환경
        if (hostname === 'admin.forgather.app') {
            return 'https://api.forgather.app/api/back-office';
        }

        // 개발 환경
        if (hostname === 'admin.dev.forgather.app') {
            return 'https://api.dev.forgather.app/api/back-office';
        }

        // 기본값 (상대 경로)
        return '/api/back-office';
    })(),

    async get(endpoint, params = {}, includeAuth = true) {
        // BASE_URL이 이미 절대 경로인 경우 처리
        const url = this.BASE_URL.startsWith('http')
            ? new URL(endpoint, this.BASE_URL)
            : new URL(this.BASE_URL + endpoint, window.location.origin);

        // 쿼리 파라미터 추가
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        });

        return this.request(url.toString(), {
            method: this.METHOD.GET,
            headers: this.getHeaders(includeAuth)
        });
    },
    // ... 나머지 메서드도 동일하게 수정
}
```

##### 2. CORS 설정 수정

**파일**: `src/main/resources/application-prod.yml`

```yaml
cors:
  allowed-origins:
    - "https://forgather.app"            # 사용자 앱
    - "https://admin.forgather.app"      # 어드민 앱 (추가!)
    - "https://api.forgather.app"        # API 서버 자체
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
    - PATCH
    - OPTIONS
  allowed-headers:
    - Authorization
    - Content-Type
    - X-Requested-With
    - Trace-Id
  allow-credentials: true   # ⚠️ 중요: JWT 인증 사용 시 true로 변경
  max-age: 3600

api:
  base-url: https://api.forgather.app
```

**⚠️ 주의사항:**
- `allow-credentials: true`로 설정하면 `allowed-origins`에 `*` (와일드카드) 사용 불가
- 반드시 명시적으로 도메인을 나열해야 함

##### 3. Nginx 설정 (정적 파일 서버)

`admin.forgather.app`을 위한 Nginx 설정 예시:

```nginx
server {
    listen 80;
    server_name admin.forgather.app;

    # HTTPS로 리다이렉트
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name admin.forgather.app;

    # SSL 인증서
    ssl_certificate /etc/letsencrypt/live/admin.forgather.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.forgather.app/privkey.pem;

    # 정적 파일 경로
    root /var/www/admin-forgather;
    index index.html;

    # Thymeleaf HTML 파일
    location /admin/ {
        try_files $uri $uri/ =404;
    }

    # 정적 리소스 캐싱
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 로그
    access_log /var/log/nginx/admin-forgather-access.log;
    error_log /var/log/nginx/admin-forgather-error.log;
}
```

---

## 환경별 설정

### 로컬 개발 환경

**파일**: `src/main/resources/application.yml` (또는 `application-local.yml`)

```yaml
spring:
  profiles:
    active: local

cors:
  allowed-origins:
    - "*"  # 로컬에서는 모든 origin 허용
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
    - PATCH
    - OPTIONS
  allowed-headers:
    - Authorization
    - Content-Type
    - X-Requested-With
    - Trace-Id
  allow-credentials: false
  max-age: 3600

api:
  base-url: http://localhost:8080
```

**접근 URL:**
- 어드민 로그인: `http://localhost:8080/admin/login`
- Space 관리: `http://localhost:8080/admin/spaces`

---

### 개발 서버 환경

**파일**: `src/main/resources/application-dev.yml`

```yaml
spring:
  profiles:
    active: dev

cors:
  allowed-origins:
    - "https://forgather.dev"
    - "https://api.dev.forgather.app"
    # 별도 도메인 사용 시 추가:
    # - "https://admin.dev.forgather.app"
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
    - PATCH
    - OPTIONS
  allowed-headers:
    - Authorization
    - Content-Type
    - X-Requested-With
    - Trace-Id
  allow-credentials: false
  max-age: 3600

api:
  base-url: https://api.dev.forgather.app
```

**접근 URL:**
- 어드민 로그인: `https://api.dev.forgather.app/admin/login`

---

### 운영 환경

**파일**: `src/main/resources/application-prod.yml`

```yaml
spring:
  profiles:
    active: prod

cors:
  allowed-origins:
    - "https://forgather.app"
    - "https://api.forgather.app"
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
    - PATCH
    - OPTIONS
  allowed-headers:
    - Authorization
    - Content-Type
    - X-Requested-with
    - Trace-Id
  allow-credentials: false
  max-age: 3600

api:
  base-url: https://api.forgather.app

logging:
  level:
    root: info
    com.forgather: info
```

**접근 URL:**
- 어드민 로그인: `https://api.forgather.app/admin/login`

---

## CORS 설정 가이드

### CORS란?

**Cross-Origin Resource Sharing (CORS)**는 웹 브라우저에서 다른 도메인의 리소스에 접근할 때 발생하는 보안 정책입니다.

### Same-Origin vs Cross-Origin

#### Same-Origin (CORS 불필요)
```
페이지: https://api.forgather.app/admin/login
API:    https://api.forgather.app/api/back-office/login
```
→ 프로토콜, 도메인, 포트가 모두 같으므로 **Same-Origin**

#### Cross-Origin (CORS 필수)
```
페이지: https://admin.forgather.app/admin/login
API:    https://api.forgather.app/api/back-office/login
```
→ 도메인이 다르므로 **Cross-Origin**

### CORS 설정 옵션 설명

```yaml
cors:
  # 허용할 Origin (도메인) 목록
  allowed-origins:
    - "https://forgather.app"

  # 허용할 HTTP 메서드
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
    - PATCH
    - OPTIONS      # Preflight 요청에 필요

  # 허용할 요청 헤더
  allowed-headers:
    - Authorization  # JWT 토큰
    - Content-Type   # JSON 요청
    - X-Requested-With
    - Trace-Id

  # 인증 정보(쿠키, Authorization 헤더) 포함 허용 여부
  # JWT를 Authorization 헤더로 보낼 때는 false도 가능
  # 쿠키를 사용한다면 true 필수
  allow-credentials: false

  # Preflight 요청 결과 캐시 시간 (초)
  max-age: 3600
```

### allow-credentials 설정 주의사항

#### false (기본값)
- 쿠키 전송 불가
- `Authorization` 헤더는 사용 가능 (JWT)
- `allowed-origins`에 `*` 사용 가능

#### true
- 쿠키 전송 가능
- `allowed-origins`에 `*` 사용 **불가**
- 명시적으로 도메인 나열 필수

**현재 구현:**
- JWT를 localStorage에 저장하고 `Authorization` 헤더로 전송
- 쿠키 사용하지 않음
- → `allow-credentials: false` 사용 가능

---

## 트러블슈팅

### 1. CORS 에러 발생

**증상:**
```
Access to fetch at 'https://api.forgather.app/api/back-office/spaces'
from origin 'https://admin.forgather.app' has been blocked by CORS policy
```

**원인:**
- Cross-Origin 요청인데 CORS 설정이 없거나 잘못됨

**해결:**
1. `application-prod.yml`에서 `allowed-origins`에 해당 도메인 추가
2. `allow-credentials` 설정 확인
3. 브라우저 콘솔에서 Preflight (OPTIONS) 요청 확인

**디버깅:**
```bash
# Preflight 요청 확인
curl -X OPTIONS https://api.forgather.app/api/back-office/spaces \
  -H "Origin: https://admin.forgather.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Authorization" \
  -v
```

응답 헤더에 다음이 포함되어야 함:
```
Access-Control-Allow-Origin: https://admin.forgather.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type, ...
```

---

### 2. API 호출 시 404 Not Found

**증상:**
```
GET https://admin.forgather.app/api/back-office/spaces 404 Not Found
```

**원인:**
- JavaScript가 잘못된 도메인으로 API 요청을 보냄
- `window.location.origin`을 사용하여 HTML이 로드된 도메인으로 요청

**해결:**
- `api.js`에서 `BASE_URL`을 절대 경로로 수정
- 위의 "시나리오 B - 1. JavaScript 코드 수정" 참고

---

### 3. 401 Unauthorized 후 무한 리다이렉트

**증상:**
- 로그인 페이지로 계속 리다이렉트됨

**원인:**
- 토큰 저장 실패
- 다른 도메인 간 localStorage 접근 불가

**해결:**
1. 브라우저 개발자 도구 → Application → Local Storage 확인
2. `accessToken`, `refreshToken`이 저장되어 있는지 확인
3. 도메인별로 localStorage가 분리되므로 올바른 도메인에 저장되는지 확인

---

### 4. CSS/JS 파일 로드 실패

**증상:**
```
GET https://api.forgather.app/css/admin/common.css 404 Not Found
```

**원인:**
- 정적 리소스 경로 문제

**해결:**
1. `application.yml`에서 `spring.web.resources.static-locations` 확인
2. `src/main/resources/static/` 경로에 파일이 있는지 확인
3. Thymeleaf 템플릿에서 경로 확인:
   ```html
   <!-- 절대 경로 사용 -->
   <link rel="stylesheet" th:href="@{/css/admin/common.css}">
   <script th:src="@{/js/admin/api.js}"></script>
   ```

---

### 5. Thymeleaf 템플릿 렌더링 오류

**증상:**
```
Error resolving template "admin/login"
```

**원인:**
- 템플릿 파일 경로 오류
- Thymeleaf 설정 문제

**해결:**
1. 템플릿 파일 위치 확인:
   ```
   src/main/resources/templates/admin/login.html
   ```

2. Controller 반환값 확인:
   ```java
   @GetMapping("/admin/login")
   public String loginPage() {
       return "admin/login";  // .html 확장자 생략
   }
   ```

3. `application.yml`에서 Thymeleaf 설정 확인:
   ```yaml
   spring:
     thymeleaf:
       prefix: classpath:/templates/
       suffix: .html
       cache: false  # 개발 시 false, 운영 시 true
   ```

---

## 배포 체크리스트

### 시나리오 A (단일 도메인) 배포 전 확인사항

- [ ] `application-prod.yml`에서 `api.base-url` 확인
- [ ] `cors.allowed-origins`에 사용자 앱 도메인 추가
- [ ] SSL 인증서 설정 완료
- [ ] Spring Boot 애플리케이션 빌드 및 배포
- [ ] `https://api.forgather.app/admin/login` 접속 테스트
- [ ] JWT 토큰 저장 및 API 호출 테스트
- [ ] 페이지네이션 동작 테스트

### 시나리오 B (별도 도메인) 배포 전 확인사항

- [ ] `api.js` 파일 수정 (BASE_URL 절대 경로로 변경)
- [ ] `application-prod.yml`에서 `cors.allowed-origins`에 어드민 도메인 추가
- [ ] `allow-credentials` 설정 확인
- [ ] Nginx 또는 정적 파일 서버 설정
- [ ] SSL 인증서 설정 완료 (admin.forgather.app)
- [ ] Thymeleaf HTML 파일 빌드 및 배포
- [ ] 정적 리소스 (CSS, JS) 파일 배포
- [ ] CORS Preflight 요청 테스트
- [ ] `https://admin.forgather.app/admin/login` 접속 테스트
- [ ] Cross-Origin API 호출 테스트
- [ ] 브라우저 콘솔에서 CORS 에러 없는지 확인

---

## 참고 문서

### 관련 파일 경로
- Controller: `src/main/java/com/forgather/back_office/controller/AdminViewController.java`
- Templates: `src/main/resources/templates/admin/`
- Static Resources: `src/main/resources/static/css/admin/`, `static/js/admin/`
- CORS Config: `src/main/java/com/forgather/global/config/WebConfig.java`
- Environment Config: `src/main/resources/application-*.yml`

### 외부 링크
- [Spring CORS Documentation](https://docs.spring.io/spring-framework/reference/web/webmvc-cors.html)
- [MDN CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [Thymeleaf Documentation](https://www.thymeleaf.org/documentation.html)

---

**작성일**: 2025-10-30
**최종 수정일**: 2025-10-30
**작성자**: Claude Code
