from flask import Flask
app = Flask(__name__)

'''If everything works fine you will get a 
message that Flask is working on the first
page of the application
'''

# https://www.digitalocean.com/community/tutorials/how-to-structure-a-large-flask-application-with-flask-blueprints-and-flask-sqlalchemy

@app.route('/')
def check():
    return 'Flask is working'

if __name__ == '__main__':
    app.run()