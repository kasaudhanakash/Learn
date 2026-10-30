
package backend;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "course_progress",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"user_id", "course_id"}
        )
    }
)
public class CourseProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @ElementCollection
    @CollectionTable(
        name = "completed_lessons",
        joinColumns = @JoinColumn(name = "progress_id")
    )
    @Column(name = "lesson_index")
    private List<Integer> completedLessons = new ArrayList<>();

    public CourseProgress() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public List<Integer> getCompletedLessons() {
        return completedLessons;
    }

    public void setCompletedLessons(List<Integer> completedLessons) {
        this.completedLessons = completedLessons;
    }
}
