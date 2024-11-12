from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = {
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "birthdate": request.form.get("birthdate"),
        "gender": request.form.get("gender"),
        "country": request.form.get("country"),
        "phone": request.form.get("phone"),
        "paymentOption": request.form.get("paymentOption"),
        "paymentMethod": request.form.get("paymentMethod"),
    }
    return jsonify({"success": True, "message": "Subscription successful!"})

if __name__ == '__main__':
    app.run(debug=True)
