CREATE SCHEMA IF NOT EXISTS user_management;

--
-- Table structure for table email_templates
--
CREATE TABLE IF NOT EXISTS user_management.email_templates (
  email_template_id SERIAL NOT NULL,
  template_name TEXT NOT NULL,
  template_content TEXT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (email_template_id)
);

--
-- Table structure for table account
--
-- anyone of these with username without email id or phone number
-- if verified then they can use phone number or email id
-- phone number or email are for communication
-- account username
-- account email id
-- account phone number
-- Need to have different accounts for teacher, student
-- CREATE TABLE IF NOT EXISTS user_management.account (
--   account_id BIGSERIAL NOT NULL,
--   account_ref TEXT NOT NULL UNIQUE,
--   -- username
--   account_name TEXT NOT NULL,
--   email TEXT NOT NULL,
--   phone_country TEXT NOT NULL,
--   phone_number TEXT NOT NULL,
--   first_name TEXT NOT NULL,
--   last_name TEXT NOT NULL,
--   middle_name TEXT NOT NULL,
--   email_verify SMALLINT DEFAULT NULL,
--   phone_verify SMALLINT DEFAULT NULL,
--   is_active SMALLINT DEFAULT NULL,
--   is_delete SMALLINT DEFAULT NULL,
--   profile_pics JSONB DEFAULT NULL,
--   created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (account_id)
-- );

--
-- Table structure for table bounce_email
--
CREATE TABLE IF NOT EXISTS user_management.bounce_email (
  bounce_email_id BIGSERIAL NOT NULL,
  email TEXT NOT NULL,
  profile_id BIGINT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (bounce_email_id)
  -- CONSTRAINT fk_bounce_email_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id)
);

DROP TYPE IF EXISTS device_type_enum;
CREATE TYPE device_type_enum as ENUM('ios', 'android', 'web');

--
-- Table structure for table device
--
CREATE TABLE IF NOT EXISTS user_management.device (
  device_id BIGSERIAL NOT NULL,
  profile_id BIGINT NOT NULL,
  device_type device_type_enum NOT NULL,
  device_details JSONB DEFAULT NULL,
  device_token TEXT,
  location JSONB DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (device_id)
  -- CONSTRAINT fk_device_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id)
);

--
-- Table structure for table last_login
--
-- CREATE TABLE IF NOT EXISTS user_management.account_login_details (
--   account_login_details_id BIGSERIAL NOT NULL,
--   account_id BIGINT NOT NULL,
--   login_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   logout_date_time TIMESTAMP DEFAULT NULL,
--   token TEXT NOT NULL,
--   token_valid_upto TIMESTAMP NOT NULL,
--   device_id BIGINT NOT NULL,
--   PRIMARY KEY (account_login_details_id),
--   CONSTRAINT fk_last_login_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id),
--   CONSTRAINT fk_last_login_2 FOREIGN KEY (device_id) REFERENCES user_management.device (device_id)
-- );

DROP TYPE IF EXISTS profile_roles_enum;
CREATE TYPE profile_roles_enum as ENUM ('student', 'parent', 'teacher', 'admin');

--
-- Table structure for table last_login
--
CREATE TABLE IF NOT EXISTS user_management.profile_login_details (
  profile_login_details_id BIGSERIAL NOT NULL,
  -- account_login_details_id BIGSERIAL NOT NULL,
  -- account_id BIGINT NOT NULL,
  profile_id BIGINT NOT NULL,
  profile_roles_enum profile_roles_enum NOT NULL,
  login_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  logout_date_time TIMESTAMP DEFAULT NULL,
  token TEXT NOT NULL,
  token_valid_upto TIMESTAMP NOT NULL,
  device_id BIGINT NOT NULL,
  PRIMARY KEY (profile_login_details_id),
  -- CONSTRAINT fk_last_login_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id),
  CONSTRAINT fk_last_login_1 FOREIGN KEY (device_id) REFERENCES user_management.device (device_id)
  -- CONSTRAINT fk_last_login_3 FOREIGN KEY (account_login_details_id) REFERENCES user_management.account_login_details (account_login_details_id)
);

--
-- Table structure for table parent_profile
--
-- CREATE TABLE IF NOT EXISTS user_management.parent_profile (
--   parent_profile_id BIGSERIAL NOT NULL,
--   account_id BIGINT NOT NULL,
--   created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (parent_profile_id),
--   CONSTRAINT fk_parent_profile_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id)
-- );

--
-- Table structure for table student_profile
--
-- phone number or email are for communication
CREATE TABLE IF NOT EXISTS user_management.student_profile (
  student_profile_id BIGSERIAL NOT NULL,
  user_name TEXT NOT NULL,
  email TEXT DEFAULT NULL,
  phone_country TEXT DEFAULT NULL,
  phone_number TEXT DEFAULT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT DEFAULT NULL,
  middle_name TEXT NOT NULL,
  email_verify SMALLINT DEFAULT NULL,
  phone_verify SMALLINT DEFAULT NULL,
  is_active SMALLINT DEFAULT NULL,
  is_delete SMALLINT DEFAULT NULL,
  profile_pics JSONB DEFAULT NULL,
  class_id INT NOT NULL,
  section_id INT NOT NULL,
  school_id INT NOT NULL,
  board_id INT NOT NULL,
  region_id INT DEFAULT NULL,
  medium_id INT NOT NULL,
  address TEXT DEFAULT NULL,
  address_lat_long TEXT DEFAULT NULL,
  address_city TEXT DEFAULT NULL,
  address_state TEXT DEFAULT NULL,
  address_country TEXT DEFAULT NULL,
  address_zip_code TEXT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by BIGINT DEFAULT NULL,
  PRIMARY KEY (student_profile_id)
  -- CONSTRAINT fk_student_profile_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id)
);

