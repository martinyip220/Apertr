# 📷 Clickr


Welcome to Clickr👋! A community where you can share your view of the world through your own lens! Showcase your amazing photos by uploading them today! You can also create albums to group up your images. Start by clicking the link below!


### Live Site: 👉 [Clickr](https://clickr.onrender.com/)

*Please note the site may take a few minutes to start up due to the platform it is deployed on.*


# 🔗 Wiki Links
- [Database Schema](https://github.com/martinyip220/Clickr/wiki/Database-Schema)
- [Feature List](https://github.com/martinyip220/Clickr/wiki/MVP-Feature-List)
- [User Stories](https://github.com/martinyip220/Clickr/wiki/User-Stories)

# 💻📚 Tech Stack

## Frameworks, Platforms, and Libraries:

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- Flask SQL Alchemy
- Flask Alembic

## Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# 📩 Connect with me!

##  👉[LinkedIn](https://www.linkedin.com/in/martin-yip-889a9b261/)

# 🔍 Get Started Today!

<img width="2000" alt="splash page" src="https://i.imgur.com/GxLTTHK.jpg">

You can start by clicking on the Log In button in the top left hand corner or either sign up for an account. You can also log in as a demo user.

<img width="2000" alt="log in form" src="https://i.imgur.com/UCVdbr4.jpg">

You can log in here as a demo user or sign up for an account!

<img width="2000" alt="explore page" src="https://i.imgur.com/hnm0vl7.jpg">

Welcome to the explore page where you can view all photos posted on the site. You can upload your own by clicking the upload logo in the navigation bar.


<img width="2000" alt="upload img" src="https://i.imgur.com/CWvEkOR.jpg">

Upload your picture by inputting the url and give it an optional description.

<img width="2000" alt="single img page" src="https://i.imgur.com/dmq6oTn.jpg">

View the photo you just created! If you are the owner of the picture you gain additional commands such as being able to edit and delete the picture!

<img width="2000" alt="album create page" src="https://i.imgur.com/A89pNUO.jpg">

Click the "You" on the navigation bar to be directed to your albums page. You can create your own album by selecting from your photos and giving it a title.

<img width="2000" alt="you page" src="https://i.imgur.com/AUtxf8o.jpg">

The you page consists of all the albums you made! Feel free to edit them as needed or delete them all together. Don't worry! You won't delete the photos inside the albums.

# 🖥️ Get Started Locally!

1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

