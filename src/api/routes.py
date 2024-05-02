"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask_mail import Mail
from flask_mail import Message
from datetime import datetime, timedelta
import requests
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import uuid
from urllib.parse import quote
import smtplib
import ssl
from email.message import EmailMessage

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active")
    user = User.query.filter_by(email = email).first()
    if user is not None:
        return jsonify({"msg": "User account already exists"})
    newUser = User(email = email, password = password, activity_level = "", weight = "")
    db.session.add(newUser)
    db.session.commit()
    return jsonify("Added User"), 200

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg" : "Bad username or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": user.serialize()}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "Please login"})
    else:
        return jsonify({"user_id": user.id, "email":user.email}), 200
@api.route('/user', methods=['PUT'])
@jwt_required()
def recover_password():
    request_body = request.get_json()
    id = get_jwt_identity()
    user = User.query.filter_by(id=id).first()
    email = request_body.get('email')
    weight = request_body.get('weight')
    activity_level = request_body.get('activity_level')
    password = request_body.get('password')
    
    if user is not None:
        user.email = email
        user.weight = weight
        user.activity_level = activity_level
        user.password = password
        db.session.commit()
        return jsonify(user.serialize()), 201

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    id = get_jwt_identity()
    user = User.query.filter_by(id=id).first()

    if user is not None:
        return jsonify(user.serialize()), 200

    return jsonify({"message": "Uh-oh"}), 400


@api.route('/forgotpassword', methods=['POST'])
def forgotpassword():
    try:
        body = request.get_json()
        email = body.get("email")

        if not email:
            print("No email was provided")
            return jsonify({"message": "No email was provided"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            print("User doesn't exist")
            return jsonify({"message": "User doesn't exist"}), 404

        # Generate a reset token
        reset_token = str(uuid.uuid4())
        user.reset_token = quote(reset_token)
        db.session.commit()

        expiration_time = datetime.utcnow() + timedelta(hours=1)
        payload = {
            'email': email,
            'exp': expiration_time.timestamp(), 
            'reset_token': quote(reset_token)
        }
        access_token = create_access_token(identity=payload)

        # Email configuration
        FRONTEND_URL = os.getenv('FRONTEND_URL')
        SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
        URL_TOKEN = f"{FRONTEND_URL}/recoverPassword?token={access_token}"

        email_receiver = email
        email_subject = "Reset Your Password for NourishNav"
        email_body = (
            f"Hello,\n\nYou requested a password reset for your NourishNav account. "
            f"If you did not request this, please ignore this email.\n\n"
            f"Please use the following link to reset your password:\n{URL_TOKEN}\n\n"
            f"This link is valid for 1 hour. After that, you will need to request a new password reset.\n\n"
            f"Sincerely,\nThe NourishNav Team"
        )

        message = EmailMessage()
        message.set_content(email_body)
        message['Subject'] = email_subject
        message['From'] = 'nourishnav@gmail.com'  
        message['To'] = email_receiver

        try:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('smtp.sendgrid.net', 465, context=context) as server:
                server.login('apikey', SENDGRID_API_KEY)
                server.send_message(message)
            print("Password reset link sent to email.")
            print("Generated reset token:", reset_token)
            print("User reset token:", user.reset_token)
            return jsonify({"message": "Ok, Password reset link sent to email."}), 200
        except Exception as e:
            print(f"Error sending email: {e}")
            return jsonify({'error': str(e)}), 500

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': str(e)}), 500

@api.route('/recoverPassword', methods=['POST'])
@jwt_required()
def recoverPassword():
    body= request.get_json()
    identity = get_jwt_identity()
    if 'email' in identity:
        email = identity['email']
        user= User.query.filter_by(email=email).first()
        password=body.get("password")
        if user is not None:
            user.password=password
            db.session.commit()
            return jsonify("Password updated"), 200
    else:
        return jsonify("cannot find user"), 400