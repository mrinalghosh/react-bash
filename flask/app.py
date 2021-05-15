from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

@app.route('/')


@app.route('/command', methods=['GET', 'POST'])
def commandFunction():
    if request.method == 'POST':
        data = json.loads(request.data)
        return data['command']
    elif request.method == 'GET':
        return '<h1>MY FIRST API</h1><p>This site is a prototype API</p>'


if __name__ == '__main__':
    app.run()