CREATE SCHEMA IF NOT EXISTS school_management;

--
-- Table structure for table region
--
CREATE TABLE IF NOT EXISTS school_management.region (
  region_id SERIAL NOT NULL,
  region_name TEXT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (region_id)
);

--
-- Table structure for table school_group
--
CREATE TABLE IF NOT EXISTS school_management.school_group (
  school_group_id SERIAL NOT NULL,
  school_group_name TEXT NOT NULL,
  region_id INT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  address_lat_long TEXT DEFAULT NULL,
  address_city TEXT DEFAULT NULL,
  address_state TEXT DEFAULT NULL,
  address_country TEXT DEFAULT NULL,
  address_zip_code TEXT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_group_id),
  CONSTRAINT fk_school_group_1 FOREIGN KEY (region_id) REFERENCES school_management.region (region_id)
);

--
-- Table structure for table school
--
CREATE TABLE IF NOT EXISTS school_management.school (
  school_id SERIAL NOT NULL,
  school_group_id INT DEFAULT NULL,
  school_name TEXT NOT NULL,
  region_id INT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  address_lat_long TEXT DEFAULT NULL,
  address_city TEXT DEFAULT NULL,
  address_state TEXT DEFAULT NULL,
  address_country TEXT DEFAULT NULL,
  address_zip_code TEXT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_id),
  CONSTRAINT fk_school_1 FOREIGN KEY (school_group_id) REFERENCES school_management.school_group (school_group_id),
  CONSTRAINT fk_school_2 FOREIGN KEY (region_id) REFERENCES school_management.region (region_id)
);

--
-- Table structure for table school_subscription
--
CREATE TABLE IF NOT EXISTS school_management.school_subscription (
  school_subscription_id SERIAL NOT NULL,
  school_group_id INT DEFAULT NULL,
  school_id INT NOT NULL,
  num_licenses INT NULL,
  payment_transaction_id BIGSERIAL NOT NULL,
  subscription_start_date DATE DEFAULT NULL,
  subscription_end_date DATE DEFAULT NULL,
  active_subscription SMALLINT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_subscription_id),
  CONSTRAINT fk_school_subscription_1 FOREIGN KEY (school_group_id) REFERENCES school_management.school_group (school_group_id),
  CONSTRAINT fk_school_subscription_2 FOREIGN KEY (school_id) REFERENCES school_management.school (school_id)
);

--
-- Table structure for table school_medium_board
--
CREATE TABLE IF NOT EXISTS school_management.school_medium_board (
  school_medium_board_id SERIAL NOT NULL,
  school_id INT NOT NULL,
  board_id INT NOT NULL,
  teach_medium_id INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_medium_board_id),
  CONSTRAINT fk_school_medium_board_1 FOREIGN KEY (board_id) REFERENCES common.board (board_id),
  CONSTRAINT fk_school_medium_board_2 FOREIGN KEY (school_id) REFERENCES school_management.school (school_id),
  CONSTRAINT fk_school_medium_board_3 FOREIGN KEY (teach_medium_id) REFERENCES common.teach_medium (teach_medium_id)
);

--
-- Table structure for table school_holiday
--
CREATE TYPE half_day_session_enum AS ENUM('first', 'second');

CREATE TABLE IF NOT EXISTS school_management.school_holiday (
  school_holiday_id SERIAL NOT NULL,
  school_medium_board_id INT DEFAULT NULL,
  holiday_name TEXT DEFAULT NULL,
  holiday_description TEXT DEFAULT NULL,
  holiday_date TIMESTAMP DEFAULT NULL,
  holiday_full_day SMALLINT DEFAULT NULL,
  holiday_half_day_session half_day_session_enum DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_holiday_id),
  CONSTRAINT fk_school_holiday_1 FOREIGN KEY (school_medium_board_id) REFERENCES school_management.school_medium_board (school_medium_board_id)
);

