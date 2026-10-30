
package backend;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseProgressRepository
        extends JpaRepository<CourseProgress, Long> {

    List<CourseProgress> findByUserId(Long userId);

    Optional<CourseProgress> findByUserIdAndCourseId(
        Long userId,
        Long courseId
    );
}
