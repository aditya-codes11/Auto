import os
import zipfile
import tarfile
import shutil
from pathlib import Path

def handle_file_upload(file, upload_path):
    """Handle file upload and extraction"""
    try:
        # Ensure upload directory exists
        os.makedirs(upload_path, exist_ok=True)
        
        # Save uploaded file
        file_path = os.path.join(upload_path, file.filename)
        file.save(file_path)
        
        # Extract if archive
        if file.filename.endswith(('.zip', '.tar', '.tar.gz', '.tgz')):
            extract_path = os.path.join(upload_path, 'extracted')
            os.makedirs(extract_path, exist_ok=True)
            
            if file.filename.endswith('.zip'):
                with zipfile.ZipFile(file_path, 'r') as zip_ref:
                    zip_ref.extractall(extract_path)
            else:
                with tarfile.open(file_path, 'r:*') as tar_ref:
                    tar_ref.extractall(extract_path)
            
            # Remove archive file
            os.remove(file_path)
            
            # Count files in extracted project
            file_count = count_files(extract_path)
            
            return {
                'success': True,
                'extracted_path': extract_path,
                'file_count': file_count,
                'message': f'Project extracted successfully with {file_count} files'
            }
        else:
            # Single file upload
            return {
                'success': True,
                'extracted_path': upload_path,
                'file_count': 1,
                'message': 'File uploaded successfully'
            }
            
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'message': 'File upload failed'
        }

def count_files(directory):
    """Count files in directory (excluding some file types)"""
    count = 0
    exclude_dirs = {'.git', '__pycache__', 'node_modules', '.venv'}
    exclude_extensions = {'.pyc', '.DS_Store'}
    
    for root, dirs, files in os.walk(directory):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            if not any(file.endswith(ext) for ext in exclude_extensions):
                count += 1
    
    return count

def cleanup_upload(upload_path):
    """Clean up uploaded files"""
    try:
        if os.path.exists(upload_path):
            shutil.rmtree(upload_path)
        return True
    except:
        return False