-- --
-- -- Table structure for table school_working_day
-- --
-- CREATE TABLE IF NOT EXISTS school_management.school_working_day (
--   school_working_day_id SERIAL NOT NULL,
--   school_medium_board_id INT DEFAULT NULL,
--   day_of_week INT DEFAULT NULL,
--   start_time TIMESTAMP DEFAULT NULL,
--   end_time TIMESTAMP DEFAULT NULL,
--   created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   created_by INT DEFAULT '0',
--   modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_by INT DEFAULT '0',
--   PRIMARY KEY (school_working_day_id),
--   CONSTRAINT fk_school_working_day_1 FOREIGN KEY (school_medium_board_id) REFERENCES school_management.school_medium_board (school_medium_board_id)
-- );

--
-- Table structure for table school_class
--
CREATE TABLE IF NOT EXISTS school_management.school_class (
  school_class_id SERIAL NOT NULL,
  class_id INT NOT NULL,
  school_medium_board_id INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_class_id),
  CONSTRAINT fk_school_class_1 FOREIGN KEY (school_medium_board_id) REFERENCES school_management.school_medium_board (school_medium_board_id),
  CONSTRAINT fk_school_class_2 FOREIGN KEY (class_id) REFERENCES common.class (class_id)
);

--
-- Table structure for table school_class_section
--
CREATE TABLE IF NOT EXISTS school_management.school_class_section (
  school_class_section_id SERIAL NOT NULL,
  section_name TEXT DEFAULT NULL,
  school_class_id INT DEFAULT NULL,
  academic_year_id INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_class_section_id),
  CONSTRAINT fk_school_class_section_1 FOREIGN KEY (school_class_id) REFERENCES school_management.school_class (school_class_id),
  CONSTRAINT fk_school_class_section_2 FOREIGN KEY (academic_year_id) REFERENCES common.academic_year (academic_year_id)
);

--
-- Table structure for table school_grade
--
-- CREATE TABLE IF NOT EXISTS school_management.school_grade (
--   grade_id SERIAL NOT NULL,
--   grade_name TEXT NOT NULL,
--   school_id INT NOT NULL,
--   school_group_id INT DEFAULT NULL,
--   grade_max_score float DEFAULT NULL,
--   grade_min_score float DEFAULT NULL,
--   created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   created_by INT DEFAULT '0',
--   modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_by INT DEFAULT '0',
--   PRIMARY KEY (grade_id),
--   CONSTRAINT fk_grade_1 FOREIGN KEY (school_id) REFERENCES school_management.school (school_id),
--   CONSTRAINT fk_grade_2 FOREIGN KEY (school_group_id) REFERENCES school_management.school_group (school_group_id)
-- );
--
-- Table structure for TABLE school_management.course
--
CREATE TABLE IF NOT EXISTS school_management.course (
  course_id SERIAL NOT NULL,
  board_id INT NOT NULL,
  class_id INT NOT NULL,
  subject_id INT NOT NULL,
  teach_medium_id INT NOT NULL,
  academic_year_id INT NOT NULL,
  book_id INT NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (course_id),
  CONSTRAINT fk_course_1_idx FOREIGN KEY (board_id) REFERENCES common.board (board_id),
  CONSTRAINT fk_course_2_idx FOREIGN KEY (class_id) REFERENCES common.class (class_id),
  CONSTRAINT fk_course_3_idx FOREIGN KEY (subject_id) REFERENCES common.subject (subject_id),
  CONSTRAINT fk_course_4_idx FOREIGN KEY (teach_medium_id) REFERENCES common.teach_medium (teach_medium_id),
  CONSTRAINT fk_course_5_idx FOREIGN KEY (academic_year_id) REFERENCES common.academic_year (academic_year_id),
  CONSTRAINT fk_course_6_idx FOREIGN KEY (book_id) REFERENCES common.book (book_id)
);

--
-- Table structure for table school_course
--
CREATE TABLE IF NOT EXISTS school_management.school_course (
  school_course_id SERIAL NOT NULL,
  school_id INT NOT NULL,
  course_id INT NOT NULL,
  academic_year_id INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  CONSTRAINT fk_school_course_1_idx FOREIGN KEY (school_id) REFERENCES school_management.school (school_id),
  CONSTRAINT fk_school_course_1_idx FOREIGN KEY (course_id) REFERENCES school_management.course (course_id),
);

