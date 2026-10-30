
package backend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CourseProgressService {

    private final CourseProgressRepository progressRepository;
    private final UserRepository userRepository;

    public CourseProgressService(
            CourseProgressRepository progressRepository,
            UserRepository userRepository) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<CourseProgress> getProgress(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                    new IllegalArgumentException("User not found"));

        return progressRepository.findByUserId(user.getId());
    }

    @Transactional
    public CourseProgress saveProgress(
            String email,
            Long courseId,
            List<Integer> completedLessons) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                    new IllegalArgumentException("User not found"));

        CourseProgress progress = progressRepository
                .findByUserIdAndCourseId(user.getId(), courseId)
                .orElseGet(CourseProgress::new);

        progress.setUser(user);
        progress.setCourseId(courseId);
        progress.setCompletedLessons(
                completedLessons == null
                        ? new ArrayList<>()
                        : new ArrayList<>(completedLessons));

        return progressRepository.save(progress);
    }
}
