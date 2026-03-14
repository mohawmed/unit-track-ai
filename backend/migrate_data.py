from app.database import SessionLocal, engine, Base
from app import models
import datetime

# Create tables
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # 1. Create Users
    users = [
        models.User(id='stu-001', name='Ahmed Mohamed', email='ahmed@university.edu', role='student', bio='Academic enthusiast.'),
        models.User(id='stu-002', name='Hossam Dagaks', email='hossam@university.edu', role='student'),
        models.User(id='stu-003', name='Mona Ali', email='mona@university.edu', role='student'),
        models.User(id='stu-004', name='Ziad Youssef', email='ziad@university.edu', role='student'),
        models.User(id='prof-001', name='Dr. Hassan Ibrahim', email='hassan@university.edu', role='professor'),
        models.User(id='prof-002', name='Dr. Nadia Selim', email='nadia@university.edu', role='professor'),
        models.User(id='ta-001', name='Eng. Sara Khaled', email='sara@university.edu', role='assistant'),
        models.User(id='ta-002', name='Eng. Omar Tarek', email='omar@university.edu', role='assistant'),
        models.User(id='admin-001', name='Administration', email='admin@university.edu', role='admin'),
    ]
    
    for u in users:
        if not db.query(models.User).filter(models.User.id == u.id).first():
            db.add(u)
    
    db.commit()

    # 2. Create Teams
    teams = [
        models.Team(id='team-001', name='Team Alpha', project_title='AI-Powered Library System', progress=68, color='#3b82f6', emoji='🚀', professor_id='prof-001', assistant_id='ta-001'),
        models.Team(id='team-002', name='Team Beta', project_title='E-Learning Platform', progress=45, color='#8b5cf6', emoji='📚', professor_id='prof-001', assistant_id='ta-001'),
        models.Team(id='team-003', name='Team Gamma', project_title='Smart City IoT', progress=30, color='#10b981', emoji='🏙️', professor_id='prof-002', assistant_id='ta-002'),
    ]

    for t in teams:
        if not db.query(models.Team).filter(models.Team.id == t.id).first():
            db.add(t)
            # Add students to teams
            if t.id == 'team-001':
                stu1 = db.query(models.User).filter(models.User.id == 'stu-001').first()
                stu2 = db.query(models.User).filter(models.User.id == 'stu-002').first()
                if stu1: t.students.append(stu1)
                if stu2: t.students.append(stu2)
            elif t.id == 'team-003':
                stu3 = db.query(models.User).filter(models.User.id == 'stu-003').first()
                stu4 = db.query(models.User).filter(models.User.id == 'stu-004').first()
                if stu3: t.students.append(stu3)
                if stu4: t.students.append(stu4)
    
    db.commit()

    # 3. Create Tasks
    tasks = [
        models.Task(id='task-001', team_id='team-001', title='Research & Analysis', description='Study existing systems.', deadline='2026-03-20', status='completed', files_required=True, score=90, feedback='Excellent!', color='#10b981'),
        models.Task(id='task-002', team_id='team-001', title='System Design', description='Design schema.', deadline='2026-03-28', status='completed', files_required=True, score=85, feedback='Good.', color='#10b981'),
        models.Task(id='task-003', team_id='team-001', title='UI/UX Prototype', description='Build prototype.', deadline='2026-04-05', status='in_progress', files_required=True, color='#f59e0b'),
        models.Task(id='task-004', team_id='team-003', title='Requirements Gathering', description='Talk to stakeholders.', deadline='2026-03-25', status='completed', files_required=True, score=88, color='#10b981'),
    ]

    for tk in tasks:
        if not db.query(models.Task).filter(models.Task.id == tk.id).first():
            db.add(tk)
    
    db.commit()

    # 4. Create Initial Messages
    messages = [
        models.Message(team_id='team-001', sender_id='prof-001', text='Great progress on research!', is_own=False),
        models.Message(team_id='team-001', sender_id='stu-001', text='Thank you Dr. Hassan.', is_own=True),
        models.Message(team_id='team-003', sender_id='prof-002', text='Welcome Team Gamma, let\'s start!', is_own=False),
    ]
    
    for m in messages:
        db.add(m)
    
    db.commit()

    # 5. Create Notifications
    notifications = [
        models.Notification(user_id='stu-001', type='feedback', title='New Feedback', message='Dr. Hassan left feedback.', time='5 min ago', read=False),
        models.Notification(user_id='stu-001', type='deadline', title='Deadline Approaching', message='UI prototype due in 3 days.', time='1 hr ago', read=False),
        models.Notification(user_id='stu-003', type='welcome', title='Welcome', message='You have been added to Team Gamma.', time='1 min ago', read=False),
    ]

    for n in notifications:
        db.add(n)
    
    db.commit()
    db.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()
