from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/api/greet', methods=['POST'])
def greet():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({"error": "Name is required"}), 400

    name = data['name']
    greeting_message = f"Hello {name}!"
    return jsonify({"message": greeting_message})

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(host='0.0.0.0',debug=True, port=5000)
