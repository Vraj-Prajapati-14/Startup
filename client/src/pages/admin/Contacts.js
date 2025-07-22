import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { 
  FiSearch, 
  FiFilter, 
  FiMail, 
  FiPhone, 
  FiUser, 
  FiBriefcase,
  FiClock,
  FiCheck,
  FiX,
  FiEdit,
  FiTrash2,
  FiEye,
  FiRefreshCw
} from 'react-icons/fi';
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [currentPage, search, statusFilter, sortBy, sortOrder]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        status: statusFilter,
        search,
        sortBy,
        sortOrder
      });

      const response = await api.get(`/api/contact?${params}`);
      setContacts(response.data.contacts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/contact/stats/summary');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      setUpdating(true);
      await api.put(`/api/contact/${contactId}`, { status: newStatus });
      toast.success('Status updated successfully');
      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await api.delete(`/api/contact/${contactId}`);
      toast.success('Contact deleted successfully');
      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  const handleReply = async (contactId, adminNotes, repliedBy) => {
    try {
      setUpdating(true);
      await api.put(`/api/contact/${contactId}`, {
        status: 'contacted',
        adminNotes,
        repliedBy
      });
      toast.success('Reply recorded successfully');
      setShowModal(false);
      setSelectedContact(null);
      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error('Error recording reply:', error);
      toast.error('Failed to record reply');
    } finally {
      setUpdating(false);
    }
  };

  const openContactModal = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="contacts-admin">
      {/* Header */}
      <div className="admin-header">
        <h1 className="admin-title">Contact Management</h1>
        <p className="admin-subtitle">Manage and respond to contact form submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="stat-card"
        >
          <div className="stat-icon bg-blue-500">
            <FiMail />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.total || 0}</h3>
            <p className="stat-label">Total Contacts</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="stat-card"
        >
          <div className="stat-icon bg-yellow-500">
            <FiClock />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.new || 0}</h3>
            <p className="stat-label">New Messages</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="stat-card"
        >
          <div className="stat-icon bg-green-500">
            <FiCheck />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.contacted || 0}</h3>
            <p className="stat-label">Contacted</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="stat-card"
        >
          <div className="stat-icon bg-purple-500">
            <FiRefreshCw />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.recent || 0}</h3>
            <p className="stat-label">Last 30 Days</p>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="createdAt">Date</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="subject">Subject</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="sort-button"
          >
            {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="contacts-table-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="empty-state">
            <FiMail className="empty-icon" />
            <h3>No contacts found</h3>
            <p>No contact submissions match your current filters.</p>
          </div>
        ) : (
          <div className="contacts-table">
            <table>
              <thead>
                <tr>
                  <th>Contact Info</th>
                  <th>Subject</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <motion.tr
                    key={contact._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="contact-row"
                  >
                    <td className="contact-info">
                      <div className="contact-name">
                        <FiUser className="contact-icon" />
                        {contact.name}
                      </div>
                      <div className="contact-email">
                        <FiMail className="contact-icon" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="contact-phone">
                          <FiPhone className="contact-icon" />
                          {contact.phone}
                        </div>
                      )}
                      {contact.company && (
                        <div className="contact-company">
                          <FiBriefcase className="contact-icon" />
                          {contact.company}
                        </div>
                      )}
                    </td>
                    <td className="contact-subject">
                      <div className="subject-text">{contact.subject}</div>
                      <div className="subject-preview">{contact.message.substring(0, 50)}...</div>
                    </td>
                    <td className="contact-service">
                      <div className="service-info">
                        <span className="service-name">{contact.service || 'Not specified'}</span>
                        {contact.budget && (
                          <span className="service-budget">{contact.budget}</span>
                        )}
                      </div>
                    </td>
                    <td className="contact-status">
                      <span className={`status-badge ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="contact-date">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="contact-actions">
                      <button
                        onClick={() => openContactModal(contact)}
                        className="action-button view"
                        title="View Details"
                      >
                        <FiEye />
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                        className="status-select"
                        disabled={updating}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="action-button delete"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => {
            setShowModal(false);
            setSelectedContact(null);
          }}
          onReply={handleReply}
          updating={updating}
        />
      )}
    </div>
  );
};

// Contact Detail Modal Component
const ContactModal = ({ contact, onClose, onReply, updating }) => {
  const [adminNotes, setAdminNotes] = useState(contact.adminNotes || '');
  const [repliedBy, setRepliedBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onReply(contact._id, adminNotes, repliedBy);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Contact Details</h2>
          <button onClick={onClose} className="modal-close">
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="contact-details">
            <div className="detail-section">
              <h3>Contact Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Name:</label>
                  <span>{contact.name}</span>
                </div>
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{contact.email}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{contact.phone || 'Not provided'}</span>
                </div>
                <div className="detail-item">
                  <label>Company:</label>
                  <span>{contact.company || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Project Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Subject:</label>
                  <span>{contact.subject}</span>
                </div>
                <div className="detail-item">
                  <label>Service:</label>
                  <span>{contact.service || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <label>Budget:</label>
                  <span>{contact.budget || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <label>Timeline:</label>
                  <span>{contact.timeline || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Message</h3>
              <div className="message-content">
                {contact.message}
              </div>
            </div>

            <div className="detail-section">
              <h3>Admin Notes</h3>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about this contact..."
                className="admin-notes"
                rows="4"
              />
            </div>

            <div className="detail-section">
              <h3>Record Reply</h3>
              <form onSubmit={handleSubmit} className="reply-form">
                <div className="form-group">
                  <label>Replied By:</label>
                  <input
                    type="text"
                    value={repliedBy}
                    onChange={(e) => setRepliedBy(e.target.value)}
                    placeholder="Your name"
                    className="reply-input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={updating || !repliedBy.trim()}
                  className="reply-button"
                >
                  {updating ? 'Recording...' : 'Record Reply'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts; 