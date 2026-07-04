# 💜🔮 mafuyu's backend 🔮
backend developed for the mafuyu cards project, responsible for managing and serving all card data for mafuyu asahina from project sekai. this api handles authentication-free data operations, image uploads, and persistence using a modern node.js architecture. 💜

---

## 🔗 live demo
* **💜 frontend:** [mafuyus-frontend.vercel.app](https://mafuyus-frontend.vercel.app/)
* **🔮 backend api:** [mafuyus-backend.onrender.com](https://mafuyus-backend.onrender.com)
* **🎥 video demo:** [watch on youtube](https://youtu.be/vD0fJ_S40I8)

---

## 🔮 preview
<p align="center">
  <img src="./src/images/preview.png" alt="mafuyu's backend preview" width="700"/>
</p>

---

## 💜 overview
the api was built with a focus on **simplicity and reliability**, providing clean routes for card management and serving as the data layer for the mafuyus frontend.

* **💜 crud operations:** full create, read, update and delete support for cards.
* **💜 image uploads:** handles card image uploads with multer and stores them on cloudinary.
* **💜 database:** persistent storage powered by mongodb.
* **💜 organization:** clean separation between routes, models, services and middleware.

---

## 🔮 technologies used
* **node.js**: javascript runtime for the server.
* **express**: web framework for building the api routes.
* **mongodb**: database used for data persistence.
* **mongoose**: object modeling for mongodb.
* **multer**: middleware for handling image uploads in memory.
* **cloudinary**: cloud storage and delivery for card images.
* **postman**: rigorous testing and validation of all api routes.
* **dotenv**: environment variable management.

---

## 🔒 api features
| feature | description |
| :--- | :--- |
| **get cards** | retrieves the complete list of cards. |
| **get card by id** | retrieves detailed information for a single card. |
| **create card** | adds a new card with image upload support. |
| **update card** | edits an existing card's information. |
| **delete card** | permanently removes a card from the database. |
| **image handling** | uploads card art directly to cloudinary and stores the resulting secure url. |

---

## 🔮 project structure
```
mafuyus-backend/
├── src/
│   ├── config/
│   │     └── cloudinary.js
│   │   └── database/
│   │       └── connection.js
│   ├── images/
│   │   └── preview.png
│   ├── middleware/
│   ├── models/
│   │   └── Card.js
│   ├── routes/
│   │   └── card.routes.js
│   ├── services/
│   │   └── api.js
│   └── uploads/
├── .env
├── .gitattributes
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

---

## 💜 repositories
* **backend:** [https://github.com/scriptlver/mafuyus-backend](https://github.com/scriptlver/mafuyus-backend)
* **frontend:** [https://github.com/scriptlver/mafuyus-frontend](https://github.com/scriptlver/mafuyus-frontend)

---

## 🔮 local installation
to run the api on your machine:

### 1. clone the repository
```bash
git clone https://github.com/scriptlver/mafuyus-backend.git
```

### 2. install dependencies
```bash
npm install
```

### 3. set up environment variables
create a `.env` file with your mongodb connection string and your cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

### 4. run the project
```bash
npm start
```

---

## 💜 final notes 🔮
* **language**: the entire project was built in english.
* **data management**: full persistence handled by **mongodb**, with image storage on **cloudinary**.
* **testing**: all crud operations were validated via **postman** to ensure stability and reliability.
* **purpose**: project developed for portfolio, serving as the data layer for the mafuyus frontend.