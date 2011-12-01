/**
 * This is the home window
 * 
 * It doesn't do anything fancy, the only thing it does is to create a table
 * with links to other windows that actually demonstrates the functionality
 * 
 * To see how a table is created see the file controls.js in Kitchen Sink
 */

// Create a new variable to hold the current window
var win = Titanium.UI.currentWindow;

// Create a user variable to hold some information about the user
var user = {
	uid: Titanium.App.Properties.getInt("userUid"),
	sessid: Titanium.App.Properties.getString("userSessionId"),
	session_name: Titanium.App.Properties.getString("userSessionName"),
	name: Titanium.App.Properties.getString("userName"),
}

// create table view data object
var data = [
	{title:'Get Node', hasChild:true, test:'includes/get-node.js'},
	{title:'Create content', hasChild:true, test:'includes/create-content.js'},
	{title:'Login', hasChild:true, test:'includes/login.js'},
	{title:'Create account', hasChild:true, test:'includes/create-account.js'},
	{title:'View all content', hasChild:true, test:'includes/view-all-content.js'},
	{title:'Search', hasChild:true, test:'includes/search.js'},
	{title:'Favorites', hasChild:true, test:'includes/favorites.js'},
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title,
			backgroundColor:'#fff',
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
win.add(tableview);


/**
 *************************************
 * CREATE THE POST BUTTON
 *************************************
 */

if(user.sessid) {
	alert("Welcome " + user.name);
	
	// Create a new button
	var rightButton = Ti.UI.createButton({
		title: 'Post',
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});

	// Create a new event listener for the rightButton
	rightButton.addEventListener("click", function() {
		// Create a new window here to show the form
		var postWin = Ti.UI.createWindow({
			// title of the window
			title: "Post",
			
			// the modal indicates that this window will open outside the tabgroup
			modal: true,
			
			// url to the post file
			url: 'includes/post.js',
			
			// do not hide the navigation bar
			navBarHidden: false,
			
			// background color for the new window
			backgroundColor: "#006099",
			
			// close the window on close
			exitOnClose: true,
		});
		
		// open the window
		postWin.open();
	});

	// We don't add the button to the window, instead, we tell the app
	// to set the button as the right navigation button
	win.setRightNavButton(rightButton);
}


