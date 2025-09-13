# http 모듈로 서버 만들기

```jsx
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>'); // 버퍼를 보낼 수도 있음
  res.end('<p>Hello Server!</p>'); // 응답을 종료하는 메서드
});
server.listen(8080);

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기 중입니다!');
});
server.on('error', (error) => { // 에러 이벤트 리스너
  console.error(error);
});
```

- http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있음. → 따라서, http 모듈을 사용함!
- http 모듈에는 createServer 메서드가 있음.
    - createServer에는 요청에 대한 콜백함수를 넣을 수 있으며
    - 요청이 들어올 때마다 매번 콜백 함수가 실행된다.
    - 즉, createServer에 인자로 응답을 생성하는 콜백함수를 적어 넣으면 된다.
- `server.listen(port)`: 서버를 **특정 포트에서 실행**하도록 함.
- `server.on()`: **특정 이벤트가 발생했을 때 실행될 콜백(리스너)을 등록**하는 메서드
- **`listening`**
    - 서버가 `listen()`을 호출하고 **정상적으로 포트에서 대기 상태**가 되면 발생하는 이벤트
- **`error`**
    - 서버가 동작하는 도중 **문제가 발생**했을 때 발생하는 이벤트
    - 예: 포트가 이미 사용 중일 때, 권한 문제, 네트워크 오류 등

---

## 포트

- 포트는 서버 내에서 프로세스를 구분하는 번호이다.
    - 서버는 프로세스에 포트를 다르게 할당하여 들어오는 요청을 구분한다.
    - [http://beour.store](http://beour.store/) 같은 사이트들은 포트 번호를 따로 표시하지 않는다. 왜냐하면 80번 포트를 사용하기때문이다. 80번 포트는 주소에서 포트를 생략할 수 있다.
    - https의 경우에는 443번 포트를 생략할 수 있다.
    - 따라서, http://beour.store:80으로 요청해도 beour 홈페이지에 접속할 수 있다.

```jsx
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8080, () => { // 8080 포트의 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8081, () => { // 8081 포트의 서버 연결
    console.log('8081번 포트에서 서버 대기 중입니다!');
  });
```

- 위의 코드처럼 여러 개의 포트를 연결할 수도 있다.

---

- 앞서 본 코드들처럼 일일이 res.write와 res.end에 일일이 HTML을 적는 것은 비효율적 → HTML파일을 미리 만든 후 fs모듈로 읽어 전송

```html
server2.html

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Node.js 웹 서버</title>
</head>
<body>
    <h1>Node.js 웹 서버</h1>
    <p>만들 준비되셨나요?</p>
</body>
</html>
```

```jsx
const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./server2.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
  });
```

- TODO: fs 모듈 공부


