from flask import Flask
from config import Config
from models import db
from flask_migrate import Migrate
from routes.resume_routes import bp as resume_bp
import models  # ensure models is imported so SQLAlchemy registers them

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate = Migrate(app, db)

    # register blueprints
    app.register_blueprint(resume_bp)

    @app.route("/")
    def health():
        return {"status": "ok", "service": "ai-resume-builder-api"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
