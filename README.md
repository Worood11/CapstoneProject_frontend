## 🖥️ Frontend

### 📘 Project Description  
**Bookstop** is a **Single Page Application (SPA)** platform that helps users discover bookstores, explore events, and share reviews in a modern, multilingual web environment.  

It offers a **responsive** and **interactive** user experience powered by a React frontend and a Django REST Framework backend, allowing smooth and dynamic navigation without page reloads.  

---

### 🗂️ Repository Description  
**Bookstop Frontend** is the **client-side web application** for the Bookstop platform — a bookstore discovery and event management website.  

It delivers a **responsive**, **multilingual** experience (English and Arabic), enabling users to:  
- Browse bookstores and view details  
- Explore bookstore events  
- Submit and view reviews  
- Switch between English and Arabic seamlessly  

This repository contains all React components, pages, routes, and styling for the Bookstop user interface.  


---

### ❄️ IceBox Features

- 🌍 **AI-Powered Translation:** Automatically translate bookstore data and reviews between English and Arabic.  
- ❤️ **Favorites System:** Allow users to save their favorite bookstores for quick access.   
- ✉️ **Email Notifications:** Notify users about upcoming bookstore events or discounts.  

---

### 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Context%20API-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="Context API" />
  <img src="https://img.shields.io/badge/Font%20Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
  <img src="https://img.shields.io/badge/Django%20REST-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django REST" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

---

### 🌐 Live Frontend Site
👉 [Bookstop Frontend Deployment Link](http://localhost:5173/)  


---


### ⚙️ Installation Instructions

#### 🐳 Option 1 — Run with Docker
```bash
# Clone the repository
git clone https://github.com/Worood11/CapstoneProject_frontend.git
cd CapstoneProject_frontend

# Build the Docker image
docker build -t bookstop-frontend .

# Run the container
docker run -p 5173:5173 bookstop-frontend
```
### 💻 Option 2 — Run without Docker
```bash
# Clone the repository
git clone https://github.com/Worood11/CapstoneProject_frontend.git
cd CapstoneProject_frontend

# Install dependencies
npm install

# Start the development server
npm run dev
