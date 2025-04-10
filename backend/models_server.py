from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app, resources={
    r"/predict": {
        "origins": [
            "http://localhost:5500",
            "http://127.0.0.1:5500",
            "http://localhost:5501",
            "http://127.0.0.1:5501"
        ],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    }
})
model = joblib.load('models/model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Validate input format
        if 'input' not in data or len(data['input']) != 6:
            return jsonify({'error': 'Invalid input format. Expected {"input": [6 values]}'}), 400

        # Extract values from array
        [
            rating,
            jobs_per_week,
            missed_jobs,
            months_on_platform,
            has_previous_loans,
            previous_loan_performance
        ] = data['input']

        # Convert to appropriate types
        input_data = [
            float(rating),
            int(jobs_per_week),
            int(missed_jobs),
            int(months_on_platform),
            int(has_previous_loans),
            float(previous_loan_performance)
        ]

        prediction = model.predict([input_data])
        return jsonify({'prediction': prediction.tolist()[0]})

    except Exception as e:
        return jsonify({'error': str(e), 'input_received': data}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
