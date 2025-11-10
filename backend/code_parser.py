import ast
import os
import re
from typing import Dict, List, Any

class CodeParser:
    def __init__(self):
        self.supported_languages = ['python', 'javascript', 'typescript']
    
    def parse_project(self, project_path: str) -> Dict[str, Any]:
        """Parse entire project and extract structural information"""
        analysis = {
            'files': [],
            'classes': [],
            'functions': [],
            'imports': [],
            'endpoints': [],
            'dependencies': []
        }
        
        for root, dirs, files in os.walk(project_path):
            # Skip common directories that don't contain source code
            dirs[:] = [d for d in dirs if d not in ['.git', '__pycache__', 'node_modules']]
            
            for file in files:
                file_path = os.path.join(root, file)
                file_analysis = self.parse_file(file_path)
                
                if file_analysis:
                    analysis['files'].append(file_analysis)
                    
                    # Aggregate specific elements
                    analysis['classes'].extend(file_analysis.get('classes', []))
                    analysis['functions'].extend(file_analysis.get('functions', []))
                    analysis['imports'].extend(file_analysis.get('imports', []))
                    analysis['endpoints'].extend(file_analysis.get('endpoints', []))
        
        return analysis
    
    def parse_file(self, file_path: str) -> Dict[str, Any]:
        """Parse individual file based on its type"""
        if not os.path.isfile(file_path):
            return None
        
        file_extension = os.path.splitext(file_path)[1].lower()
        
        try:
            if file_extension == '.py':
                return self._parse_python_file(file_path)
            elif file_extension in ['.js', '.ts', '.jsx', '.tsx']:
                return self._parse_javascript_file(file_path)
            else:
                return self._parse_generic_file(file_path)
        except Exception as e:
            return {
                'file_path': file_path,
                'error': str(e),
                'language': 'unknown'
            }
    
    def _parse_python_file(self, file_path: str) -> Dict[str, Any]:
        """Parse Python file using AST"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        try:
            tree = ast.parse(content)
        except SyntaxError:
            return {
                'file_path': file_path,
                'language': 'python',
                'error': 'Syntax error'
            }
        
        analysis = {
            'file_path': file_path,
            'language': 'python',
            'classes': [],
            'functions': [],
            'imports': [],
            'endpoints': []
        }
        
        for node in ast.walk(tree):
            # Extract classes
            if isinstance(node, ast.ClassDef):
                analysis['classes'].append({
                    'name': node.name,
                    'line': node.lineno,
                    'methods': [n.name for n in node.body if isinstance(n, ast.FunctionDef)]
                })
            
            # Extract functions
            elif isinstance(node, ast.FunctionDef):
                analysis['functions'].append({
                    'name': node.name,
                    'line': node.lineno,
                    'args': [arg.arg for arg in node.args.args],
                    'decorators': [self._get_decorator_name(d) for d in node.decorator_list]
                })
            
            # Extract imports
            elif isinstance(node, (ast.Import, ast.ImportFrom)):
                import_info = self._extract_import_info(node)
                analysis['imports'].append(import_info)
        
        # Extract endpoints from Flask/FastAPI decorators
        analysis['endpoints'] = self._extract_python_endpoints(content, file_path)
        
        return analysis
    
    def _parse_javascript_file(self, file_path: str) -> Dict[str, Any]:
        """Parse JavaScript/TypeScript file using regex patterns"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        analysis = {
            'file_path': file_path,
            'language': 'javascript',
            'functions': [],
            'endpoints': [],
            'imports': []
        }
        
        # Extract function definitions
        function_patterns = [
            r'function\s+(\w+)\s*\([^)]*\)\s*{',
            r'const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{',
            r'let\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{',
            r'var\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{'
        ]
        
        for pattern in function_patterns:
            matches = re.finditer(pattern, content)
            for match in matches:
                analysis['functions'].append({
                    'name': match.group(1),
                    'type': 'function'
                })
        
        # Extract Express.js endpoints
        endpoint_patterns = [
            r'app\.(get|post|put|delete|patch)\([\'"]([^\'"]+)[\'"]',
            r'router\.(get|post|put|delete|patch)\([\'"]([^\'"]+)[\'"]'
        ]
        
        for pattern in endpoint_patterns:
            matches = re.finditer(pattern, content)
            for match in matches:
                analysis['endpoints'].append({
                    'method': match.group(1).upper(),
                    'path': match.group(2),
                    'file': os.path.basename(file_path)
                })
        
        # Extract imports
        import_patterns = [
            r'import\s+(?:\{([^}]+)\}\s+from\s+)?[\'"]([^\'"]+)[\'"]',
            r'require\([\'"]([^\'"]+)[\'"]\)'
        ]
        
        for pattern in import_patterns:
            matches = re.finditer(pattern, content)
            for match in matches:
                analysis['imports'].append({
                    'module': match.group(2) if match.lastindex >= 2 else match.group(1),
                    'type': 'import'
                })
        
        return analysis
    
    def _parse_generic_file(self, file_path: str) -> Dict[str, Any]:
        """Parse generic file types"""
        return {
            'file_path': file_path,
            'language': 'unknown',
            'size': os.path.getsize(file_path)
        }
    
    def _get_decorator_name(self, decorator) -> str:
        """Extract decorator name from AST node"""
        if isinstance(decorator, ast.Name):
            return decorator.id
        elif isinstance(decorator, ast.Call):
            if isinstance(decorator.func, ast.Name):
                return decorator.func.id
            elif isinstance(decorator.func, ast.Attribute):
                return decorator.func.attr
        return 'unknown'
    
    def _extract_import_info(self, node) -> Dict[str, Any]:
        """Extract import information from AST node"""
        if isinstance(node, ast.Import):
            return {
                'type': 'import',
                'modules': [alias.name for alias in node.names],
                'names': [alias.asname or alias.name for alias in node.names]
            }
        elif isinstance(node, ast.ImportFrom):
            return {
                'type': 'from_import',
                'module': node.module or '',
                'level': node.level,
                'names': [alias.asname or alias.name for alias in node.names]
            }
    
    def _extract_python_endpoints(self, content: str, file_path: str) -> List[Dict[str, Any]]:
        """Extract API endpoints from Python code using regex"""
        endpoints = []
        
        # Flask patterns
        flask_patterns = [
            r'@app\.route\([\'"]([^\'"]+)[\'"](?:,\s*methods=\[([^\]]+)\])?\)',
            r'@blueprint\.route\([\'"]([^\'"]+)[\'"](?:,\s*methods=\[([^\]]+)\])?\)'
        ]
        
        for pattern in flask_patterns:
            matches = re.finditer(pattern, content)
            for match in matches:
                path = match.group(1)
                methods = match.group(2) if match.group(2) else 'GET'
                methods = [m.strip().strip("'\"") for m in methods.split(',')] if ',' in methods else [methods]
                
                for method in methods:
                    endpoints.append({
                        'method': method.upper(),
                        'path': path,
                        'framework': 'flask',
                        'file': os.path.basename(file_path)
                    })
        
        # FastAPI patterns
        fastapi_patterns = [
            r'@app\.(get|post|put|delete|patch)\([\'"]([^\'"]+)[\'"]\)',
            r'@router\.(get|post|put|delete|patch)\([\'"]([^\'"]+)[\'"]\)'
        ]
        
        for pattern in fastapi_patterns:
            matches = re.finditer(pattern, content)
            for match in matches:
                endpoints.append({
                    'method': match.group(1).upper(),
                    'path': match.group(2),
                    'framework': 'fastapi',
                    'file': os.path.basename(file_path)
                })
        
        return endpoints