CREATE SCHEMA IF NOT EXISTS content_management;

CREATE TYPE question_objective_enum as ENUM ('knowledge', 'understanding', 'skill');

-- Create enum for ContextEnum
CREATE TYPE ContextEnum AS ENUM ('direct', 'enhanced', 'geneo');

-- Create enum for LevelEnum
CREATE TYPE LevelEnum AS ENUM ('high', 'medium', 'low');

CREATE TYPE question_type_enum as ENUM (
  'fib',
  --Fill in the blanks
  'mtf',
  --Math the following
  'mcq_s',
  'mcq_m',
  'tf',
  'short',
  'long',
  'arrange',
  'subjective',
  'label'
);

CREATE TYPE content_type_enum as ENUM (
  'passage',
  'experiment',
  -- 'question',
  'content_video',
  'flashcard',
  'mindmap'
);

CREATE TYPE content_objective_enum as ENUM ('knowledge', 'understanding', 'skill');

--
-- Table structure for content universal content_default_instructions
CREATE TABLE IF NOT EXISTS content_management.content_default_instructions (
  content_instruction_id SERIAL NOT NULL,
  content_type content_type_enum NOT NULL,
  instructions TEXT ARRAY NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (content_instruction_id)
);

--
-- Table structure for content
--
CREATE TABLE IF NOT EXISTS content_management.content (
  content_id SERIAL NOT NULL,
  content_type content_type_enum NOT NULL,
  content JSONB NOT NULL,
  content_text TEXT NOT NULL,
  --Complete content in the single text string for search engine
  content_objective content_objective_enum NOT NULL,
  learning_outcomes TEXT ARRAY NOT NULL,
  teacher_profile_id SERIAL NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (content_id) CONSTRAINT fk_question_LO_1_idx FOREIGN KEY (learning_outcomes) REFERENCES content_management.learning_outcome (learning_outcome_id),
  CONSTRAINT fk_question_teacher_id_2_idx FOREIGN KEY (teacher_profile_id) REFERENCES user_management.teacher_profile (teacher_profile_id)
);

CREATE TABLE IF NOT EXISTS content_management.question (
  question_id SERIAL NOT NULL,
  question_type question_type_enum NOT NULL,
  question_content JSONB NOT NULL,
  question_text TEXT NOT NULL,
  question_objective question_objective_enum NOT NULL,
  learning_outcomes TEXT ARRAY NOT NULL,
  teacher_profile_id SERIAL NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (question_id),
  CONSTRAINT fk_question_LO_1_idx FOREIGN KEY (learning_outcomes) REFERENCES content_management.learning_outcome (learning_outcome_id),
  CONSTRAINT fk_question_teacher_id_2_idx FOREIGN KEY (teacher_profile_id) REFERENCES user_management.teacher_profile (teacher_profile_id)
);

--
-- Table structure for TABLE content_management.modules
--
CREATE TYPE module_category_enum as ENUM ('book', 'chapter', 'chapter-topic');

CREATE TABLE IF NOT EXISTS content_management.module (
  module_id SERIAL NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT,
  parent_module_id INT NOT NULL,
  book_id INT NOT NULL,
  category module_category_enum NOT NULL,
  level INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (module_id),
  CONSTRAINT fk_module_1_idx FOREIGN KEY (book_id) REFERENCES common.book (book_id),
  CONSTRAINT fk_module_2_idx FOREIGN KEY (parent_module_id) REFERENCES content_management.module (module_id)
);

--
-- Table structure for TABLE content_management.learning_outcome --DISCUSS SHould we make it learning_outcome
--
CREATE TABLE IF NOT EXISTS content_management.learning_outcome (
  learning_outcome_id SERIAL NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (learning_outcome_id)
);

--
-- Table structure for TABLE content_management.module_content_resource
--
-- resource_type: 'read', 'video', 'introduction', 'question_bank'
CREATE TYPE resource_enum as ENUM (
  'Video',
  'Audio',
  'Reading',
  'QuestionSet',
  'Question',
  'Practice',
  'Test',
  'Activity',
  'Simulation',
  'Exploriment',
  'Game',
  'AR_VR',
  'PPT',
  'e_Book',
  'PDF',
  'FlashCards',
  'Mind_Map'
);

CREATE TYPE resource_category_enum as ENUM (
  'Hook',
  'Explanation',
  'Solved Examples',
  'Examples',
  'Practice',
  'Revision',
  'Activity',
  'Real Life Connect',
  'Competency Based Questions',
  'Introduction',
  'Competitive Exam',
  'Reading',
  'Recitation',
  'End of Chapter',
  'Grammar',
  'End of Poem',
  'Test Paper'
);

