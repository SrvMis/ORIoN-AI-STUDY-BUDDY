# ORIoN : AI STUDY BUDDY

<div align="center">
  <img src="https://placehold.co/600x300/22252a/e0e0e0?text=ORIoN" alt="ORIoN App Banner">
</div>

<div align="center">

**An AI-powered learning companion designed to make studying more interactive, efficient, and personalized. Built with Next.js, Genkit, and Google's Gemini model.**


---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-orange?logo=firebase)](https://firebase.google.com/)
[![Genkit](https://img.shields.io/badge/Genkit-blue?logo=google&logoColor=white)](https://firebase.google.com/docs/genkit)

</div>

## ✨ Key Features

- **🧠 Explain Topic:** Get clear, concise, and instant explanations on any complex subject.
- **📝 Generate Quiz:** Create custom multiple-choice quizzes to test your knowledge and prepare for exams.
- **📖 Summarize Text:** Paste in long articles, lecture notes, or documents and receive a quick, easy-to-read summary.
- **✍️ Create a Story:** Spark your imagination by generating unique, creative stories based on any topic.
- **🔊 Read Aloud:** Listen to generated answers and stories with integrated Text-to-Speech (TTS).
- **🌐 Multi-Language Support:** A fully localized interface supporting multiple languages.

---

## 🛠️ Technology Stack

ORIoN is built with a modern, robust, and scalable tech stack:

- **Framework:** [Next.js](https://nextjs.org/) (v15) with React (v19)
- **AI Orchestration:** [Genkit (Google)](https://firebase.google.com/docs/genkit)
- **AI Model:** [Google Gemini 2.5 Flash](https://deepmind.google.com/technologies/gemini/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- **Schema Validation:** [Zod](https://zod.dev/)

---

## 🚀 Getting Started

To get this project up and running on your local machine, follow these steps.

### Prerequisites

- Node.js (v18 or later)
- An `npm` package manager
- A Google Gemini API Key

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SrvMis/ORIoN-AI-STUDY-BUDDY.git
    cd ORIoN-AI-STUDY-BUDDY
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a file named `.env` in the root of the project and add your Gemini API key:
    ```env
    GEMINI_API_KEY="your_api_key_here"
    ```
    You can generate a free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at https://9000-firebase-studio-1768879607450.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev/chat?embedded=0&monospaceUid=663213

---

## 🏗️ System Architecture

The application follows a simple yet powerful client-server architecture:

1.  **Client (Next.js/React):** The user interacts with the application through the web interface built with React components.
2.  **Server (Genkit Flows):** User requests (like asking a question or requesting a quiz) are handled by Genkit flows running as server-side functions.
3.  **Orchestration (Genkit):** Genkit receives the request, constructs a detailed prompt with the appropriate context and output schema, and sends it to the Gemini API.
4.  **AI Processing (Gemini):** Google's Gemini model processes the prompt and generates the required content (text, JSON for a quiz, etc.).
5.  **Response:** The generated content is returned to the client and displayed to the user in a structured format.

*(This architecture is also visualized on the "System Architecture" page within the live application.)*

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

<div align="center">
Made with ❤️ by SrvMis
</div>
