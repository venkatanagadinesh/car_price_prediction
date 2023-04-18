from exts import db
from ma import ma

class User(db.Model):
    emailId = db.Column(db.String(50), primary_key = True)
    # userName = db.column(db.String(50), nullable = False)
    password = db.Column(db.String(50), nullable = False)
    firstName = db.Column(db.String(50), nullable = False)
    lastName = db.Column(db.String(50))
    post = db.relationship('Post', backref = 'owner')
    
    def __init__(self, emailId, password, firstName, lastName):
        self.emailId = emailId
        self.password = password
        self.firstName = firstName
        self.lastName = lastName

class UserSchema(ma.Schema):
    class Meta:
        fields = ('emailId','password', 'firstName', 'lastName')

user_schema = UserSchema()