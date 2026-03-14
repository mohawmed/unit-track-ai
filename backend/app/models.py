from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

# Association table for Team-Student relationship
team_students = Table(
    'team_students',
    Base.metadata,
    Column('team_id', String, ForeignKey('teams.id')),
    Column('student_id', String, ForeignKey('users.id'))
)

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    role = Column(String) # student, professor, assistant, admin
    avatar = Column(String, nullable=True)
    hashed_password = Column(String) # For simple auth
    bio = Column(String, nullable=True)
    
    # Relationships
    teams_as_student = relationship("Team", secondary=team_students, back_populates="students")
    teams_as_professor = relationship("Team", back_populates="professor", foreign_keys="[Team.professor_id]")
    teams_as_assistant = relationship("Team", back_populates="assistant", foreign_keys="[Team.assistant_id]")

class Team(Base):
    __tablename__ = "teams"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    project_title = Column(String)
    progress = Column(Integer, default=0)
    color = Column(String)
    emoji = Column(String)
    
    professor_id = Column(String, ForeignKey('users.id'))
    assistant_id = Column(String, ForeignKey('users.id'))
    
    # Relationships
    professor = relationship("User", back_populates="teams_as_professor", foreign_keys=[professor_id])
    assistant = relationship("User", back_populates="teams_as_assistant", foreign_keys=[assistant_id])
    students = relationship("User", secondary=team_students, back_populates="teams_as_student")
    tasks = relationship("Task", back_populates="team")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, index=True)
    team_id = Column(String, ForeignKey('teams.id'))
    title = Column(String)
    description = Column(String)
    deadline = Column(String)
    status = Column(String) # todo, in_progress, completed
    files_required = Column(Boolean, default=False)
    score = Column(Integer, nullable=True)
    feedback = Column(String, nullable=True)
    color = Column(String)
    
    # Relationships
    team = relationship("Team", back_populates="tasks")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(String, ForeignKey('teams.id'))
    sender_id = Column(String, ForeignKey('users.id'))
    text = Column(String, nullable=True)
    type = Column(String, default="text") # text, voice, image, file
    url = Column(String, nullable=True)
    file_name = Column(String, nullable=True)
    file_size = Column(String, nullable=True)
    duration = Column(Integer, nullable=True)
    time = Column(DateTime, default=datetime.utcnow)
    is_own = Column(Boolean) # This is usually dynamic based on current user, but stored for reference

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey('users.id'))
    type = Column(String)
    title = Column(String)
    message = Column(String)
    time = Column(String) # e.g., "5 min ago" or ISO string
    read = Column(Boolean, default=False)
