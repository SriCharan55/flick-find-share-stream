

# 🎬 Movie Discovery App

An AI-powered **Movie Discovery Platform** built with React.js, Tailwind CSS, Supabase, and shadcn/ui.
This app allows users to explore the **most popular movies across the years**, filter by their preferences, and enjoy a personalized movie-watching experience.

---

## The Problem

Many users want to **explore popular movies** that have been most viewed or talked about across the years. However, most streaming or online platforms face these problems:

* 🎥 **Constant Catalog Updates** – Platforms update their libraries every month, making it hard to find older popular movies.
* 🔍 **Scattered Resources** – Users search across blogs, YouTube, and sites to gather info.
* ⏳ **Time-Consuming** – Switching between apps (trailers, reviews, streaming availability).
* 🎯 **Lack of Personalization** – No easy filtering by year, genre, or rating.

---

## ✅ Our Solution – Movie Discovery App

With **Movie App**, users can discover, explore, and manage movies in one place:

* 🎬 **Top 50 Popular Movies** curated across the years.
* 🎭 **Dynamic Genre Rows** on the homepage with sliding effect.
* 🎥 **Detailed Movie Pages** with: Overview, Cast & Crew, Reviews, Synopsis, YouTube Trailer.
* 📊 **Filter & Search** by year, genre, and rating (includes voice search).
* ⭐ **Movie Grid View** with name, year, and rating.
* 📌 **Watchlist** for logged-in users to save movies.
* 🔗 **Share with Friends** option.
* 📺 **Streaming Options** linked to platforms directly.
* 🌙 **Dark Mode** for better viewing.
* 🎥 **Recommendations** – “You Might Also Like” movies below each detail page.

---

## 🔄 App Workflow

1. **Home Page** → Shows popular movies in sliding genre rows.
2. **Search & Filter** → Find movies by title, genre, year, or rating (voice input available).
3. **Movie Grid & Details** → View ratings, year, synopsis, cast, reviews, and trailer.
4. **User Login** → Create/manage a watchlist and share movies.
5. **Dashboard** → Access saved movies and navigate easily.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, JavaScript, Tailwind CSS, Custom CSS, shadcn/ui
* **Backend & Database:** Supabase
* **Features:** Voice Search, Dark Theme, Watchlist, Sharing
* **Deployment:** Vercel

---

## 🚀 Installation & Setup

Follow these steps to run the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SriCharan55/flick-find-share-stream.git
   cd movie-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Environment Variables** (create a `.env` file in the root folder)

   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_KEY=your_supabase_key
   ```

4. **Run the Development Server**

   ```bash
   npm start
   ```

   Open 👉 [http://localhost:3000] in your browser.

5. **Build for Production**

   ```bash
   npm run build
   ```
   **Deployment** : https://flick-find-share-stream.vercel.app/
   

