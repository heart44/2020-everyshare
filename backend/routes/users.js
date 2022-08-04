var express = require('express');
const pool = require('../config/pool')
var router = express.Router();


router.get('/register', async (req, res, next) => {
 
  const conn = await pool.getConnection()
  const id = req.query.id

  var sqlQuery = 'select EXISTS (select userID from userInfo where userID =\"' + id + '\") AS STATE;'

  try {

    const data = await conn.query(sqlQuery)
    await conn.commit() 
    
    return res.json(data[0]), conn

  } catch (err) {
    return res.status(500).json(err)
  }
  
})

router.post('/register', async (req, res, next) => {
 
  var data = req.body
  
  var userID = data.userID
  var password = data.password
  var phoneNum = data.phoneNum   
  var nickName = data.nickName

  var sqlQuery = 'INSERT INTO userInfo set ?'
  var sqlData = { userID: userID, password: password, phoneNum: phoneNum, nickName: nickName }

  const conn = await pool.getConnection()

  try {
   
    await conn.query(sqlQuery, sqlData)
    await conn.commit() 
    return res.json({ success: true })

  } catch (err) {
    return res.status(500).json(err)
  }

})

router.post('/login', async (req, res, next) => {
 
  var data = req.body

  var userID = data.userID
  var password = data.password

  var sqlQuery = 'SELECT userNum, userID, nickName FROM userInfo where userID =\"' + userID + '\" AND password =\"' + password + '\";'
  const conn = await pool.getConnection()

  try {
   
    const result = await conn.query(sqlQuery)
    await conn.commit() 
    return res.json(result[0])

  } catch (err) {
    return res.status(500).json(err)
  }

})


router.put('/', async (req, res, next) => {
 
  var info = req.body.info.info
  var id = req.body.info.id
  var type = req.query.type
  var SQLquery

  console.log(info)

  if(type === "1") {
    SQLquery = 'update userInfo set password=\'' + info + '\' where userID=\'' + id + '\';';
  } else if(type === "2") {
    SQLquery = 'update userInfo set phoneNum=\'' + info + '\' where userID=\'' + id + '\';';
  } else{
    SQLquery = 'update userInfo set nickName=\'' + info + '\' where userID=\'' + id + '\';';
  }
  console.log(SQLquery)
  const conn = await pool.getConnection()

  try {
   
    const result = await conn.query(SQLquery)
    await conn.commit() 
    return res.json(result[0])

  } catch (err) {
    return res.status(500).json(err)
  }

})

//userNum을 통해
router.get('/', async (req, res, next) => {
 
  const conn = await pool.getConnection()
  const userNum = req.query.userNum;

  var sqlQuery = "select * from userInfo where userNum ="+ userNum + ";";

  try {

    const data = await conn.query(sqlQuery)
    await conn.commit() 
    
    return res.json(data), conn

  } catch (err) {
    return res.status(500).json(err)
  }
  
})

/* 마이페이지에서 글목록 가져오기 */
router.get("/write", async (req, res, next) => {
  const conn = await pool.getConnection();
  //1이 빌려주는 게시판 2가 빌리는 게시판
  const userID = req.query.id;

  var sqlQuery =
    '(SELECT postNum,postWriterNum,productCategory,userID,nickname,postTitle,postDate,state, 1 as type' +
    ' FROM lendBoard left join userInfo on lendBoard.postWriterNum = userInfo.userNum where lendBoard.postWriterNum ="' +
    userID +
    '" AND state not in(3))' +
    "UNION (SELECT postNum,postWriterNum,productCategory,userID,nickname,postTitle,postDate,state, 2 as type" +
    ' FROM requestboard left join userInfo on requestboard.postWriterNum = userInfo.userNum where requestboard.postWriterNum ="' +
    userID +
    '" AND state not in(3)) order by postDate DESC;';

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]);
  } catch (err) {
    console.log(err, "글 목록을 가져오지 못했습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }

});

/* 마이페이지에서 글 삭제 */
router.delete("/item", async (req, res, next) => {
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

  let sqlQuery = 'UPDATE '+postCategoryType+' SET state = 3  where postNum =' + postNum + ';';

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]);
  } catch (err) {
    console.log(err, "글을 삭제하지 못했습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }
});

/* 마이페이지에서 댓글목록 가져오기 */
router.get("/comment", async (req, res, next) => {
  const conn = await pool.getConnection();
  //1이 빌려주는 게시판 2가 빌리는 게시판
  const userID = req.query.id;

  var sqlQuery =
    '(SELECT distinct lendcomment.*, lendboard.productCategory ,lendboard.postTitle, nickname, 1 as type ' +
    'FROM lendboard,lendcomment left join userinfo on lendcomment.commentWriterNum = userinfo.userNum WHERE lendboard.postNum = lendcomment.postNum and lendcomment.commentWriterNum ="' +
    userID +
    '" AND lendcomment.state not in(3))' +
    "UNION (SELECT distinct requestcomment.*, requestboard.productCategory ,requestboard.postTitle, nickname, 2 as type " +
    'FROM requestboard,requestcomment left join userinfo on requestcomment.commentWriterNum = userinfo.userNum WHERE requestboard.postNum = requestcomment.postNum and requestcomment.commentWriterNum ="' +
  userID +
    '" AND requestcomment.state not in(3)) order by commentDate DESC;';

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]);
  } catch (err) {
    console.log(err, "댓글 목록을 가져오지 못했습니다.");
    conn.rollback();
  } finally {
    conn.release(); // pool에 connection 반납
  }

});



module.exports = router;
