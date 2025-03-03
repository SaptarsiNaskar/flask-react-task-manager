# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow your React app to communicate with Flask

tasks = [
    {"id": 1, "task": "Learn Flask"},
    {"id": 2, "task": "Learn React"}
]

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    new_task = request.get_json()
    tasks.append({"id": len(tasks) + 1, "task": new_task['task']})
    return jsonify({"message": "Task added"}), 201

if __name__ == '__main__':
    app.run(debug=True)
