const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
// default options 
app.use(fileUpload());
 
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let sampleFile = req.files.sampleFile;
    
    if(sampleFile.name == undefined){
        res.sed("NO FILE CHOSEN!");
        res.end();
    }
    else{
        var path = "tmp/" + sampleFile.name;
    
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);
 
    //res.send('File uploaded!');
    const stats = fs.statSync(path).size;
    console.log(stats);
    res.jsonp({"size": stats});
    fs.unlink(path);
  });
    }
});
app.use(express.static("public"));
app.listen(process.env.PORT || 80);