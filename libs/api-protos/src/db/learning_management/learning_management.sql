CREATE SCHEMA IF NOT EXISTS learning_management;

--
-- Table structure for table student_group
--
CREATE TABLE IF NOT EXISTS learning_management.student_group (
  student_group_id BIGSERIAL NOT NULL,
  group_name TEXT DEFAULT NULL,
  school_teacher_class_course_id INT DEFAULT NULL,
  student_user_ids BIGINT ARRAY NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (student_group_id),
  CONSTRAINT fk_student_group_1 FOREIGN KEY (school_teacher_class_course_id) REFERENCES school_management.school_teacher_class_course (school_teacher_class_course_id)
);

--
-- Table structure for table task
--
CREATE TYPE task_type_enum as ENUM(
  -- task with sub tasks, this represents combination of tasks
  'homework_automated',
  'homework_custom',
  'assessment_automated',
  'assessment_custom'
);

--
-- Table structure for table task_default_instructions
--
CREATE TABLE IF NOT EXISTS learning_management.task_default_instructions (
  task_instruction_id SERIAL NOT NULL,
  task_type task_type_enum NOT NULL,
  instructions TEXT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (task_instruction_id)
);

CREATE TYPE task_action_type_enum as ENUM(
  -- task with sub tasks actions
  'read',
  'write',
  'watch_video',
  'fib',
  --Fill in the blanks
  'mtf',
  --Math the following
  'activity',
  --activity
  'activity_question',
  'mcq_s',
  'mcq_m',
  'tf',
  'short',
  'long'
);

CREATE TYPE task_creation_status_enum as ENUM('initialized', 'draft', 'approved', 'duplicated');

-- course_id, grade_id can be part of this
CREATE TABLE IF NOT EXISTS learning_management.task (
  task_id SERIAL NOT NULL,
  teacher_user_id INT DEFAULT NULL,
  task_name text,
  task_action_type task_action_type_enum DEFAULT NULL,
  task_type task_type_enum DEFAULT NULL,
  parent_task_id INT DEFAULT NULL,
  root_task_id INT DEFAULT NULL,
  course_module_id INT,
  course_id INT,
  school_class_section INT,
  -- course will be linked to the grades
  level SMALLINT,
  -- the order of the task
  position SMALLINT,
  description text,
  instructions text,
  difficulty_level TEXT NOT NULL,
  duplicate_task_source_id INT DEFAULT NULL,
  num_assigned INT,
  -- has meta data
  data JSONB,
  task_creation_status task_creation_status_enum NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (task_id),
  CONSTRAINT fk_task_1 FOREIGN KEY (parent_task_id) REFERENCES learning_management.task (task_id)
);

--
-- Table structure for table task_group_assignment
--
CREATE TYPE task_group_status_enum as ENUM('assigned', 'cancelled', 'completed');

CREATE TYPE task_evaluation_enum as ENUM('not_started', 'in_progress', 'completed');

CREATE TABLE IF NOT EXISTS learning_management.task_group_assignment (
  task_group_assignment_id BIGSERIAL NOT NULL,
  task_id INT DEFAULT NULL,
  student_group_id BIGINT NOT NULL,
  num_students SMALLINT,
  task_assigned_date TIMESTAMP DEFAULT NULL,
  task_target_date TIMESTAMP DEFAULT NULL,
  task_commence_date TIMESTAMP DEFAULT NULL,
  task_completed_date TIMESTAMP DEFAULT NULL,
  task_cancellation_data JSONB DEFAULT NULL,
  task_status task_group_status_enum NOT NULL,
  task_evaluation_status task_evaluation_enum DEFAULT NULL,
  avg_metrics JSONB DEFAULT NULL,
  num_completions SMALLINT,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (task_group_assignment_id),
  CONSTRAINT fk_task_assignment_1 FOREIGN KEY (task_id) REFERENCES learning_management.task (task_id),
  CONSTRAINT fk_task_assignment_2 FOREIGN KEY (student_group_id) REFERENCES learning_management.student_group (student_group_id)
);

--
-- Table structure for table task_student_assignment
--
CREATE TYPE task_student_status_enum as ENUM('assigned', 'inprogress', 'completed');

