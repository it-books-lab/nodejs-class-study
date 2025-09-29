
---

<img width="1764" height="1078" alt="image" src="https://github.com/user-attachments/assets/dcca2267-0ef9-40be-b8ad-077935a02532" />

- 검색했을 때, url에 어떤 입력으로 요청했는지도 보임.

---

- url.js
```jsx
const url = require('url');

const { URL } = url;
const myURL = new URL('https://www.yes24.com/product/search?domain=ALL&query=hello%2520world');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
```

<img width="1499" height="540" alt="image" src="https://github.com/user-attachments/assets/18d2ccef-8fcd-4e53-a032-2819f3948c3b" />

### 실행결과 해석

```jsx
URL {
  href: 'https://www.yes24.com/product/search?domain=ALL&query=hello%2520world',
  origin: 'https://www.yes24.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.yes24.com',
  hostname: 'www.yes24.com',
  port: '',
  pathname: '/product/search',
  search: '?domain=ALL&query=hello%2520world',
  searchParams: URLSearchParams { 'domain' => 'ALL', 'query' => 'hello%20world' },
  hash: ''
}

```

### 1. `href`

- 전체 URL 문자열 그대로.
- `'https://www.yes24.com/product/search?domain=ALL&query=hello%2520world'`

### 2. `origin`

- **프로토콜 + 호스트** 부분만.
- `'https://www.yes24.com'`

### 3. `protocol`

- 사용된 프로토콜.
- `'https:'`

### 4. `username`, `password`

- URL에 계정 정보가 포함된 경우 나타남. (예: `https://user:pass@host`)
- 여기서는 비어 있음.

### 5. `host`

- 호스트명 + 포트 (포트가 없으면 생략됨).
- `'www.yes24.com'`

### 6. `hostname`

- 호스트명만 (포트 제외).
- `'www.yes24.com'`

### 7. `port`

- 포트 번호.
- https 기본 포트(443)를 따로 쓰지 않았으므로 빈 문자열 `''`.

### 8. `pathname`

- 경로(path) 부분.
- `'/product/search'`

### 9. `search`

- `?`부터 시작하는 쿼리스트링 전체.
- `'?domain=ALL&query=hello%2520world'`

### 10. `searchParams`

- `search`를 객체 형태로 파싱한 것.
- `domain=ALL`
- `query=hello%20world` ← **여기 주목!**
    - 원래 URL에는 `hello%2520world`가 들어있음.
    - `%25`는 `%` 문자의 인코딩이므로, `%2520` → `%20` → 공백( ``).
    - 따라서 `URLSearchParams`는 자동으로 디코딩해서 `"hello world"`로 보여줌.

### 11. `hash`

- `#` 이후의 fragment (앵커).
- 여기서는 없음 → `''`.

---

### 핵심 포인트

- `new URL()`은 문자열을 단순히 보관하는 게 아니라, URL을 **구조적으로 해석해서 속성 단위로 접근**할 수 있게 해줌.
- `searchParams`는 쿼리스트링을 자동으로 파싱 & 디코딩해줌 → 그래서 `hello%2520world` → `"hello world"`가 된 거예요.

---


- SearchParams
```jsx
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
console.log('searchParams.get():', myURL.searchParams.get('limit'));
console.log('searchParams.has():', myURL.searchParams.has('page'));

console.log('searchParams.keys():', myURL.searchParams.keys());
console.log('searchParams.values():', myURL.searchParams.values());

myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
```


<img width="1608" height="505" alt="image" src="https://github.com/user-attachments/assets/a419148c-2886-40ec-9ed3-39610c39dc78" />

---


(예시 코드 추후에 추가하기)

- 비동기에서는 매번 출력 순서가 달라짐
    - 실행 시간이 덜 걸림
- Promise 방식 사용 시 순서가 유지됨
    - 실행 시간이 좀 더 걸림
- readFileSync 사용 시 (백그라운드에 보내지 않으면서) 순서가 유지됨
+시간 차이가 Promise 방식과 거의 안 남

→ 이 중에서 nodejs는 비동기 사용을 권장함
서버는 한 고객만 응답하는 것이 아니라 여러 고객을 동시에 응답해야 함
→ 따라서, 백그라운드에 보내서 여러 프로세스가 서로 역할을 분담하여 처리하게 하는 것이 더 좋음



