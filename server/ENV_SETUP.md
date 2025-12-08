# Environment Variables Setup Guide

## Required Environment Variables

Create a `.env` file in the `server` directory with the following variables:

### MongoDB Connection (MONGO_URI)

For **local MongoDB Compass**:
```
MONGO_URI=mongodb://localhost:27017/fitfusion
```

For **MongoDB Atlas** (cloud):
```
MONGO_URI=mongodb+srv://shagun_vishnoi:shagunvishnoi@cluster0.eafeo8i.mongodb.net/?appName=Cluster0
```

### JWT Secret (JWT_SECRET)

Generate a secure secret key:
```bash
openssl rand -base64 32
```

Or use a simple one for development:
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Server Port (Optional)

Default is 5000, but you can customize:
```
PORT=5000
```

## Example .env File

```env
MONGO_URI=mongodb+srv://shagun_vishnoi:shagunvishnoi@cluster0.eafeo8i.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```


