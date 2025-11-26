from flask import Blueprint

archive_apis = Blueprint('archive_apis', __name__)


@archive_apis.route("/")
def getArchive():
    return "got ALL archives"
