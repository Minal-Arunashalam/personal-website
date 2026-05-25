# Formspree Setup Instructions (Simpler Alternative)

Formspree is much simpler than EmailJS - no API keys needed initially!

## Step 1: Get Your Form Endpoint
1. Go to [formspree.io](https://formspree.io/)
2. Enter your email: **minal.shalam@gmail.com**
3. Click "Create Form"
4. You'll get a form endpoint like: `https://formspree.io/f/xpznvqrw`

## Step 2: Update Your Website
Replace `YOUR_FORM_ID` in the HTML form action with your actual form ID:

```html
<form class="form" id="contact-form" action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST">
```

## Step 3: Test It
1. Submit your form once
2. Formspree will send you a confirmation email
3. Click the confirmation link
4. Your form is now live!

## That's It!
- **No API keys needed**
- **No account creation required initially**
- **50 submissions/month for free**
- **Emails go directly to minal.shalam@gmail.com**

## Free vs Paid
- **Free**: 50 submissions/month, Formspree branding
- **Paid**: More submissions, no branding, advanced features

This is much simpler than EmailJS!
