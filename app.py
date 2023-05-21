from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/payment")
def payment():
    return render_template("payment.html")

if __name__ == "__main__":
    app.run()