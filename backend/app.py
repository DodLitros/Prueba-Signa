import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:postgres@localhost:5432/brandsdb"
)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})
with app.app_context():
    db.create_all()
    
class Brand(db.Model):
    __tablename__ = "brands"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    owner = db.Column(db.String(150), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "owner": self.owner,
            "created_at": self.created_at.isoformat()
        }

@app.route("/api/health", methods=["GET"])
def health():
    return {"status": "ok"}

@app.route("/api/brands", methods=["GET"])
def list_brands():
    q = Brand.query.order_by(Brand.id.desc()).all()
    return jsonify([b.to_dict() for b in q])

@app.route("/api/brands/<int:brand_id>", methods=["GET"])
def get_brand(brand_id):
    b = Brand.query.get_or_404(brand_id)
    return jsonify(b.to_dict())

@app.route("/api/brands", methods=["POST"])
def create_brand():
    data = request.get_json(force=True) or {}
    name = data.get("name", "").strip()
    owner = data.get("owner", "").strip()
    if not name or not owner:
        return {"error": "name and owner are required"}, 400

    b = Brand(name=name, owner=owner)
    db.session.add(b)
    db.session.commit()
    return jsonify(b.to_dict()), 201

@app.route("/api/brands/<int:brand_id>", methods=["PUT"])
def update_brand(brand_id):
    b = Brand.query.get_or_404(brand_id)
    data = request.get_json(force=True) or {}
    name = data.get("name", "").strip()
    owner = data.get("owner", "").strip()

    if not name or not owner:
        return {"error": "name and owner are required"}, 400

    b.name = name
    b.owner = owner
    db.session.commit()
    return jsonify(b.to_dict())

@app.route("/api/brands/<int:brand_id>", methods=["DELETE"])
def delete_brand(brand_id):
    b = Brand.query.get_or_404(brand_id)
    db.session.delete(b)
    db.session.commit()
    return {"deleted": True, "id": brand_id}, 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)