db.getCollectionNames()

use('inventory')

// 1. Find documents where the "tags" field exists.
db.inventory.find({ tags: { $exists: true } })


// 2. Find documents where the "tags" field does not contain values "ssl" or "security."
db.inventory.find({ tags: { $nin: ["ssl", "security"] } })

// 3. Find documents where the "qty" field is equal to 85.
db.inventory.find({ qty: { $eq: 85 } })


// 4. Find documents where the "tags" array contains all of the values [ssl, security] using the `$all` operator.
db.inventory.find({ tags: { $all: ["ssl", "security"] } })

// 5. Find documents where the "tags" array has a size of 3.
db.inventory.find({ tags: { $size: 3 } })


db.inventory.find({ $and: [ { tags: { $all: ["ssl", "security"] } } , { tags: { $size: 2 } } ] })

//6.Update the "item" field in the "paper" document, setting "size.uom" to "meter" and using the `$currentDate` operator.
db.inventory.updateOne(
  { item: "paper" },
  {
    $set: { "size.uom": "meter" },
    $currentDate: { lastModified: true }
  },
)

db.inventory.find({ item: "paper" })

//a.Also, use the upsert option and change filter condition item:”paper”.
db.inventory.updateOne(
  { item: "paper" },
  {
    $set: { "size.uom": "meter" },
    $currentDate: { lastModified: true }
  }
)
//b.Use the `$setOnInsert` operator.  
db.inventory.updateOne(
  { item: "paper" },
  {
    $set: { "size.uom": "meter" },
    $currentDate: { lastModified: true },
    $setOnInsert: { note: "This document is inserted based on SetOnInsert" }
  },
  { upsert: true }
)
//c.Try `updateOne`, `updateMany`, and `replaceOne`.  
db.inventory.updateOne(
  { item: "paper" },
  {
    $set: { "size.uom": "meter" },
    $currentDate: { lastModified: true },
    $setOnInsert: { note: "This document is inserted based on SetOnInsert" }
  },
  { upsert: true }
)

db.inventory.updateMany(
    { item: "paper" },
    {
      $set: { "size.uom": "meter" },
      $currentDate: { lastModified: true },
      $setOnInsert: { note: "This document is inserted based on SetOnInsert" }
    },
    { upsert: true }
  )

db.inventory.find({ item: "paper" })

db.inventory.replaceOne(
  { item: "new_paper" },  
  {
    size: { uom: "meter" },
    lastModified: new Date(),
    note: "the document is inserted based on SetOnInsert"
  },
  { upsert: true }
)

db.inventory.find({ _id: ObjectId("685e7e47534bfd36b587ba8e") })


// 7.Insert a document with incorrect field names "neme" and "ege," then rename them to "name" and "age."
db.inventory.insertOne({
  neme: "Mohamed Hamed",
  ege: 26
})
db.inventory.find({ neme: "Mohamed Hamed" })

db.inventory.updateOne(
  { neme: "Mohamed Hamed" },
  {
    $rename: {
      neme: "name",
      ege: "age"
    }
  }
)
db.inventory.find({ name: "Mohamed Hamed" })


// 8.Try to reset any document field using the `$unset` function.
db.inventory.updateMany(
  { name: "Mohamed Hamed" },
  {
    $unset: {
      age: ""
    }
  }
)
db.inventory.find({ name: "Mohamed Hamed" })

// 9.Try update operators like `$inc`, `$min`, `$max`, and `$mul` to modify document fields.

db.getCollectionNames()

use('sales')

// db.sales.find({ salary: { $exists: true } })
db.sales.find({})

db.sales.insertOne({
   _id: 2,
    "salary": 170,    
    "overtime": 30,
    "price": 12,
    "quantity": 5,
})

db.sales.find({_id: 2 })

db.sales.updateOne(
  { _id: 2 },
  {
    $max: { salary: 160 },
    $min: { overtime: 25 },
    $inc: { price: -3 },
    $mul: { quantity: 2 },
    $mul: { price: 3 }
  }
)


// 10.Provide the MongoDB code for enforcing JSON schema validation when creating a collection named "employees" with required fields "name," "age" (min. 18), and "department" (limited to ["HR," "Engineering," "Finance"]).
db.createCollection("employees", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "department"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string"
        },
        age: {
          bsonType: "int",
          minimum: 18,
          description: "must be an integer"
        },
        department: {
          bsonType: "string",
          enum: ["HR", "Engineering", "Finance"],
          description: "must be one of the specified values"
        }
      }
    }
  }
})

