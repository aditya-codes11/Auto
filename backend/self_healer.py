import re
import json
from datetime import datetime

class SelfHealer:
    def __init__(self):
        self.healing_patterns = self._load_healing_patterns()
    
    def heal_failed_tests(self, test_results, project):
        """Attempt to heal failed tests"""
        healed_tests = []
        
        for test_detail in test_results.get('details', []):
            if test_detail['status'] == 'failed':
                healed_test = self._attempt_healing(test_detail, project)
                if healed_test:
                    healed_tests.append(healed_test)
        
        return healed_tests
    
    def _attempt_healing(self, failed_test, project):
        """Attempt to heal a single failed test"""
        healing_strategies = [
            self._heal_endpoint_path,
            self._heal_payload_structure,
            self._heal_headers,
            self._heal_expected_status
        ]
        
        for strategy in healing_strategies:
            healed_test = strategy(failed_test, project)
            if healed_test and healed_test != failed_test:
                healed_test['healing_applied'] = True
                healed_test['original_test_id'] = failed_test['test_id']
                healed_test['healing_strategy'] = strategy.__name__
                return healed_test
        
        return None
    
    def _heal_endpoint_path(self, test, project):
        """Heal endpoint path issues"""
        original_endpoint = test['request'].get('url', '')
        
        # Extract path from URL
        path = original_endpoint.replace(self._get_base_url(original_endpoint), '')
        
        # Common path healing patterns
        healing_patterns = [
            (r'^/api/v1/(.+)$', r'/\1'),  # Remove version prefix
            (r'^/(.+)/$', r'/\1'),  # Remove trailing slash
            (r'^(.+)/id/(\d+)$', r'\1/\2'),  # Simplify ID path
            (r'^/api/(.+)$', r'/\1'),  # Remove /api prefix
        ]
        
        for pattern, replacement in healing_patterns:
            healed_path = re.sub(pattern, replacement, path)
            if healed_path != path:
                healed_test = test.copy()
                healed_test['request']['url'] = self._get_base_url(original_endpoint) + healed_path
                return healed_test
        
        return None
    
    def _heal_payload_structure(self, test, project):
        """Heal payload structure issues"""
        if not test['request'].get('payload'):
            return None
        
        original_payload = test['request']['payload']
        
        # Common payload healing strategies
        if isinstance(original_payload, dict):
            healed_payload = original_payload.copy()
            
            # Add missing required fields
            if 'email' not in healed_payload and any(field in str(healed_payload) for field in ['user', 'customer']):
                healed_payload['email'] = 'test@example.com'
            
            # Ensure numeric fields are numbers
            for key, value in list(healed_payload.items()):
                if isinstance(value, str) and value.isdigit():
                    healed_payload[key] = int(value)
            
            if healed_payload != original_payload:
                healed_test = test.copy()
                healed_test['request']['payload'] = healed_payload
                return healed_test
        
        return None
    
    def _heal_headers(self, test, project):
        """Heal header issues"""
        original_headers = test['request'].get('headers', {})
        healed_headers = original_headers.copy()
        
        # Add missing Content-Type for JSON payloads
        if test['request'].get('payload') and 'Content-Type' not in healed_headers:
            healed_headers['Content-Type'] = 'application/json'
        
        # Add Accept header if missing
        if 'Accept' not in healed_headers:
            healed_headers['Accept'] = 'application/json'
        
        if healed_headers != original_headers:
            healed_test = test.copy()
            healed_test['request']['headers'] = healed_headers
            return healed_test
        
        return None
    
    def _heal_expected_status(self, test, project):
        """Heal expected status code issues"""
        response_status = test['response'].get('status_code')
        
        if response_status in [400, 401, 403, 404, 405]:
            # If we got a client error, adjust expectations
            healed_test = test.copy()
            
            # Update validation rules if they exist in the original test case
            if 'validation_rules' in healed_test:
                for rule in healed_test['validation_rules']:
                    if rule.get('field') == 'status_code':
                        rule['value'] = response_status
            
            return healed_test
        
        return None
    
    def _get_base_url(self, url):
        """Extract base URL from full URL"""
        match = re.match(r'(https?://[^/]+)', url)
        return match.group(1) if match else 'http://localhost:5000'
    
    def _load_healing_patterns(self):
        """Load healing patterns (simplified)"""
        return {
            'endpoint_patterns': [],
            'payload_patterns': [],
            'header_patterns': []
        }