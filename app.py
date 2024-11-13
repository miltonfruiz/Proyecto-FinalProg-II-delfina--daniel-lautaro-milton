from flask import Flask, render_template, request, jsonify, redirect, url_for
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('subscribers.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS subscribers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT,
                    phone TEXT,  -- Cambié # a -- aquí
                    payment_option TEXT,
                    payment_method TEXT,
                    card_type TEXT)''')
    c.execute("PRAGMA table_info(subscribers);")
    columns = [column[1] for column in c.fetchall()]
    if 'phone' not in columns:
        c.execute('ALTER TABLE subscribers ADD COLUMN phone TEXT')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    name = data['name']
    email = data['email']
    phone = data['phone']
    payment_option = data['paymentOption']
    payment_method = data['paymentMethod']
    card_type = data.get('cardType', '')
    conn = sqlite3.connect('subscribers.db')
    c = conn.cursor()
    c.execute("INSERT INTO subscribers (name, email, phone, payment_option, payment_method, card_type) VALUES (?, ?, ?, ?, ?, ?)", 
              (name, email, phone, payment_option, payment_method, card_type))
    conn.commit()
    conn.close()
    return jsonify(success=True)

@app.route('/internacional')
def internacional():
    return render_template('delfi-internacional.html')

@app.route('/redirect_to_index')
def redirect_to_index():
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
