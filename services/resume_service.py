from models import db, Resume, PersonalInfo, Education, Experience, Project, Skill, Certificate, AreaOfImprovement, ResumeVersion, User
from sqlalchemy.exc import SQLAlchemyError
from flask import current_app
import json

# Helper: clear and populate one-to-many child lists
def _clear_and_populate_list(parent, attr_name, items, model_cls, resume):
    # delete old children by replacing the list (SQLAlchemy will handle orphan removal)
    setattr(parent, attr_name, [])
    for entry in items or []:
        # create model instance from entry
        obj = model_cls(**entry)
        obj.resume = resume
        getattr(parent, attr_name).append(obj)

def save_resume(payload: dict):
    """
    Save a new resume. Returns resume_id.
    payload: dict matching resume_schema.json
    """
    try:
        user_id = payload.get("user_id")
        if not user_id:
            # Create placeholder user (or raise). For now create-or-use existing user
            # If you prefer, require user exists and validate in controller.
            raise ValueError("user_id is required")

        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            raise ValueError(f"User with id {user_id} not found")

        resume = Resume(user_id=user.user_id, title=payload.get("title"))
        # personal_info
        pi = payload.get("personal_info")
        if pi:
            resume.personal_info = PersonalInfo(**pi)

        # lists
        for key, model, attr in [
            ("education", Education, "education"),
            ("experience", Experience, "experience"),
            ("projects", Project, "projects"),
            ("skills", Skill, "skills"),
            ("certificates", Certificate, "certificates"),
            ("areas_of_improvement", AreaOfImprovement, "areas_of_improvement")
        ]:
            items = payload.get(key, [])
            for entry in items:
                obj = model(**entry)
                obj.resume = resume
                getattr(resume, attr).append(obj)

        db.session.add(resume)
        db.session.flush()  # to get resume_id

        # save snapshot
        snapshot = ResumeVersion(resume_id=resume.resume_id, version=resume.version, payload_json=payload)
        db.session.add(snapshot)
        db.session.commit()
        return resume.resume_id

    except (SQLAlchemyError, ValueError) as e:
        current_app.logger.error(f"Error saving resume: {e}")
        db.session.rollback()
        raise

def load_resume(resume_id: int):
    resume = Resume.query.filter_by(resume_id=resume_id).first()
    if not resume:
        return None

    result = {
        "resume_id": resume.resume_id,
        "user_id": resume.user_id,
        "title": resume.title,
        "version": resume.version,
        "created_at": resume.created_at.isoformat(),
        "updated_at": resume.updated_at.isoformat() if resume.updated_at else None,
        "personal_info": {},
        "education": [],
        "experience": [],
        "projects": [],
        "skills": [],
        "certificates": [],
        "areas_of_improvement": []
    }
    if resume.personal_info:
        pi = resume.personal_info
        result["personal_info"] = {
            "full_name": pi.full_name,
            "phone": pi.phone,
            "address": pi.address,
            "linkedin": pi.linkedin,
            "github": pi.github,
            "portfolio": pi.portfolio
        }

    def _to_dict_list(rows, fields):
        out = []
        for r in rows:
            d = {}
            for f in fields:
                d[f] = getattr(r, f)
            out.append(d)
        return out

    result["education"] = _to_dict_list(resume.education, ["degree", "institution", "start_date", "end_date", "grade"])
    result["experience"] = _to_dict_list(resume.experience, ["company", "role", "start_date", "end_date", "description"])
    result["projects"] = _to_dict_list(resume.projects, ["title", "description", "tech_stack", "link"])
    result["skills"] = _to_dict_list(resume.skills, ["category", "skill_name"])
    result["certificates"] = _to_dict_list(resume.certificates, ["title", "issuer", "date_str"])
    result["areas_of_improvement"] = _to_dict_list(resume.areas_of_improvement, ["description"])

    return result

def list_templates():
    # static list for now
    templates = [
        {"template_id": 1, "name": "Classic", "preview_url": "/static/templates/classic.png", "description": "Simple clean resume"},
        {"template_id": 2, "name": "Modern", "preview_url": "/static/templates/modern.png", "description": "Modern two-column resume"}
    ]
    return templates

def update_resume(resume_id: int, payload: dict):
    """
    Replace existing resume content with payload and increment version.
    """
    resume = Resume.query.filter_by(resume_id=resume_id).first()
    if not resume:
        return None
    try:
        resume.title = payload.get("title", resume.title)
        # personal_info — replace or create
        pi = payload.get("personal_info")
        if pi:
            if resume.personal_info:
                for k, v in pi.items():
                    setattr(resume.personal_info, k, v)
            else:
                resume.personal_info = PersonalInfo(**pi)
        # clear and repopulate lists
        resume.education = []
        for e in payload.get("education", []):
            obj = Education(**e)
            obj.resume = resume
            resume.education.append(obj)

        resume.experience = []
        for e in payload.get("experience", []):
            obj = Experience(**e)
            obj.resume = resume
            resume.experience.append(obj)

        resume.projects = []
        for p in payload.get("projects", []):
            obj = Project(**p)
            obj.resume = resume
            resume.projects.append(obj)

        resume.skills = []
        for s in payload.get("skills", []):
            obj = Skill(**s)
            obj.resume = resume
            resume.skills.append(obj)

        resume.certificates = []
        for c in payload.get("certificates", []):
            # note: our model field is date_str
            if "date" in c and "date_str" not in c:
                c["date_str"] = c.pop("date")
            obj = Certificate(**c)
            obj.resume = resume
            resume.certificates.append(obj)

        resume.areas_of_improvement = []
        for a in payload.get("areas_of_improvement", []):
            obj = AreaOfImprovement(**a)
            obj.resume = resume
            resume.areas_of_improvement.append(obj)

        # increment version and save snapshot
        resume.version = (resume.version or 1) + 1
        snapshot = ResumeVersion(resume_id=resume.resume_id, version=resume.version, payload_json=payload)
        db.session.add(snapshot)
        db.session.commit()
        return resume.resume_id
    except Exception as e:
        current_app.logger.error(f"Error updating resume: {e}")
        db.session.rollback()
        raise

def delete_resume(resume_id: int):
    resume = Resume.query.filter_by(resume_id=resume_id).first()
    if not resume:
        return False
    try:
        db.session.delete(resume)
        db.session.commit()
        return True
    except Exception:
        db.session.rollback()
        return False
