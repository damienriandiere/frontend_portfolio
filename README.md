## Project Description

The objective of this project is to develop a website that can serve as a portfolio for your IT or other projects.

- The website will be fullstack.
- The mandatory programming language to be used is JavaScript.
- The backend will be developed using Node.js, Express, and optionally MongoDB or PostgreSQL [here](https://github.com/damienriandiere/backend_portfolio).
- The frontend will be developed using React.js. You can find the repository for the frontend.
  - The usage of frameworks based on React.js (e.g., Next.js) is prohibited.
  - The usage of website templates is prohibited.

### Sections

One section of the site is for unrestricted browsing. It will include, at a minimum:

- A personal presentation page with a form to send you an email message.
- A project presentation page that will list all projects in their reduced version (Thumbnail, title, introductory description, see project description below).
  - By clicking on a project in this list, all specific project information should appear.
- A mechanism to log in and log out of the admin section (see below).

One section of the site is dedicated to administration, and its access is protected.

- Only users with an account will be able to access it and will therefore be called admins.
- Within this section, you must enable an admin user to create, update, and delete a project.
- The admin section must also have a page showing analytics on the projects.

### Project Object

A project object consists of the following elements:

- A title
- An introductory description (limited to 80 characters)
- A complete description (limited to 250 words)
- A list of keywords (up to 10)
- A thumbnail image
- One to five illustration images
- Any other elements you deem of interest.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development mode](#development-mode)
- [EsLint](#eslint)
- [Project structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository

```bash
git clone https://github.com/damienriandiere/frontend_portfolio.git
```

2. Navigate to the project directory

```bash
cd frontend_portfolio
```

3. Install dependencies

```bash
pnpm install
```

4. Create a file named `.env.local` and fix the variables.

```bash
#sample .env.local file
VITE_URL_BACKEND= #URL for the backend + port ex: http://localhost:3000
VITE_MAILTO= #Email destination for the contact form ex: example@example.com
VITE_ADMIN_CODE= #Code to create an admin account ex: admin
VITE_LINKEDIN_URL= #URL for the linkedin icon ex: https://www.linkedin.com/in/username
VITE_TELEGRAM_URL= #URL for the telegram icon ex: https://t.me/canal
```

## Usage

```bash
pnpm run build
```

and after :

```bash
pnpm run start
```

## Development mode


```bash
pnpm run dev
```

## ESLint

Check for linting errors

```bash
pnpm run lint
```


## Project structure

```
├── public
│   ├── portfolio.svg # Portfolio icon
├── src # Source code
│   ├── components # Controllers for each route
│   ├── utils # Utils for common functions
│   ├── App.jsx # App component
│   ├── main.jsx # Main file
|   └── index.css # Global styles
|── .env # Environment variables
|── .eslintrc.cjs # Eslint config
|── .gitattributes # Gitattributes
|── .gitignore # Gitignore
|── Dockerfile # Dockerfile
|── index.html # Index.html
|── package.json # Package.json
|── pnpm-lock.yaml # Pnpm lock file
|── README.md # Readme
|── vite.config.js # Vite config


```
