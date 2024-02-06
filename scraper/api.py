from flask import Flask, request, jsonify
from .scrape import Scrape
from .utils import timer, row_to_dict

app = Flask(__name__)
session = Scrape()

def validate_parameters(request):
    ticker = request.args.get('ticker')
    start = request.args.get('start')
    end = request.args.get('end')
    timeframe = request.args.get('timeframe')
    if ticker is None:
        return False, {'error': 'Missing parameters'}
    return True, {'ticker' : ticker, 'timeframe' : timeframe, 'start' : start, 'end' : end}

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/api/history', methods=['GET','POST'])
def getHistory():
    validation, response = validate_parameters(request)
    if not validation:
        return jsonify(response)
    if response['timeframe'] != None:
        df = session.retrieveHistory(ticker = response['ticker'], timeframe = response['timeframe'])
        data = df.apply(row_to_dict, axis=1).tolist()  
        history_json = {
                "ticker" : response['ticker'], 
                "data" : data,
        }
        return jsonify(history_json)
    else :
        df = session.retrieveHistory(ticker = response['ticker'])
        data = df.apply(row_to_dict, axis=1).tolist()  
        history_json = {
                "ticker" : response['ticker'], 
                "data" : data,
        }
        return jsonify(history_json)
'''
@app.route('/api/history', method=['GET'])
@timer
def getHistory():
    validation, response = validate_parameters(request)
    if not validation:
        return jsonify(response)
    data = session.retrieveHistory(ticker = response['ticker']) 

@app.route('/api/holders', method=['GET'])
@timer
def getHolders():
    validation, response = validate_parameters(request)
    if not validation:
        return jsonify(response)
    data = session.retrieveHolders(ticker = response['ticker'])

@app.route('/api/actions', method=['GET'])
@timer
def getActions():
    validation, response = validate_parameters(request)
    if not validation:
        return jsonify(response)
    data = session.retrieveActions(ticker = response['ticker']) 
'''
if __name__ == '__main__' :
    app.run(host='127.0.0.1',port='5000')

