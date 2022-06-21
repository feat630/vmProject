const express = require("express");
const path = require("path");
const router = require("./routes/router");
const shelter = require("./routes/shelter");
const victim = require("./routes/victim");
const supplies = require("./routes/supplies");
const login = require("./routes/login");
const cors = require("cors");

const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "..", "public/")));

app.use(
  cors({
    origin: true, // 출처 허용 옵션
    credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
    optionsSuccessStatus: 200,
  })
);

// const maxAge = 1000 * 60 * 5;
// const sessionObj = {
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     secure: false,
//     store: new MemoryStore({ checkPeriod: maxAge }),
//     cookie: {
//       maxAge,
//       secure: false,
//     },
//   };

// app.use(session(sessionObj));

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 180000, // (1000 * 60 * 3) 10min
    }),
    cookie: { maxAge: 180000 },
  })
);

app.use("/", router);
app.use("/shelter", shelter);
app.use("/victim", victim);
app.use("/supplies", supplies);
app.use("/login", login);

app.listen(PORT, () => {
  console.log(`Check out the app at http://localhost:${PORT}`);
});
