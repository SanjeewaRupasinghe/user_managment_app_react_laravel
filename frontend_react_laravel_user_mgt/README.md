# Laravel + React User Management

This is a Laravel + React project that allows you to manage users of your web application. It includes features for creating, updating, and deleting users.

## Project Structure

The project is divided into the following folders:

- `app`: Contains the application code, including Laravel controllers and models.
  - `Http`: Contains the controllers.
  - `Models`: Contains the models.
- `backend-react-user-mgt`: Contains the backend Laravel code.
  - `app`: Contains the Laravel application code.
  - `bootstrap`: Contains the bootstrap files.
  - `config`: Contains configuration files.
  - `database`: Contains the database files.
  - `public`: Contains publicly accessible files.
  - `resources`: Contains views, CSS, and JavaScript files.
  - `routes`: Contains route definitions.
  - `storage`: Contains framework generated files.
  - `tests`: Contains unit tests.
- `frontend-user-management`: Contains the frontend React code.
  - `src`: Contains the React application code.
  - `public`: Contains the publicly accessible files.
    - `public`: Contains publicly accessible files.
    - `resources`: Contains views, CSS, and JavaScript files.
    - `routes`: Contains route definitions.
    - `storage`: Contains framework generated files.
    - `tests`: Contains unit tests.

## Clone the repository:

```bash
$ git clone https://github.com/your-username/backend-react-user-mgt.git
```

## Backend Installation

1. Install dependencies:

```bash
$ cd backend-react-user-mgt
$ composer install
```

2. Set up the database:

```bash
$ cp .env.example .env
$ php artisan migrate
```

3. Run the development server:

```bash
$ php artisan serve
```

4. Open your browser and navigate to `http://localhost:8000` to see the application.

5. To stop the development server, press `Ctrl + C` in the terminal.


## Frontend Installation

1. Install dependencies:

```bash
$ cd frontend-react-user-management
$ npm install
```

2. Run the development server:

```bash
$ npm run dev
```

3. Open your browser and navigate to `http://localhost:3000` to see the application.
