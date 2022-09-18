# Tip of your tongue

Let's figure this out together! Options for 
* Synonym based
* Completing the last word in your sentence
* Sounds like ...
* I think it starts with ...



## Developing

### Tools
* [Node.js](https://nodejs.org/en/download/)

### Frontend
In a new terminal session, navigate to the `code/frontend/` directory and run the following

```shell
$ npm install
$ npm start
```

### Backend
To run the backend locally, navigate to the `code/backend/` directory. Create a virtual environment and install flask and python-dotenv

```shell
$ cd code/flask-backend
$ python3 -m venv env
$ pip install flask
$ pip install python-dotenv
$ pip install flask_cors
$ pip install openai
```

Create a file called `.flaskenv` in the same directory and paste the following lines to run the flask back end and access APIs
```
FLASK_APP=base.py
FLASK_ENV=development
OPENAI_API_KEY=<insert key>
ASSEMBLYAI_API_KEY=<insert key>
CAT_API_KEY=<insert key>
```

Run the back end
```
$ flask run
```

To work with spacy vectors, you need to download the vectors (after installing spacy):
```shell
$ python -m spacy download en_core_web_lg
```


cat logo from [freesvg](https://freesvg.org/cat-silhouette-vector)

