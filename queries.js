use("plp_bookstore")


// 1. Find all books in the "Fiction" genre
db.books.find({ genre: "Fiction" })

// 2. Find books published after 1950
db.books.find({ published_year: { $gt: 1950 } })

// 3. Find books by George Orwell
db.books.find({ author: "George Orwell" })

// 4. Update the price of "The Alchemist"
db.books.updateOne({ title: "The Alchemist" }, { $set: { price: 12.99 } })

// 5. Delete "Moby Dick" from collection
db.books.deleteOne({ title: "Moby Dick" })

//  Advanced Queries

// 6. Books that are in stock AND published after 2000
db.books.find({ in_stock: true, published_year: { $gt: 2000 } })

// 7. Projection: show only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 8. Sort by price
db.books.find().sort({ price: 1 })   // Ascending
db.books.find().sort({ price: -1 })  // Descending

// 9. Pagination: 5 books per page
db.books.find().skip(0).limit(5)   
db.books.find().skip(5).limit(5)   

// Aggregation Pipelines

// 10. Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 11. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// 12. Group books by decade
db.books.aggregate([
  { $project: { decade: { $concat: [ { $substr: [ "$published_year", 0, 3 ] }, "0s" ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

// Indexing

// 13. Index on title
db.books.createIndex({ title: 1 })

// 14. Compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 15. Explain performance
db.books.find({ title: "1984" }).explain("executionStats")
