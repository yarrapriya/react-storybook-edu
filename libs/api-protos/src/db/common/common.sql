CREATE SCHEMA IF NOT EXISTS common;

option go_package = ".";

-- Create enum for AcademicYearEnum
CREATE TYPE AcademicYearEnum AS ENUM (
  '2023_2024',
  '2024_2025',
  '2025_2026',
  '2026_2027',
  '2027_2028',
  '2028_2029',
  '2029_2030',
  '2030_2031'
);

-- Create enum for BoardEnum
CREATE TYPE BoardEnum AS ENUM (
  'geneo',
  'cbse',
  'icse',
  'ib',
  'igcse',
  'nios',
  'state_andhrapradesh',
  'state_assam',
  'state_bihar',
  'state_rajasthan',
  'state_manipur',
  'state_chhattisgarh',
  'state_orissa',
  'state_goa',
  'state_gujarat',
  'state_haryana',
  'state_himachalpradesh',
  'state_j&k',
  'state_jharkhand',
  'state_karnataka',
  'state_kerala',
  'state_madhyapradesh',
  'state_maharashtra',
  'state_meghalaya',
  'state_mizoram',
  'state_nagaland',
  'state_punjab',
  'state_tamilnadu',
  'state_tripura',
  'state_uttarpradesh',
  'state_uttarakhand',
  'state_westbengal'
);

-- Create enum for ClassEnum
CREATE TYPE ClassEnum AS ENUM (
  'pre_kg',
  'kg',
  'lkg',
  'hkg',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'
);

-- Create enum for SubjectEnum
CREATE TYPE SubjectEnum AS ENUM (
  'm',
  's',
  'sp',
  'sc',
  'sb',
  'e',
  'eg',
  'elit',
  'elang',
  'hist',
  'geog',
  'ict',
  'evs',
  'ss',
  'civ',
  'urd',
  'h',
  'sans',
  'mar',
  'guj',
  'eco',
  'gk',
  'biz',
  'acct',
  'stats',
  'lr',
  'vocab',
  'game',
  'apt',
  'gs',
  'lang',
  'sample',
  'india',
  'entmt',
  'sports',
  'sbi_po',
  'ibps_po',
  'bank_po',
  'govt'
);

--
-- Table structure for table academic_years
--
CREATE TABLE IF NOT EXISTS common.academic_year (
  academic_year_id SERIAL NOT NULL,
  academic_year AcademicYearEnum NOT NULL,
  academic_year_start DATE NOT NULL,
  academic_year_end DATE NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (academic_year_id)
);

--
-- Table structure for table boards
--
CREATE TABLE IF NOT EXISTS common.board (
  board_id SERIAL NOT NULL,
  board BoardEnum TEXT NOT NULL,
  board_short_code TEXT NOT NULL,
  board_affiliation TEXT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (board_id)
);

--
-- Table structure for table teach_mediums
--
CREATE TABLE IF NOT EXISTS common.teach_medium (
  teach_medium_id SERIAL NOT NULL,
  language TEXT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (teach_medium_id)
);

--
-- Table structure for TABLE common.class
--
CREATE TABLE IF NOT EXISTS common.class (
  class_id SERIAL NOT NULL,
  class ClassEnum NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT NULL,
  PRIMARY KEY (class_id)
);

--
-- Table structure for table subjects
--
CREATE TABLE IF NOT EXISTS common.subject (
  subject_id SERIAL NOT NULL,
  subject SubjectEnum DEFAULT NULL,
  subject_description TEXT DEFAULT NULL,
  subject_is_language SMALLINT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (subject_id)
);

