// 1.Create new Database named Demo And Collections named trainningCenter1, trainningCenter2
use('Demo');
 db.createCollection("trainningCenter1");
 db.createCollection("trainningCenter2");

 db.getCollectionNames();

/*
2.Insert documents into trainningCenter1 collection contains (Use Variable named data as Array)
                   _id , name as firstName lastName , age , address as array , status
                   Using insert ONE from data Variable
*/ 
var data = [{
  _id: 1,
  firstName: "Mohamed",
  lastName: "Hamed",
  age: 25,
  address: ["Egypt", "Beni Suef"],
  status: "King"
},
{
  _id: 2,
  firstName: "Ahmed",
  lastName: "Hamed",
  age: 30,
  address: ["Egypt", "Beni Suef"],
  status: "Prince"
}];

db.trainningCenter1.insertOne(data);

// 3.Using Same Variable (data) with same data and insert MANY into trainningCenter2 collection
var data = [{
  _id: 1,
  firstName: "Mohamed",
  lastName: "Hamed",
  age: 25,
  address: ["Egypt", "Beni Suef"],
  status: "King"
},
{
  _id: 2,
  firstName: "Ahmed",
  lastName: "Hamed",
  age: 30,
  address: ["Egypt", "Beni Suef"],
  status: "Prince"
}];
db.trainningCenter2.insertMany(data);

// 4.Use find. explain function (find by age field) and mention scanning type
db.trainningCenter2.find({ age: 25 }).explain();

// 5.Create index on created collection named it “IX_age” on age field 
db.trainningCenter2.createIndex({ age: 1 }, { name: "IX_age" });

// 6.Use find. explain view winning plan for index created (find by age field) and mention scanning type
db.trainningCenter2.find({ age: 25 }).explain("executionStats");

/*
7.Create index on created collection named it “compound” on firstNsme and lastName
1.Try find().explain before create index and mention scanning type
2.Try find().explain after create index and mention scanning type
*/

db.trainningCenter2.find({ firstName: "Mohamed", lastName: "Hamed" })
db.trainningCenter2.createIndex({ firstName: 1, lastName: 1 }, { name: "IX_compound_Fname_Lname" });
db.trainningCenter2.find({ firstName: "Mohamed", lastName: "Hamed" }).explain();


// 8.Try to delete from your collection where _id = 5 [insert it if not exists]
db.trainningCenter2.deleteOne({ _id: 5 });

// 9.Delete all documents from the trainingCenter collection.
db.trainningCenter2.deleteMany({});

// 11.Backup your Labs database (Mongo_ITI) 
// docker exec -it mongodb mongodump --db test --out /data/backup
// docker cp mongodb:/data/backup ./mongo-backup


// 12.Restore your Labs database (Mongo_ITI) from the backup you created in step 11

// docker cp "D:\ITI\Courses\NoSQL\Mongodb\Day4\mongo-backup\test" mongodb:/data/restore/test
// docker exec -it mongodb mongorestore --db test /data/restore/test
// docker exec -it mongodb mongosh

use ('test');
db.dropDatabase("test");

use ('test');
db.test.showCollections();