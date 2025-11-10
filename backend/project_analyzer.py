import os
import ast
import json
import re
from pathlib import Path

class ProjectAnalyzer:
    def __init__(self):
        self.supported_extensions = ['.py', '.js', '.java', '.ts', '.jsx', '.tsx']
    
    def analyze_project(self, project_path):
        """Comprehensive project analysis"""
        if not os.path.exists(project_path):
            raise ValueError(f"Project path not found: {project_path}")
        
        analysis = {
            'project_structure': self.analyze_structure(project_path),
            'endpoints': self.extract_endpoints(project_path),
            'dependencies': self.analyze_dependencies(project_path),
            'code_metrics': self.calculate_metrics(project_path),
            'test_files': self.find_test_files(project_path),
            'language_stats': self.get_language_statistics(project_path)
        }
        
        return analysis
    
    def analyze_structure(self, project_path):
        """Analyze project file structure"""
        structure = {}
        
        for root, dirs, files in os.walk(project_path):
            level = root.replace(project_path, '').count(os.sep)
            indent = ' ' * 2 * level
            current_dir = os.path.basename(root)
            
            if level == 0:
                structure['root'] = {
                    'name': current_dir,
                    'type': 'directory',
                    'children': []
                }
                current_node = structure['root']
            else:
                # Find parent node and add current directory
                parent_path = os.path.dirname(root)
                parent_node = self._find_node(structure, parent_path.replace(project_path, '').strip('/'))
                if parent_node:
                    new_node = {
                        'name': current_dir,
                        'type': 'directory',
                        'children': []
                    }
                    parent_node['children'].append(new_node)
                    current_node = new_node
            
            # Add files to current directory
            for file in files:
                if any(file.endswith(ext) for ext in self.supported_extensions + ['.json', '.md', '.txt']):
                    file_node = {
                        'name': file,
                        'type': 'file',
                        'extension': os.path.splitext(file)[1],
                        'size': os.path.getsize(os.path.join(root, file))
                    }
                    current_node['children'].append(file_node)
        
        return structure
    
    def _find_node(self, structure, path):
        """Find node in structure by path"""
        if not path:
            return structure.get('root')
        
        parts = path.split('/')
        node = structure.get('root')
        
        for part in parts:
            if part and node:
                found = False
                for child in node.get('children', []):
                    if child['name'] == part and child['type'] == 'directory':
                        node = child
                        found = True
                        break
                if not found:
                    return None
        return node
    
    def extract_endpoints(self, project_path):
        """Extract API endpoints from code files"""
        endpoints = []
        
        for root, dirs, files in os.walk(project_path):
            for file in files:
                if file.endswith('.py'):
                    endpoints.extend(self._extract_python_endpoints(os.path.join(root, file)))
                elif file.endswith(('.js', '.ts', '.jsx', '.tsx')):
                    endpoints.extend(self._extract_js_endpoints(os.path.join(root, file)))
        
        return endpoints
    
    def _extract_python_endpoints(self, file_path):
        """Extract endpoints from Python Flask/FastAPI files"""
        endpoints = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Parse Flask routes
            flask_patterns = [
                r'@app\.route\(["\']([^"\']+)["\'][^)]*\)\s*def\s+(\w+)',
                r'@blueprint\.route\(["\']([^"\']+)["\'][^)]*\)\s*def\s+(\w+)'
            ]
            
            for pattern in flask_patterns:
                matches = re.finditer(pattern, content)
                for match in matches:
                    endpoints.append({
                        'path': match.group(1),
                        'method': 'GET',  # Default, will be refined
                        'function': match.group(2),
                        'file': os.path.basename(file_path),
                        'type': 'flask'
                    })
            
            # Parse FastAPI endpoints
            fastapi_patterns = [
                r'@app\.(get|post|put|delete|patch)\(["\']([^"\']+)["\']',
                r'@router\.(get|post|put|delete|patch)\(["\']([^"\']+)["\']'
            ]
            
            for pattern in fastapi_patterns:
                matches = re.finditer(pattern, content)
                for match in matches:
                    endpoints.append({
                        'path': match.group(2),
                        'method': match.group(1).upper(),
                        'function': 'unknown',
                        'file': os.path.basename(file_path),
                        'type': 'fastapi'
                    })
                    
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
        
        return endpoints
    
    def _extract_js_endpoints(self, file_path):
        """Extract endpoints from JavaScript/TypeScript files"""
        endpoints = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Express.js routes
            express_patterns = [
                r'app\.(get|post|put|delete|patch)\(["\']([^"\']+)["\']',
                r'router\.(get|post|put|delete|patch)\(["\']([^"\']+)["\']'
            ]
            
            for pattern in express_patterns:
                matches = re.finditer(pattern, content)
                for match in matches:
                    endpoints.append({
                        'path': match.group(2),
                        'method': match.group(1).upper(),
                        'function': 'unknown',
                        'file': os.path.basename(file_path),
                        'type': 'express'
                    })
                    
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
        
        return endpoints
    
    def analyze_dependencies(self, project_path):
        """Analyze project dependencies"""
        dependencies = {}
        
        # Python requirements
        req_file = os.path.join(project_path, 'requirements.txt')
        if os.path.exists(req_file):
            dependencies['python'] = self._parse_requirements_file(req_file)
        
        # Node.js package.json
        package_file = os.path.join(project_path, 'package.json')
        if os.path.exists(package_file):
            dependencies['nodejs'] = self._parse_package_file(package_file)
        
        return dependencies
    
    def _parse_requirements_file(self, file_path):
        """Parse Python requirements.txt"""
        dependencies = []
        try:
            with open(file_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#'):
                        dependencies.append(line)
        except:
            pass
        return dependencies
    
    def _parse_package_file(self, file_path):
        """Parse Node.js package.json"""
        try:
            with open(file_path, 'r') as f:
                package_data = json.load(f)
            
            deps = {}
            if 'dependencies' in package_data:
                deps.update(package_data['dependencies'])
            if 'devDependencies' in package_data:
                deps.update(package_data['devDependencies'])
            
            return deps
        except:
            return {}
    
    def calculate_metrics(self, project_path):
        """Calculate code metrics"""
        metrics = {
            'total_files': 0,
            'total_lines': 0,
            'code_files': 0,
            'code_lines': 0,
            'comment_lines': 0,
            'blank_lines': 0
        }
        
        for root, dirs, files in os.walk(project_path):
            for file in files:
                if any(file.endswith(ext) for ext in self.supported_extensions):
                    file_path = os.path.join(root, file)
                    file_metrics = self._analyze_file_metrics(file_path)
                    
                    metrics['total_files'] += 1
                    metrics['code_files'] += 1
                    metrics['total_lines'] += file_metrics['total']
                    metrics['code_lines'] += file_metrics['code']
                    metrics['comment_lines'] += file_metrics['comments']
                    metrics['blank_lines'] += file_metrics['blank']
        
        return metrics
    
    def _analyze_file_metrics(self, file_path):
        """Analyze metrics for a single file"""
        metrics = {'total': 0, 'code': 0, 'comments': 0, 'blank': 0}
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            metrics['total'] = len(lines)
            
            for line in lines:
                stripped = line.strip()
                if not stripped:
                    metrics['blank'] += 1
                elif stripped.startswith(('#', '//', '/*', '*')) or '#' in line:
                    metrics['comments'] += 1
                else:
                    metrics['code'] += 1
                    
        except:
            pass
        
        return metrics
    
    def find_test_files(self, project_path):
        """Find test files in project"""
        test_files = []
        test_patterns = ['test_', '_test', 'spec.', '.spec']
        
        for root, dirs, files in os.walk(project_path):
            for file in files:
                if any(pattern in file for pattern in test_patterns):
                    test_files.append({
                        'path': os.path.relpath(os.path.join(root, file), project_path),
                        'name': file
                    })
        
        return test_files
    
    def get_language_statistics(self, project_path):
        """Get programming language statistics"""
        lang_stats = {}
        
        for root, dirs, files in os.walk(project_path):
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in ['.py', '.js', '.ts', '.java', '.cpp', '.c', '.html', '.css']:
                    lang = self._extension_to_language(ext)
                    lang_stats[lang] = lang_stats.get(lang, 0) + 1
        
        return lang_stats
    
    def _extension_to_language(self, extension):
        """Map file extension to programming language"""
        mapping = {
            '.py': 'Python',
            '.js': 'JavaScript',
            '.ts': 'TypeScript',
            '.java': 'Java',
            '.cpp': 'C++',
            '.c': 'C',
            '.html': 'HTML',
            '.css': 'CSS'
        }
        return mapping.get(extension, 'Unknown')