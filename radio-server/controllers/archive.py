from flask import Blueprint
from flask import Flask, jsonify, request, send_file, Response, make_response
import models
import logging

archive_apis = Blueprint('archive_apis', __name__)

ITEMS_PER_PAGE = 10

@archive_apis.route("/", methods = ['GET'])
def get_archive_api():
    try:
        pageVal = request.args['page']
        offset =  (int(pageVal) - 1) * ITEMS_PER_PAGE
        return models.Archive.get_archive(ITEMS_PER_PAGE, offset)
    
    except Exception as e:
        logging.error("error retrieving show archive", e)
        return jsonify({
            'errormsg': "error retrieving show archive" + str(e)
        })
