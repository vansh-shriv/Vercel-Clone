# Vercel-Clone

```
A lightweight deployment platform inspired by Vercel — paste your GitHub repo, deploy, and get a live URL!
```

# Overview

```
Vercel-Clone is a simplified version of Vercel that lets users:

✔ Submit a GitHub repo URL
✔ Backend pulls and builds the project
✔ Uploads built content to CloudFare R2
✔ Returns a public deployment link

This project demonstrates modern DevOps, deployment automation, serverless build flow, and distributed service architecture.
```

# Features
```
🔗 GitHub repo download and extraction
⚙ Auto build & deploy workflow
☁ Upload static build output to Cloudfare R2
🌍 Instant public deployment link returned
🧩 Modular microservice backend
📨 Redis as queue + async workers
```


# Tech Stack
```
Category	Technologies
Backend Services	Node.js, Express
DevOps & Hosting	CloudFare R2
Messaging & Queue	Redis
Storage / Downloads	Local FS + S3
Others	Axios, GitHub fetch
```

# API Flow (Simplified)
```
1️⃣ User submits GitHub repo link
2️⃣ Request Handler queues the job using Redis
3️⃣ Deploy service downloads, builds repo
4️⃣ Upload service uploads to S3
5️⃣ Deployment URL sent back as response
```

# Local Setup
```
git clone https://github.com/vansh-shriv/Vercel-Clone.git
cd Vercel-Clone
npm install

⚠️ Set environment variables for Cloudfare + Redis
(Not included in repo for security)

Run backend services individually:

cd backend/vercel-upload-service/src && npx tsc -b && cd../node/dist/index.js
cd backend/vercel-deploy-service/src && npx tsc -b && cd../node/dist/index.js
cd backend/request-handler-service/src && npx tsc -b && cd../node/dist/index.js
```

# Roadmap
```
 Cloudflare deployment + Domain assignment
 Realtime build logs
 UI dashboard for project management
 Authentication (GitHub OAuth)
 Multi-project support
```