const sendButton = document.getElementById('send-data-btn');
const resultDiv = document.getElementById('posts-result');

sendButton.addEventListener('click', ()=>{
    const postData = new FormData();
    postData.append('userId', '12345');
    postData.append('posts', 'FormData is good');
    postData.append('comment', 'Great post');
    postData.append('tags', 'JS');
    postData.append('tags', 'Frontend');
    postData.append('tags', 'WebDev');

    // 1. form data 내용 확인: for문
    console.log('1. postData 내용 확인: for문');
    for(const [key, value] of postData.entries()){
        console.log(`${key}:`, value);
    }

    // 2. form data 내용 확인: get(All), has
    console.log('2. postData 내용 확인: get(All), has');
    console.log('userId: ', postData.get('userID'));
    console.log('tags: ', postData.getAll('tags'));
    console.log('comment? ', postData.has('comment'));
    console.log('posts: ', postData.get('posts'));

    // 3. form data 삭제, 수정: delete, set
    console.log('3. postData 삭제, 수정: delete, set');
    postData.delete('comment');
    console.log('comment? ', postData.has('comment'));
    postData.set('posts', 'edited posts!')
    console.log('posts: ', postData.get('posts'));

    // 4. form data를 다중 값을 지원하는 객체로 변환
    console.log('form data를 다중 값을 지원하는 객체로 변환:')
    const dataObj = {};
    for(const key of new Set(postData.keys())){
        const values = postData.getAll(key);

        dataObj[key] = values.length > 1 ? values : values[0];
    }
    console.log('변환된 객체: ', dataObj);

    fetch('http://localhost:3000/posts',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response=>response.json())
    .then(data=>{
        resultDiv.innerHTML = `
            <p>
            서버에 아래 데이터가 저장됐습니다.
            </p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `
    })
    .catch(error=>{
        resultDiv.innerHTML = `
            <p>
            오류가 발생했습니다.
            </p>
        `
    })
})
