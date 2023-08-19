
# Netflix Application

This is a Netflix-like application built with React. It allows users to browse and watch movies, create movies, update and delete, and manage their accounts of admin through adding update role and details and also delete users.

## Features

- User authentication: Users can register, log in, and log out of their accounts.
  - and check for the role of the user and display the admin panel for admin and user panel for user.
  - with fancy messages to user to illustrate the process of registration and login success or failure.
- Homepage: Users are greeted with a homepage that displays recommended movies in different genres.
  - home page have about 4 main components:
    - Navbar: with the logo and the search bar and the login and register buttons and vary from users and admins.
    - MainMovie: with the recommended movie and data about it and option to see more details and watch its trailer.
    - Categories: about main 4 categories of movies and option to see more details and watch its trailer while hover on the film itself or click on it to go and play it.
        - drama
        - action
        - family
        - comedy
    - footer: with main links which is heavey searched for and also reservations.
- Search: Users can search for movies by title through all the database of movies and can view and more details and also hover so you can play trailer.
- Admin Movies: Administrators have access to an admin panel where they can manage movies through this main crud operations functions:
    - Add new movie: Admins can add new movies to the application.
    - Edit movie: Admins can edit the details of existing movies and by clicking it get all data of this movie so you can update what you want smoothly.
    - Delete movie: Admins can delete movies from the application.
- Admin Users: Administrators have access to an admin panel where they can manage users and can make this main functions:
    - Edit users: Admins can view and edit user accounts and by clicking it get all data of this user so you can update what you want smoothly.
    - Delete users: Admins can delete users from the application.
    - Add new user: Admins can add new users to the application with respect that have new .
    - Update role: Admins can update the role of users to be admin or user through toggle button.
- Play movie: Users can play movies and watch them in the application with information about the movie and cast.
- User profile: Users can view and edit their profile information.

## Installation

1. Clone the repository:  `git clone https://github.com/your-username/netflix-app.git`
2. Install dependencies:  `npm install`
3. Start the development server:  `npm start`

## Technologies Used

- React: JavaScript library for building user interfaces.
- React Router: Library for handling routing in React applications.
- CSS: Styling the application.
- API: API for fetching movie data and users data of our backend project.

## Folder Structure
├── src \
│   ├── components \
│   │   ├── NavbarComponent.js \
│   │   ├── LoginComponent.js \
│   │   ├── LogoutComponent.js\
│   │   ├── RegisterComponent.js\
│   │   ├── NotFound.js\
│   │   ├── Search.js\
│   │   ├── Admin.js\
│   │   ├── AddNew.js\
│   │   ├── EditUsers.js\
│   │   ├── MainComponent.js\
│   │   ├── MylistMainComponent.js\
│   │   ├── FooterComponent.js\
│   │   ├── PlayerComponent.js\
│   │   ├── EditMovie.js\
│   │   └── UserComponent.js\
│   ├── App.js\
│   └── index.js\
├── public
│   ├── index.html\
│   └── logo.png\
├── package.json\
└── README.md\
