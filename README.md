# Scanwize Interview Task

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/munene-m/scanwize_task
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Set up environment variables**

   JWT_SECRET=
   ADMIN_EMAIL=
   DATABASE_URL= 'Your local postgres database'

4. **Navigate to src directory**

   ```
   cd src
   ```

5. **Run database migration**

   ```
   npx sequelize-cli db:migrate
   ```

6. **Start the server**

   ```
   npm run start
   ```

7. **Access the API documentation:**

   After starting the server, you can access the API documentation using the following link:

   [API Documentation](http://localhost:3000/api-docs)

   Open the link in your web browser to explore and interact with the available endpoints, request examples, and responses.

   **Note:** Make sure the server is running (`npm run start`) before accessing the API documentation.
