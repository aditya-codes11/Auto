from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import uuid
from datetime import datetime

# Import custom modules
from database import init_db, save_project, get_project, save_test_results
from file_upload import handle_file_upload
from project_analyzer import ProjectAnalyzer
from test_generator import TestGenerator
from api_tester import APITester
from self_healer import SelfHealer
from q_learning_agent import QLearningAgent

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Initialize components
init_db()
project_analyzer = ProjectAnalyzer()
test_generator = TestGenerator()
api_tester = APITester()
self_healer = SelfHealer()
q_learning_agent = QLearningAgent()

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def home():
    return jsonify({"message": "AutoTestAI Pro Backend", "status": "running"})

@app.route('/upload-project', methods=['POST'])
def upload_project():
    """Handle project file upload"""
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Handle file upload
        project_id = str(uuid.uuid4())
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], project_id)
        result = handle_file_upload(file, upload_path)
        
        if result['success']:
            # Save project to database
            project_data = {
                'project_id': project_id,
                'name': file.filename,
                'upload_path': upload_path,
                'uploaded_at': datetime.now().isoformat(),
                'file_count': result.get('file_count', 0)
            }
            save_project(project_data)
            
            return jsonify({
                "message": "Project uploaded successfully",
                "project_id": project_id,
                "project_data": project_data
            })
        else:
            return jsonify({"error": result.get('error', 'Upload failed')}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/analyze-project', methods=['POST'])
def analyze_project():
    """Analyze uploaded project structure"""
    try:
        data = request.get_json()
        project_id = data.get('project_id')
        
        if not project_id:
            return jsonify({"error": "Project ID required"}), 400
        
        project = get_project(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        upload_path = project['upload_path']
        analysis_result = project_analyzer.analyze_project(upload_path)
        
        # Update project with analysis results
        project['analysis'] = analysis_result
        save_project(project)
        
        return jsonify({
            "message": "Project analysis completed",
            "analysis": analysis_result
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-tests', methods=['POST'])
def generate_tests():
    """Generate test cases for project"""
    try:
        data = request.get_json()
        project_id = data.get('project_id')
        test_config = data.get('config', {})
        
        if not project_id:
            return jsonify({"error": "Project ID required"}), 400
        
        project = get_project(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        analysis = project.get('analysis', {})
        generated_tests = test_generator.generate_test_suite(analysis, test_config)
        
        # Update project with generated tests
        project['generated_tests'] = generated_tests
        save_project(project)
        
        return jsonify({
            "message": "Test generation completed",
            "tests": generated_tests
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/test-project', methods=['POST'])
def test_project():
    """Execute tests on project"""
    try:
        data = request.get_json()
        project_id = data.get('project_id')
        tests_to_run = data.get('tests', [])
        
        if not project_id:
            return jsonify({"error": "Project ID required"}), 400
        
        project = get_project(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        # Run tests
        test_results = api_tester.run_test_suite(project, tests_to_run)
        
        # Apply self-healing if enabled
        if data.get('enable_self_healing', False):
            healed_tests = self_healer.heal_failed_tests(test_results, project)
            test_results['healed_tests'] = healed_tests
        
        # Update Q-learning agent
        q_learning_agent.update_strategy(test_results)
        
        # Save results
        save_test_results(project_id, test_results)
        
        return jsonify({
            "message": "Testing completed",
            "results": test_results,
            "q_learning_stats": q_learning_agent.get_stats()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/project/<project_id>')
def get_project_details(project_id):
    """Get project details and analysis"""
    try:
        project = get_project(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        return jsonify({"project": project})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/q-learning/stats')
def get_q_learning_stats():
    """Get Q-learning agent statistics"""
    return jsonify(q_learning_agent.get_stats())

if __name__ == '__main__':
    app.run(debug=True, port=5000)