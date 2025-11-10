import requests
import time
import json
from datetime import datetime

class APITester:
    def __init__(self):
        self.base_url = "http://localhost:5000"  # Default base URL
        self.session = requests.Session()
        self.test_results = []
    
    def run_test_suite(self, project, tests_to_run=None):
        """Execute test suite"""
        if tests_to_run is None:
            tests_to_run = project.get('generated_tests', {}).get('test_cases', [])
        
        results = {
            'test_run_id': f"run_{int(time.time())}",
            'start_time': datetime.now().isoformat(),
            'summary': {
                'total': 0,
                'passed': 0,
                'failed': 0,
                'skipped': 0,
                'success_rate': 0
            },
            'details': [],
            'performance_metrics': {}
        }
        
        for test_case in tests_to_run[:10]:  # Limit for demo
            test_result = self._execute_single_test(test_case)
            results['details'].append(test_result)
            
            if test_result['status'] == 'passed':
                results['summary']['passed'] += 1
            elif test_result['status'] == 'failed':
                results['summary']['failed'] += 1
            else:
                results['summary']['skipped'] += 1
            
            results['summary']['total'] += 1
        
        # Calculate success rate
        if results['summary']['total'] > 0:
            results['summary']['success_rate'] = (
                results['summary']['passed'] / results['summary']['total'] * 100
            )
        
        results['end_time'] = datetime.now().isoformat()
        results['duration'] = time.time() - time.mktime(
            datetime.fromisoformat(results['start_time']).timetuple()
        )
        
        return results
    
    def _execute_single_test(self, test_case):
        """Execute a single test case"""
        test_result = {
            'test_id': test_case.get('id', 'unknown'),
            'test_name': test_case.get('name', 'Unnamed Test'),
            'type': test_case.get('type', 'functional'),
            'category': test_case.get('category', 'unknown'),
            'status': 'skipped',
            'start_time': datetime.now().isoformat(),
            'duration': 0,
            'request': {},
            'response': {},
            'validation_errors': [],
            'error_message': None
        }
        
        try:
            # Prepare request
            url = f"{self.base_url}{test_case.get('endpoint', '')}"
            method = test_case.get('method', 'GET').lower()
            headers = test_case.get('headers', {})
            payload = test_case.get('payload')
            
            test_result['request'] = {
                'url': url,
                'method': method,
                'headers': headers,
                'payload': payload
            }
            
            # Execute request
            start_time = time.time()
            
            if method == 'get':
                response = self.session.get(url, headers=headers, timeout=10)
            elif method == 'post':
                response = self.session.post(url, json=payload, headers=headers, timeout=10)
            elif method == 'put':
                response = self.session.put(url, json=payload, headers=headers, timeout=10)
            elif method == 'delete':
                response = self.session.delete(url, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            
            duration = time.time() - start_time
            
            # Prepare response data
            test_result['response'] = {
                'status_code': response.status_code,
                'headers': dict(response.headers),
                'body': self._safe_parse_response(response),
                'response_time': duration
            }
            
            # Validate response
            self._validate_test_result(test_case, test_result)
            
            test_result['duration'] = duration
            test_result['status'] = 'passed' if not test_result['validation_errors'] else 'failed'
            
        except requests.exceptions.Timeout:
            test_result['status'] = 'failed'
            test_result['error_message'] = 'Request timeout'
        except requests.exceptions.ConnectionError:
            test_result['status'] = 'failed'
            test_result['error_message'] = 'Connection error'
        except Exception as e:
            test_result['status'] = 'failed'
            test_result['error_message'] = str(e)
        
        return test_result
    
    def _safe_parse_response(self, response):
        """Safely parse response content"""
        try:
            return response.json()
        except:
            return response.text[:1000]  # Limit text response
    
    def _validate_test_result(self, test_case, test_result):
        """Validate test result against expectations"""
        expected_status = test_case.get('expected_status')
        response_status = test_result['response']['status_code']
        
        if expected_status and response_status != expected_status:
            test_result['validation_errors'].append(
                f"Expected status {expected_status}, got {response_status}"
            )
        
        # Validate response time if specified
        validation_rules = test_case.get('validation_rules', [])
        for rule in validation_rules:
            field = rule.get('field')
            condition = rule.get('condition')
            value = rule.get('value')
            
            if field == 'response_time':
                actual_value = test_result['response']['response_time']
                if condition == 'less_than' and actual_value >= value:
                    test_result['validation_errors'].append(
                        f"Response time {actual_value}ms exceeds threshold {value}ms"
                    )
    
    def set_base_url(self, base_url):
        """Set base URL for API testing"""
        self.base_url = base_url