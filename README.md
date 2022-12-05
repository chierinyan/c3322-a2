# COMP3322A Assignment 2

> A simple Notes app with MERN stack


### `App.js`

* Maintains the basic state of the app, and passes the needed state into components by props.

* Defines most callback functions for changing the state and making AJAX requests.


### Components

The app is split into the following components:

* Signin: The sign-in page for username and password input

* Nav: The navigation bar for showing username, user's icon and the logout button

* Notes: The left panel for searching and listing notes

* Menu: The menu bar of the right panel,
for `New`, `Delete` buttons and last saved span when viewing,
and `Cancel` and `Save` buttons when editing

* Main: The main part of the right panel, for viewing and editing a note

    > The note is set by function `Main.set_note(note)`,
    which sets the values of the textareas by refs.

All the components are located in `./noteapp/src/components/`


### Modifications

The new note button is moved to the Menu component
and will be displayed in the top left corner of the right panel.
