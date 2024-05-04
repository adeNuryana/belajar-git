const express = require('express');
const mysql = require('mysql');
const BodyParser = require('body-parser');

const app = express();
app.use(BodyParser.urlencoded({extended: true}));
// untuk menghubungkan ke html
app.set('view engine', 'ejs')
app.set('views', 'views')

//  untuk koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    database: 'data_kendaraan',
    user:'root',
    password : ''
})
// untuk memastikan database terhubung
db.connect((err) => {
    if (err) throw err;
    console.log('database terhubung');
    // untuk mengambil data dari database
    app.get('/', (req, res) => {
        const sql ="SELECT* FROM data_kendaraan"
    db.query(sql, (err, result) => {
        const data_kendaraan = JSON.parse(JSON.stringify(result));
        res.render("index", {data_kendaraan: data_kendaraan, title: "Data Kendaraan"});
        })
    })

        // untuk insert data
    app.post("/submit", (req, res) =>{
            const insertSql = `INSERT INTO data_kendaraan (no_registrasi_kendaraan, nama_pemilik, alamat,
            merk_kendaraan, tahun_kendaraan, kapasiter_silinder, bahan_bakar, warna_kendaraan) 
            VALUES ('${req.body.no_registrasi_kendaraan}', '${req.body.nama_pemilik}', '${req.body.alamat}',
                '${req.body.merk_kendaraan}', '${req.body.tahun_kendaraan}', '${req.body.kapasiter_silinder}',
                '${req.body.bahan_bakar}', '${req.body.warna_kendaraan}');`
        db.query(insertSql, (err, result) => {
                if(err) throw err
                res.redirect("/")
        })
    })
    // untuk editdata
    app.post("/update", (req, res) => {
    const editdata=`UPDATE data_kendaraan SET 'no_registrasi_kendaraan'='${req.body.no_registrasi_kendaraan}',
    'nama_pemilik'='${req.body.nama_pemilik}',
    'alamat'='${req.body.alamat}','merk_kendaraan'='${req.body.merk_kendaraan}','tahun_kendaraan'='${req.body.tahun_kendaraan}',
    'kapasiter_silinder'='${req.body.kapasiter_silinder}','bahan_bakar'='${req.body.bahan_bakar}',
    'warna_kendaraan'='${req.body.warna_kendaraan} WHERE ${req.body.no_registrasi_kendaraan}= no_registrasi_kendaraan `;
    b.query(editdata, (err, result) => {
        if(err) throw err
        res.redirect("/")
})   
    })
    

})


//untuk menghubungkan js dengan browser
app.listen(8000, () => {    
    console.log('server ready')
})