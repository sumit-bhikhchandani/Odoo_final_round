
#BookMaster

BookMaster is a library management system designed to simplify book inventory management, user interactions, and administrative tasks.

Features
User Management: Manage user accounts and roles (Admin, User).
Book Inventory: Add, update, delete, and search for books.
Technologies Used
Frontend: React.js, Ant Design, Axios
Backend: Node.js, Express.js, MongoDB
Authentication: JWT (JSON Web Tokens)
Email: Nodemailer for email notifications
Getting Started
Prerequisites
Node.js (v14 or above)
MongoDB
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/BookMaster.git
cd BookMaster

Install dependencies:

bash
Copy code
cd frontend
npm install
cd ../backend
npm install
Set up environment variables:

Create a .env file in the backend directory:
makefile
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmaster
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
Start the backend server:

bash
Copy code
cd backend
npm start
Start the frontend development server:

bash
Copy code
cd ../frontend
npm start
Open your browser and visit http://localhost:3000 to view the application.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Ant Design for UI components
Express.js and MongoDB for backend infrastructure








