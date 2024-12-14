from pathlib import Path
BASE_DIR_PATH = Path(__file__).resolve().parent.parent


SECRET_KEY = 'DJANGO PRODUCTION SECRET KEY'

CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:3000',
    'http://localhost:3000'
]