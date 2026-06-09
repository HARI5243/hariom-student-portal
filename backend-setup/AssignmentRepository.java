// AssignmentRepository
// Path: backend/src/main/java/com/studentportal/repository/AssignmentRepository.java

package com.studentportal.repository;

import com.studentportal.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByIsActiveTrueOrderByDueDateDesc();

    List<Assignment> findBySubject(String subject);

    List<Assignment> findByDueDateAfter(LocalDate date);

    List<Assignment> findByDueDateBefore(LocalDate date);
}
