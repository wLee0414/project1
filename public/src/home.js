function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach(book => {
        const borrow = book.borrows[0];
    if (!borrow.returned) count++;
  })
  return count;
}
//used forEach and if statement to check all most recent borrowed statuses (book.borrows[0]) of each book to see if its returned. if not returned, increases count 

function getMostCommonGenres(books) {
  const bookGenres = books.map(book => book.genre)
  const mostCommonGenre = [];
  // used map to only grab genres of each book.
  for (let index in bookGenres) {
    const bookGenre = bookGenres[index]
    const genreCount = {"name" : bookGenre, "count" : 1}
    // made a for in loop to create objects w/ the genre and the count
    if (mostCommonGenre.some(genre => genre.name === bookGenre)) {
      mostCommonGenre.forEach(genre => {
        if (genre.name === bookGenre) genre.count++;
      })
    } else {
      mostCommonGenre.push(genreCount);
    }
  }
  //made if statements in the for in loop to check if mostCommonGenre has an object w the genre already. Increases count if it does to the according genre or it creates an object w the genre if it doesn't.
  mostCommonGenre.sort((genreA, genreB) => genreB.count - genreA.count)
  mostCommonGenre.length = 5;
  return mostCommonGenre;
}
// used sort to put it in order from largest to smallest according to count and then assigned array length to 5 for top 5. 

function getMostPopularBooks(books) {
  const orderedList = books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  orderedList.length = 5;
  
  const mostPopularList = []
  orderedList.forEach(book => {
    const listedBook = {"name" : book.title, "count" : book.borrows.length }
    mostPopularList.push(listedBook);
  })
  return mostPopularList;
}
// used sort to put it in order of borrows length from most borrows to least. Then made length equal to 5 to get the 5 most popular books. Then set up an empty array to push a newly created object w/ the format that grabs only the title and borrow amount.

function getMostPopularAuthors(books, authors) {
  let authorjs = require("./books.js");
  let findAuthorById = authorjs.findAuthorById;
  
    let list = [];
    list = books.map(book => ({
      name: book.authorId,
      count: 0
    }));
// to make the object format for each author
  let finalList = [];
  finalList = list.filter(listed => !finalList.includes(listed)
  );
// to push all unique author into an array

 finalList.forEach((listed) => {
    let totalcount = books.reduce((total, book) => {
      if (book.authorId === listed.name) total += book.borrows.length;
      return total;
    }, 0);
    listed.count = totalcount;
  });
// use reduce in books to add up all borrow counts then push with author that matches in finalList 
  finalList.sort((authorA, authorB) => authorB.count - authorA.count);
  finalList.length = 5;
// sorts from greatest to lowest depending on count number. make array only show 5.
  
  finalList.forEach(listed => {
    const author = findAuthorById(authors, listed.name);
    listed.name = `${author.name.first} ${author.name.last}`;
  });
 
  return finalList;
} 


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
