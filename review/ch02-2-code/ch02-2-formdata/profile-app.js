const myForm = document.getElementById('profile-form');
const resultDiv = document.getElementById('result');

myForm.addEventListener('submit', function(event){
    event.preventDefault(); // AJAX를 위해 폼 제출 시 새로고침 동작을 막음

    const formData = new FormData(myForm);

    const dataObj = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/profiles',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(dataObj),
    })
    .then(response => response.json())
    .then(data=>{
        console.log('성공: ', data);
        resultDiv.innerHTML=`
        <strong>서버에 등록 성공</strong>
        <p>
            ID: ${data.id} <br>
            Name: ${data.username} <br>
            Email: ${data.email} <br>
        </p>
        `;
        myForm.reset(); // 성공 후 폼 내용 초기화
    })
    .catch((error)=>{
        console.error('실패: ', error);
        resultDiv.innerHTML = `<p>오류 발생</p>`;
    })
})
