import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_BASE; 



import {
  FaArrowLeft,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaCalendar,
  FaUser,
  FaClock,
  FaTag,
} from "react-icons/fa";
import styles from "./blog-details.module.css";
import BlogTags from "./blog-tags";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);

        const relatedRes = await fetch(`${API_URL}/api/blogs`);
        const allBlogs = await relatedRes.json();
        const relatedBlogs = allBlogs
          .filter((b) => b._id !== data._id && b.category === data.category)
          .slice(0, 3)
          .map((b) => ({
            ...b,
            image: b.image ? `${API_URL}${b.image}` : null,
          }));
        setRelated(relatedBlogs);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Container className="my-5 py-5 text-center">
        <h2>Loading...</h2>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="my-5 py-5 text-center">
        <h2>Blog not found</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/blog")}
          className="mt-3"
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

  const readingTime = Math.ceil(blog.fullContent.split(" ").length / 200);

  return (
    <Container className={`${styles.blogDetailPage}`} style={{paddingTop:"130px"}}>
      {/* Blog Header */}
      <Row className="mb-3">
        <Col>
          {blog.category && (
            <Badge className={styles.customCategoryBadge}>
              <FaTag className="me-1" /> {blog.category}
            </Badge>
          )}
          <h1 className={styles.enhancedBlogTitle}>{blog.title}</h1>
          <div className={styles.metaInfo}>
            {blog.author && (
              <span className={styles.metaItem}>
                <FaUser /> {blog.author}
              </span>
            )}
            <span className={styles.metaItem}>
              <FaCalendar /> {new Date(blog.date).toDateString()}
            </span>
            <span className={styles.metaItem}>
              <FaClock /> {readingTime} min read
            </span>
          </div>
        </Col>
      </Row>

      {/* Featured Image */}
      {blog.image && (
        <Row className="mb-4">
          <Col>
            <img
              src={`${API_URL}${blog.image}`}
              alt={blog.title}
              className={styles.enhancedDetailImage}
              style={{ marginBottom: "0", maxHeight: "500px", objectFit: "cover" }}
            />
            {blog.imageCaption && (
              <div className={styles.imageCaption}>{blog.imageCaption}</div>
            )}
          </Col>
        </Row>
      )}

      {/* Blog Content + Sidebar */}
      <Row className="mb-5">
        {/* Left Column: Blog Content */}
        <Col lg={8}>
          <div className={`${styles.enhancedContent} ${styles.animatedContent}`}>
            {/* Lead Paragraph */}
            <p className={styles.leadParagraph}>{blog.description}</p>
            {blog.fullContent.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {blog.tags && <BlogTags tags={blog.tags} />}

          {/* Author Bio */}
          {blog.authorBio && (
            <Card className={`mt-5 ${styles.enhancedAuthorBio}`}>
              <Card.Body className="p-4 text-white">
                <Row className="align-items-center">
                  {blog.authorImage && (
                    <Col xs={3} md={2}>
                      <img
                        src={blog.authorImage}
                        alt={blog.author}
                        className={`${styles.authorImage} rounded-circle`}
                      />
                    </Col>
                  )}
                  <Col xs={9} md={10}>
                    <h4>About {blog.author}</h4>
                    <p className="mb-0">{blog.authorBio}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Share Section */}
          <div className={`mt-5 ${styles.enhancedShareSection}`}>
            <span className={styles.shareTitle}>Share this article:</span>
            <div className="d-flex flex-wrap gap-2 mt-2">
              <Button
                variant="outline"
                className={`${styles.customShareBtn} ${styles.facebookBtn}`}
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  )
                }
              >
                <FaFacebook /> Facebook
              </Button>
              <Button
                variant="outline"
                className={`${styles.customShareBtn} ${styles.twitterBtn}`}
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(blog.title)}`,
                    "_blank"
                  )
                }
              >
                <FaTwitter /> X
              </Button>
              <Button
                variant="outline"
                className={`${styles.customShareBtn} ${styles.linkedinBtn}`}
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  )
                }
              >
                <FaLinkedin /> LinkedIn
              </Button>
            </div>
          </div>
        </Col>

        {/* Sidebar */}
        <Col lg={4} className={styles.sidebar}>
          {/* Related Blogs Section */}
          {related.length > 0 && (
            <div className={`${styles.enhancedRelatedSection} mb-5`}>
              <h3 className={styles.relatedTitle}>Related Articles</h3>
              {related.map((item) => (
                <Card
                  key={item._id}
                  className={`${styles.enhancedRelatedCard} mb-4`}
                  onClick={() => navigate(`/blog/${item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {item.image && (
                    <Card.Img
                      variant="top"
                      src={item.image}
                      className={styles.enhancedRelatedImage}
                      style={{ maxHeight: "180px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body className={styles.enhancedRelatedBody}>
                    {item.category && (
                      <Badge className={styles.customCategoryBadge1}>
                        {item.category}
                      </Badge>
                    )}
                    <Card.Title className={styles.enhancedRelatedTitle}>
                      {item.title}
                    </Card.Title>
                    <Card.Text className={styles.enhancedRelatedDate}>
                      <FaCalendar className="me-1" />{" "}
                      {new Date(item.date).toDateString()}
                    </Card.Text>
                    <Card.Text className={styles.enhancedRelatedExcerpt}>
                      {item.description?.length > 100
                        ? item.description.slice(0, 100) + "..."
                        : item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          {/* Extra Sidebar Content */}
          <div className={styles.sidebarSection}>
            <h4 className={styles.sidebarTitle}>Popular Tags</h4>
            <div className="d-flex flex-wrap gap-2">
              {["WebDev", "React", "AI", "Cloud"].map((tag, index) => (
                <Link key={index} to="#" className={styles.tagLink}>
                  <Badge className={styles.customTag}>#{tag}</Badge>
                </Link>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className={styles.customBackBtn}>
        <FaArrowLeft /> Back to Articles
      </button>
    </Container>
  );
}

export default BlogDetail;
