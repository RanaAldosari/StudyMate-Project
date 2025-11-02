StudyMate Platform
StudyMate is an AI-powered learning resource platform that allows students to browse educational courses and materials — with an integrated AI assistant to help them understand and explore content easily.

⚙️ Environment Setup
You need to create three .env files for the project:

One for the frontend

One for the backend

One for the root directory

🧩 .env (Frontend)
Use the same content as in the provided .env.example.

🧩 .env (Backend)
Use the same content as in the provided .env.example, but you MUST uncomment the two lines related to the OpenAI API key and insert your actual GPT key.

⚠️ Note:
I faced an issue when fetching the GPT key from the .env file,
so I had to temporarily write it directly in the code and comment it out.
You will NEED to uncomment that line and replace it with your own GPT key when running the project.

backend=>app=>ai_model.py 

![AI Chat](https://i.postimg.cc/yNGZvwFg/Screenshot-2025-11-02-101045.png)

🧩 .env (Root)
Use the same content as in the provided .env.example.

🐳 Docker Setup
In the root directory, there is a docker-compose.yml file.
It is currently commented out, so you will need to uncomment it before running Docker.
Then you can start the project using:

docker compose up --build


## 📸 Screenshots

### 🏠 Home Page
![Home](https://i.postimg.cc/vZDjnyBt/Screenshot-2025-11-02-095329.png)
![Home](https://i.postimg.cc/Y97bdBrL/Screenshot-2025-11-02-095349.png)

### 🧠 AI Assistant Page
![AI Chat](https://i.postimg.cc/kXSRg6Nw/Screenshot-2025-11-02-104615.png)

### 📚 Course Details Modal
![Course Details](https://i.postimg.cc/VNWjLrwy/Screenshot-2025-11-02-095414.png)

### 🌙 Dark Mode
![Dark Mode](https://i.postimg.cc/0jbmfVwj/Screenshot-2025-11-02-095431.png)

### 🛠️ Not Found Page
![Dark Mode](https://i.postimg.cc/3xH9ZDKH/Screenshot-2025-11-02-095959.png)



💻 Locally:
Frontend: http://localhost:5173

Backend: http://127.0.0.1:8000/docs
