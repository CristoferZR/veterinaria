

 const DB_HOST = process.env.DB_HOST || 'localhost'
 const DB_USER = process.env.DB_USER || 'cris'
 const DB_PASS = process.env.DB_PASS || '1234'
 const DB_NAME = process.env.DB_NAME || 'veterinaria'
 const DB_PORT = process.env.DB_PORT || '3306'


const express = require('express');
const mysql  = require('mysql2');
const app =  express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const Connection = require('mysql2/typings/mysql/lib/Connection')

app.listen(DB_PORT);

const conexion = await mysql.createConnection({
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASS,
    database : DB_NAME,
    port: DB_PORT
})

const router = express.Router();

conexion.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database!');
  }
});



app.get('/membresias', async (req, res) => {

          const conecction = await conexion.getConnection()

          await conecction.query('SELECT * FROM membresia', (error, rowsMembresia) => {
          if (error) throw error;
          if (!error) {
          console.log(rowsMembresia);
        
            res.render('membresias', {rowsMembresia});
          }
        });
      }
    );

  app.get('/registro', async (req,res,)=>{

    const conecction = await conexion.getConnection()

     await conecction.query('SELECT * FROM clientes', (error, rowsClientes) => {
        if (error) throw error;
        if (!error) {
          console.log(rowsClientes);
          
          res.render('registro', { rowsClientes });
        }
      });

  });
  
  app.get('/index2', async (req,res,)=>{

    const conecction = await conexion.getConnection()

    connection.query('SELECT * FROM clientes', (error, rows) => {
        if (error) throw error;
        if (!error) {
          console.log(rows);
          
          res.render('index2', { rows });
        }
      });

  });

  app.set('view engine','ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use('/', router);

app.post('/submit-form', (req, res) => {
    const {membresia,inicio,vencimiento,costo,id_cliente} = req.body;
    const query = `INSERT INTO membresia(tipo_membresia,fecha_inicio,fecha_vencimiento,costo,id_cliente) VALUES ('${membresia}', '${inicio}', '${vencimiento}', '${costo}', '${id_cliente}')`;
  
    conexion.query(query, (error, results) => {
      if (error) throw error;
      res.redirect('/membresias');
    });
  });

  app.use(express.static(__dirname));
