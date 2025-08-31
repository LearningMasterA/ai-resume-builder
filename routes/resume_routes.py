from flask import Blueprint, request, jsonify, current_app
from services.resume_service import save_resume, load_resume, list_templates, update_resume, delete_resume
from models import db, User

bp = Blueprint("resume", __name__, url_prefix="/resume")

@bp.route("/save", methods=["POST"])
def save():
    payload = request.get_json()
    if not payload:
        return jsonify({"error": "Invalid or missing JSON body"}), 400

    # Simple validation: require user_id and personal_info.full_name
    user_id = payload.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    # ensure user exists (or create placeholder if you want)
    user = User.query.filter_by(user_id=user_id).first()
    if not user:
        return jsonify({"error": f"User {user_id} not found"}), 400

    try:
        resume_id = save_resume(payload)
        return jsonify({"resume_id": resume_id, "message": "saved"}), 201
    except Exception as e:
        current_app.logger.error(e)
        return jsonify({"error": "failed to save resume", "details": str(e)}), 500

@bp.route("/load/<int:resume_id>", methods=["GET"])
def load(resume_id):
    data = load_resume(resume_id)
    if not data:
        return jsonify({"error": "resume not found"}), 404
    return jsonify(data), 200

@bp.route("/templates", methods=["GET"])
def templates():
    return jsonify(list_templates()), 200

@bp.route("/update/<int:resume_id>", methods=["PUT"])
def update(resume_id):
    payload = request.get_json()
    if not payload:
        return jsonify({"error": "Invalid JSON body"}), 400
    try:
        rid = update_resume(resume_id, payload)
        if rid is None:
            return jsonify({"error": "resume not found"}), 404
        return jsonify({"resume_id": rid, "message": "updated"}), 200
    except Exception as e:
        current_app.logger.error(e)
        return jsonify({"error": "failed to update resume", "details": str(e)}), 500

@bp.route("/delete/<int:resume_id>", methods=["DELETE"])
def delete(resume_id):
    ok = delete_resume(resume_id)
    if not ok:
        return jsonify({"error": "resume not found or delete failed"}), 404
    return jsonify({"message": "deleted"}), 200
