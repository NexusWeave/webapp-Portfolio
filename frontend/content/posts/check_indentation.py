#!/usr/bin/env python3
import os
import re
import sys

def check_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_frontmatter = False
    in_literal_block = False
    errors = []
    
    for i, line in enumerate(lines):
        line_num = i + 1
        
        if line.strip() == '---':
            if not in_frontmatter:
                in_frontmatter = True
            else:
                in_frontmatter = False
                in_literal_block = False
            continue
        
        if in_frontmatter:
            # Detect start of literal block (e.g., status: |)
            if re.search(r'^\w+:\s*\|', line):
                in_literal_block = True
                continue
            
            # Detect end of literal block (a new key at the margin)
            if in_literal_block and re.match(r'^\w+:', line):
                in_literal_block = False
            
            if in_literal_block:
                if line.strip() == '':
                    continue
                
                # Check indentation: standard is 2 spaces
                if not line.startswith('  ') or line.startswith('   '):
                    errors.append(f"Line {line_num}: Incorrect indentation (expected exactly 2 spaces)")
                
    return errors

def main():
    directory = 'frontend/content/posts'
    all_errors = {}
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                file_errors = check_file(path)
                if file_errors:
                    all_errors[path] = file_errors

    if all_errors:
        print("Syntax errors found in markdown frontmatter indentation:")
        for path, errors in all_errors.items():
            print(f"\nFile: {path}")
            for error in errors:
                print(f"  - {error}")
        sys.exit(1)
    else:
        print("All markdown files passed indentation syntax check.")
        sys.exit(0)

if __name__ == "__main__":
    main()
