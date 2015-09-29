# FrontEnd-for-ComeOn-Stockholm-AB

![alt tag](https://raw.github.com/Lenz94/Front-End-for-ComeOn-Stockholm-AB/master/images/screenshots/screenshot.png)

This is a project I did for ComeOn Stockholm AB. My task was to bring the Front-End functionality into the application to make it work. This time I worked with "JQuery, Javascript, Knockout &amp; Isotope".

<h2> Functionality </h2>

### Login functionality

* Connect the login form to the /login ajax call.
* On valid username/password, transition to the games list screen.
* On invalid username/password, provide feedback and allow to try again.

### Log out functionality

* Connect the log out button to the /logout ajax call.
* On valid log out, transition to login screen with empty input fields.

### Games list screen

* List all games from the /games ajax call.
* List categories from /categories ajax call.
* Functionality for filtering by typing.
* Functionality to filter by category.
* Start a game by clicking on the play icon.

### Game play screen

* Load the selected game via the provided API
* A way to go back to the Games list screen

## API
There are four methods on the API: login, logout, games, and categories.

### Login
Path: /login

Will give you player information.
<h3>Setup</h3>

 1. Clone this repository to your computer.
 2. Open "index.html" in your browser.
 3. In this game you have 3 users available to use for login:
  
    username: rebecka /
    password: secret

    username: eric /
    password: dad

    username: stoffe /
    password: rock
    
 3. Once you logged in, enjoy and the play the games on the list and filter them through the categories!
