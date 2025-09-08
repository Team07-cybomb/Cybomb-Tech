import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_BASE; 

function Adminblog() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    fullContent: "",
    image: null
  });
  const [editId, setEditId] = useState(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    const res = await fetch(`${API_URL}/api/blogs`);
    const data = await res.json();
    setBlogs(data);
    setFilteredBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle search
  useEffect(() => {
    const results = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(results);
  }, [searchTerm, blogs]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // Submit form (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    const url = editId
      ? `${API_URL}/api/blogs/${editId}`
      : `${API_URL}/api/blogs`;
    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: form,
    });

    setFormData({ title: "", date: "", description: "", fullContent: "", image: null });
    setEditId(null);
    setShowModal(false);
    fetchBlogs();
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await fetch(`${API_URL}/api/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      date: blog.date,
      description: blog.description,
      fullContent: blog.fullContent,
      image: null,
    });
    setEditId(blog._id);
    setShowModal(true);
  };

  // Custom styles
  const styles = `
    .admin-blog-container {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 0 15px rgba(0,0,0,0.05);
    }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      flex-wrap: wrap;
    }
    .page-title {
      color: #2c3e50;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .search-box {
      position: relative;
      max-width: 300px;
    }
    .search-box input {
      border-radius: 20px;
      padding-left: 40px;
    }
    .search-icon {
      position: absolute;
      left: 15px;
      top: 10px;
      color: #6c757d;
    }
    .add-btn {
      background: linear-gradient(45deg, #6c5ce7, #a29bfe);
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      font-weight: 600;
      transition: all 0.3s;
    }
    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(108, 92, 231, 0.4);
    }
    .blog-table {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    .table thead th {
      background: #6c5ce7;
      color: white;
      border: none;
      padding: 15px;
    }
    .table tbody td {
      padding: 15px;
      vertical-align: middle;
    }
    .table tbody tr {
      transition: all 0.2s;
    }
    .table tbody tr:hover {
      background-color: rgba(108, 92, 231, 0.05);
    }
    .action-btn {
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 500;
    }
    .edit-btn {
      background: #fd7e14;
      border: none;
      margin-right: 8px;
    }
    .edit-btn:hover {
      background: #f9690e;
    }
    .delete-btn {
      background: #dc3545;
      border: none;
    }
    .delete-btn:hover {
      background: #c82333;
    }
    .modal-content {
      border-radius: 12px;
      border: none;
    }
    .modal-header {
      background: #6c5ce7;
      color: white;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    .btn-close {
      filter: invert(1);
    }
    .form-control {
      border-radius: 8px;
      padding: 12px;
      border: 1px solid #ddd;
    }
    .form-control:focus {
      border-color: #6c5ce7;
      box-shadow: 0 0 0 0.2rem rgba(108, 92, 231, 0.25);
    }
    .save-btn {
      background: #00b894;
      border: none;
      border-radius: 8px;
      padding: 8px 20px;
    }
    .save-btn:hover {
      background: #00a885;
    }
    .cancel-btn {
      background: #636e72;
      border: none;
      border-radius: 8px;
      padding: 8px 20px;
    }
    .cancel-btn:hover {
      background: #57606b;
    }
    .blog-image {
      border-radius: 8px;
      object-fit: cover;
      height: 60px;
      width: 80px;
    }
    @media (max-width: 768px) {
      .admin-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .search-box {
        width: 100%;
        max-width: 100%;
        margin: 15px 0;
      }
    }
  `;

  return (
    <div className="container mt-5">
      <style>{styles}</style>
      <div className="admin-blog-container">
        <div className="admin-header">
          <h2 className="page-title">Blog Management</h2>
          <div className="d-flex align-items-center flex-wrap">
            <div className="search-box me-3">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="add-btn btn text-white"
              onClick={() => {
                setEditId(null);
                setFormData({ title: "", date: "", description: "", fullContent: "", image: null });
                setShowModal(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>Add New Blog
            </button>
          </div>
        </div>

        {/* Blog Table */}
        <div className="blog-table">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="fw-bold">{blog.title}</td>
                  <td>{new Date(blog.date).toLocaleDateString()}</td>
                  <td>{blog.description.slice(0, 50)}...</td>
                  <td>
                    {blog.image && (
                      <img
                        src={`${API_URL}${blog.image}`}
                        alt={blog.title}
                        className="blog-image"
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm action-btn edit-btn text-white"
                      onClick={() => handleEdit(blog)}
                    >
                      <i className="fas fa-edit me-1"></i>Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm action-btn delete-btn text-white"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <i className="fas fa-trash me-1"></i>Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBlogs.length === 0 && (
            <div className="text-center py-5">
              <i className="fas fa-file-alt fa-3x mb-3 text-muted"></i>
              <p className="text-muted">No blogs found. Try adding some or adjusting your search.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">{editId ? "Edit Blog" : "Add New Blog"}</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Blog Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Short Description</label>
                      <textarea
                        name="description"
                        placeholder="Short description that appears in the blog list"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Full Content</label>
                      <textarea
                        name="fullContent"
                        placeholder="Full blog content"
                        value={formData.fullContent}
                        onChange={handleChange}
                        className="form-control"
                        rows="5"
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Blog Image</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="form-control"
                      />
                      <div className="form-text">Upload an image for your blog post</div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn save-btn text-white">
                      <i className="fas fa-save me-2"></i>{editId ? "Update" : "Save"}
                    </button>
                    <button
                      type="button"
                      className="btn cancel-btn text-white"
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fas fa-times me-2"></i>Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Adminblog;