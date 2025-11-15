# ❤️ LOVEUNSENT — AI Powered Personalized Store  
Next.js 14 (App Router) • TailwindCSS • ShadCN UI • MongoDB • Cloudinary • Razorpay

LOVEUNSENT is a personalized gifting & love letter platform with  
AI-generated product descriptions, product customization, admin dashboard and full e-commerce flow.

## 🚀 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- ShadCN UI components
- TypeScript

### Backend
- Next.js API Routes
- MongoDB Atlas + Mongoose
- Cloudinary (image uploads)
- Razorpay payments (UPI + Cards)
- NextAuth (authentication)

### AI
- OpenAI GPT for product description generation

## 📦 Features
- Storefront product grid  
- Product detail page  
- Add to Cart system  
- Checkout with Razorpay  
- Admin dashboard (products, orders, writers, designers, categories)  
- Cloudinary image uploads  
- AI description generator  

## 🔧 Environment Variables
Create a `.env.local` file:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

# OpenAI
OPENAI_API_KEY=xxxx

# Razorpay
RAZORPAY_KEY_ID=xxxx
RAZORPAY_KEY_SECRET=xxxx
```

## 🚀 Deployment
Push to GitHub → Import repo into Vercel → Add environment variables → Deploy.

## ❤️ Author
Made with Love by Sebastian  
AI-assisted development via ChatGPT (unsent project)