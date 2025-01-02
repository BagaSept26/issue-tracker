# Issue Tracker

This is the boilerplate for the Issue Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker

Anda benar, seharusnya ada pilihan bahasa untuk memudahkan pembaca. Maaf atas kelupaan saya sebelumnya. Berikut adalah README.md yang sudah saya perbaiki dengan menambahkan pilihan bahasa menggunakan HTML details dan summary tag:

<details>
  <summary>🇬🇧 English</summary>
  
  # Issue Tracker

  A full stack web application for tracking issues in projects. This application is built using Node.js, Express.js, and MongoDB. It provides a simple interface for creating, viewing, updating, and deleting issues in a project.

  ## Features

  - Create new issues with title, text, creator, and optional assigned-to and status fields.
  - View a list of issues for a specific project.
  - Filter issues by various criteria (e.g., open/closed, assigned-to, created-by).
  - Update specific issues (change title, text, status, etc.).
  - Delete specific issues.
  - Simple and responsive UI.

  ## Getting Started

  ### Prerequisites

  - Node.js and npm installed on your machine.
  - MongoDB database setup (you can use MongoDB Atlas).

  ### Installation

  1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
  2. Navigate to the project directory:
    ```bash
    cd <project_directory>
    ```
  3. Install dependencies:
    ```bash
    npm install
    ```
  4. Create a `.env` file in the root directory and add your MongoDB connection string (MONGO_URI), and port (PORT).

  ### Running the Application

  1. Start the server:
    ```bash
    npm start
    ```
  2. Open your browser and navigate to `http://localhost:<PORT>` (or the specified port in your `.env` file).

  ### Running the Functional Tests

  1. To run the functional tests you must first set `NODE_ENV` to `test`:
    ```bash
    NODE_ENV=test npm test
    ```
    *Note: Please ensure you do not set `NODE_ENV` in your `.env` file.*

  ## API Endpoints

  - `POST /api/issues/{project}`: Create a new issue.
  - `GET /api/issues/{project}`: View issues for a specific project. You can add optional filters in the query string.
  - `PUT /api/issues/{project}`: Update an existing issue.
  - `DELETE /api/issues/{project}`: Delete an issue.

  ## Contributing

  Feel free to contribute to this project by creating pull requests.

  ## License

  This project is licensed under the MIT License.
</details>

<details>
  <summary>🇮🇩 Bahasa Indonesia</summary>

  # Issue Tracker

  Aplikasi web full stack untuk melacak masalah dalam proyek. Aplikasi ini dibangun menggunakan Node.js, Express.js, dan MongoDB. Menyediakan antarmuka sederhana untuk membuat, melihat, memperbarui, dan menghapus masalah dalam sebuah proyek.

  ## Fitur

  - Membuat masalah baru dengan judul, teks, pembuat, dan field opsional untuk penerima tugas dan status.
  - Melihat daftar masalah untuk proyek tertentu.
  - Memfilter masalah berdasarkan berbagai kriteria (misalnya, terbuka/tertutup, penerima tugas, pembuat).
  - Memperbarui masalah tertentu (mengubah judul, teks, status, dll.).
  - Menghapus masalah tertentu.
  - UI sederhana dan responsif.

  ## Memulai

  ### Prasyarat

  - Node.js dan npm terinstall di mesin Anda.
  - Database MongoDB sudah di setup (Anda dapat menggunakan MongoDB Atlas).

  ### Instalasi

  1. Clone repository:
    ```bash
    git clone <repository_url>
    ```
  2. Pindah ke direktori proyek:
    ```bash
    cd <project_directory>
    ```
  3. Install dependencies:
    ```bash
    npm install
    ```
  4. Buat file `.env` di direktori root dan tambahkan string koneksi MongoDB (MONGO_URI), dan port (PORT)

  ### Menjalankan Aplikasi

  1. Jalankan server:
    ```bash
    npm start
    ```
  2. Buka browser Anda dan navigasi ke `http://localhost:<PORT>` (atau port yang ditentukan di file `.env` Anda).

  ### Menjalankan Functional Test

  1. Untuk menjalankan functional test, Anda harus mengatur `NODE_ENV` ke `test`:
    ```bash
    NODE_ENV=test npm test
    ```
    *Catatan: Pastikan Anda tidak mengatur `NODE_ENV` di file `.env` Anda.*

  ## API Endpoints

  - `POST /api/issues/{project}`: Membuat masalah baru.
  - `GET /api/issues/{project}`: Melihat masalah untuk proyek tertentu. Anda dapat menambahkan filter opsional di query string.
  - `PUT /api/issues/{project}`: Memperbarui masalah yang sudah ada.
  - `DELETE /api/issues/{project}`: Menghapus masalah.

  ## Kontribusi

  Silakan berkontribusi pada proyek ini dengan membuat pull request.

  ## Lisensi

  Proyek ini dilisensikan di bawah Lisensi MIT.
</details>
