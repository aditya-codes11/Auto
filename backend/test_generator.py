import random
import json
from datetime import datetime

class TestGenerator:
    def __init__(self):
        self.test_templates = self._load_test_templates()
    
    def generate_test_suite(self, project_analysis, config=None):
        """Generate comprehensive test suite based on project analysis"""
        if config is None:
            config = {}
        
        test_suite = {
            'metadata': {
                'generated_at': datetime.now().isoformat(),
                'project_analysis_version': '1.0',
                'config': config
            },
            'test_cases': [],
            'summary': {
                'total_tests': 0,
                'by_category': {},
                'by_endpoint': {}
            }
        }
        
        # Generate endpoint tests
        endpoints = project_analysis.get('endpoints', [])
        for endpoint in endpoints:
            endpoint_tests = self._generate_endpoint_tests(endpoint, config)
            test_suite['test_cases'].extend(endpoint_tests)
        
        # Generate integration tests
        integration_tests = self._generate_integration_tests(endpoints, config)
        test_suite['test_cases'].extend(integration_tests)
        
        # Generate performance tests
        performance_tests = self._generate_performance_tests(endpoints, config)
        test_suite['test_cases'].extend(performance_tests)
        
        # Generate security tests
        security_tests = self._generate_security_tests(endpoints, config)
        test_suite['test_cases'].extend(security_tests)
        
        # Update summary
        test_suite['summary']['total_tests'] = len(test_suite['test_cases'])
        test_suite['summary']['by_category'] = self._categorize_tests(test_suite['test_cases'])
        test_suite['summary']['by_endpoint'] = self._group_tests_by_endpoint(test_suite['test_cases'])
        
        return test_suite
    
    def _generate_endpoint_tests(self, endpoint, config):
        """Generate tests for a single endpoint"""
        tests = []
        base_path = endpoint['path']
        methods = [endpoint['method']] if endpoint.get('method') else ['GET', 'POST', 'PUT', 'DELETE']
        
        for method in methods:
            # Happy path tests
            tests.append({
                'id': f"test_{len(tests) + 1}",
                'name': f"{method} {base_path} - Valid Request",
                'type': 'endpoint',
                'category': 'functional',
                'priority': 'high',
                'endpoint': base_path,
                'method': method,
                'headers': self._generate_headers(method),
                'payload': self._generate_payload(method, base_path),
                'expected_status': self._get_expected_status(method, 'success'),
                'validation_rules': [
                    {"field": "status_code", "condition": "equals", "value": self._get_expected_status(method, 'success')},
                    {"field": "response_time", "condition": "less_than", "value": 1000}
                ]
            })
            
            # Edge case tests
            edge_cases = self._generate_edge_cases(method, base_path)
            tests.extend(edge_cases)
            
            # Error case tests
            error_cases = self._generate_error_cases(method, base_path)
            tests.extend(error_cases)
        
        return tests
    
    def _generate_integration_tests(self, endpoints, config):
        """Generate integration tests"""
        tests = []
        
        if len(endpoints) >= 2:
            # Create workflow tests
            workflow_tests = self._create_workflow_tests(endpoints)
            tests.extend(workflow_tests)
        
        # Data flow tests
        data_flow_tests = self._create_data_flow_tests(endpoints)
        tests.extend(data_flow_tests)
        
        return tests
    
    def _generate_performance_tests(self, endpoints, config):
        """Generate performance tests"""
        tests = []
        
        for endpoint in endpoints[:5]:  # Limit to first 5 endpoints for performance
            tests.append({
                'id': f"perf_{len(tests) + 1}",
                'name': f"Performance - {endpoint['method']} {endpoint['path']}",
                'type': 'performance',
                'category': 'performance',
                'priority': 'medium',
                'endpoint': endpoint['path'],
                'method': endpoint.get('method', 'GET'),
                'load_config': {
                    'virtual_users': 10,
                    'duration': 30,
                    'ramp_up': 5
                },
                'thresholds': {
                    'response_time': 2000,
                    'error_rate': 0.01,
                    'throughput': 10
                }
            })
        
        return tests
    
    def _generate_security_tests(self, endpoints, config):
        """Generate security tests"""
        tests = []
        security_checks = [
            'sql_injection', 'xss', 'csrf', 'auth_bypass', 'input_validation'
        ]
        
        for endpoint in endpoints:
            for check in security_checks[:2]:  # Limit security checks
                tests.append({
                    'id': f"sec_{len(tests) + 1}",
                    'name': f"Security {check} - {endpoint['method']} {endpoint['path']}",
                    'type': 'security',
                    'category': 'security',
                    'priority': 'high',
                    'endpoint': endpoint['path'],
                    'method': endpoint.get('method', 'GET'),
                    'security_check': check,
                    'payload': self._generate_security_payload(check),
                    'expected_outcome': 'safe'
                })
        
        return tests
    
    def _generate_headers(self, method):
        """Generate appropriate headers for HTTP method"""
        base_headers = {
            "Content-Type": "application/json",
            "User-Agent": "AutoTestAI-Pro/1.0"
        }
        
        if method in ['POST', 'PUT', 'PATCH']:
            base_headers["Content-Type"] = "application/json"
        
        return base_headers
    
    def _generate_payload(self, method, path):
        """Generate sample payload based on method and path"""
        if method == 'GET':
            return None
        
        # Simple payload generation based on common patterns
        payload_templates = {
            'user': {
                "name": "Test User",
                "email": "test@example.com",
                "age": 30
            },
            'product': {
                "name": "Test Product",
                "price": 99.99,
                "category": "electronics"
            },
            'order': {
                "product_id": 123,
                "quantity": 2,
                "customer_email": "customer@example.com"
            }
        }
        
        # Try to infer payload type from path
        for key in payload_templates:
            if key in path.lower():
                return payload_templates[key]
        
        # Default payload
        return {
            "test_data": "auto_generated",
            "timestamp": datetime.now().isoformat()
        }
    
    def _get_expected_status(self, method, scenario):
        """Get expected HTTP status code"""
        status_codes = {
            'GET': {'success': 200, 'error': 404},
            'POST': {'success': 201, 'error': 400},
            'PUT': {'success': 200, 'error': 400},
            'DELETE': {'success': 204, 'error': 404},
            'PATCH': {'success': 200, 'error': 400}
        }
        
        return status_codes.get(method, {'success': 200, 'error': 400})[scenario]
    
    def _generate_edge_cases(self, method, path):
        """Generate edge case tests"""
        edge_cases = []
        
        if method in ['POST', 'PUT', 'PATCH']:
            # Empty payload
            edge_cases.append({
                'id': f"edge_{len(edge_cases) + 1}",
                'name': f"{method} {path} - Empty Payload",
                'type': 'edge_case',
                'category': 'functional',
                'priority': 'medium',
                'endpoint': path,
                'method': method,
                'payload': {},
                'expected_status': 400,
                'description': 'Test with empty payload'
            })
            
            # Large payload
            edge_cases.append({
                'id': f"edge_{len(edge_cases) + 1}",
                'name': f"{method} {path} - Large Payload",
                'type': 'edge_case',
                'category': 'functional',
                'priority': 'low',
                'endpoint': path,
                'method': method,
                'payload': {"large_data": "x" * 10000},
                'expected_status': self._get_expected_status(method, 'success'),
                'description': 'Test with large payload'
            })
        
        # Invalid content type
        edge_cases.append({
            'id': f"edge_{len(edge_cases) + 1}",
            'name': f"{method} {path} - Invalid Content-Type",
            'type': 'edge_case',
            'category': 'functional',
            'priority': 'medium',
            'endpoint': path,
            'method': method,
            'headers': {"Content-Type": "text/plain"},
            'payload': "invalid json",
            'expected_status': 415,
            'description': 'Test with invalid content type'
        })
        
        return edge_cases
    
    def _generate_error_cases(self, method, path):
        """Generate error case tests"""
        error_cases = []
        
        # Invalid HTTP method
        if method != 'GET':
            error_cases.append({
                'id': f"error_{len(error_cases) + 1}",
                'name': f"Invalid Method for {path}",
                'type': 'error_case',
                'category': 'functional',
                'priority': 'medium',
                'endpoint': path,
                'method': 'INVALID_METHOD',
                'expected_status': 405,
                'description': 'Test with invalid HTTP method'
            })
        
        # Non-existent endpoint
        error_cases.append({
            'id': f"error_{len(error_cases) + 1}",
            'name': f"GET /nonexistent - Not Found",
            'type': 'error_case',
            'category': 'functional',
            'priority': 'low',
            'endpoint': '/nonexistent-endpoint-12345',
            'method': 'GET',
            'expected_status': 404,
            'description': 'Test non-existent endpoint'
        })
        
        return error_cases
    
    def _create_workflow_tests(self, endpoints):
        """Create workflow integration tests"""
        workflow_tests = []
        
        # Simple CRUD workflow
        create_endpoints = [e for e in endpoints if e.get('method') in ['POST']]
        read_endpoints = [e for e in endpoints if e.get('method') in ['GET']]
        update_endpoints = [e for e in endpoints if e.get('method') in ['PUT', 'PATCH']]
        delete_endpoints = [e for e in endpoints if e.get('method') in ['DELETE']]
        
        if create_endpoints and read_endpoints:
            workflow_tests.append({
                'id': f"workflow_{len(workflow_tests) + 1}",
                'name': "Create and Read Workflow",
                'type': 'integration',
                'category': 'workflow',
                'priority': 'high',
                'steps': [
                    {
                        'action': 'create',
                        'endpoint': create_endpoints[0]['path'],
                        'method': 'POST',
                        'payload': self._generate_payload('POST', create_endpoints[0]['path']),
                        'save_response': {'id': 'created_id'}
                    },
                    {
                        'action': 'read',
                        'endpoint': f"{read_endpoints[0]['path']}/${{created_id}}",
                        'method': 'GET',
                        'validate': ['status_code == 200']
                    }
                ]
            })
        
        return workflow_tests
    
    def _create_data_flow_tests(self, endpoints):
        """Create data flow tests"""
        return []  # Simplified for this implementation
    
    def _generate_security_payload(self, check_type):
        """Generate security test payloads"""
        security_payloads = {
            'sql_injection': {
                "username": "admin' OR '1'='1",
                "password": "test"
            },
            'xss': {
                "input": "<script>alert('xss')</script>"
            },
            'csrf': {
                "token": "malicious_token"
            }
        }
        return security_payloads.get(check_type, {})
    
    def _categorize_tests(self, test_cases):
        """Categorize tests by type"""
        categories = {}
        for test in test_cases:
            category = test['category']
            categories[category] = categories.get(category, 0) + 1
        return categories
    
    def _group_tests_by_endpoint(self, test_cases):
        """Group tests by endpoint"""
        endpoint_groups = {}
        for test in test_cases:
            endpoint = test.get('endpoint', 'unknown')
            endpoint_groups[endpoint] = endpoint_groups.get(endpoint, 0) + 1
        return endpoint_groups
    
    def _load_test_templates(self):
        """Load test templates (simplified)"""
        return {
            'functional': {},
            'performance': {},
            'security': {}
        }