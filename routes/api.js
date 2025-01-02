'use strict';

const mongoose = require('mongoose'); // <--- Menambahkan mongoose untuk berinteraksi dengan MongoDB
const { Schema } = mongoose; // <--- Menambahkan Schema untuk membuat model

// Membuat koneksi ke database MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Membuat schema untuk issue
const issueSchema = new Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: '' },
  status_text: { type: String, default: '' },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
  open: { type: Boolean, default: true },
  project: { type: String, required: true }
});

// Membuat model Issue berdasarkan schema
const Issue = mongoose.model('Issue', issueSchema);


module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project;
      //<-- Ambil parameter project dari URL

      let query = { project: project };  // <--- Buat query untuk mencari issue berdasarkan project
      //<-- Jika ada filter parameter dari query string
      for(let key in req.query){
        query[key] = req.query[key];
      }

      Issue.find(query)
      .then((issues) => {
         res.json(issues); // <--- Mengembalikan array issues dalam format JSON
      })
      .catch((err) => {
         // <-- Perubahan: Mengembalikan array kosong jika tidak ditemukan
        res.json([]);
      });
    })

    .post(function (req, res) {
      let project = req.params.project;
      //<-- Ambil parameter project dari URL

      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
       //<-- Ambil data issue dari body request
      
      if(!issue_title || !issue_text || !created_by){
        return res.json({ error: 'required field(s) missing' }); // <--- Mengembalikan error jika ada field yang kosong
      }
        
        const newIssue = new Issue({ // <--- Buat dokumen baru
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to || '',
          status_text: status_text || '',
          project: project,
          created_on: new Date(),
          updated_on: new Date()
        });
      
        newIssue.save()
          .then((savedIssue) => {
           res.json(savedIssue); // <--- Kirim balik issue yang baru dibuat
          })
           .catch((err) => {
          res.json({error: 'could not save'}) // <--- Mengembalikan pesan error
        });
    })

    .put(function (req, res) {
      let project = req.params.project;
        //<-- Ambil parameter project dari URL
      
      let _id = req.body._id; // <--- Ambil _id dari body request

      if(!_id){
        return res.json({ error: 'missing _id' }); // <--- Mengembalikan error jika _id tidak ada
      }

      const updateFields = {}; // <--- Objek untuk menampung field yang akan diupdate

      for (const key in req.body) {
        if (req.body[key] && key !== '_id') {
          updateFields[key] = req.body[key]; // <--- Memasukkan field yang akan diupdate ke dalam objek
        }
      }
    
       if(Object.keys(updateFields).length === 0){
        return res.json({ error: 'no update field(s) sent', '_id': _id }); // <--- Mengembalikan error jika tidak ada field yang diupdate
       }

       updateFields.updated_on = new Date(); // <--- Update tanggal update

      Issue.findByIdAndUpdate(_id, updateFields, { new: true })
        .then((updatedIssue) => {
          if(!updatedIssue)
            return res.json({ error: 'could not update', '_id': _id }); // <--- Mengembalikan pesan error jika issue tidak ditemukan

          res.json({  result: 'successfully updated', '_id': _id }); // <--- Mengembalikan pesan berhasil update
        })
        .catch((err) => {
           res.json({ error: 'could not update', '_id': _id }); // <--- Mengembalikan pesan error
      });
    })

    .delete(function (req, res) {
      let project = req.params.project;
       //<-- Ambil parameter project dari URL

      let _id = req.body._id; // <--- Ambil _id dari body request

      if(!_id){
        return res.json({ error: 'missing _id' }); // <--- Mengembalikan error jika _id tidak ada
      }

     Issue.findByIdAndDelete(_id)
        .then((deletedIssue) => {
          if(!deletedIssue){
           return res.json({ error: 'could not delete', '_id': _id }) // <--- Mengembalikan pesan error jika issue tidak ditemukan
          }
          res.json({ result: 'successfully deleted', '_id': _id }); // <--- Mengembalikan pesan berhasil delete
        })
        .catch((err) => {
          res.json({ error: 'could not delete', '_id': _id }); // <--- Mengembalikan pesan error
        });
    });

};