CREATE TABLE IF NOT EXISTS common.book (
  book_id SERIAL NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publisher TEXT NULL,
  isbn_no TEXT NOT NULL,
  publishing_year TEXT NOT NULL,
  no_of_pages INT NOT NULL,
  book_pdf_url TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  version TEXT NULL,
  subject_id INT NOT NULL,
  class_id INT NOT NULL,
  board_id INT NOT NULL,
  teach_medium_id INT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  CONSTRAINT fk_book_1_idx FOREIGN KEY (subject_id) REFERENCES common.subject (subject_id),
  CONSTRAINT fk_book_2_idx FOREIGN KEY (class_id) REFERENCES common.class (class_id),
  CONSTRAINT fk_book_3_idx FOREIGN KEY (board_id) REFERENCES common.board (board_id),
  CONSTRAINT fk_book_4_idx FOREIGN KEY (teach_medium_id) REFERENCES common.teach_medium (teach_medium_id),
  PRIMARY KEY (book_id)
);

CREATE TABLE IF NOT EXISTS common.book_content (
  book_content_id SERIAL NOT NULL,
  book_id INT NOT NULL,
  no_of_chapters INT NOT NULL,
  book_chapters_info JSONB NOT NULL, --For chapter index table of book
   CONSTRAINT fk_book_content_1_idx FOREIGN KEY (book_id) REFERENCES common.book (book_id),
  PRIMARY KEY (book_content_id)
)

CREATE TABLE IF NOT EXISTS common.book_chapter (
  book_chapter_id SERIAL NOT NULL,
  book_id INT NOT NULL,
  no_of_topics INT NOT NULL,
  chapter_topics_info JSONB NOT NULL, --For chapter index table of book
   CONSTRAINT fk_book_chapter_1_idx FOREIGN KEY (book_id) REFERENCES common.book (book_id),
  PRIMARY KEY (book_chapter_id)
)

CREATE TABLE IF NOT EXISTS common.book_topic (
  book_topic_id SERIAL NOT NULL,
  book_id INT NOT NULL,
  book_chapter_id INT NOT NULL,
  no_of_questions INT NOT NULL,
  topic_questions_info JSONB NOT NULL, --For chapter index table of book
  topic_theory_info JSONB NOT NULL, --For chapter index table of book
   CONSTRAINT fk_book_topic_1_idx FOREIGN KEY (book_id) REFERENCES common.book (book_id),
  PRIMARY KEY (book_topic_id)
)

CREATE TABLE IF NOT EXISTS common.book_question (
  book_topic_id SERIAL NOT NULL,
  book_id INT NOT NULL,
  book_chapter_id INT NOT NULL,
  book_topic_id INT NOT NULL,
  topic_map_info JSONB NOT NULL, --For chapter index table of book
   CONSTRAINT fk_book_chapter_1_idx FOREIGN KEY (book_id) REFERENCES common.book (book_id),
  PRIMARY KEY (book_chapter_id)
)

--
-- Table structure for table measures
--
-- CREATE TYPE measure_type_enum as ENUM('performance', 'skill');
-- CREATE TABLE IF NOT EXISTS common.measure (
--   measure_id SERIAL NOT NULL,
--   measure_name TEXT DEFAULT NULL,
--   measure_description TEXT DEFAULT NULL,
--   measure_type measure_type_enum DEFAULT NULL,
--   created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   created_by INT DEFAULT '0',
--   modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_by INT DEFAULT '0',
--   PRIMARY KEY (measure_id)
-- );
-- --
-- -- Table structure for table subject_measures
-- --
-- CREATE TABLE IF NOT EXISTS common.subject_measure (
--   subject_measure_id SERIAL NOT NULL,
--   subject_id INT DEFAULT NULL,
--   measure_id INT DEFAULT NULL,
--   max_score float DEFAULT NULL,
--   min_score float DEFAULT NULL,
--   created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   created_by INT DEFAULT '0',
--   modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_by INT DEFAULT '0',
--   PRIMARY KEY (subject_measure_id),
--   CONSTRAINT fk_subject_measure_1 FOREIGN KEY (subject_id) REFERENCES common.subject (subject_id),
--   CONSTRAINT fk_subject_measure_2 FOREIGN KEY (measure_id) REFERENCES common.measure (measure_id)
-- );
