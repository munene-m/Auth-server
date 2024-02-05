# Authentication and authorization API

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/munene-m/Auth-server
   ```

2. **Navigate to the project location**

   ```
   cd scanwize_task
   ```

3. **Install dependencies**

   ```
   npm install
   ```

4. **Set up environment variables**

   To configure the application correctly, ensure the following environment variables are set. If they are not already defined, you can set in a `.env` file at the root of the project.

   - **JWT_SECRET**:

     - This variable should contain the secret key used for JSON Web Token (JWT) encryption.

   - **ADMIN_EMAIL**:

     - Provide the email address associated with the administrator account.

   - **DATABASE_URL**:
     - Set the value to the connection string for your local PostgreSQL database.
     - Example: `postgresql://username:password@localhost:5432/your_database_name`
       Replace `username`, `password`, and `your_database_name` with your PostgreSQL credentials and database name.

   Ensure that these variables are appropriately configured to enable the application to run smoothly.

5. **Navigate to src directory**

   ```
   cd src
   ```

6. **Run database migration**

   ```
   npx sequelize-cli db:migrate
   ```

7. **Navigate back to the root of the project**

   ```
   cd ..
   ```

8. **Start the server**

   ```
   npm run start
   ```

9. **Access the API documentation:**

   After starting the server, you can access the API documentation using the following link:

   (http://localhost:3000/api-docs)

   Open the link in your web browser to explore and interact with the available endpoints, request examples, and responses.

   **Note:** Make sure the server is running (`npm run start`) before accessing the API documentation.
