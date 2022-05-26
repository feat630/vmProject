const express = require('express');
const path = require('path');
const router = require('./routes/router');
const cors = require('cors');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'public/')));

app.use(cors({
    origin: '*', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
    }));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Check out the app at http://localhost:${PORT}`);
});