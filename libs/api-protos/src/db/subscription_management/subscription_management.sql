CREATE SCHEMA IF NOT EXISTS subscription_management;

CREATE TYPE discount_mode_enum as ENUM('percent', 'flat');

CREATE TYPE discount_validity_mode_enum as ENUM('count', 'date');

--
-- Table structure for table `discount`
--
CREATE TABLE IF NOT EXISTS subscription_management.discount (
  discount_id SERIAL NOT NULL,
  discount_title TEXT NOT NULL,
  discount_description TEXT NOT NULL,
  discount_code TEXT NOT NULL,
  discount_mode discount_mode_enum NOT NULL,
  discount_value FLOAT NOT NULL,
  discount_validity_mode discount_validity_mode_enum NOT NULL,
  discount_validity_count INT NOT NULL,
  discount_validity_start TIMESTAMP NOT NULL,
  discount_validity_end TIMESTAMP NOT NULL,
  discount_active SMALLINT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (discount_id)
);

CREATE TYPE payment_mode_enum as ENUM('card', 'cheque', 'cash', 'upi', 'others');

CREATE TYPE payment_by_enum as ENUM('retail_user', 'school');

CREATE TYPE transaction_status_enum as ENUM(
  'started',
  'pending',
  'completed',
  'failed',
  'refunded'
);

--
-- Table structure for table `payment_transaction`
--
CREATE TABLE IF NOT EXISTS subscription_management.payment_transaction (
  payment_transaction_id BIGSERIAL NOT NULL,
  payment_mode payment_mode_enum NOT NULL,
  payment_by payment_by_enum NOT NULL,
  school_id INT DEFAULT NULL,
  subscription_valid_from TIMESTAMP NOT NULL,
  subscription_valid_to TIMESTAMP NOT NULL,
  payment_transaction_details JSONB NOT NULL,
  payment_transaction_ref TEXT DEFAULT NULL,
  transaction_amount FLOAT NOT NULL,
  tax_rate FLOAT NOT NULL,
  tax_amount FLOAT NOT NULL,
  exchange_rate float DEFAULT NULL,
  processing_fee_percentage FLOAT DEFAULT NULL,
  processing_fee_fixed FLOAT DEFAULT NULL,
  processing_fee_amount FLOAT NOT NULL,
  transaction_paid_amount FLOAT NOT NULL,
  transaction_currency TEXT NOT NULL,
  target_currency TEXT DEFAULT NULL,
  transaction_status transaction_status_enum NOT NULL,
  billing_address TEXT,
  discount_id INT DEFAULT NULL,
  created_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT DEFAULT '0',
  modified_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by INT DEFAULT '0',
  PRIMARY KEY (payment_transaction_id),
  CONSTRAINT fk_payment_transaction_1 FOREIGN KEY (discount_id) REFERENCES subscription_management.discount (discount_id)
);
