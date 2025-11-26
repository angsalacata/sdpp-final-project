from flask import Blueprint

streaming_apis = Blueprint('streaming_apis', __name__)


@streaming_apis.route("/")
def get_stream():
    return "got streaming object"
