# UniTrack AI Backend

This is the FastAPI backend for the UniTrack AI platform. It uses SQLite as a database via SQLAlchemy ORM.

## Setup Instructions

### 1. Requirements
- Python 3.8+
- Node.js (for the frontend)

### 2. Install Dependencies
Navigate to the `backend` directory and run:
```bash
pip install -r requirements.txt
```

### 3. Initialize Database
Run the migration script to seed the database with current mock data:
```bash
python migrate_data.py
```
This will create a `unitrack.db` file in the `backend` directory.

### 4. Run the API Server
Start the server using uvicorn:
```bash
python -m uvicorn app.main:app --reload --port 8000
```
The API will be available at `http://localhost:8000`. 
You can view the interactive documentation (Swagger) at `http://localhost:8000/docs`.

## Integration Notes
- The frontend is configured to talk to `http://localhost:8000`.
- Ensure the backend is running before testing the platform features like Login, Tasks, or Chat.
