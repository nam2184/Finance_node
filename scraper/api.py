from flask import Flask, jsonify
from scrape import retrieveHistory, retrieveHolders, retrieveActions, retrieveFinancials
from utils import timer

app = Flask(__name__)

def validate_parameters(request):
    ticker = request.args.get('ticker')
    start = request.args.get('start')
    end = request.args.get('end')
    if ticker is None:
        return False, {'error': 'Missing parameters'}
    return True, {'ticker' : ticker, 'start' : start, 'end' : end}

@app.route('/api/financials', methods=['GET','POST'])
@timer
def getFinancials():
    validation, response = validate_parameters(request)
    if not validation:
        return jsonify(response)
    if response['start'] != None:
        data = retrieveFinancials(ticker = response['ticker'], timeframe = { 'start' : response['start'], 'end' : response['end']})
    else :
        data = retrieveFinancials(ticker = response['ticker'])


@app.route('/api/history', method=['GET'])
@timer
def getHistory():
    validation, response = validate_parameters(request)
    if not validation:
        return jsonify(response)
    data = retrieveHistory(ticker = response['ticker']) 

@app.route('/api/holders', method=['GET'])
@timer
def getHolders():
    validation, response = validate_parameters(request)
    if not validation:
        return jsonify(response)
    data = retrieveHolders(ticker = response['ticker'])

@app.route('/api/actions', method=['GET'])
@timer
def getActions():
    validation, response = validate_parameters(request)
    if not validation:
        return jsonify(response)
    data = retrieveActions(ticker = response['ticker']) 

 
