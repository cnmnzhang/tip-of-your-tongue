from flask import render_template
from core import app

@app.route('/')
def index():

    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

    # greeting = 'Hello Ace'
    # return render_template('index.html', greet=greeting)