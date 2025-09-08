import { useNavigate } from "react-router-dom";
import styles from "./cybomb-blog.module.css";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_BASE; 

export default function CybombBlog() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from DB
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleCardClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  // Show only first 3 blogs if collapsed
  const visibleBlogs = showAll ? blogs : blogs.slice(0, 3);

  if (loading) {
    return (
      <div className={styles.blogSection}>
        <h2 className={styles.blogHeading}>Cybomb Blogs</h2>
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className={styles.blogSection}>
      <h2 className={styles.blogHeading}>Cybomb Blogs</h2>
      
      {/* Row wrapper for 3 columns */}
      <div className="row">
        {visibleBlogs.map((blog) => (
          <div className="col-lg-4 col-md-6 mb-4" key={blog._id}>
            <div
              className={styles.blogCard}
              onClick={() => handleCardClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              {blog.image && (
                <img
                  src={`${API_URL}${blog.image}`}
                  alt={blog.title}
                  className={styles.blogImage}
                />
              )}
              <div className={styles.blogContent}>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
                <p className={styles.blogDate}>
                  {new Date(blog.date).toDateString()}
                </p>
                <p className={styles.blogDescription}>
                  {blog.description?.length > 120
                    ? blog.description.slice(0, 120) + "..."
                    : blog.description}
                </p>
              </div>
              <button
                className={styles.readMoreBtn}
                onClick={(e) => {
                  e.stopPropagation(); 
                  navigate(`/blog/${blog._id}`);
                }}
              >
                Read More...
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More / View Less Button */}
      {blogs.length > 3 && (
        <div className={styles.toggleButtonWrapper}>
          <button
            className={styles.toggleButton}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}