--
-- Table structure for table school_teacher_class_course
--
CREATE TABLE IF NOT EXISTS school_management.school_teacher_class_course (
  school_teacher_class_course_id SERIAL NOT NULL,
  school_class_id INT NOT NULL,
  school_class_section_id INT NOT NULL,
  teacher_user_id INT NOT NULL,
  academic_year_id INT NOT NULL,
  school_course_id INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_teacher_class_course_id),
  CONSTRAINT fk_school_teacher_class_course_1 FOREIGN KEY (school_class_id) REFERENCES school_management.school_class (school_class_id),
  CONSTRAINT fk_school_teacher_class_course_2 FOREIGN KEY (school_class_section_id) REFERENCES school_management.school_class_section (school_class_section_id),
  CONSTRAINT fk_school_teacher_class_course_4 FOREIGN KEY (academic_year_id) REFERENCES common.academic_year (academic_year_id),
  CONSTRAINT fk_school_teacher_class_course_3 FOREIGN KEY (school_course_id) REFERENCES school_management.school_course (school_course_id)
);

--
-- Table structure for table school_teacher_schedule
--
-- CREATE TABLE IF NOT EXISTS school_management.school_teacher_schedule (
--   school_teacher_schedule_id SERIAL NOT NULL,
--   school_teacher_class_course_id INT DEFAULT NULL,
--   academic_year_id INT NOT NULL,
--   schedule_date DATE DEFAULT NULL,
--   schedule_start_time TIMESTAMP DEFAULT NULL,
--   schedule_end_time TIMESTAMP DEFAULT NULL,
--   created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   created_by INT DEFAULT '0',
--   modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_by INT DEFAULT '0',
--   PRIMARY KEY (school_teacher_schedule_id),
--   CONSTRAINT fk_school_teacher_schedule_1 FOREIGN KEY (school_teacher_class_course_id) REFERENCES school_management.school_teacher_class_course (school_teacher_class_course_id),
--   CONSTRAINT fk_school_teacher_schedule_2 FOREIGN KEY (academic_year_id) REFERENCES common.academic_year (academic_year_id)
-- );
--
-- Table structure for table school_class_section_student
--
CREATE TABLE IF NOT EXISTS school_management.school_class_section_student (
  school_class_section_student_id SERIAL NOT NULL,
  school_class_id INT DEFAULT NULL,
  school_class_section_id INT NOT NULL,
  student_id INT DEFAULT NULL,
  academic_year_id INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (school_class_section_student_id),
  CONSTRAINT fk_school_class_section_student_1 FOREIGN KEY (school_class_id) REFERENCES school_management.school_class (school_class_id),
  CONSTRAINT fk_school_class_section_student_2 FOREIGN KEY (school_class_section_id) REFERENCES school_management.school_class_section (school_class_section_id),
  CONSTRAINT fk_school_class_section_student_3 FOREIGN KEY (academic_year_id) REFERENCES common.academic_year (academic_year_id)
);

--
-- Table structure for table school_student_course
--
CREATE TABLE IF NOT EXISTS school_management.school_student_course (
  school_student_course_id SERIAL NOT NULL,
  student_id INT DEFAULT NULL,
  school_course_id INT DEFAULT NULL,
  school_class_section_student_id INT NOT NULL,
  academic_year_id INT NOT NULL,
  created_by INT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (school_student_course_id),
  CONSTRAINT fk_school_student_course_idx_1 FOREIGN KEY (school_course_id) REFERENCES school_management.school_course (school_course_id),
  CONSTRAINT fk_school_student_course_idx_2 FOREIGN KEY (school_class_section_student_id) REFERENCES school_management.school_class_section_student (school_class_section_student_id),
  CONSTRAINT fk_school_student_course_idx_3 FOREIGN KEY (academic_year_id) REFERENCES common.academic_year (academic_year_id)
);
