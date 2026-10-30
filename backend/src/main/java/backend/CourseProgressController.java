
package backend;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progress")
public class CourseProgressController {

    private final CourseProgressService progressService;

    public CourseProgressController(CourseProgressService progressService) {
        this.progressService = progressService;
    }

    public record ProgressResponse(
    Long courseId,
    List<Integer> completedLessons
) {}
    public static class ProgressRequest {
        private List<Integer> completedLessons;

        public List<Integer> getCompletedLessons() {
            return completedLessons;
        }

        public void setCompletedLessons(List<Integer> completedLessons) {
            this.completedLessons = completedLessons;
        }
    }

    @GetMapping
public ResponseEntity<List<ProgressResponse>> getProgress(
        Authentication authentication) {

    List<ProgressResponse> result =
        progressService.getProgress(authentication.getName())
            .stream()
            .map(progress -> new ProgressResponse(
                progress.getCourseId(),
                progress.getCompletedLessons()
            ))
            .toList();

    return ResponseEntity.ok(result);
}

    @PutMapping("/{courseId}")
    public ResponseEntity<?> saveProgress(
            @PathVariable Long courseId,
            @RequestBody ProgressRequest request,
            Authentication authentication) {

        if (courseId == null || courseId <= 0 ||
                request == null || request.getCompletedLessons() == null ||
                request.getCompletedLessons().stream()
                    .anyMatch(index -> index == null || index < 0)) {
            return ResponseEntity.badRequest()
                .body("Invalid course progress data");
        }




        CourseProgress progress = progressService.saveProgress(
                authentication.getName(),
                courseId,
                request.getCompletedLessons()
        );

        return ResponseEntity.ok(
                new ProgressResponse(
                        progress.getCourseId(),
                        progress.getCompletedLessons()
                )
        );

    }
}
