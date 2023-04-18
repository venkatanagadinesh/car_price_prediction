from flask import Flask, request, jsonify
import util
from config import DevConfig
from exts import db
from flask_cors import CORS
from ma import ma
from user import User, user_schema
from post import post_schema,posts_schema,Post
from car import Car

app = Flask(__name__)
app.config.from_object(DevConfig)

app.app_context().push()
db.init_app(app)

CORS(app)

@app.route('/get_car_names', methods=['GET'])
def get_car_names():
    response = jsonify({
        'cars': util.get_car_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_car_price', methods=['POST'])
def predict_car_price():
    print(1)
    data = request.get_json()
    car = Car()
    car.Model = str(data['Model'])
    car.vehicle_age = int(data['vehicle_age'])
    car.km_driven = int(data['km_driven'])
    car.fuel = data['fuel']
    car.transmission = data['transmission']
    car.owner = data['owner']
    car.seller_type = data['seller_type']
    response = jsonify({
        'estimated_price': util.get_selling_price(car)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

# User API's

# Create User
@app.route('/createAccount', methods = ['POST'])
def createAccount():
    emailId = request.json['emailId']
    password = request.json['password']
    firstName = request.json['firstName']
    lastName = request.json['lastName']

    user = User(emailId=emailId, password=password, firstName=firstName, lastName=lastName)
    existingUser = User.query.get(emailId)
    print(existingUser)
    if(existingUser != None):
        return jsonify({"message":"failed"})

    db.session.add(user)
    db.session.commit()

    return jsonify({"message":"success"})

#Login
@app.route('/login', methods = ['POST'])
def login():
    emailId = request.json['emailId']
    password = request.json['password']

    user = User.query.get(emailId)

    if(user.password == password):
        return jsonify({"message":"success"})
    
    return jsonify({"message":"failed"})

@app.route('/getUserDetails/<emailId>', methods = ['GET'])
def getUserDetails(emailId):
    user = User.query.get(emailId)

    return user_schema.jsonify(user)




# Post API's

#  Create Post
@app.route('/createPost', methods = ['POST'])
def createPost():
    
    title = request.json['title']
    description = request.json['description']
    price = request.json['price']
    status = request.json['status']
    dateCreated = request.json['dateCreated']
    carMake = request.json['carMake']
    carModel = request.json['carModel']
    carYear = request.json['carYear']
    carMileage = request.json['carMileage']
    contact = request.json['contact']
    location = request.json['location']
    image = request.json['image']
    user = request.json['user']

    post = Post(title, description, price, status, dateCreated, carMake,carModel, carYear, carMileage, contact,location, image, user)

    db.session.add(post)
    db.session.commit()

    return post_schema.jsonify(post)

# Get all posts
@app.route('/getPosts', methods = ['GET'])
def getPosts():

    return posts_schema.jsonify(Post.query.all())

# Get posts by User
@app.route('/getPosts/<user>', methods = ['GET'])
def getUserPosts(user):

    posts = Post.query.all()
    userPosts = []

    for userPost in posts:
        if userPost.user == user :
            userPosts.append(userPost)

    return posts_schema.jsonify(userPosts)

@app.route('/deletePost/<id>', methods = ['PUT'])
def updatePost(id):
    post:Post = Post.query.get(id)

    post.status = 'soldOut'
    db.session.commit()

    return post_schema.jsonify(post)


if __name__=="__main__":
    db.create_all()
    print("starting python flask server for car price prediction")
    util.load_saved_artifacts()
    print(util.get_car_names())
    app.run(host='0.0.0.0',port=8000)
