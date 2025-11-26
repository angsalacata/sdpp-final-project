from flask import Flask
from controllers.archive import archive_apis



app = Flask(__name__)

'''If everything works fine you will get a 
message that Flask is working on the first
page of the application
'''

# https://www.digitalocean.com/community/tutorials/how-to-structure-a-large-flask-application-with-flask-blueprints-and-flask-sqlalchemy
# https://stackoverflow.com/questions/56462914/extend-a-blueprint-in-flask-splitting-it-into-several-files

app.register_blueprint(archive_apis, url_prefix="/archive")

# @app.route('/')
# def check():
#     return 'Flask is working'

if __name__ == '__main__':
    app.run()