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

The backend server should now be running.

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

<img width="1838" alt="image_20241217_220922dbab0d5b-a97c-41b7-ada8-3140239bb3d1" src="https://github.com/user-attachments/assets/a600826e-ce51-4478-a129-ed636d968100" />

<img width="1621" alt="image_20241217_220931e94d6a62-448b-4cae-bf55-a0952526fa74" src="https://github.com/user-attachments/assets/444e6ddf-a8d2-4d6e-9e29-c748aea283ff" />

<img width="1621" alt="image_20241217_2209379de6cb03-582f-46a5-af61-be8f2d0d5d31" src="https://github.com/user-attachments/assets/886cbd6b-5d68-424c-a406-5a78ab2cb8dc" />

