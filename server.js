import { spawn } from 'child_process';

const port = process.env.PORT || 4173;
console.log(`Starting Server on port ${port}...`);

const child = spawn('npm', ['run', 'preview', '--', '--host', '0.0.0.0', '--port', port.toString()], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('Failed to start server:', err);
});
