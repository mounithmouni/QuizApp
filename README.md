# QuizApp

A simple and interactive quiz application built using **Vite** and **React.js**. The app dynamically fetches quiz questions from an external API and displays them to users. Users can answer questions, receive feedback, and track their progress.

## Features:
- **Dynamic Question Fetching:** Fetches quiz questions from an external API in real-time.
- **React.js:** Utilizes React.js for efficient, component-based UI updates.
- **Vite for Fast Development:** Uses Vite as the build tool for a fast and optimized development environment.
- **User Feedback:** Provides immediate feedback to users after submitting answers.
- **Responsive Design:** Fully responsive and mobile-friendly design.

## Tech Stack:
- **Frontend:** React.js
- **Development Environment:** Vite
- **API:** Fetches quiz questions from an external API.
- **Styling:** Styled with basic CSS.

---
## How to Run:
1. Clone the repository.
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Install json-server:
   ```bash
   npm i json-server
   ```
4. Add the scripts in `package.json`:
   ```json
   "server": "json-server --watch data/questions.json --port 9000"
   ```
5. Start the server:
   ```bash
   npm run server
   ```
6. Start the development server:  
   ```bash
   npm run dev
   ```
---
## API:
The app makes API calls to dynamically fetch quiz questions. You can integrate this API or adjust it according to your needs.

---
