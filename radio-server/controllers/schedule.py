from flask import Blueprint
import models


schedule_api = Blueprint('schedule_api', __name__)


@schedule_api.route("/")
def getSchedule():
    return models.Schedule.get_schedule()