CREATE TABLE IF NOT EXISTS content_management.resource (
  resource_id SERIAL NOT NULL,
  title TEXT NOT NULL,
  poster_image_url TEXT NOT NULL,
  estimated_time_in_min INT NOT NULL,
  resource_type resource_enum NOT NULL,
  learning_outcomes TEXT ARRAY NOT NULL,
  resource_category resource_category_enum NOT NULL,
  rank SMALLINT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (resource_id) CONSTRAINT fk_resource_learning_outcome_idx FOREIGN KEY (learning_outcomes) REFERENCES content_management.learning_outcome (learning_outcome_id),
  CONSTRAINT fk_resource_content_id_idx FOREIGN KEY (content_ids) REFERENCES content_management.learning_outcome (content),
  CONSTRAINT fk_resource_question_id_idx FOREIGN KEY (question_ids) REFERENCES content_management.learning_outcome (question),
  CONSTRAINT fk_resource_instruction_id_idx FOREIGN KEY (instruction_ids) REFERENCES content_management.learning_outcome (instruction),
);

CREATE TABLE IF NOT EXISTS content_management.resource_content (
  resource_content_id SERIAL NOT NULL,
  resource_id INT NOT NULL,
  resource_content_info JSONB NOT NULL,
  --ResourceContentRevisionMap from resource.ts
  resource_version INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (resource_content_id),
  CONSTRAINT fk_resource_content_1_idx FOREIGN KEY (resource_id) REFERENCES content_management.resource (resource_id)
);

CREATE TYPE teacher_instruction_enum as ENUM ('SAY');

CREATE TABLE IF NOT EXISTS content_management.resource_teacher_instruction (
  resource_teacher_instruction_id SERIAL NOT NULL,
  instruction_type teacher_instruction_enum NOT NULL,
  text TEXT NOT NULL,
  resource_id INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (resource_teacher_instruction_id),
  CONSTRAINT fk_resource_teacher_instruction_1_idx FOREIGN KEY (resource_id) REFERENCES content_management.resource (resource_id)
);

-- category level resource and sub-category level resource
CREATE TABLE IF NOT EXISTS content_management.module_resource_tag (
  module_id INT NOT NULL,
  resource_id INT NOT NULL,
  rank INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  CONSTRAINT fk_module_resource_tag_1_idx FOREIGN KEY (module_id) REFERENCES content_management.module (module_id),
  CONSTRAINT fk_module_resource_tag_2_idx FOREIGN KEY (resource_id) REFERENCES content_management.resource (resource_id)
);

CREATE TABLE IF NOT EXISTS content_management.lesson (
  lesson_id SERIAL NOT NULL,
  title TEXT NOT NULL,
  module_id INT NOT NULL,
  estimated_time INT NOT NULL,
  resource_ids INT ARRAY NOT NULL,
  --sequence
  -- Sequences resources
  creation_status CreationStatus NOT NULL,
  source_lesson_id INT NULL,
  poster_image_url: text NULL,
  -- from where user can upoad the thumbnail for lesson plan
  learning_outcomes TEXT ARRAY NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (lesson_id),
  CONSTRAINT fk_lesson_tag_1_idx FOREIGN KEY (module_id) REFERENCES content_management.module (module_id) CONSTRAINT fk_lesson_tag_2_idx FOREIGN KEY (course_id) REFERENCES content_management.course (course_id) CONSTRAINT fk_lesson_tag_3_idx FOREIGN KEY (resource_id) REFERENCES content_management.resource (resource_id) CONSTRAINT fk_lesson_tag_4_idx FOREIGN KEY (learning_outcomes) REFERENCES content_management.learning_outcome (learning_outcome_id)
);

CREATE TYPE course_approval_status_enum as ENUM (
  'not_submitted',
  'submitted',
  'in_review',
  'reverted',
  'approved'
);

CREATE TYPE content_types_enum AS ENUM ('text', 'image', 'audio', 'video', 'pdf', 'zip');

CREATE TABLE IF NOT EXISTS content_management.content_upload (
  content_id SERIAL NOT NULL,
  profile_id INT NOT NULL,
  account_role account_roles_enum NOT NULL,
  api_url TEXT NOT NULL,
  content_file_type content_types_enum NOT NULL,
  original_file_name TEXT NOT NULL,
  gcp_storage_file_path TEXT NOT NULL,
  gcp_storage_file_key TEXT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (content_id)
);

-- In this schema, the content_upload table has the following columns:
-- content_id: Unique identifier for the content record.
-- user_id: The user who uploaded the content.
-- content_type: The type of content being uploaded, such as image, audio, video, etc.
-- original_file_name: The original file name of the uploaded content.
-- gcp_storage_file_path: The file path of the content in GCP Storage.
-- gcp_storage_file_key: The unique key for the content in GCP Storage.
-- created_at: The timestamp when the content record was created.
-- updated_at: The timestamp when the content record was last updated.
