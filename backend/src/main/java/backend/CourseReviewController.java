
package backend;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/reviews")
public class CourseReviewController {

    private final CourseReviewService reviewService;

    public CourseReviewController(CourseReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/{courseId}")
    public List<ReviewResponse> getReviews(
            @PathVariable Long courseId) {

        return reviewService.getReviews(courseId)
                .stream()
                .map(review -> new ReviewResponse(
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                ))
                .toList();
    }

    @PostMapping("/{courseId}")
    public ReviewResponse saveReview(
            @PathVariable Long courseId,
            @RequestBody ReviewRequest request,
            Authentication authentication) {

        if (request == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Review data is required");
        }

        try {
            var review = reviewService.saveReview(
                    authentication.getName(),
                    courseId,
                    request.getRating(),
                    request.getComment()
            );

            return new ReviewResponse(
                    review.getRating(),
                    review.getComment(),
                    review.getCreatedAt()
            );

        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public static class ReviewRequest {
        private int rating;
        private String comment;

        public ReviewRequest() {}

        public int getRating() {
            return rating;
        }

        public void setRating(int rating) {
            this.rating = rating;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }
    }

    public static class ReviewResponse {
        private final int rating;
        private final String comment;
        private final LocalDateTime createdAt;

        public ReviewResponse(
                int rating,
                String comment,
                LocalDateTime createdAt) {
            this.rating = rating;
            this.comment = comment;
            this.createdAt = createdAt;
        }

        public int getRating() {
            return rating;
        }

        public String getComment() {
            return comment;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }
    }
}
