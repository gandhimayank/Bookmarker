// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem('bookmarks') === null) {
        // Init Array
        var bookmarks = [];
        // Add to Array
        bookmarks.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from Local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to Array
        bookmarks.push(bookmark)
        // Reset Back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }

    // clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();
    // prevent form from submitting
    e.preventDefault();
}

// Delete Bookmarks
function deleteBookmark(url) {
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for(var i=0; i<bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Reset Back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get output id
    var bookmarksResults = document.getElementById('bookmarksResults')
    // Build Output
    bookmarksResults.innerHTML = '';
    for(var i=0; i<bookmarks.length;i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                      '</h3>'+
                                      '</div>'
    }
}

//Validate form 
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}
