# বাজার দর (Bazar Dor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম এবং দাম বাড়া-কমার তথ্য দেখার জন্য তৈরি একটি responsive price tracking website।

## 🌟 Features

* **Live Product Data:** API থেকে পণ্য ও ক্যাটাগরির তথ্য সংগ্রহ।
* **Price Tracking:** পণ্যের দাম বৃদ্ধি ও হ্রাসের তথ্য দেখা।
* **Category Filtering:** ক্যাটাগরি অনুযায়ী পণ্য খুঁজে দেখা।
* **Product Details:** প্রতিটি পণ্যের বিস্তারিত তথ্যের আলাদা পেজ।
* **Authentication:** Email ও password দিয়ে Sign In এবং Sign Up।
* **Social Login:** Google ও GitHub দিয়ে লগইন।
* **Protected Routes:** লগইন ছাড়া সুরক্ষিত Product Details পেজে প্রবেশ করা যায় না।
* **Toast Notifications:** সফল ও ব্যর্থ কাজের জন্য notification।
* **Loading Skeletons:** ডেটা লোড হওয়ার সময় placeholder UI।
* **Responsive Design:** Mobile, tablet ও desktop-এর উপযোগী layout।
* **Custom 404 Page:** পাওয়া যায়নি এমন পেজের জন্য আলাদা UI।

##  Technologies Used

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* DaisyUI
* Better Auth
* MongoDB Atlas
* React Hot Toast
* Git & GitHub

## Getting Started

### Prerequisites

* Node.js
* npm
* MongoDB Atlas account

### Installation

1. Repository clone করো:

   ```bash
   git clone https://github.com/Obviously-Start/bazardor.git
   ```

2. Project folder-এ প্রবেশ করো:

   ```bash
   cd bazardor
   ```

3. Dependencies install করো:

   ```bash
   npm install
   ```

4. Root folder-এ `.env.local` ফাইল তৈরি করে প্রয়োজনীয় environment variables সেট করো। MongoDB এবং Better Auth-এর configuration-এর পাশাপাশি Google ও GitHub OAuth credentials প্রয়োজন হতে পারে।

5. Development server চালাও:

   ```bash
   npm run dev
   ```

6. Browser-এ খোলো:

   ```text
   http://localhost:3000
   ```

##  Environment Variables

প্রয়োজনীয় environment variables `.env.local` ফাইলে রাখবে। আসল credentials কখনো GitHub-এ commit করবে না।

##  Author

Bazar Dor — Bangladesh Essential Goods Price Tracking Website
