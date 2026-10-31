import { useState, useEffect } from 'react';
import { apiRequest } from './api';
import './App.css';
import Auth from './Auth';


const courses = [
  {
    id: 1,
    title: 'Web Development',
    category: 'Development',
    description:
      'Learn HTML, CSS, JavaScript and build modern websites.',
    level: 'Beginner',
    icon: '🌐',
    instructor: 'Alex Morgan',
    topics: [
      {
        id: 'html',
        title: 'HTML Fundamentals',
        lessons: [
          {
            id: 'html-1',
            title: 'Introduction to HTML',
            content: 'Learn what HTML is and how web pages are structured.',
          },
          {
            id: 'html-2',
            title: 'HTML Tags and Elements',
            content: 'Learn headings, paragraphs, links and images.',
          },
          {
            id: 'html-3',
            title: 'HTML Forms and Tables',
            content: 'Learn how to create forms and display tabular data.',
          },
        ],
      },
      {
        id: 'css',
        title: 'CSS Fundamentals',
        lessons: [
          {
            id: 'css-1',
            title: 'Introduction to CSS',
            content: 'Learn selectors, properties and CSS rules.',
          },
          {
            id: 'css-2',
            title: 'Colors, Fonts and Box Model',
            content: 'Learn styling, spacing, borders and typography.',
          },
          {
            id: 'css-3',
            title: 'Flexbox and Grid',
            content: 'Learn layouts for responsive websites.',
          },
        ],
      },
      {
        id: 'javascript',
        title: 'JavaScript Basics',
        lessons: [
          {
            id: 'js-1',
            title: 'Variables and Data Types',
            content: 'Learn variables, strings, numbers and booleans.',
          },
          {
            id: 'js-2',
            title: 'Conditions and Loops',
            content: 'Learn if statements, for loops and while loops.',
          },
          {
            id: 'js-3',
            title: 'Functions and Events',
            content: 'Learn reusable functions and browser events.',
          },
        ],
      },
      {
        id: 'project',
        title: 'Website Project',
        lessons: [
          {
            id: 'project-1',
            title: 'Build a Portfolio Website',
            content: 'Combine HTML, CSS and JavaScript to build a portfolio.',
          },
          {
            id: 'project-2',
            title: 'Responsive Design',
            content: 'Make your website work on mobile and desktop screens.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Java Programming',
    category: 'Programming',
    description:
      'Learn Java fundamentals and object-oriented programming.',
    level: 'Beginner',
    icon: '☕',
    instructor: 'Rahul Sharma',
    topics: [
      {
        id: 'java-basics',
        title: 'Java Fundamentals',
        lessons: [
          {
            id: 'java-1',
            title: 'Introduction to Java',
            content: 'Learn Java, the JDK and how Java programs run.',
          },
          {
            id: 'java-2',
            title: 'Variables and Data Types',
            content: 'Learn variables, primitive types and operators.',
          },
          {
            id: 'java-3',
            title: 'Conditions and Loops',
            content: 'Learn decision-making and looping statements.',
          },
        ],
      },
      {
        id: 'java-oop',
        title: 'Object-Oriented Programming',
        lessons: [
          {
            id: 'oop-1',
            title: 'Classes and Objects',
            content: 'Understand classes, objects, fields and methods.',
          },
          {
            id: 'oop-2',
            title: 'Inheritance and Polymorphism',
            content: 'Learn key object-oriented programming concepts.',
          },
          {
            id: 'oop-3',
            title: 'Encapsulation and Abstraction',
            content: 'Learn how to structure and protect program data.',
          },
        ],
      },
      {
        id: 'java-project',
        title: 'Java Mini Project',
        lessons: [
          {
            id: 'java-project-1',
            title: 'Build a Student Management Program',
            content: 'Apply Java fundamentals in a small project.',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Python Programming',
    category: 'Programming',
    description:
      'Learn Python basics, problem-solving and automation.',
    level: 'Beginner',
    icon: '🐍',
    instructor: 'Priya Verma',
    topics: [
      {
        id: 'python-basics',
        title: 'Python Fundamentals',
        lessons: [
          {
            id: 'python-1',
            title: 'Introduction to Python',
            content: 'Learn Python syntax and your first program.',
          },
          {
            id: 'python-2',
            title: 'Variables and Data Types',
            content: 'Learn common data types and variables.',
          },
          {
            id: 'python-3',
            title: 'Conditions and Loops',
            content: 'Learn conditional statements and loops.',
          },
        ],
      },
      {
        id: 'python-functions',
        title: 'Functions and Collections',
        lessons: [
          {
            id: 'python-4',
            title: 'Functions',
            content: 'Learn parameters, return values and reusable code.',
          },
          {
            id: 'python-5',
            title: 'Lists and Dictionaries',
            content: 'Store and organize data using Python collections.',
          },
        ],
      },
      {
        id: 'python-project',
        title: 'Python Mini Project',
        lessons: [
          {
            id: 'python-project-1',
            title: 'Build a Python Project',
            content: 'Apply your Python skills to a beginner project.',
          },
        ],
      },
    ],
  },
];


function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courseRating, setCourseRating] = useState(0);
  const [courseReview, setCourseReview] = useState('');
  const [courseReviews, setCourseReviews] = useState({});
  const [savingProgress, setSavingProgress] = useState(false);

  
  // Filter courses.
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesCategory =
      category === 'All' || course.category === category;

    return matchesSearch && matchesCategory;
  });


function getCompletedIndexes(courseId, lessonList = completedLessons) {
  const course = courses.find(
    (item) => Number(item.id) === Number(courseId)
  );

  if (!course) return [];

  const allLessons = course.topics.flatMap(
    (topic) => topic.lessons
  );

  return lessonList
    .filter((lessonId) => {
      const prefix = `${courseId}-`;
      return String(lessonId).startsWith(prefix);
    })
    .map((lessonId) => {
      const id = String(lessonId).slice(
        `${courseId}-`.length
      );

      return allLessons.findIndex(
        (lesson) => lesson.id === id
      );
    })
    .filter((index) => index >= 0);
}


  // Load course reviews from MySQL.
  async function loadReviews(courseId) {
    try {
      const reviews = await apiRequest(`/api/reviews/${courseId}`);

      setCourseReviews((previous) => ({
        ...previous,
        [courseId]: reviews.map((review) => ({
          rating: review.rating,
          comment: review.comment,
          date: review.createdAt
            ? new Date(review.createdAt).toLocaleDateString()
            : '',
        })),
      }));
    } catch (error) {
      console.error('Failed to load course reviews:', error);
    }
  }

  // Handle a successful login and load this user's saved progress.
  function handleLoginSuccess(user) {
    const normalizedUser =
      user && typeof user === 'object'
        ? { ...user, name: user.name || user.email || 'Student' }
        : typeof user === 'string'
          ? { name: user.includes('@') ? user.split('@')[0] : user, email: user }
          : { name: 'Student' };

    setLoggedInUser(normalizedUser);
    setShowAuth(false);
    loadProgress();
  }

  async function loadProgress() {
  try {
    const progress = await apiRequest('/api/progress');

    const enrolled = progress.map(
      (item) => Number(item.courseId)
    );

    const completed = progress.flatMap((item) => {
      const course = courses.find(
        (c) => Number(c.id) === Number(item.courseId)
      );

      if (!course) return [];

      const allLessons = course.topics.flatMap(
        (topic) => topic.lessons
      );

      return (item.completedLessons || [])
        .map((lessonIndex) => {
          const lesson = allLessons[Number(lessonIndex)];
          return lesson
            ? `${item.courseId}-${lesson.id}`
            : null;
        })
        .filter(Boolean);
    });

    setEnrolledCourses(enrolled);
    setCompletedLessons(completed);
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
}

  

  // Enroll in a course and save enrollment in MySQL.
  async function handleEnroll(course) {
    if (!loggedInUser) {
      setShowAuth(true);
      return;
    }

    if (enrolledCourses.includes(course.id)) return;

    try {
      setSavingProgress(true);

      await apiRequest(`/api/progress/${course.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          completedLessons: [],
        }),
      });

      setEnrolledCourses((previous) =>
        previous.includes(course.id)
          ? previous
          : [...previous, course.id]
      );
    } catch (error) {
      console.error('Failed to enroll:', error);
      alert(`Could not enroll: ${error.message}`);
    } finally {
      setSavingProgress(false);
    }
  }

  // Open a course.
  

async function openCourse(course, startLearning = false) {
  setSelectedCourse(course);
  setActiveLesson(startLearning ? 0 : null);
  setCourseRating(0);
  setCourseReview('');
  setCourseReviews((previous) => ({
    ...previous,
    [course.id]: [],
  }));

  if (localStorage.getItem('learnhub-token')) {
    try {
      const reviews = await apiRequest(`/api/reviews/${course.id}`);

      setCourseReviews((previous) => ({
        ...previous,
        [course.id]: reviews.map((review) => ({
          rating: review.rating,
          comment: review.comment,
          date: review.createdAt
            ? new Date(review.createdAt).toLocaleDateString()
            : '',
        })),
      }));
    } catch (error) {
      console.error('Failed to load reviews:', error);
      alert(`Could not load reviews: ${error.message}`);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


  // Navigate back to a page section.
  function goHome(section = 'home') {
    setSelectedCourse(null);
    setActiveLesson(null);

    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 0);
  }

  // Mark a lesson complete and save the change in MySQL.
 
async function markLessonComplete() {
  if (
    !selectedCourse ||
    activeLesson === null ||
    !loggedInUser
  ) {
    return;
  }

  const courseId = selectedCourse.id;

  const allLessons = selectedCourse.topics.flatMap(
    (topic) => topic.lessons
  );

  const currentLesson = allLessons[activeLesson];

  if (!currentLesson) return;

  const lessonId = `${courseId}-${currentLesson.id}`;

  if (completedLessons.includes(lessonId)) return;

  const updatedLessons = [
    ...completedLessons,
    lessonId,
  ];

  const completedIndexes = getCompletedIndexes(
    courseId,
    updatedLessons
  );

  try {
    setSavingProgress(true);

    await apiRequest(`/api/progress/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify({
        completedLessons: completedIndexes,
      }),
    });

    setCompletedLessons(updatedLessons);
  } catch (error) {
    console.error('Failed to save lesson progress:', error);
    alert(`Could not save lesson progress: ${error.message}`);
  } finally {
    setSavingProgress(false);
  }
}



function getCourseProgress(course) {
  const allLessons = course.topics.flatMap(
    (topic) => topic.lessons
  );

  if (allLessons.length === 0) return 0;

  const completedCount = allLessons.filter((lesson) =>
    completedLessons.includes(`${course.id}-${lesson.id}`)
  ).length;

  return Math.round(
    (completedCount / allLessons.length) * 100
  );
}

  // Submit a course review.

async function handleSubmitReview() {
  if (!loggedInUser) {
    setShowAuth(true);
    return;
  }

  if (!selectedCourse) return;

  if (courseRating === 0) {
    alert('Please select a star rating first.');
    return;
  }

  try {
    setSavingProgress(true);

    const savedReview = await apiRequest(
      `/api/reviews/${selectedCourse.id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          rating: courseRating,
          comment: courseReview.trim(),
        }),
      }
    );

    setCourseReviews((previous) => ({
      ...previous,
      [selectedCourse.id]: [
        ...(previous[selectedCourse.id] || []),
        {
          rating: savedReview.rating,
          comment: savedReview.comment,
          date: savedReview.createdAt
            ? new Date(savedReview.createdAt).toLocaleDateString()
            : new Date().toLocaleDateString(),
        },
      ],
    }));

    setCourseRating(0);
    setCourseReview('');

    alert('Your review has been saved to the database!');
  } catch (error) {
    console.error('Failed to save review:', error);
    alert(`Could not save review: ${error.message}`);
  } finally {
    setSavingProgress(false);
  }
}


  // Logout.
  function handleLogout() {
    localStorage.removeItem('learnhub-token');

    setLoggedInUser(null);
    setEnrolledCourses([]);
    setCompletedLessons([]);
    setCourseReviews({});
    setSelectedCourse(null);
    setActiveLesson(null);
    setCourseRating(0);
    setCourseReview('');
    setShowAuth(false);
  }

  if (showAuth) {
    return (
      <Auth
        onBack={() => setShowAuth(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <a
          className="logo"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            goHome('home');
          }}
        >
          ShikshaHub
        </a>

        <div className="nav-links">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              goHome('home');
            }}
          >
            Home
          </a>

          <a
            href="#courses"
            onClick={(event) => {
              event.preventDefault();
              goHome('courses');
            }}
          >
            Courses
          </a>

          <a
            href="#about"
            onClick={(event) => {
              event.preventDefault();
              goHome('about');
            }}
          >
            About
          </a>

          <a
            href="#dashboard"
            onClick={(event) => {
              event.preventDefault();
              goHome('dashboard');
            }}
          >
            My Dashboard
          </a>
        </div>

        {loggedInUser ? (
          <>
            <span className="user-name">
             Welcome, {loggedInUser?.name || "Student"}
            </span>

            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="login-btn"
            onClick={() => setShowAuth(true)}
          >
            Login
          </button>
        )}
      </nav>

      {/* Course Details and Lessons */}
      {selectedCourse ? (
        <section className="course-details">
          <button
            className="back-btn"
            onClick={() => goHome('courses')}
          >
            ← Back to Courses
          </button>

          <div className="details-card">
            <div className="details-icon">
              {selectedCourse.icon}
            </div>

            <span className="course-category">
              {selectedCourse.category}
            </span>

            <h1>{selectedCourse.title}</h1>
            <p>{selectedCourse.description}</p>

            <p>
              <strong>Level:</strong> {selectedCourse.level}
            </p>

            <p>
              <strong>Instructor:</strong>{' '}
              {selectedCourse.instructor}
            </p>

            <p>
            <strong>Total lessons:</strong>{' '}
{selectedCourse.topics.reduce(
  (total, topic) => total + topic.lessons.length,
  0
)}
            </p>

            {!loggedInUser ? (
              <button
                className="explore-btn"
                onClick={() => setShowAuth(true)}
              >
                Login to Enroll
              </button>
            ) : !enrolledCourses.includes(selectedCourse.id) ? (
              <button
                className="explore-btn"
                disabled={savingProgress}
                onClick={() => handleEnroll(selectedCourse)}
              >
                {savingProgress ? 'Saving...' : 'Enroll Now'}
              </button>
            ) : (
              <p className="success-message">
                You are enrolled in this course!
              </p>
            )}

         
<h3>Course Syllabus</h3>

<div className="lesson-list">
  {selectedCourse.topics.map((topic) => (
    <div key={topic.id} className="topic-section">
      <h4>{topic.title}</h4>

      <ol>
        {topic.lessons.map((lesson) => {
          const allLessons = selectedCourse.topics.flatMap(
            (item) => item.lessons
          );

          const index = allLessons.findIndex(
            (item) => item.id === lesson.id
          );

          const lessonId = `${selectedCourse.id}-${lesson.id}`;
          const isCompleted = completedLessons.includes(lessonId);

          return (
            <li key={lesson.id}>
              <button
                className={
                  activeLesson === index
                    ? 'lesson-select active-lesson'
                    : 'lesson-select'
                }
                disabled={!enrolledCourses.includes(selectedCourse.id)}
                onClick={() => setActiveLesson(index)}
              >
                {isCompleted ? '✓ ' : ''}
                Lesson {index + 1}: {lesson.title}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  ))}
</div>


            {/* Course Review Form */}
            <div className="course-review">
              <h3>Rate This Course</h3>
              <p>How would you rate this course?</p>

              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="star-btn"
                    onClick={() => setCourseRating(star)}
                    aria-label={`Rate ${star} out of 5`}
                  >
                    {star <= courseRating ? '★' : '☆'}
                  </button>
                ))}
              </div>

              <textarea
                className="review-input"
                placeholder="Write your review..."
                value={courseReview}
                onChange={(event) =>
                  setCourseReview(event.target.value)
                }
                rows={4}
              />

              <button
                type="button"
                className="explore-btn"
                onClick={handleSubmitReview}
              >
                Submit Review
              </button>
            </div>

            {/* Student Reviews */}
            <div className="saved-reviews">
              <h3>Student Reviews</h3>

              {(courseReviews[selectedCourse.id] || []).length ===
              0 ? (
                <p>No reviews yet. Be the first to review!</p>
              ) : (
                courseReviews[selectedCourse.id].map(
                  (review, index) => (
                    <div className="saved-review" key={index}>
                      <p className="saved-stars">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </p>

                      <p>
                        {review.comment || 'No written comment.'}
                      </p>

                      <small>{review.date}</small>
                    </div>
                  )
                )
              )}
            </div>

            {/* Active Lesson Content */}
            {enrolledCourses.includes(selectedCourse.id) && (
              <div className="lesson-content">
                {activeLesson === null ? (
                  <p>Select a lesson from the syllabus to start learning.</p>
                ) : (
                  (() => {
                    const allLessons = selectedCourse.topics.flatMap(
                      (topic) => topic.lessons
                    );
                    const lesson = allLessons[activeLesson];

                    if (!lesson) return <p>Lesson not found.</p>;

                    const lessonId = `${selectedCourse.id}-${lesson.id}`;
                    const isCompleted = completedLessons.includes(lessonId);

                    return (
                      <>
                        <h2>
                          Lesson {activeLesson + 1}: {lesson.title}
                        </h2>

                        <p>{lesson.content}</p>

                        <button
                          className="explore-btn"
                          onClick={markLessonComplete}
                          disabled={savingProgress || isCompleted}
                        >
                          {isCompleted
                            ? 'Completed ✓'
                            : savingProgress
                              ? 'Saving...'
                              : 'Mark as Complete'}
                        </button>

                        <p>
                          <strong>Course progress:</strong>{' '}
                          {getCourseProgress(selectedCourse)}%
                        </p>

                        {activeLesson < allLessons.length - 1 && (
                          <button
                            className="view-course-btn"
                            onClick={() => setActiveLesson(activeLesson + 1)}
                          >
                            Next Lesson →
                          </button>
                        )}
                      </>
                    );
                  })()
                )}
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          {/* Homepage Hero */}
          <main id="home" className="hero">
            <span className="hero-label">
              YOUR LEARNING JOURNEY STARTS HERE
            </span>

            <h1>
              Learn New Skills.
              <br />
              Build Your Future.
            </h1>

            <p>
              Explore practical courses and learn skills that help
              you grow.
            </p>

            <a className="explore-btn" href="#courses">
              Explore Courses
            </a>
          </main>

          {/* Course Catalogue */}
          <section id="courses" className="courses-section">
            <div className="section-heading">
              <span>OUR COURSES</span>
              <h2>Popular Courses</h2>
              <p>Start learning something new today.</p>
            </div>

            <div className="course-filters">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                aria-label="Search courses"
              />

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                aria-label="Filter by category"
              >
                <option value="All">All Categories</option>
                <option value="Development">Development</option>
                <option value="Programming">Programming</option>
              </select>
            </div>

            <div className="course-grid">
              {filteredCourses.map((course) => (
                <article className="course-card" key={course.id}>
                  <div className="course-icon">{course.icon}</div>

                  <span className="course-category">
                    {course.category}
                  </span>

                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  <div className="course-footer">
                    <span>{course.level}</span>

                    <button
                      className="view-course-btn"
                      onClick={() => openCourse(course)}
                    >
                      View Course →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <p className="no-courses">
                No courses found. Try another search.
              </p>
            )}
          </section>

          {/* Student Dashboard */}
          <section id="dashboard" className="dashboard-section">
            <div className="section-heading">
              <span>STUDENT AREA</span>
              <h2>My Dashboard</h2>
              <p>Continue your learning journey.</p>
              {loggedInUser && (
  <div className="student-profile-card">
    <div className="profile-avatar">
      {loggedInUser.name?.charAt(0).toUpperCase() || "S"}
    </div>

    <div className="profile-details">
      <h3>{loggedInUser.name || "Student"}</h3>
      <p>{loggedInUser.email || "Email not available"}</p>
      <span className="profile-status">Active Learner</span>
      <button
  type="button"
  className="edit-profile-btn"
  onClick={() => {
    const newName = window.prompt(
      "Enter your updated name:",
      loggedInUser.name || ""
    );

    if (newName && newName.trim()) {
      apiRequest("/api/users/me", {
        method: "PUT",
        body: JSON.stringify({
          name: newName.trim(),
        }),
      })
        .then((data) => {
          setLoggedInUser((previous) => ({
            ...previous,
            name: data.name,
          }));
          alert("Profile updated successfully!");
        })
        .catch((error) => {
          alert("Profile update failed: " + error.message);
        });
    }
  }}
>
  Edit Profile
</button>
    </div>
  </div>
  
)}

<div className="change-password-card">
  <h3>Change Password</h3>
  <p>Update your account password securely.</p>

  <form
    onSubmit={async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      const currentPassword = form.currentPassword.value;
      const newPassword = form.newPassword.value;
      const confirmPassword = form.confirmPassword.value;

      if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
      }

      if (newPassword.length < 8) {
        alert("New password must be at least 8 characters.");
        return;
      }

      try {
        const data = await apiRequest("/api/users/me/password", {
          method: "PUT",
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        });

        alert(data.message || "Password changed successfully.");
        form.reset();
      } catch (error) {
        alert("Password change failed: " + error.message);
      }
    }}
  >
    <input
      type="password"
      name="currentPassword"
      placeholder="Current password"
      autoComplete="current-password"
      required
    />

    <input
      type="password"
      name="newPassword"
      placeholder="New password (minimum 8 characters)"
      autoComplete="new-password"
      minLength={8}
      required
    />

    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm new password"
      autoComplete="new-password"
      minLength={8}
      required
    />

    <button type="submit">Update Password</button>
  </form>
</div>

            </div>

            {!loggedInUser && (
              <p className="no-courses">
                Please log in to view your enrolled courses.
              </p>
            )}

<div className="dashboard-summary">
  <div className="summary-card">
    <h3>{enrolledCourses.length}</h3>
    <p>Enrolled Courses</p>
  </div>

  <div className="summary-card">
    <h3>
      {courses
        .filter((course) => enrolledCourses.includes(course.id))
        .reduce(
          (total, course) =>
            total +
            course.topics
              .flatMap((topic) => topic.lessons)
              .filter((lesson) =>
                completedLessons.includes(`${course.id}-${lesson.id}`)
              ).length,
          0
        )}
    </h3>
    <p>Completed Lessons</p>
  </div>

  <div className="summary-card">
    <h3>
      {(() => {
        const enrolled = courses.filter((course) =>
          enrolledCourses.includes(course.id)
        );

        const totalLessons = enrolled.reduce(
          (total, course) =>
            total +
            course.topics.reduce(
              (sum, topic) => sum + topic.lessons.length,
              0
            ),
          0
        );

        const completed = enrolled.reduce(
          (total, course) =>
            total +
            course.topics
              .flatMap((topic) => topic.lessons)
              .filter((lesson) =>
                completedLessons.includes(`${course.id}-${lesson.id}`)
              ).length,
          0
        );

        return totalLessons
          ? `${Math.round((completed / totalLessons) * 100)}%`
          : "0%";
      })()}
    </h3>
    <p>Overall Progress</p>
  </div>
</div>

            <div className="course-grid">
              {courses
                .filter((course) =>
                  enrolledCourses.includes(course.id)
                )
                .map((course) => (
                  <article className="course-card" key={course.id}>
                    <div className="course-icon">{course.icon}</div>

                    <span className="course-category">
                      {course.category}
                    </span>

                    <h3>{course.title}</h3>
                    <p>{course.description}</p>

                    <div className="progress-info">
                      <strong>
                        Progress: {getCourseProgress(course)}%
                      </strong>

                      <span>
                        {
                          course.topics
                            .flatMap((topic) => topic.lessons)
                            .filter((lesson) =>
                              completedLessons.includes(`${course.id}-${lesson.id}`)
                            ).length
                        }{' '}
                        of {course.topics.reduce(
                          (total, topic) => total + topic.lessons.length,
                          0
                        )} lessons completed
                      </span>
                    </div>

                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-valuenow={getCourseProgress(course)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-fill"
                        style={{
                          width: `${getCourseProgress(course)}%`,
                        }}
                      />
                    </div>

                    {getCourseProgress(course) === 100 && (
                      <span className="completed-badge">
                        ✓ Course Completed
                      </span>
                    )}

                    <div className="course-footer">
                      <span>{course.level}</span>

                      <button
                        className="view-course-btn"
                        onClick={() => openCourse(course, true)}
                      >
                        Continue Learning →
                      </button>
                    </div>
                  </article>
                ))}
            </div>

            {loggedInUser && enrolledCourses.length === 0 && (
              <p className="no-courses">
                You haven't enrolled in any courses yet. Explore
                courses to get started!
              </p>
            )}
          </section>

          {/* About */}
          <section id="about" className="about-section">
            <h2>About ShikshaHub </h2>
            <p>
              ShikshaHub helps learners build practical skills through
              online courses.
            </p>
          </section>

          <footer className="footer">
            © 2026 ShikshaHub. Keep learning, keep growing.
          </footer>
        </>
      )}
    </div>
  );
}

export default App;