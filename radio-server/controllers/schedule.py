from flask import Blueprint

schedule_api = Blueprint('schedule_api', __name__)


@schedule_api.route("/")
def getSchedule():
    return "got schedule"
