const http = require('http');
let users = require('./users');

const restServer = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`
            <h1>RESTful API server</h>
            <p>사용자 목록 CRUD 구현 실습</p>
            `);
        } else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(`
                <h1>RESTful API server</h>
                <p>사용자 목록 CRUD 구현 실습</p>
                `);      
        } else if (req.url === '/users') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            return res.end(JSON.stringify(users));
        } else{ // /도 /about도 /users도 아니면
            // 주소에 해당하는 라우트를 못 찾았다는 의미
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`${req.url} NOT FOUND`);
        }
    // Q. return이 있는 것과 없는 코드의 차이는?.. return은 왜 쓰는 거지?
    // 단순히, return이 있으면 코드는 여기까지 실행하겠다는 뜻
    // 없으면 다음 코드도 실행하겠다는 뜻
    } else if (req.method === 'POST') {
        if (req.url === '/user') {
            req.on('data', (data)=>{ // on 안에 'data'는 뭐지?
                console.log('POST 본문(Body):', data.toString());

                const {name} = JSON.parse(data);
                const newUser = {
                    id : Date.now().toString(),
                    name
                };
                users = [...users, newUser];

                res.writeHead(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                })
                return res.end(JSON.stringify(newUser));
            })
        } else{
            res.StatusCode = 404;
            return res.end(`${req.url} NOT FOUND`);
        }
    
    } else if (req.method === 'PUT') {
        if (req.url.startsWith('/user/')) { // 이건 무슨 코드지?
            const id = req.url.split('/')[2];

            req.on('data', (data) => {
                console.log('PUT 본문(Body): ', data.toString());
                let updateUser;

                users = users.map((user)=>{
                    if(user.id === id){
                        updateUser = {...user, name: JSON.parse(data).name}; // 갱신
                        return updateUser; 
                    } else{
                        return user; // 바뀐 거 없이 그대로
                    }
                })
            });
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify(updateUser));
        } else{
            res.statusCode = 404;
            return res.end(`${req.url} NOT FOUND`);
        }
    } else if (req.method === 'DELETE') {
        if (req.url.startsWith('/user/')) {
            const id = req.url.split('/')[2];
            
            users = users.filter((user)=>{
                return user.id !== id;
            })

            res.writeHead(204, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('deleted OK');
        } else{
            res.statusCode = 404;
            return res.end(`${req.url} NOT FOND`);
        }   
    } else {
        console.error(err);
        res.statusCode = 400;
        return res.end('BAD REQUEST');
    }
});
    
restServer.listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
});
