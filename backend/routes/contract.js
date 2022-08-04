const express = require("express");
const pool = require("../config/pool");
const router = express.Router();

/* insert문 */
router.post("/", async (req, res, next) => {
    
    var data = req.body.newContract;
    var sqlQuery = "INSERT INTO tradeinfo set ?";

    var SQLdata = {
        postNum: data.postNum,
        borrower: data.borrower,
        owner: data.owner,
        tradeDate: data.tradeDate,
        duration: data.duration,
        returnDate: data.returnDate,
        totalPrice: data.totalPrice,
        guarantee: data.guarantee,
        tradeState: data.tradeState,
    }

    console.log(SQLdata)

    const conn = await pool.getConnection();
  
    try {
      const data = await conn.query(sqlQuery, SQLdata);
  
      await conn.commit();
      return res.json(data);
    } catch (error) {
      console.log(err, "lendBoard의 insert가 수행되지 않았습니다.");
      conn.rollback();
    } finally {
      conn.release(); // pool에 connection 반납
    }
  });

  router.put("/", async (req, res, next) => {
    
    var postNum = req.body.info.postNum;
    var state = req.body.info.state;
    console.log(postNum,state)

    //state 게시판의 경우 0=거래중 / 1=거래중 / 2=거래완료
   
    var sqlQuery = "UPDATE lendboard SET state=" + state + " WHERE postNum=" + postNum + ";";
    const conn = await pool.getConnection();
    console.log(sqlQuery)
  
    try {
      const data = await conn.query(sqlQuery);
  
      await conn.commit();
      return res.json(data);
    } catch (error) {
      console.log(err, "lendBoard의 상태변경이 수행되지 않았습니다.");
      conn.rollback();
    } finally {
      conn.release(); // pool에 connection 반납
    }
  });

  
  // router.get("/", async (req, res, next) => {
    
  //   var data = req.query.userNum;
   
  //   var sqlQuery = "SELECT * FROM tradeinfo WHERE owner = " + data + ";";

  //   const conn = await pool.getConnection();
  
  //   try {
  //     const data = await conn.query(sqlQuery);
  
  //     await conn.commit();
  //     return res.json(data[0]);
  //   } catch (error) {
  //     console.log(err, "tradeinfo 정보를 가지고 왔습니다.");
  //     conn.rollback();
  //   } finally {
  //     conn.release(); // pool에 connection 반납
  //   }
  // });

   //빌린 것
   router.get("/lend", async (req, res, next) => {
    
    console.log("contract get 실행");
    var data = req.query.userNum;
   
    //console.log(data)

    var sqlQuery = "SELECT * FROM tradeinfo WHERE borrower = " + data + ";";
    console.log(sqlQuery)
    const conn = await pool.getConnection();
  
    try {
      const data = await conn.query(sqlQuery);
  
      await conn.commit();
      return res.json(data);
    } catch (error) {
      console.log(err, "lendBoard의 상태변경이 수행되지 않았습니다.");
      conn.rollback();
    } finally {
      conn.release(); // pool에 connection 반납
    }
  });

  //빌려준 것
  router.get("/request", async (req, res, next) => {
    
    console.log("contract get 실행");
    var data = req.query.userNum;
   
    //console.log(data)

    var sqlQuery = "SELECT * FROM tradeinfo WHERE owner = " + data + ";";
    console.log(sqlQuery)
    const conn = await pool.getConnection();
  
    try {
      const data = await conn.query(sqlQuery);
  
      await conn.commit();
      return res.json(data);
    } catch (error) {
      console.log(err, "lendBoard의 상태변경이 수행되지 않았습니다.");
      conn.rollback();
    } finally {
      conn.release(); // pool에 connection 반납
    }
  });

  //tradeNum을 통해 받아오기
  router.get("/", async (req, res, next) => {
    
    console.log("contract get 실행");
    var data = req.query.tradeNum;
   
    //console.log(data)

    var sqlQuery = "SELECT * FROM tradeinfo WHERE tradeNum = " + data + ";";
    console.log(sqlQuery)
    const conn = await pool.getConnection();
  
    try {
      const data = await conn.query(sqlQuery);
  
      await conn.commit();
      return res.json(data);
    } catch (error) {
      console.log(err, "lendBoard의 상태변경이 수행되지 않았습니다.");
      conn.rollback();
    } finally {
      conn.release(); // pool에 connection 반납
    }
  });



module.exports = router;
