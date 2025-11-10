import sqlite3
import json
import os
from datetime import datetime

DB_PATH = 'autotestai_pro.db'

def init_db():
    """Initialize SQLite database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Projects table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            project_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            upload_path TEXT NOT NULL,
            uploaded_at TEXT NOT NULL,
            file_count INTEGER DEFAULT 0,
            analysis_data TEXT,
            generated_tests TEXT,
            test_results TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Test results table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS test_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id TEXT NOT NULL,
            test_run_id TEXT NOT NULL,
            results_data TEXT NOT NULL,
            executed_at TEXT NOT NULL,
            FOREIGN KEY (project_id) REFERENCES projects (project_id)
        )
    ''')
    
    # Q-learning stats table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS q_learning_stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            state TEXT NOT NULL,
            action TEXT NOT NULL,
            reward REAL NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def save_project(project_data):
    """Save or update project data"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT OR REPLACE INTO projects 
        (project_id, name, upload_path, uploaded_at, file_count, analysis_data, generated_tests)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        project_data['project_id'],
        project_data['name'],
        project_data['upload_path'],
        project_data['uploaded_at'],
        project_data.get('file_count', 0),
        json.dumps(project_data.get('analysis', {})),
        json.dumps(project_data.get('generated_tests', {}))
    ))
    
    conn.commit()
    conn.close()

def get_project(project_id):
    """Retrieve project data"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM projects WHERE project_id = ?', (project_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return None
    
    return {
        'project_id': row[0],
        'name': row[1],
        'upload_path': row[2],
        'uploaded_at': row[3],
        'file_count': row[4],
        'analysis': json.loads(row[5]) if row[5] else {},
        'generated_tests': json.loads(row[6]) if row[6] else {},
        'test_results': json.loads(row[7]) if row[7] else {}
    }

def save_test_results(project_id, results_data):
    """Save test results for a project"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    test_run_id = str(hash(str(results_data) + str(datetime.now())))
    
    cursor.execute('''
        INSERT INTO test_results 
        (project_id, test_run_id, results_data, executed_at)
        VALUES (?, ?, ?, ?)
    ''', (
        project_id,
        test_run_id,
        json.dumps(results_data),
        datetime.now().isoformat()
    ))
    
    # Update project with latest results
    cursor.execute('''
        UPDATE projects SET test_results = ? WHERE project_id = ?
    ''', (json.dumps(results_data), project_id))
    
    conn.commit()
    conn.close()

def get_test_history(project_id, limit=10):
    """Get test history for a project"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT * FROM test_results 
        WHERE project_id = ? 
        ORDER BY executed_at DESC 
        LIMIT ?
    ''', (project_id, limit))
    
    rows = cursor.fetchall()
    conn.close()
    
    return [
        {
            'test_run_id': row[2],
            'results': json.loads(row[3]),
            'executed_at': row[4]
        }
        for row in rows
    ]