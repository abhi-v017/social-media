# 🌐 Social Media Platform
A full-stack social media platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Connect, share, and interact with others seamlessly!

✨ Features
✅ User Authentication 🔐 – Secure login & registration system
✅ Post Creation 📝 – Users can create, edit, and delete posts
✅ Commenting System 💬 – Engage with posts through comments
✅ Real-time Notifications 🔔 – Stay updated with live alerts
✅ Responsive Design 📱 – Optimized for various devices

🛠 Tech Stack
Technology	Description
⚛️ Frontend	React.js, Tailwind CSS
🚀 Backend	Node.js, Express.js
🗄 Database	MongoDB
📦 State Management	Redux Toolkit
🔐 Authentication	JSON Web Tokens (JWT)
⚡ Bundler	Vite
⚡ Installation & Setup
Follow these steps to set up the project on your local machine:

1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/abhi-v017/social-media.git
cd social-media
2️⃣ Install Dependencies
bash
Copy
Edit
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
3️⃣ Set Up Environment Variables
Create a .env file inside the backend directory and add the following:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
4️⃣ Run the Application 🚀
bash
Copy
Edit
# Start backend server
cd backend
npm start

# Start frontend development server
cd ../frontend
npm run dev
Your application should now be running locally! 🎉

🛠 Usage Guide
📌 Authentication – Register or log in to access the platform.
📌 Creating Posts – Navigate to "Create Post," enter your content, and submit.
📌 Interacting with Posts – Like, comment, and engage with posts.
📌 Notifications – Get real-time updates on user interactions.

🔗 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate a user
GET	/api/posts	Retrieve all posts
POST	/api/posts	Create a new post
PUT	/api/posts/:id	Update an existing post
DELETE	/api/posts/:id	Delete a post
POST	/api/posts/:id/comments	Add a comment to a post
🤝 Contribution Guidelines
🚀 Want to contribute? Follow these steps:

Fork the repository 🍴
Create a new branch: git checkout -b feature/your-feature-name
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature-name
Open a pull request 📩
📜 License
📝 This project is licensed under the MIT License.

👨‍💻 Author
Developed with ❤️ by Abhishek Verma.

🚀 Happy Coding! 🎉
