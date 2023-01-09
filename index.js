const express = require('express');
const app = express();
const pool = require("./db");
const cors = require('cors');

app.use(cors());

app.use(express.json()) // req body

//Routes
//get all
app.get("/insert", async(req, res) => {
    try {
        
        const all = await pool.query("SELECT * FROM temp_use");
        res.json(all.rows);
    } catch (err) {
        console.error(err.message);
    }
})
//get particular
app.get("/insert/:id", async(req, res) =>{
    //const {id} = req.query.q;
    const {id} = req.params;
    try {
        const get = await pool.query("SELECT * FROM temp_use WHERE scode = $1",[id]);
        res.json(get.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//create
app.post("/insert", async(req, res) => {
    try {
        const { description } = req.body;
        const newi = await pool.query("INSERT INTO test_table (des) VALUES ($1) RETURNING *",
        [description]);
        res.json(newi.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//update
app.put("/insert/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const { description } = req.body;

        const update = await pool.query("UPDATE test_table SET des = $1 WHERE id = $2",
        [description,id]);
        res.json("updated!!!");
    } catch (err) {
        console.error(err.message);
    }
})

//delete
app.delete("/insert/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const deleteid = await pool.query("DELETE FROM test_table WHERE id = $1",[id]);
        res.json("deleted!!");  
    } catch (err) {
        console.error(err.message);
    }
})
  
app.get("/test", async(req, res) =>{
    const scode = req.query.scode;
    console.log(scode);
    try {
        const get = await pool.query("SELECT * FROM temp_use WHERE scode = $1",[scode]);
        res.json(get.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.put("/testy/:scode", async(req, res) => {
    try {
        const { camid, aid, rid, cusip, fcode, pamid } = req.body;
        const { scode } = req.params;

        const update = await pool.query("UPDATE temp_use SET camid = $2, aid = $3, rid = $4, cusip = $5, fcode = $6, pamid = $7 WHERE scode = $1",
        [scode, camid, aid, rid, cusip, fcode, pamid]);
        res.json("updated!!!");
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/search', (req, res) => {
    const scode = req.query.scode;
    const cid = req.query.cid;
    const aid = req.query.aid;
    const riid = req.query.riid;
    const cusip = req.query.cusip;
    const fcode = req.query.fcode;
    const paid = req.query.paid;
  
    let whereClause = 'WHERE';
    let addedCondition = false;
    if (scode) {
      whereClause += ` scode = '${scode}'`;
      addedCondition = true;
    }
    if (cid) {
      if (addedCondition) {
        whereClause += ' AND';
      }
      whereClause += ` camid = '${cid}'`;
      addedCondition = true;
    }
    if (aid) {
        if (addedCondition) {
          whereClause += ' AND';
        }
        whereClause += ` aid = '${aid}'`;
        addedCondition = true;
      }
    if (riid) {
        if (addedCondition) {
          whereClause += ' AND';
        }
        whereClause += ` rid = '${riid}'`;
        addedCondition = true;
      }
      if (cusip) {
        if (addedCondition) {
          whereClause += ' AND';
        }
        whereClause += ` cusip = '${cusip}'`;
        addedCondition = true;
      }
      if (fcode) {
        if (addedCondition) {
          whereClause += ' AND';
        }
        whereClause += ` fcode = '${fcode}'`;
        addedCondition = true;
      }
      if (paid) {
        if (addedCondition) {
          whereClause += ' AND';
        }
        whereClause += ` pamid = '${paid}'`;
        addedCondition = true;
      }
    
    if (!addedCondition) {
      whereClause = '';
    }
  
    
    const sql = `SELECT * FROM temp_use ${whereClause}`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.send({ success: false });
      } else {
        res.json(result.rows );
      }
    });
  });

  app.post("/fields", async(req, res) => {
    try {
        const body = req.body;
        const newi = await pool.query("INSERT INTO temp_use (scode, camid, aid, rid, cusip, fcode, pamid) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [body.scode, body.camid, body.aid, body.rid, body.cusip, body.fcode, body.pamid]);
        res.json(newi.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, ()=>{
    console.log("server is listening");
});