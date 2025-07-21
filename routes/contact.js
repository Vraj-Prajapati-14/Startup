const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email templates
const adminEmailTemplate = (contactData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; }
        .message-box { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📧 New Contact Form Submission</h2>
            <p>You have received a new contact form submission from your website.</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${contactData.name}</div>
            </div>
            <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${contactData.email}</div>
            </div>
            <div class="field">
                <div class="label">📞 Phone:</div>
                <div class="value">${contactData.phone || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">🏢 Company:</div>
                <div class="value">${contactData.company || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">📝 Subject:</div>
                <div class="value">${contactData.subject}</div>
            </div>
            <div class="field">
                <div class="label">🛠️ Service Interest:</div>
                <div class="value">${contactData.service || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">💰 Budget Range:</div>
                <div class="value">${contactData.budget || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">⏰ Project Timeline:</div>
                <div class="value">${contactData.timeline || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">💬 Message:</div>
                <div class="message-box">${contactData.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
                <div class="label">📅 Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from your website contact form.</p>
            <p>Please respond to the customer within 24 hours.</p>
        </div>
    </div>
</body>
</html>
`;

const userEmailTemplate = (contactData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting us!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .message { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .highlight { color: #667eea; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
        .social-links { margin-top: 20px; }
        .social-links a { display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Thank You!</h1>
            <p>We've received your message and we're excited to work with you!</p>
        </div>
        <div class="content">
            <p>Dear <span class="highlight">${contactData.name}</span>,</p>
            
            <p>Thank you for reaching out to <span class="highlight">Bacancy Technology</span>! We have successfully received your message and our team is already reviewing your requirements.</p>
            
            <div class="message">
                <h3>📋 Your Message Summary:</h3>
                <p><strong>Subject:</strong> ${contactData.subject}</p>
                <p><strong>Service Interest:</strong> ${contactData.service || 'Not specified'}</p>
                <p><strong>Budget Range:</strong> ${contactData.budget || 'Not specified'}</p>
                <p><strong>Timeline:</strong> ${contactData.timeline || 'Not specified'}</p>
            </div>
            
            <h3>⏰ What's Next?</h3>
            <ul>
                <li>Our team will review your requirements within <span class="highlight">24 hours</span></li>
                <li>We'll schedule a <span class="highlight">free consultation call</span> to discuss your project</li>
                <li>You'll receive a detailed proposal tailored to your needs</li>
            </ul>
            
            <h3>📞 Need Immediate Assistance?</h3>
            <p>If you need urgent help, feel free to call us directly:</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Email:</strong> info@bacancy.com</p>
            
            <div class="social-links">
                <p>Follow us for updates and insights:</p>
                <a href="#">LinkedIn</a> | <a href="#">Twitter</a> | <a href="#">Facebook</a>
            </div>
        </div>
        <div class="footer">
            <p>Best regards,<br>
            <strong>The Bacancy Technology Team</strong></p>
            <p>🚀 Transforming ideas into powerful digital solutions</p>
        </div>
    </div>
</body>
</html>
`;

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name', 'Name is required').not().isEmpty().trim(),
  body('email', 'Please include a valid email').isEmail().normalizeEmail(),
  body('subject', 'Subject is required').not().isEmpty().trim(),
  body('message', 'Message is required').not().isEmpty().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  try {
    const { name, email, phone, company, subject, message, service, budget, timeline } = req.body;

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      company,
      subject,
      message,
      service,
      budget,
      timeline
    });

    await contact.save();

    // Send email notification to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to admin
      subject: `New Contact Form Submission: ${subject}`,
      html: adminEmailTemplate({ name, email, phone, company, subject, message, service, budget, timeline })
    };

    await transporter.sendMail(adminMailOptions);

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Bacancy Technology!',
      html: userEmailTemplate({ name, email, phone, company, subject, message, service, budget, timeline })
    };

    await transporter.sendMail(userMailOptions);

    res.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build filter
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const contacts = await Contact.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact by ID (admin only)
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact status and notes (admin only)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { status, adminNotes, repliedBy } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (repliedBy) {
      updateData.repliedBy = repliedBy;
      updateData.repliedAt = new Date();
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact (admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contact/stats/summary
// @desc    Get contact statistics (admin only)
// @access  Private
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const contacted = await Contact.countDocuments({ status: 'contacted' });
    const inProgress = await Contact.countDocuments({ status: 'in-progress' });
    const completed = await Contact.countDocuments({ status: 'completed' });
    
    // Get contacts from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      total,
      new: newContacts,
      contacted,
      inProgress,
      completed,
      recent: recentContacts
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 