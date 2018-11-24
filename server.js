const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const users = {
  남건민 : [123, null, 0, 0],
  김유일 : [456, null, 0, 0],
  익명 : [0, null, 0, 0, 0]
}
var current_id = "익명"
/*
[0] : 패스워드
[1] : 저장한 소스
*/
app.use(express.static(__dirname + '/public/'))
app.use(express.static(__dirname + '/public/Home/'))


app.post('/', (request, response) => {
  console.log("현재 " + current_id + "님으로 접속 중입니다.")
  response.send(current_id)
})

/*
app.get('/save_code', (request, response) => {
  var id = Object.keys(request.query)[0];
  var code = request.query[id];

  users[id][1] = code;

  console.log("서버에 다음이 저장됨");
  console.log(request.query);
  response.send(true);
})
*/

app.post('/save_code', (request, response) => {
  var id = Object.keys(request.body)[0];
  var code = request.body[id];

  users[id][1] = code;

  console.log("서버에 다음이 저장됨");
  console.log(request.body);
  response.send(true);
})

app.post('/load_code', (request, response) => {
  var id = Object.keys(request.body)[0];
  console.log("클라이언트에서 " + id + "의 저장된 코드 요청");
  var code = users[id][1];
  if(code == null) {
    throw "저장된 코드가 없습니다.";
  }
  response.send(users[id][1]);
})

app.post('/login', (request, response) => {
  var id = request.body.id;
  var pwd = request.body.pwd;

  console.log("로그인 요청 ID : " + id + " PWD : " + pwd);

  if(Object.keys(users).includes(id)) {
    if(users[id][0] == pwd) { current_id = id; response.send(true); }
    else { response.send( "비밀번호가 틀립니다."); }
  }
  else { response.send("해당되는 아이디가 없습니다."); }
})

app.post('/logout', (request, response) => {
  console.log(current_id + "님이 로그아웃하셨습니다.");
  current_id = "익명";
  response.send(current_id);
})

app.listen(52273, () => {
  console.log('Server Running at http://127.0.0.1:52273')
})
