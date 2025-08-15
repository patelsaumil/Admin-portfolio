# Admin Portfolio API (Express + MongoDB)

Admin backend for managing **Projects** and **Skills** that power the React portfolio.
Includes a minimal admin UI (Pug) for CRUD and a public JSON API that the React app consumes.

> Frontend repo live demo: https://react-portfolio-pied-one-75.vercel.app/

---

## Features

- **CRUD** for Projects & Skills
- **Public JSON API** for the React portfolio
- **Admin UI** (Pug templates) for easy managing content
- **MongoDB Atlas** (or local MongoDB) with Mongoose models
- **CORS** enabled so the React app can fetch data
- **.env support** with `dotenv`

---
## ⚙ Environment

Create a **`.env`** at the project root:

```env
# Use MongoDB Atlas 
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<cluster-id>.mongodb.net/<db-name>?retryWrites=true&w=majority&appName=<AppName>

# Or local MongoDB
# MONGODB_URI=mongodb://127.0.0.1:27017/portfolio

PORT=3000

