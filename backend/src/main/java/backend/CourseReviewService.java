
package backend;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CourseReviewService {

    private final CourseReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public CourseReviewService(
            CourseReviewRepository reviewRepository,
            UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<CourseReview> getReviews(Long courseId) {
        return reviewRepository.findByCourseId(courseId);
    }

    @Transactional
    public CourseReview saveReview(
            String email,
            Long courseId,
            int rating,
            String comment) {

        if (courseId == null || courseId <= 0) {
            throw new IllegalArgumentException("Invalid course ID");
        }

        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException(
                    "Rating must be between 1 and 5");
        }

        if (comment != null && comment.length() > 2000) {
            throw new IllegalArgumentException(
                    "Review cannot exceed 2000 characters");
        }

        User user = userRepository.findByEmail(
                email.trim().toLowerCase())
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        CourseReview review = new CourseReview();
        review.setUser(user);
        review.setCourseId(courseId);
        review.setRating(rating);
        review.setComment(
                comment == null ? "" : comment.trim());

        return reviewRepository.save(review);
    }
}
