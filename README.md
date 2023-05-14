<h1 align="center">Image Gallery Section</h1>

<div align="center">
  <h3>
    <a href="https://kisi.kibuika.com" target="_blank">
      Live Demo
    </a>
    
  </h3>
</div>


## Project Structure

The project is organised in a monorepo with two main directories

 - /server
 - /web-app

 ### The /server 

 This is a Nodejs server that is responsible for data handling ( uploading of images and fetching of data - the images in association with articles )

 It is organised in a typical Nodejs structure with the ``src`` directory as the main directory that holds the breadth of the application.

 Within the ``src``, there are other directories
    
    - app  - this is where the entry point of the application is

    - config - contains common configurations that can be reused

    - middleware - contains all the functions responsible for connecting other application components.

    - tests - this directory contains all the tests for the application ( in this case, the tests only check whether 
    the routes function as they should - the test coverage is low and could definitely be improved)

    - v1/routes - contains all the API routes ( There are 2 routes, both are named "/images", a GET route to get all the data and a POST route that accepts multiple images for upload ).

Within the root of the server, there are other directories

    - data - this contains the articles file ( this is also where the data file is also kept - read more on this below )

    - images - this is where all the images are stored

    - .github/workflow - contains the main github actions file


#### The API routes

- GET "/images" - This route is responsible for fetching all the images in the /images directory, it also reads all the articles in /data/articles.json and creates a file "associated-images.json" that is stored in the /data directory. This generated file contains an array of objects of the structure ``{image: "image url", article: {title: "article title", description: "article description"}}``. This file is what is read and its content is returned as the desired data.

- POST "/images" - This routes accepts multiple images and uploads them into the /images directory.



### The /web-app

This is a React app bootstrapped with Vite and Typescript. It's core responsibility is to act as the user interface of the entire project. It displays the images and articles and also provides the point of images uploading.

The decision to use Vite and Typescript is because Vite has a faster dev server than create-react-app. Choosing Typescript is primarily because of the need to avoid minor Javascript errors and enhance my experience working through the application, that said, given the size of the application and the amount of data involved, Javascript would still have been great.

The web-app is relatively small in terms of structure as compared to the server.

 - The main page ``src/pages/Main.tsx`` is the root page of the application. The other page is the 404 page which is just a nice-to-have for good user experience.



## Getting Started

To run the application here are some major prerequisites

    - Nodejs 
    - Vite

#### Installing dependencies 

For the server, run:

    cd server && npm install

For the web-app, run 

    cd web-app && npm install

#### Running the applications 

Once you get into the directory you want by `` cd [server or web-app]  ``

for the server, run:

    npm start 

and for the web app, run:

    npm run dev 


#### Environment variables

This project makes use of environment variables. See the ``.env.example`` files in each main directory to see the required environment values. Create a ``.env`` file and add the approprite variables and their values.





##### Viola! Happy Hacking!