-- CREATE TYPE parent_student_relation_enum as ENUM(
--   'father',
--   'mother',
--   'grand_father',
--   'grand_mother',
--   'uncle',
--   'other'
-- );

--
-- Table structure for table parent_student
--
-- CREATE TABLE IF NOT EXISTS user_management.parent_student_relation (
--   parent_student_relation_id BIGSERIAL NOT NULL,
--   parent_profile_id BIGINT NOT NULL,
--   student_profile_id BIGINT NOT NULL,
--   relation parent_student_relation_enum NOT NULL,
--   created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   created_by BIGSERIAL DEFAULT NULL,
--   modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_by BIGSERIAL DEFAULT NULL,
--   PRIMARY KEY (parent_student_relation_id),
--   CONSTRAINT fk_parent_student_relation_1 FOREIGN KEY (parent_profile_id) REFERENCES user_management.parent_profile (parent_profile_id),
--   CONSTRAINT fk_parent_student_relation_2 FOREIGN KEY (student_profile_id) REFERENCES user_management.student_profile (student_profile_id)
-- );

--
-- Table structure for table teacher_profile
--
CREATE TABLE IF NOT EXISTS user_management.teacher_profile (
  teacher_profile_id BIGSERIAL NOT NULL,
  user_name TEXT NOT NULL,
  email TEXT DEFAULT NULL,
  phone_country TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT DEFAULT NULL,
  middle_name TEXT DEFAULT NULL,
  email_verify SMALLINT DEFAULT NULL,
  phone_verify SMALLINT DEFAULT NULL,
  is_active SMALLINT DEFAULT NULL,
  is_delete SMALLINT DEFAULT NULL,
  profile_pics JSONB DEFAULT NULL,
  school_id INT DEFAULT NULL,
  qualification JSONB NOT NULL,
  experience INT NOT NULL,
  teach_mediums JSONB DEFAULT NULL,
  languages JSONB DEFAULT NULL,
  -- class_id INT NOT NULL,
  -- board_id INT NOT NULL,
  address TEXT NOT NULL,
  address_lat_long TEXT DEFAULT NULL,
  address_city TEXT NOT NULL,
  address_state TEXT NOT NULL,
  address_country TEXT NOT NULL,
  address_zip_code TEXT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by BIGINT DEFAULT NULL,
  PRIMARY KEY (teacher_profile_id)
--   CONSTRAINT fk_teacher_profile_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id)
);

-- CREATE TYPE teacher_roles_enum as ENUM ('teacher', 'SME');

--
-- Table structure for table profile_roles
--
-- CREATE TABLE IF NOT EXISTS user_management.teacher_role (
--   teacher_role_id BIGSERIAL NOT NULL,
--   teacher_profile_id BIGINT NOT NULL,
--   role teacher_roles_enum,
--   PRIMARY KEY (teacher_role_id),
--   CONSTRAINT fk_teacher_role_1 FOREIGN KEY (teacher_profile_id) REFERENCES user_management.teacher_profile (teacher_profile_id)
-- );

DROP TYPE IF EXISTS otp_type_enum;
CREATE TYPE otp_type_enum as ENUM(
  'student_register',
  'student_login',
  'teacher_register',
  'teacher_login',
  'reset_password'
);

--
-- Table structure for table account_otp
--
CREATE TABLE IF NOT EXISTS user_management.otp (
  otp_id BIGSERIAL NOT NULL,
  profile_id BIGINT DEFAULT NULL,
  device_id BIGINT NOT NULL,
  otp TEXT NOT NULL,
  otp_type otp_type_enum NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  expires_on TIMESTAMP NOT NULL,
  PRIMARY KEY (otp_id),
  -- CONSTRAINT fk_account_otp_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id),
  CONSTRAINT fk_account_otp_2 FOREIGN KEY (device_id) REFERENCES user_management.device (device_id)
);

--
-- Table structure for table account_passwords
--
CREATE TABLE IF NOT EXISTS user_management.profile_passwords (
  profile_password_id BIGSERIAL NOT NULL,
  profile_id BIGINT NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT DEFAULT NULL,
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by BIGINT DEFAULT NULL,
  PRIMARY KEY (profile_password_id)
  -- CONSTRAINT fk_account_passwords_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id)
);

--
-- Table structure for table profile_role
--
CREATE TABLE IF NOT EXISTS user_management.profile_role (
  profile_role_id BIGSERIAL NOT NULL,
  profile_id BIGINT NOT NULL,
  role profile_roles_enum,
  PRIMARY KEY (profile_role_id)
  -- CONSTRAINT fk_profile_role_1 FOREIGN KEY (account_id) REFERENCES user_management.account (account_id)
);
