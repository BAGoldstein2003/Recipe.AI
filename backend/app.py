from flask import Flask, request, jsonify
from flask_cors import CORS
from makeRecipe import makeRecipe

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React


@app.route('/submit', methods=['POST'])
def handle_form():
    data = request.json
    recipe = makeRecipe(data)
    print(recipe)
    return jsonify({"message": "Recipe generated successfully", "recipe": recipe})
    

if __name__ == '__main__':
    app.run(debug=True)