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
        "phone": request.form.get("phone"),
        "paymentOption": request.form.get("paymentOption"),
        "paymentMethod": request.form.get("paymentMethod"),
    }
    return jsonify({"success": True, "message": "Subscription successful!"})

@app.route('/internacional')
def internacional():
    return render_template('delfi-internacional.html')

if __name__ == '__main__':
    app.run(debug=True)
