from flask import Flask
from controllers.archive import archive_apis
from controllers.schedule import schedule_api
from controllers.streaming import streaming_apis



app = Flask(__name__)

'''If everything works fine you will get a 
message that Flask is working on the first
page of the application
'''

# https://www.digitalocean.com/community/tutorials/how-to-structure-a-large-flask-application-with-flask-blueprints-and-flask-sqlalchemy
# https://stackoverflow.com/questions/56462914/extend-a-blueprint-in-flask-splitting-it-into-several-files

app.register_blueprint(archive_apis, url_prefix="/archive")
app.register_blueprint(schedule_api, url_prefix="/schedule")
app.register_blueprint(streaming_apis, url_prefix="/stream")


if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=8080)
