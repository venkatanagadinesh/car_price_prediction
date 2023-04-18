from exts import db
from ma import ma
from datetime import datetime

class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), nullable = False)
    description = db.Column(db.Text(), nullable = False)
    price = db.Column(db.Integer, nullable = False)
    status = db.Column(db.String(50), nullable = False)
    dateCreated = db.Column(db.String(50), nullable = False)
    carMake = db.Column(db.String(50), nullable = False)
    carModel = db.Column(db.String(50), nullable = False)
    carYear = db.Column(db.Integer, nullable = False)
    carMileage = db.Column(db.Integer, nullable = False)
    contact = db.Column(db.String(50), nullable = False)
    location = db.Column(db.String(50), nullable = False)
    image = db.Column(db.String(200))
    user = db.Column(db.String(50), db.ForeignKey('user.emailId'))

    def __init__(self, title, description, price, status, dateCreated, carMake, carModel, carYear, carMileage, contact, location, image, user):
        self.title = title
        self.description = description
        self.price = price
        self.status = status
        self.dateCreated = dateCreated
        self.carMake = carMake
        self.carModel = carModel
        self.carYear = carYear
        self.carMileage = carMileage
        self.contact = contact
        self.location = location
        self.image = image
        self.user = user


class PostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title','description', 'price', 'status', 'dateCreated', 'carMake', 'carModel', 'carYear', 'carMileage', 'contact', 'image', 'user')

post_schema = PostSchema()
posts_schema = PostSchema(many = True)


