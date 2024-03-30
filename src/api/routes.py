"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['PUT'])
@jwt_required()
def recover_password():
    request_body = request.get_json()
    id = get_jwt_identity()
    user = User.query.filter_by(id=id).first()
    email = request_body.get('email')
    weight = request_body.get('weight')
    activity_level = request_body.get('activity_level')
    
    if user is not None:
        user.email = email
        user.weight = weight
        user.activity_level = activity_level
        db.session.commit()
        return jsonify(user.serialize()), 201
