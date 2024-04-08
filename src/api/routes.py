"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token


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
    if user:
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
    return jsonify({"token": access_token, "user_id": user.id}), 200

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
