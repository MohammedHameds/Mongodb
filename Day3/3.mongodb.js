2// 2.Calculate the total revenue for product from sales collection documents within the date range '01-01-2020' 
// to '01-01-2023' and then sort them in descending order by total revenue. a.Total Revenue=  Sum (Quantity * Price)

use ('sales');

db.sales.find({}); 

db.sales.aggregate([
{
  $match: {  date: {
    $gte: ISODate("2020-01-01"),
    $lt: ISODate("2023-01-01")
  }}
},
{
  $group: {
    _id: "$product",
    total_revenue: {
      $sum: {
        $multiply: ["$quantity", "$price"]
      }
    }
  }
},
{
  $sort: {
    total_revenue: -1
  }
}
])

// 3.Try Query 2 using Robo 3T using aggregate wizard and insert result into new collection named “newColl”
db.newColl.insertMany(
  db.sales.aggregate([
    {
      $match: { date: {
        $gte: ISODate("2020-01-01"),
        $lt: ISODate("2023-01-01")
      }}
    },
    {
      $group: {
        _id: "$product",
        total_revenue: {
          $sum: {
            $multiply: ["$quantity", "$price"]
          }
        }
      }
    },
    {
      $sort: {
        total_revenue: -1
      }
    }
  ]).toArray()
);


db.newColl.find({});


// 4.Calculate the average salary for employees for each department from the employee’s collection.
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      average_salary: {
        $avg: "$salary"
      }
    }
  }
]);

db.employees.find({});

// 5.Use likes Collection to calculate max and min likes per title
db.likes.aggregate([
  {
    $group: {
      _id: "$title",
      max_value: { $max: "$likes" },
      min_value: { $min: "$likes" }
    }
  }
]);


// 6.Get inventory collection Count , countDocuments
db.inventory.count({});
db.inventory.countDocuments({});


// 7.Display 5 documents only from inventory collection
db.inventory.find({}).limit(5);

// 8.Count numbers of large Pizza size from orders collection  [using $count inside aggregate function]
db.orders.aggregate([
  {
    $match: {
      size: "large"
    }
  },
  {
    $count: "large_pizza_count"
  }
]);


// 9.Create two collections in MongoDB that represent a manual relationship between students and their projects. Then retrieve related data using aggregation.
/* Insert into students collection
db.students.insertMany([
  { _id: 1, name: "Ali", email: "ali@mail.com" },
  { _id: 2, name: "Sara", email: "sara@mail.com" }
])

Insert into projects collection
db.projects.insertMany([
  { _id: 101, title: "AI Project", studentId: 1 },
  { _id: 102, title: "Web App", studentId: 2 }
])
Output:
{
 		 "_id": 101,
 		 "title": "AI Project",
  		"studentName": "Ali",
 		"studentEmail": "ali@mail.com"
}
{
  "_id": 102,
  "title": "Web App",
  "studentName": "Sara",
  "studentEmail": "sara@mail.com"
}
*/


db.students.insertMany([
  { _id: 1, name: "Ali", email: "ali@mail.com" },
  { _id: 2, name: "Sara", email: "sara@mail.com" }
])


db.projects.insertMany([
  { _id: 101, title: "AI Project", studentId: 1 },
  { _id: 102, title: "Web App", studentId: 2 }
])

db.students.find({});

db.projects.find({});


db.projects.aggregate([
  {
    $lookup: {
      from: "students",         
      localField: "studentId",  
      foreignField: "_id",      
      as: "students"
    }
  },
  {
    $unwind: "$students"
  },
  {
    $project: {
      _id: 1,
      title: 1,
      studentName: "$students.name",
      studentEmail: "$students.email"
    }
  }
])
