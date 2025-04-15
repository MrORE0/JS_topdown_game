from flask import Flask, render_template

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
@app.route("/home", methods=["GET", "POST"])
def home():
    return render_template("index.html")


@app.route("/game", methods=["GET", "POST"])
def game():
    return render_template("game.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