CREATE TABLE IF NOT EXISTS learning_management.task_student_assignment (
  task_student_assignment_id BIGSERIAL NOT NULL,
  task_id INT DEFAULT NULL,
  student_user_id text,
  student_group_id BIGINT NOT NULL,
  task_assigned_date TIMESTAMP DEFAULT NULL,
  task_target_date TIMESTAMP DEFAULT NULL,
  task_commence_date TIMESTAMP DEFAULT NULL,
  task_completed_date TIMESTAMP DEFAULT NULL,
  task_status task_student_status_enum NOT NULL,
  task_evaluation_status task_evaluation_enum DEFAULT NULL,
  -- task level metrics computed based on type of the task
  metrics JSONB DEFAULT NULL,
  -- student response sent based on type of the task
  response JSONB DEFAULT NULL,
  teacher_review JSONB DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (task_student_assignment_id),
  CONSTRAINT fk_task_assignment_1 FOREIGN KEY (task_id) REFERENCES learning_management.task (task_id),
  CONSTRAINT fk_task_assignment_2 FOREIGN KEY (student_group_id) REFERENCES learning_management.student_group (student_group_id)
);

-- Create enum for SessionModeEnum
CREATE TYPE SessionModeEnum AS ENUM ('teach', 'learn', 'resource');

-- Create enum for SessionStatusEnum
CREATE TYPE SessionStatusEnum AS ENUM ('ongoing', 'exited', 'completed');

CREATE TABLE IF NOT EXISTS learning_management.student_lesson_session (
  student_lesson_session_id SERIAL NOT NULL,
  student_id INT NOT NULL,
  lesson_id INT NOT NULL,
  school_id INT NOT NULL,
  academic_year INT NOT NULL,
  grade TEXT NOT NULL,
  section TEXT NOT NULL,
  subject TEXT NOT NULL,
  teacher_lesson_session_id SERIAL NULL,
  session_resource_ids ARRAY INT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  session_mode SessionModeEnum NOT NULL,
  session_status SessionStatusEnum NOT NULL,
  end_time TIMESTAMP NULL,
  metrics JSONB NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (lesson_session_id),
  CONSTRAINT fk_lesson_tag_1_idx FOREIGN KEY (lesson_id) REFERENCES content_management.lesson (lesson_id)
);

CREATE TABLE IF NOT EXISTS learning_management.teacher_lesson_session (
  teacher_lesson_session_id SERIAL NOT NULL,
  teacher_id INT NOT NULL,
  lesson_id INT NOT NULL,
  school_id INT NOT NULL,
  academic_year INT NOT NULL,
  grade TEXT NOT NULL,
  section TEXT NOT NULL,
  subject TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  teacher_profile_image_url TEXT NOT NULL,
  session_resource_ids ARRAY INT NOT NULL,
  session_mode SessionModeEnum NOT NULL,
  session_status SessionStatusEnum NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NULL,
  metrics JSONB NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (lesson_session_id),
  CONSTRAINT fk_lesson_tag_1_idx FOREIGN KEY (lesson_id) REFERENCES content_management.lesson (lesson_id)
);

CREATE TABLE IF NOT EXISTS learning_management.student_resource_session (
  student_resource_session_id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  resource_id INT NOT NULL,
  resource_version INT NO NULL,
  --This will preserve the content of resource at the time of attempt
  user_lesson_session_Id INT NULL,
  --lesson_session_id can include all type of session-ids
  session_mode SessionModeEnum NOT NULL,
  session_status SessionStatusEnum NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NULL,
  response JSONB NOT NULL,
  -- ResourceResponseModel
);

CREATE TABLE IF NOT EXISTS learning_management.teacher_resource_session (
  teacher_resource_session_id SERIAL PRIMARY KEY,
  teacher_id INT NOT NULL,
  resource_id INT NOT NULL,
  resource_version INT NO NULL,
  --This will preserve the content of resource at the time of attempt
  user_lesson_session_Id INT NULL,
  --lesson_session_id can include all type of session-ids
  session_mode SessionModeEnum NOT NULL,
  session_status SessionStatusEnum NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NULL,
  response JSONB NOT NULL,
  -- ResourceResponseModel
);
