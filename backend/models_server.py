from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the model
model = joblib.load('backend/models/model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Assuming your model expects some input data for prediction:
    prediction = model.predict([data['input']])
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
