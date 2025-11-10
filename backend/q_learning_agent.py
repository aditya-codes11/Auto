import numpy as np
import json
import random
from datetime import datetime

class QLearningAgent:
    def __init__(self, learning_rate=0.1, discount_factor=0.9, exploration_rate=0.3):
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.exploration_rate = exploration_rate
        
        # Define states, actions, and initialize Q-table
        self.states = ['high_failure', 'medium_failure', 'low_failure', 'success']
        self.actions = ['increase_test_coverage', 'focus_edge_cases', 'adjust_timeouts', 'modify_payloads']
        
        self.q_table = {}
        self._initialize_q_table()
        
        self.learning_history = []
    
    def _initialize_q_table(self):
        """Initialize Q-table with zeros"""
        for state in self.states:
            self.q_table[state] = {}
            for action in self.actions:
                self.q_table[state][action] = 0.0
    
    def update_strategy(self, test_results):
        """Update Q-learning strategy based on test results"""
        current_state = self._determine_state(test_results)
        action = self._choose_action(current_state)
        reward = self._calculate_reward(test_results)
        
        # Update Q-value
        old_value = self.q_table[current_state][action]
        next_max = max(self.q_table[current_state].values())
        
        new_value = (1 - self.learning_rate) * old_value + \
                   self.learning_rate * (reward + self.discount_factor * next_max)
        
        self.q_table[current_state][action] = new_value
        
        # Record learning step
        self.learning_history.append({
            'timestamp': datetime.now().isoformat(),
            'state': current_state,
            'action': action,
            'reward': reward,
            'new_q_value': new_value,
            'test_success_rate': test_results['summary']['success_rate']
        })
        
        return action, reward
    
    def _determine_state(self, test_results):
        """Determine current state based on test results"""
        success_rate = test_results['summary']['success_rate']
        
        if success_rate >= 80:
            return 'success'
        elif success_rate >= 60:
            return 'low_failure'
        elif success_rate >= 30:
            return 'medium_failure'
        else:
            return 'high_failure'
    
    def _choose_action(self, state):
        """Choose action using epsilon-greedy policy"""
        if random.uniform(0, 1) < self.exploration_rate:
            # Explore: random action
            return random.choice(self.actions)
        else:
            # Exploit: best known action
            q_values = self.q_table[state]
            return max(q_values, key=q_values.get)
    
    def _calculate_reward(self, test_results):
        """Calculate reward based on test results"""
        success_rate = test_results['summary']['success_rate']
        total_tests = test_results['summary']['total']
        
        # Base reward from success rate
        reward = success_rate / 100.0
        
        # Bonus for having sufficient tests
        if total_tests >= 5:
            reward += 0.1
        
        # Penalty for very low success rate
        if success_rate < 20:
            reward -= 0.5
        
        return reward
    
    def get_recommendation(self, test_results):
        """Get testing strategy recommendation"""
        state = self._determine_state(test_results)
        best_action = max(self.q_table[state], key=self.q_table[state].get)
        
        recommendations = {
            'increase_test_coverage': {
                'action': 'Increase test coverage',
                'description': 'Generate more comprehensive test cases covering different scenarios',
                'priority': 'high'
            },
            'focus_edge_cases': {
                'action': 'Focus on edge cases',
                'description': 'Create tests for boundary conditions and error scenarios',
                'priority': 'medium'
            },
            'adjust_timeouts': {
                'action': 'Adjust timeout settings',
                'description': 'Modify request timeouts based on API response patterns',
                'priority': 'low'
            },
            'modify_payloads': {
                'action': 'Optimize test payloads',
                'description': 'Refine request payloads based on API requirements',
                'priority': 'medium'
            }
        }
        
        return recommendations.get(best_action, {
            'action': 'Continue current strategy',
            'description': 'Maintain current testing approach',
            'priority': 'low'
        })
    
    def get_stats(self):
        """Get Q-learning statistics"""
        return {
            'q_table': self.q_table,
            'learning_rate': self.learning_rate,
            'exploration_rate': self.exploration_rate,
            'total_learning_steps': len(self.learning_history),
            'recent_rewards': [step['reward'] for step in self.learning_history[-10:]],
            'current_state_preferences': {
                state: max(actions, key=actions.get) 
                for state, actions in self.q_table.items()
            }
        }
    
    def save_learning_data(self):
        """Save learning data to file"""
        data = {
            'q_table': self.q_table,
            'learning_history': self.learning_history,
            'timestamp': datetime.now().isoformat()
        }
        
        with open('q_learning_data.json', 'w') as f:
            json.dump(data, f, indent=2)
    
    def load_learning_data(self):
        """Load learning data from file"""
        try:
            with open('q_learning_data.json', 'r') as f:
                data = json.load(f)
            
            self.q_table = data.get('q_table', self.q_table)
            self.learning_history = data.get('learning_history', [])
        except FileNotFoundError:
            pass  # Use default initialization