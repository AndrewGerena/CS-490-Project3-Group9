import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='./build/static')

## test
<<<<<<< HEAD
## Andrew
=======
>>>>>>> 8c5894e25f13761697e437c7cc16641e804b1f7c

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
