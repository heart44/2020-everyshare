const express = require("express");
const pool = require("../config/pool");
const router = express.Router();


/* 게시판 관련 */

/* insert문 */
router.post("/write", async (req, res, next) => {
  var data = req.body.write;

  var userChecked = data.userChecked;

  let boardType;
  var SQLData;

  console.log(data)

  if (userChecked === "lender") {
    boardType = "lendboard";
    SQLData = {
      postWriterNum: data.writerNum,
      postTitle: data.boardTitle,
      productCategory: data.writeCategory,
      postContents: data.boardContents,
      pricePerDay: data.dayPerPrice,
      pricePerWeek: data.weekPerPrice,
      pricePerMonth: data.monthPerPrice,
      minPeriod: data.minTerm,
      maxPeriod: data.maxTerm,
      rentalPeriodType: data.rentalPeriodType,
      guarantee: data.guarantee,
      state: data.state,
    }
  } else {
    boardType = "requestboard";
    SQLData = {
      postWriterNum: data.writerNum,
      postTitle: data.boardTitle,
      productCategory: data.writeCategory,
      postContents: data.boardContents,
      rentalDate: data.startDate,
      returnDate: data.endDate,
      suggestPrice: data.suggestPrice,
      state: data.state,
    }

  }

  console.log(SQLData)

  var sqlQuery = "INSERT INTO " + boardType + " set ?";

  console.log(sqlQuery)

  const conn = await pool.getConnection();

  try {
    const data = await conn.query(sqlQuery, SQLData);

    await conn.commit();
    return res.json(data);
  } catch (error) {
    console.log(err, "lendBoard의 insert가 수행되지 않았습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

/* 이미지 업로드 insert문 */
router.post("/upload", async (req, res, next) => {
  
  var url = req.body.downloadURL;
  var postNum = req.body.boardNum;

  console.log(url)
  console.log(postNum)
  var sqlQuery = "INSERT INTO filelist set ?";

  var sqlData = {
    postNum:postNum,
    fileURL:url,
  };

  const conn = await pool.getConnection();

  try {
    const data = await conn.query(sqlQuery, sqlData);

    await conn.commit();
    return res.json(data);
  } catch (error) {
    console.log(err, "lendBoard의 insert가 수행되지 않았습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

router.get("/write", async (req, res, next) => {

  var userChecked = req.query.userChecked;
  var writerNum = req.query.writerNum;
  let boardType;

  console.log(writerNum);

  if (userChecked === "lender") {
    boardType = "lendboard";
  } else {
    boardType = "requestboard";
  }

  var sqlQuery = "select postNum from lendboard where postWriterNum=" + writerNum + " order by postNum DESC LIMIT 1;";

  const conn = await pool.getConnection();

  try {
    const data = await conn.query(sqlQuery);

    await conn.commit();
    return res.json(data[0]);
  } catch (error) {
    console.log(err, "lendBoard의 insert가 수행되지 않았습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

/* select 문 */
router.get("/", async (req, res, next) => {
  const conn = await pool.getConnection();
  //1이 빌려주는 게시판 2가 빌리는 게시판
  const productCategory = req.query.category;

  var sqlQuery =
    '(SELECT postNum,postWriterNum,userID,nickName,postTitle,postDate,state, 1 as type' +
    ' FROM lendBoard left join userInfo on lendBoard.postWriterNum = userInfo.userNum where lendBoard.productCategory ="' +
    productCategory +
    '" AND state not in(3))' +
    "UNION (SELECT postNum,postWriterNum,userID,nickName,postTitle,postDate,state, 2 as type" +
    ' FROM requestboard left join userInfo on requestboard.postWriterNum = userInfo.userNum where requestboard.productCategory ="' +
    productCategory +
    '" AND state not in(3)) order by postDate DESC;';

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]);
  } catch (err) {
    console.log(err, "게시판 목록을 가져오지 못했습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

module.exports = router;
