import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./src', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Remove 'use client'
        content = content.replace(/'use client';?\n?/g, '');
        content = content.replace(/"use client";?\n?/g, '');

        // Replace next/image
        // We will just do a simple replacement of import Image from 'next/image' with a custom image component
        // Since we don't know the exact relative path, we will create a global one or calculate relative path
        // Let's replace 'next/image' with 'react' or just standard img
        // Actually, let's just make the Image import point to our new Image component.
        // We can calculate relative path to src/components/Image/index.tsx
        if (content.includes("from 'next/image'")) {
            let relativePath = path.relative(path.dirname(filePath), './src/components/Image');
            relativePath = relativePath.replace(/\\/g, '/');
            if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
            content = content.replace(/from 'next\/image'/g, `from '${relativePath}'`);
        }

        // Replace next/link
        if (content.includes("from 'next/link'")) {
            content = content.replace(/import Link from 'next\/link'/g, "import { Link } from 'react-router-dom'");
        }

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
