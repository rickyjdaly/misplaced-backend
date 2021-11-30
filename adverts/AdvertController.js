const express = require("express");
const routes = express.Router();
const Advert = require("./Advert");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
    // cb(null, '')
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 25,
  },
  fileFilter: fileFilter,
});

routes.get("/", function (req, res) {
  Advert.find()

    .sort({ _id: -1 })

    .then((adverts) => {
      res.status(200).json(adverts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

routes.post("/", upload.single("advertImage"), function (req, res) {
  var imageUrl = req.file.path.slice(8, req.file.path.length);
  // var imageUrl = req.file.path;
  Advert.create(
    {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      image: imageUrl,
      category: req.body.category,
      contact: req.body.contact,
      county: req.body.county,
      town: req.body.town,
    },
    function (err, postedAdvert) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json(postedAdvert);
      }
    }
  );
});

routes.get("/:id", function (req, res) {
  Advert.findById(req.params.id)
    .sort({ _id: -1 })
    .then((advert) => {
      res.status(200).json(advert);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

routes.post("/filter", function (req, res) {
  const data = req.body;
  // console.log(data);

  // THE REGEX FOR SEARCH
  // {$or:[{title :  { $regex: '.*' + searchResult + '.*' }}, {description :  { $regex: '.*' + searchResult + '.*' }}] }

  // db.adverts.find({$and:[{$or:[{title :  { $regex: '.*' + 'GTD' + '.*' }}, {description :  { $regex: '.*' + 'GTD' + '.*' }}] },{category: 'Cars'}, {subCategory:'Volkswagen'}]})

  var search = "";
  var county = "";
  var town = "";
  const myData = {};

  for (x in data) {
    if (x == "keyword") {
      search = data[x];
    } else if (x == "county") {
      county = data[x];
    } else if (x == "town") {
      town = data[x];
    } else {
      myData[x] = data[x];
    }
    // console.log(x + "  ->  "+ data[x]);
  }

  // console.log('Search -> '+ search);
  // console.log(myData);

  if (search == "" || search == undefined) {
    Advert.find(myData)
      
      .sort({ _id: -1 })
      .then((advert) => {
        var results = [];

        if (county == "") {
          console.log("County is empty");
          res.status(200).json(advert);
        } else {
          console.log("County is in use");
          if (town == "") {
            for (var x in advert) {
              if (advert[x].county === county) {
                results.push(advert[x]);
              }
            }

            console.log("Town is empty");
            res.status(200).json(results);
          } else {
            for (var x in advert) {
              if (
                advert[x].county === county &&
                advert[x].town === town
              ) {
                results.push(advert[x]);
              }
            }

            console.log("Town is in use");
            res.status(200).json(results);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    Advert.find({
      $and: [
        {
          $or: [
            { title: { $regex: ".*" + search + ".*" } },
            { description: { $regex: ".*" + search + ".*" } },
          ],
        },
        myData,
      ],
    })
      
      .sort({ _id: -1 })
      .then((advert) => {
        var results = [];

        if (county == "") {
          console.log("County is empty");
          res.status(200).json(advert);
        } else {
          console.log("County is in use");
          if (town == "") {
            for (var x in advert) {
              if (advert[x].county === county) {
                results.push(advert[x]);
              }
            }

            console.log("Town is empty");
            res.status(200).json(results);
          } else {
            for (var x in advert) {
              if (
                advert[x].county === county &&
                advert[x].town === town
              ) {
                results.push(advert[x]);
              }
            }

            console.log("Town is in use");
            res.status(200).json(results);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = routes;
