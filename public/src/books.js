function finding(arr, id) {
  return arr.find(element => element.id === id)
}
// helper function that finds by matching arr and id;

function findAuthorById(authors, id) {
  return finding(authors, id);
}
// used find to find an author that matches with given id.

function findBookById(books, id) {
  return finding(books, id);
}
//used find to find a book that matches with given id.

function partitionBooksByBorrowedStatus(books) {
  const returned = books.filter(book => book.borrows[0].returned);
  const borrowed = books.filter(book => !book.borrows[0].returned);
  const status = [borrowed, returned];
  return status;
}
// made 2 arrays to seperate based of borrowed status and then nested the two into an array. Then used forEach to cycle through each book in books to check the status and sorted out each book accordingly. 


function getBorrowersForBook(book, accounts) {
 let accountsjs = require("./accounts.js");
 let findAccountById = accountsjs.findAccountById;
 const borrowerList = [];
  //uses require to use the findaccountbyid function from accountjs. makes borrowerlist array to push accounts into

 
  let borrowId = book.borrows
  for (let borrow of borrowId) {
    const borrowAcc = borrow.id;
    const borrowStat = borrow.returned;
    const accountById = findAccountById(accounts, borrowAcc);
    accountById.returned = borrow.returned;
    if (borrowerList.length < 10) borrowerList.push(accountById);
  }
  return borrowerList;
}
// loop thru the borrows array in book to find accounts that match borrowed id using findaccountbyid function and then assigning the return key n value into each account. Then using if to push a max of 10 accounts into the borrowerlist array.

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
