
package backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseReviewRepository
        extends JpaRepository<CourseReview, Long> {

    List<CourseReview> findByCourseId(Long courseId);

    List<CourseReview> findByUserId(Long userId);

    List<CourseReview> findByUserEmailAndCourseId(
            String email, Long courseId);
}
