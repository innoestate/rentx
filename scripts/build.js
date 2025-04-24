const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Get target path from command line arguments
const targetPath = process.argv[2];

console.log('starting build...')

if (!targetPath) {
    console.error('Please provide a target path: npm run build:prod <target-path>');
    process.exit(1);
}

// Ensure the target path exists
fs.ensureDirSync(targetPath);

try {
    // Build Angular project
    console.log('Building Angular project...');
    execSync('cd angular && npm run build', { stdio: 'inherit' });
    console.log('angular builded successfully');
    
    // Create angular directory in target path and copy dist
    const angularTargetPath = path.join(targetPath, 'angular');
    fs.ensureDirSync(angularTargetPath);
    fs.copySync('angular/dist', path.join(angularTargetPath, 'dist'));
    
    // Build NestJS project
    console.log('Building NestJS project...');
    execSync('cd nestjs && npm run build', { stdio: 'inherit' });
    
    // Create nestjs directory in target path and copy dist and package files
    const nestjsTargetPath = path.join(targetPath, 'nestjs');
    fs.ensureDirSync(nestjsTargetPath);
    fs.copySync('nestjs/dist', path.join(nestjsTargetPath, 'dist'));
    fs.copySync('nestjs/package.json', path.join(nestjsTargetPath, 'package.json'));
    fs.copySync('nestjs/package-lock.json', path.join(nestjsTargetPath, 'package-lock.json'));
    
    // Copy configuration files from prod folder
    console.log('Copying configuration files...');
    const configFiles = [
        'docker-compose.yml',
        'default.conf',
        'README.md'
    ];
    
    configFiles.forEach(file => {
        const sourcePath = path.join(process.cwd(), 'prod', file);
        const targetFilePath = path.join(targetPath, file);
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, targetFilePath);
        }
    });

    // Copy Dockerfiles and create directories
    console.log('Copying Dockerfiles...');
    const dockerFiles = [
        { src: 'prod/angular/Dockerfile', dest: 'angular/Dockerfile' },
        { src: 'prod/nestjs/Dockerfile', dest: 'nestjs/Dockerfile' }
    ];

    dockerFiles.forEach(({ src, dest }) => {
        const sourcePath = path.join(process.cwd(), src);
        const targetFilePath = path.join(targetPath, dest);
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, targetFilePath);
        }
    });

    // Copy other root files
    const rootFiles = ['.env', 'keys'];
    rootFiles.forEach(file => {
        const sourcePath = path.join(process.cwd(), file);
        const targetFilePath = path.join(targetPath, file);
        
        if (fs.existsSync(sourcePath)) {
            if (fs.lstatSync(sourcePath).isDirectory()) {
                fs.copySync(sourcePath, targetFilePath);
            } else {
                fs.copyFileSync(sourcePath, targetFilePath);
            }
        }
    });
    
    console.log(`Build completed successfully! Production files are in: ${targetPath}`);
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
