<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/recycle.svg" width="120" height="120" alt="Food Loop Logo" />
  
  # 🍃 Food Loop
  
  ### *Connecting people, businesses and NGOs to eliminate food waste*
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.8-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
  
  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-usage">Usage</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 🌟 About Food Loop

**Food Loop** is an innovative platform that connects people, businesses, and NGOs in a collaborative network to eliminate food waste. Through an intelligent sharing, trading, and donation system, we create a sustainable ecosystem where every piece of food finds its ideal destination.

### 🎯 Mission
Reduce food waste through technology, creating a conscious and sustainable community.

### 🌍 Impact
- **Waste Reduction**: Every shared food item is a step against waste
- **Sustainable Community**: We connect people with similar values
- **Circular Economy**: We promote reuse and resource sharing

---

## ✨ Features

### 🏠 **Smart Dashboard**
- Personalized panel with real-time statistics
- Visualization of items close to expiration
- Recipe suggestions based on your pantry
- Activity history and environmental impact

### 🥘 **Pantry Management**
- Digital inventory of your food items
- Intelligent expiration alerts
- Automatic categorization by food type
- QR code integration for quick addition

### 🍳 **Recipe System**
- Personalized recipes based on available ingredients
- Recipe sharing with the community
- Filters by diet type and ingredients
- Favorites and rating system

### 🤝 **Collaborative Marketplace**
- Share surplus food items
- Trading system between users
- Geolocation to find nearby partners
- Reviews and trust system

### 💬 **Messaging System**
- Real-time chat between users
- Smart push notifications
- Conversation history
- Online presence and activity status

### 👥 **Social Network**
- Friend and follower system
- Customizable profiles
- Community activity feed
- Thematic groups and challenges

### 🏢 **Enterprise Integration**
- Dedicated panel for businesses
- Large-scale donation management
- Social impact reports
- Integration with partner NGOs

---

## 🚀 Tech Stack

### **Frontend**
- **Next.js 15.3** - Latest generation React framework
- **TypeScript** - Static typing for greater robustness
- **Tailwind CSS 4.0** - Modern and responsive styling
- **Framer Motion** - Fluid and interactive animations
- **React Hook Form** - Optimized form management

### **Backend**
- **Next.js API Routes** - Integrated RESTful endpoints
- **Prisma ORM** - Type-safe object-relational mapping
- **NextAuth.js** - Secure and flexible authentication
- **Socket.IO** - Real-time communication

### **Database**
- **PostgreSQL** - Robust relational database
- **MongoDB** - Non-relational data storage
- **Prisma Client** - Type-safe database client

### **Infrastructure**
- **Docker** - Containerization for deployment
- **Node.js** - Server-side JavaScript runtime
- **Custom WebSocket Server** - Real-time communication

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Automatic formatting
- **TypeScript Compiler** - Type checking

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- MongoDB 6+ (optional)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/mccartheney/food-loop.git
cd food-loop
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables Setup
Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/foodloop"
MONGODB_URL="mongodb://localhost:27017/foodloop"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secure-secret"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# File Upload
UPLOAD_PATH="/uploads"
MAX_FILE_SIZE="5MB"
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run generate

# Run migrations
npm run db:migrate

# (Optional) Setup MongoDB
npm run mongo:generate
npm run mongo:push
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run code linting |
| `npm run generate` | Generate Prisma clients |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |

---

## 🐳 Docker Deployment

### Development
```bash
# Build the image
docker build -t food-loop .

# Run the container
docker run -p 3000:3000 food-loop
```

### Production
```bash
# Use Docker Compose
docker-compose up -d
```

---

## 🏗️ Project Architecture

```
food-loop/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 13+)
│   │   ├── 📁 api/               # API Routes
│   │   ├── 📁 app/               # Application pages
│   │   ├── 📁 auth/              # Authentication pages
│   │   └── layout.tsx            # Main layout
│   ├── 📁 components/            # React Components
│   │   ├── 📁 dashboard/         # Dashboard components
│   │   ├── 📁 marketplace/       # Marketplace components
│   │   ├── 📁 messages/          # Messaging system
│   │   ├── 📁 profile/           # User profiles
│   │   └── 📁 ui/                # Base UI components
│   ├── 📁 lib/                   # Utilities and configurations
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   ├── auth.ts               # NextAuth configuration
│   │   └── prisma.ts             # Prisma client
│   └── 📁 types/                 # TypeScript definitions
├── 📁 prisma/                    # Schema and migrations
├── 📁 public/                    # Static files
├── 🐳 Dockerfile                 # Docker configuration
├── 🐙 docker-compose.yml         # Container orchestration
└── 📋 package.json               # Dependencies and scripts
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Sustainable Green (`#10B981`)
- **Secondary**: Trust Blue (`#3B82F6`) 
- **Accent**: Energy Orange (`#F59E0B`)
- **Neutrals**: Modern Greys (`#6B7280`, `#F9FAFB`)

### Typography
- **Heading**: Geist Sans
- **Body**: Geist Sans
- **Mono**: Geist Mono

### Components
- Design system based on Tailwind CSS
- Reusable components with variants
- Token system for consistency
- Automatic dark/light mode

---

## 🔒 Security

- **Authentication**: NextAuth.js with multiple providers
- **Authorization**: Route protection middleware
- **Validation**: Client and server-side data validation
- **Sanitization**: XSS and injection protection
- **HTTPS**: Secure communication in production

---

## 📊 Monitoring

### Available Metrics
- Application performance
- User statistics
- Environmental impact (food saved)
- Feature usage

### Logging
- Detailed log structure
- Error and event tracking
- Performance monitoring

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### 1. Fork the Project
```bash
git fork https://github.com/mccartheney/food-loop.git
```

### 2. Create a Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Commit Changes
```bash
git commit -m "✨ Add amazing feature"
```

### 4. Push to Branch
```bash
git push origin feature/amazing-feature
```

### 5. Open Pull Request
Describe your changes and expected impact.

---

## 🐛 Bug Reports

Found a bug? Help us improve:

1. Check if a similar issue already exists
2. Create a new issue with:
   - Detailed problem description
   - Steps to reproduce
   - Screenshots (if applicable)
   - Environment information

---

## 👥 Development Team

This project is developed and maintained by:

- **[@mccartheney](https://github.com/mccartheney)** - Lead Developer
- **[@LuisBBandeira](https://github.com/LuisBBandeira)** - Full Stack Developer
- **[@sebastianascimento](https://github.com/sebastianascimento)** - Full Stack Developer

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Open Source Community** - For inspiration and amazing tools
- **Contributors** - For making this project possible
- **Users** - For believing in a more sustainable society

---

<div align="center">
  
  ### 🌱 Together we create a more sustainable future!
  
  ⭐ **Like the project? Give it a star!** ⭐
  
  ![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
  ![Sustainability](https://img.shields.io/badge/For%20a%20Sustainable-🌍-green?style=for-the-badge)
  
</div>
