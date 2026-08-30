# 🚀 edittt — Deployment Guide

## Quick Deploy to Vercel (2 minutes)

### Step 1: Push to GitHub
```bash
cd C:\Users\tahak\my-project3
git remote add origin https://github.com/YOUR_USERNAME/edittt.git
git push -u origin master
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your `edittt` repository
4. Click **"Deploy"** — that's it!
5. Your site is live at: `https://edittt.vercel.app`

### Step 3: Connect Custom Domain
1. In Vercel dashboard → **Settings** → **Domains**
2. Type your domain (e.g., `edittt.com`)
3. Click **"Add"**

### Step 4: Set Up DNS
Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

**For apex domain (edittt.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (www.edittt.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 5: Verify
- Wait 5-10 minutes for DNS propagation
- Visit your domain — it should show edittt!
- Vercel auto-renews SSL certificates (free HTTPS)

---

## Alternative: Deploy to Netlify

### Step 1: Push to GitHub
(Same as Vercel Step 1)

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) → Sign up with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your `edittt` repository
4. Click **"Deploy site"**
5. Your site is live at: `https://edittt.netlify.app`

### Step 3: Custom Domain
1. **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain

### Step 4: DNS (same as Vercel)
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## Environment Variables

**None needed!** The site works entirely in the browser:
- AI chat uses TabiToken API (key is in the code)
- All editing happens client-side
- No backend required

---

## What You Get

- ✅ Free hosting (Vercel: 100GB bandwidth/month)
- ✅ Free SSL (HTTPS)
- ✅ Global CDN (fast worldwide)
- ✅ Auto-deploys on every git push
- ✅ Custom domain support
- ✅ No server needed

---

## Troubleshooting

**Site shows 404?**
- Make sure `index.html` is in the root of your repository
- Check that `vercel.json` or `netlify.toml` is present

**Domain not working?**
- DNS propagation takes 5-30 minutes
- Use [dnschecker.org](https://dnschecker.org) to verify
- Make sure you entered the correct DNS records

**SSL not working?**
- Vercel/Netlify auto-provision SSL — just wait a few minutes
