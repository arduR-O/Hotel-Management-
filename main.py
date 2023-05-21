from flask import Flask, render_template, request, Response
import cv2



app = Flask(__name__)

cap = cv2.VideoCapture(0)

@app.route("/video_capture")
def video_capture():
    pass

@app.route("/")
def hello():
    return render_template("index.html")


@app.route("/read_form", methods=["POST"])
def read_form():
    data = request.form
    print(data)

    return render_template("form.html")

@app.route("/add_item", methods=["GET"])
def add_item():
    data = request.form
    print(data)
    return render_template("form.html", items=None)


app.run(debug=True)