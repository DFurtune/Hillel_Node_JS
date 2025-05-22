# Blog Admin Panel

This project is a blog admin panel that implements authentication and authorization using JWT tokens, along with CRUD operations for users and posts.

## Features

- User authentication and authorization via JWT
- Refresh token functionality
- CRUD operations for users
- CRUD operations for blog posts

## Project Structure

```
blog-admin-panel
├── src
│   ├── controllers          # Contains controllers for handling requests
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   └── postController.ts
│   ├── middleware           # Middleware for authentication
│   │   └── authMiddleware.ts
│   ├── models               # Data models for users and posts
│   │   ├── user.ts
│   │   └── post.ts
│   ├── routes               # Route definitions for the application
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   └── postRoutes.ts
│   ├── services             # Services for JWT handling
│   │   └── jwtService.ts
│   ├── app.ts               # Entry point of the application
│   └── types                # TypeScript types and interfaces
│       └── index.ts
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/blog-admin-panel.git
   ```

2. Navigate to the project directory:
   ```
   cd blog-admin-panel
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Access the API at `http://localhost:3000`.

## API Endpoints

- **Authentication**
  - `POST /auth/login` - Log in and receive JWT tokens
  - `POST /auth/refresh` - Refresh access token using refresh token

- **Users**
  - `POST /users` - Create a new user
  - `GET /users/:id` - Retrieve user by ID
  - `PUT /users/:id` - Update user by ID
  - `DELETE /users/:id` - Delete user by ID

- **Posts**
  - `POST /posts` - Create a new post
  - `GET /posts/:id` - Retrieve post by ID
  - `PUT /posts/:id` - Update post by ID
  - `DELETE /posts/:id` - Delete post by ID

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.