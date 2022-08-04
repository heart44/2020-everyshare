var express = require("express");
const pool = require("../config/pool");
var router = express.Router();

router.get("/", async (req, res, next) => {
  const conn = await pool.getConnection();
  const postCategory = req.query.type;
  const boardNum = req.query.boardNum;

  let postCategoryType;

  if (postCategory === "1") {
    postCategoryType = "lendboard";
  } else {
    postCategoryType = "requestboard";
  }

  var sqlQuery = "select * from " + postCategoryType + " where postNum=" +boardNum+ ";";

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]), conn;
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/", async (req, res, next) => {
  const conn = await pool.getConnection();
  const data = req.body.modify
  const type = data.userChecked;
  const postNum = data.boardNum

  let postCategoryType;
  let SQLdata

  if (type === "lender") {
    postCategoryType = "lendboard";
    SQLdata = {
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
     
    }
  } else {
    postCategoryType = "requestboard";
    SQLdata = {
      postTitle: data.boardTitle,
      productCategory: data.writeCategory,
      postContents: data.boardContents,
      rentalDate: data.startDate,
      returnDate: data.endDate,
      suggestPrice: data.suggestPrice,
    }
  }

  var sqlQuery = "UPDATE " + postCategoryType + " SET ?  WHERE postNum = " + postNum + ";";

  console.log(SQLdata)

  try {
    const data = await conn.query(sqlQuery,SQLdata);
    await conn.commit();

    return res.json(data[0]), conn;
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
