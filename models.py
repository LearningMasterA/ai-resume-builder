from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# ---------- Models ----------
class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    resumes = db.relationship("Resume", back_populates="user", cascade="all, delete-orphan")

class Resume(db.Model):
    __tablename__ = "resumes"
    resume_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    title = db.Column(db.String(255))
    version = db.Column(db.Integer, default=1, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="resumes")
    personal_info = db.relationship("PersonalInfo", uselist=False, back_populates="resume", cascade="all, delete-orphan")
    education = db.relationship("Education", back_populates="resume", cascade="all, delete-orphan")
    experience = db.relationship("Experience", back_populates="resume", cascade="all, delete-orphan")
    projects = db.relationship("Project", back_populates="resume", cascade="all, delete-orphan")
    skills = db.relationship("Skill", back_populates="resume", cascade="all, delete-orphan")
    certificates = db.relationship("Certificate", back_populates="resume", cascade="all, delete-orphan")
    areas_of_improvement = db.relationship("AreaOfImprovement", back_populates="resume", cascade="all, delete-orphan")

class PersonalInfo(db.Model):
    __tablename__ = "personal_info"
    info_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    resume_id = db.Column(db.BigInteger, db.ForeignKey("resumes.resume_id", ondelete="CASCADE"), nullable=False, unique=True)
    full_name = db.Column(db.String(255))
    phone = db.Column(db.String(50))
    address = db.Column(db.String(500))
    linkedin = db.Column(db.String(255))
    github = db.Column(db.String(255))
    portfolio = db.Column(db.String(255))

    resume = db.relationship("Resume", back_populates="personal_info")

class Education(db.Model):
    __tablename__ = "education"
    edu_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    resume_id = db.Column(db.BigInteger, db.ForeignKey("resumes.resume_id", ondelete="CASCADE"), nullable=False)
    degree = db.Column(db.String(255))
    institution = db.Column(db.String(255))
    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))
    grade = db.Column(db.String(50))

    resume = db.relationship("Resume", back_populates="education")

class Experience(db.Model):
    __tablename__ = "experience"
    exp_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    resume_id = db.Column(db.BigInteger, db.ForeignKey("resumes.resume_id", ondelete="CASCADE"), nullable=False)
    company = db.Column(db.String(255))
    role = db.Column(db.String(255))
    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))
    description = db.Column(db.Text)

    resume = db.relationship("Resume", back_populates="experience")

class Project(db.Model):
    __tablename__ = "projects"
    project_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    resume_id = db.Column(db.BigInteger, db.ForeignKey("resumes.resume_id", ondelete="CASCADE"), nullable=False)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    tech_stack = db.Column(db.String(500))
    link = db.Column(db.String(500))

    resume = db.relationship("Resume", back_populates="projects")

class Skill(db.Model):
    __tablename__ = "skills"
    skill_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    resume_id = db.Column(db.BigInteger, db.ForeignKey("resumes.resume_id", ondelete="CASCADE"), nullable=False)
    category = db.Column(db.String(100))
    skill_name = db.Column(db.String(100))

    resume = db.relationship("Resume", back_populates="skills")

class Certificate(db.Model):
    __tablename__ = "certificates"
    cert_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    resume_id = db.Column(db.BigInteger, db.ForeignKey("resumes.resume_id", ondelete="CASCADE"), nullable=False)
    title = db.Column(db.String(255))
    issuer = db.Column(db.String(255))
    date_str = db.Column(db.String(20))

    resume = db.relationship("Resume", back_populates="certificates")

class AreaOfImprovement(db.Model):
    __tablename__ = "areas_of_improvement"
    improve_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    resume_id = db.Column(db.BigInteger, db.ForeignKey("resumes.resume_id", ondelete="CASCADE"), nullable=False)
    description = db.Column(db.Text)

    resume = db.relationship("Resume", back_populates="areas_of_improvement")

class ResumeVersion(db.Model):
    __tablename__ = "resume_versions"
    version_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    resume_id = db.Column(db.BigInteger, db.ForeignKey("resumes.resume_id", ondelete="CASCADE"), nullable=False)
    version = db.Column(db.Integer, nullable=False)
    payload_json = db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
