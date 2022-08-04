var express = require('express');
const pool = require('../config/pool')
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
   
  const conn = await pool.getConnection();
 
  var sqlQuery = 'select * from lendboard where state not in(3) order by postNum desc limit 10;'

  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]), conn;
  } catch (err) {
    return res.status(500).json(err);
  }

});

router.get('/main', async function(req, res, next) {
   
  const conn = await pool.getConnection();
 
 
  var sqlQuery = "select lendboard.postNum,fileURL from lendboard, (SELECT postNum,fileURL FROM filelist GROUP BY postNum) AS B where lendboard.postNum = B.postNum && state not in(3) order by postNum desc limit 10;";
  console.log(sqlQuery)           
  try {
    const data = await conn.query(sqlQuery);
    await conn.commit();

    return res.json(data[0]), conn;
  } catch (err) {
    return res.status(500).json(err);
  }

});


module.exports = router;
