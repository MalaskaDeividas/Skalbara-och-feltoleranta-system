# Scalable and Fault-Tolerant Systems

This is our project for the Programming Web Applications course, 
made with the MERN Stack using TypeScript. 
Hotel 404 is an application for finding available (mock) hotel bookings and managing your bookings efficiently and seamlessly.


## Run Instructions. Start backend.

Frontend: 
- cd frontend
- npm install #installs all dependencies
- npm run start # runs frontend

Backend:
- cd backend
- npm install #install all dependencies
- npm run start


[Kill the Process Using Port 7700]
- Get-Process -Id (Get-NetTCPConnection -LocalPort 7700).OwningProcess

[If it shows a process, kill it with:]
- Stop-Process -Id (Get-NetTCPConnection -LocalPort 7700).OwningProcess -Force

# Testing

Added testing CI/CD using Managed identities in Azure














