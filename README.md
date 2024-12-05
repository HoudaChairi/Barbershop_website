# Barbershop Website

This is a simple and user-friendly website designed for a barbershop, enabling customers to easily book appointments online.

## Features

- **User-Friendly Interface**: Designed for ease of use.
- **Online Booking**: Customers can book their appointments directly through the website.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Django)
- **Database**: SQLite

## Installation

To run this project locally, follow these steps based on your operating system (Linux, macOS, or Windows).

### 1. Clone the Repository

Start by cloning the repository from GitHub.

```bash
git clone https://github.com/HoudaChairi/Barbershop_website.git
cd Barbershop_website
```

### 2. Set Up the Backend (Python + Django)

#### Linux / macOS

1. Navigate to the backend folder:
   ```bash
   cd barber_backend
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   ```

3. Activate the virtual environment:
   - **Linux/macOS**:
     ```bash
     source venv/bin/activate
     ```

4. Install the required Python dependencies:
   ```bash
   pip3 install -r requirements.txt
   ```

5. Run Django server:
   ```bash
   python3 manage.py runserver
   ```

#### Windows

1. Navigate to the backend folder:
   ```bash
   cd barber_backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows**:
     ```bash
     .\venv\Scripts\activate
     ```

4. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Django server:
   ```bash
   python manage.py runserver
   ```

The backend server should now be running, and you can access it at `http://127.0.0.1:8000`.

---

### 3. Set Up the Frontend (HTML/CSS/JavaScript)

#### Linux / macOS

1. Navigate to the frontend folder:
   ```bash
   cd barber_frontend
   ```

2. Start a simple HTTP server to serve the frontend:
   ```bash
   python3 -m http.server 5000
   ```

#### Windows

1. Navigate to the frontend folder:
   ```bash
   cd barber_frontend
   ```

2. Start a simple HTTP server to serve the frontend:
   ```bash
   python -m http.server 5000
   ```

---

### 4. Access the Website

Now that both the frontend and backend servers are running, open a browser and visit:

```url
http://127.0.0.1:5000/
```
