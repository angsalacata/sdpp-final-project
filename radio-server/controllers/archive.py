from flask import Blueprint

archive_apis = Blueprint('archive_apis', __name__)


@archive_apis.route("/")
def getArchive():
    return "got ALL archives"


@archive_apis.route("/single-mix")
def getSingleMix():
    return "got ONE archive"