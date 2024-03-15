function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}
// used find to search through accounts variable to find matching id

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) => 
  account1.name.last > account2.name.last ? 1 : -1);
}

// used sort to sort the acounts by last name
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  
  books.forEach(book => {
    const borrowedBook = book.borrows;
    borrowedBook.forEach(borrow => {
      if (borrow.id === account.id) total++;
    })
  })
  return total;
}
// used first loop to loop through books array then a second loop to loop through the borrows array that was nesting inside the books array. Then used if to increase total increment if account id's matched 
function getBooksPossessedByAccount(account, books, authors) {
  const booksPossessed = [];
  
  books.forEach(book => {
    let borrowedBook = book.borrows[0];
    if (borrowedBook.id === account.id && !borrowedBook.returned) {
      const bookAuthor = authors.find(author => author.id === book.authorId)
      book.author = bookAuthor;
      booksPossessed.push(book)
    }
  })
  return booksPossessed;
}

  // Made a loop to be able to loop through books to be able to access every books borrowed state. Made an if statement with conditions that the borrowed book has to match account id and has to be not returned. Then used a find method to find the author's dataset and made an author key in book before pushing it into the booksPossessed array I made in the begginning of the function.

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
