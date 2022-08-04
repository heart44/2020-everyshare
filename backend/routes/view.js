const express = require("express");
const pool = require("../config/pool");
const router = express.Router();

/* select 문 */
router.get("/", async (req, res, next) => {
  const conn = await pool.getConnection();
  //1이 빌려주는 게시판 2가 빌리는 게시판
  const postNum = req.query.boardNum;
  const postCategory = req.query.type;

  let postCategoryType;

  if (postCategory === "1") {
    postCategoryType = "lendboard";
  } else {
    postCategoryType = "requestboard";
  }

  let sqlQuery =
    "select " +
    postCategoryType +
    ".*,userInfo.nickName from userInfo," +
    postCategoryType +
    " where postNum=" +
    postNum +
    " AND userInfo.userNum = " +
    postCategoryType +
    ".postWriterNum;";

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]);
  } catch (err) {
    console.log(err, "게시물 내용을 가져오지 못했습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

router.get("/image", async (req, res, next) => {
  const conn = await pool.getConnection();
  //1이 빌려주는 게시판 2가 빌리는 게시판
  const postNum = req.query.boardNum;

  let sqlQuery = "select fileURL from filelist where postNum=" + postNum + " ;"

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]);
  } catch (err) {
    console.log(err, "이미지 리스트를 가져오지 못했습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

/* comment select 문 */
router.get("/comment", async (req, res, next) => {
  const conn = await pool.getConnection();
  //1이 빌려주는 게시판 2가 빌리는 게시판
  const postNum = req.query.boardNum;
  const postCategory = req.query.type;
  let postCategoryType;

  if (postCategory === "1") {
    postCategoryType = "lendcomment";
  } else {
    postCategoryType = "requestcomment";
  }

  let sqlQuery =
    "select distinct " +
    postCategoryType +
    ".*, userInfo.nickName,userInfo.userID from userInfo," +
    postCategoryType +
    " where userInfo.userNum = " +
    postCategoryType +
    ".commentWriterNum AND " +
    postCategoryType +
    ".postNum=" +
    postNum +
    ";";

  console.log(sqlQuery);

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]);
  } catch (err) {
    console.log(err, "댓글 내용을 가져오지 못했습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

router.post("/comment", async (req, res, next) => {
  const conn = await pool.getConnection();
  //1이 빌려주는 게시판 2가 빌리는 게시판
  let postCategoryType;
  var data = req.body.comment;
  var postCategory = data.postType;
  var postNum = data.boardNum;
  var commentWriterNum = data.userNum;
  var commentContents = data.commentContents;
  var state = data.state;

  if (postCategory === "1") {
    postCategoryType = "lendcomment";
  } else {
    postCategoryType = "requestcomment";
  }

  let sqlQuery = "INSERT INTO " + postCategoryType + " set ?";
  let sqlData = {
    postNum: postNum,
    commentWriterNum: commentWriterNum,
    commentContents: commentContents,
    state: state,
  };

  console.log(sqlQuery);

  try {
    const data = await conn.query(sqlQuery, sqlData);

    await conn.commit();
    return res.json(data);
  } catch (err) {
    console.log(err, "댓글을 등록하지 못했습니다");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

/* update 문 */
router.put("/", async (req, res, next) => {
  try {
    const data = await pool.query("select * from userInfo");
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

/* delete(삭제되면 state 값만 수정)문 */
router.delete("/", async (req, res, next) => {
  const conn = await pool.getConnection();
  //1이 빌려주는 게시판 2가 빌리는 게시판
  const postNum = req.query.boardNum;
  const postCategory = req.query.type;
  let postCategoryType;

  if (postCategory === "1") {
    postCategoryType = "lendboard";
  } else {
    postCategoryType = "requestboard";
  }

  let sqlQuery = 'UPDATE '+postCategoryType+' SET state=3 where postNum=' +postNum+";";

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]);
  } catch (err) {
    console.log(err, "댓글 내용을 가져오지 못했습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

module.exports = router;
