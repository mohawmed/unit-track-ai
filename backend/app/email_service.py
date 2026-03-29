import os
import logging

# Configure logging for email mock
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def send_notification_email(user_email, user_name, subject, message):
    """
    Sends a notification email. 
    Currently mocks the sending by logging to console/logs.
    In production, this would use smtplib or a service like SendGrid/Mailgun.
    """
    logger.info(f"--- EMAIL SERVICE MOCK ---")
    logger.info(f"To: {user_name} <{user_email}>")
    logger.info(f"Subject: {subject}")
    logger.info(f"Body: {message}")
    logger.info(f"---------------------------")
    return True

def notify_of_new_feedback(user_email, user_name, reviewer_name):
    subject = "UniTrack AI: New Feedback Received"
    message = f"Hello {user_name},\n\nYou have received new feedback from {reviewer_name} on the UniTrack AI platform. Log in to view the details."
    return send_notification_email(user_email, user_name, subject, message)

def notify_of_deadline(user_email, user_name, task_title, deadline):
    subject = f"UniTrack AI: Deadline Approaching - {task_title}"
    message = f"Hello {user_name},\n\nThe deadline for your task '{task_title}' is approaching on {deadline}. Please ensure your progress is up to date."
    return send_notification_email(user_email, user_name, subject, message)
