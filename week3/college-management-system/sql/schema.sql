START TRANSACTION;

-- ============================================================
-- Drop existing tables
-- ============================================================

DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS attandance;
DROP TABLE IF EXISTS basic;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS faculties;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS result;
DROP TABLE IF EXISTS rollgenerator;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS subject;

-- ============================================================
-- Table: admin
-- ============================================================

CREATE TABLE admin (
                       collagename VARCHAR(50) DEFAULT NULL,
                       address VARCHAR(100) DEFAULT NULL,
                       emailid VARCHAR(255) NOT NULL,
                       contactnumber VARCHAR(40) DEFAULT NULL,
                       website VARCHAR(30) DEFAULT NULL,
                       lastlogin VARCHAR(40) DEFAULT NULL,
                       password VARCHAR(255) DEFAULT NULL,
                       facebook VARCHAR(100) DEFAULT NULL,
                       instagram VARCHAR(100) DEFAULT NULL,
                       twitter VARCHAR(100) DEFAULT NULL,
                       linkedin VARCHAR(100) DEFAULT NULL,
                       logo VARCHAR(255) DEFAULT NULL,
                       activestatus SMALLINT DEFAULT 0,
                       PRIMARY KEY (emailid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO admin (
    collagename,
    address,
    emailid,
    contactnumber,
    website,
    lastlogin,
    password,
    facebook,
    instagram,
    twitter,
    linkedin,
    logo,
    activestatus
) VALUES (
             'Government College of Engineering, Keonjhar',
             'Jamunalia, Keonjhar, Odisha ',
             'admin@gcekjr.ac.in',
             '0000000000',
             'http://geckjr.ac.in',
             '2026-03-21T17:28:00.311Z',
             '$2b$10$dWTjLOwtAaGrlZ4CAbTud.FGDvmDj.WOI3sDsRUQlpiNFnNrkesK.',
             'https://facebook.com/gcekjr',
             'https://instagram.com/gcekjr',
             'https://x.com/gcekjr',
             'https://linkedin.com/gcekjr ',
             '/uploads/admin/admin.jpg',
             1
         );


-- ============================================================
-- Table: attandance
-- Original misspelled table name preserved.
-- ============================================================

CREATE TABLE attandance (
                            subjectcode VARCHAR(30) DEFAULT NULL,
                            date VARCHAR(30) DEFAULT NULL,
                            rollnumber BIGINT DEFAULT NULL,
                            present SMALLINT DEFAULT 0,
                            courcecode VARCHAR(20) DEFAULT NULL,
                            semoryear INTEGER DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- Table: basic
-- ============================================================

CREATE TABLE basic (
                       id BIGINT NOT NULL AUTO_INCREMENT,
                       PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- Table: chat
-- ============================================================

CREATE TABLE chat (
                      sr_no INTEGER NOT NULL AUTO_INCREMENT,
                      fromuserid VARCHAR(70) DEFAULT NULL,
                      fromusername VARCHAR(50) DEFAULT NULL,
                      touserid VARCHAR(70) DEFAULT NULL,
                      message TEXT,
                      messagetime VARCHAR(20) DEFAULT NULL,
                      messagedate VARCHAR(40) DEFAULT NULL,
                      readby TEXT,
                      PRIMARY KEY (sr_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- Table: courses
-- ============================================================

CREATE TABLE courses (
                         id INTEGER NOT NULL AUTO_INCREMENT,
                         course_code VARCHAR(20) NOT NULL,
                         course_name VARCHAR(100) NOT NULL,
                         total_semesters INTEGER NOT NULL,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         sem_or_year VARCHAR(4) NOT NULL DEFAULT 'sem',

                         PRIMARY KEY (id),

                         CONSTRAINT courses_course_code_unique
                             UNIQUE (course_code),

                         CONSTRAINT courses_course_name_unique
                             UNIQUE (course_name),

                         CONSTRAINT courses_sem_or_year_check
                             CHECK (sem_or_year IN ('sem', 'year'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Table: faculties
-- ============================================================

CREATE TABLE faculties (
                           facultyid INTEGER NOT NULL,
                           facultyname VARCHAR(30) DEFAULT NULL,
                           state VARCHAR(30) DEFAULT NULL,
                           city VARCHAR(30) DEFAULT NULL,
                           emailid VARCHAR(50) DEFAULT NULL,
                           contactnumber VARCHAR(20) DEFAULT NULL,
                           qualification VARCHAR(30) DEFAULT NULL,
                           experience VARCHAR(30) DEFAULT NULL,
                           birthdate DATE DEFAULT NULL,
                           gender VARCHAR(10) DEFAULT NULL,
                           profilepic VARCHAR(255) DEFAULT NULL,
                           courcecode VARCHAR(20) DEFAULT 'NOT ASSIGNED',
                           semoryear INTEGER DEFAULT 0,
                           subject VARCHAR(40) DEFAULT 'NOT ASSIGNED',
                           position VARCHAR(40) DEFAULT 'NOT ASSIGNED',
                           sr_no INTEGER NOT NULL AUTO_INCREMENT,
                           lastlogin VARCHAR(100) DEFAULT NULL,
                           password VARCHAR(255) DEFAULT NULL,
                           activestatus SMALLINT DEFAULT 0,
                           joineddate DATE DEFAULT NULL,

                           PRIMARY KEY (sr_no),

                           CONSTRAINT faculties_facultyid_unique
                               UNIQUE (facultyid),

                           CONSTRAINT faculties_emailid_unique
                               UNIQUE (emailid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Table: notification
-- ============================================================

CREATE TABLE notification (
                              sr_no INTEGER NOT NULL AUTO_INCREMENT,
                              userprofile VARCHAR(30) DEFAULT NULL,
                              courcecode VARCHAR(30) DEFAULT NULL,
                              semoryear INTEGER DEFAULT NULL,
                              userid VARCHAR(30) DEFAULT NULL,
                              title VARCHAR(100) DEFAULT NULL,
                              message VARCHAR(1000) DEFAULT NULL,
                              time VARCHAR(100) DEFAULT NULL,
                              readby TEXT,
                              PRIMARY KEY (sr_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- Table: result
-- ============================================================

CREATE TABLE result (
                        courcecode VARCHAR(30) NOT NULL,
                        semoryear INTEGER NOT NULL,
                        isdeclared SMALLINT DEFAULT NULL,

                        PRIMARY KEY (courcecode, semoryear)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- Table: rollgenerator
-- ============================================================

CREATE TABLE rollgenerator (
                               courcecode VARCHAR(20) NOT NULL,
                               semoryear INTEGER NOT NULL,
                               rollnumber VARCHAR(50) DEFAULT NULL,

                               PRIMARY KEY (courcecode, semoryear)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- Table: students
-- ============================================================

CREATE TABLE students (
                          Courcecode VARCHAR(20) DEFAULT NULL,
                          semoryear INTEGER DEFAULT NULL,
                          rollnumber VARCHAR(50) DEFAULT NULL,
                          optionalsubject VARCHAR(30) DEFAULT NULL,
                          firstname VARCHAR(20) DEFAULT NULL,
                          lastname VARCHAR(20) DEFAULT NULL,
                          emailid VARCHAR(50) DEFAULT NULL,
                          contactnumber VARCHAR(20) DEFAULT NULL,
                          dateofbirth VARCHAR(15) DEFAULT NULL,
                          gender VARCHAR(10) DEFAULT NULL,
                          state VARCHAR(30) DEFAULT NULL,
                          city VARCHAR(30) DEFAULT NULL,
                          fathername VARCHAR(20) DEFAULT NULL,
                          fatheroccupation VARCHAR(30) DEFAULT NULL,
                          mothername VARCHAR(30) DEFAULT NULL,
                          motheroccupation VARCHAR(30) DEFAULT NULL,
                          profilepic VARCHAR(255) DEFAULT NULL,
                          sr_no INTEGER NOT NULL AUTO_INCREMENT,
                          lastlogin VARCHAR(100) DEFAULT NULL,
                          password VARCHAR(255) DEFAULT NULL,
                          activestatus SMALLINT DEFAULT 0,
                          admissiondate VARCHAR(50) DEFAULT NULL,

                          PRIMARY KEY (sr_no),

                          CONSTRAINT students_emailid_unique
                              UNIQUE (emailid),

                          CONSTRAINT students_rollnumber_unique
                              UNIQUE (rollnumber)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Table: subject
-- ============================================================

CREATE TABLE subject (
                         subjectcode VARCHAR(20) DEFAULT NULL,
                         subjectname VARCHAR(50) DEFAULT NULL,
                         courcecode VARCHAR(20) DEFAULT NULL,
                         semoryear INTEGER DEFAULT NULL,
                         subjecttype VARCHAR(30) DEFAULT NULL,
                         theorymarks INTEGER DEFAULT NULL,
                         practicalmarks INTEGER DEFAULT NULL,

                         CONSTRAINT subject_subjectcode_unique
                             UNIQUE (subjectcode),

                         CONSTRAINT subject_unique
                             UNIQUE (subjectcode, courcecode, semoryear)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Table: attendance
-- ============================================================

CREATE TABLE attendance (
                            id INTEGER NOT NULL AUTO_INCREMENT,
                            student_id INTEGER NOT NULL,
                            subjectcode VARCHAR(30) NOT NULL,
                            attendance_date DATE NOT NULL,
                            present SMALLINT NOT NULL DEFAULT 0,
                            courcecode VARCHAR(20) NOT NULL,
                            semoryear INTEGER NOT NULL,

                            PRIMARY KEY (id),

                            CONSTRAINT unique_attendance
                                UNIQUE (
                                        student_id,
                                        subjectcode,
                                        attendance_date,
                                        courcecode,
                                        semoryear
                                    ),

                            CONSTRAINT fk_attendance_student
                                FOREIGN KEY (student_id)
                                    REFERENCES students (sr_no)
                                    ON DELETE CASCADE,

                            CONSTRAINT fk_attendance_subject
                                FOREIGN KEY (subjectcode)
                                    REFERENCES subject (subjectcode)
                                    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_lookup
    ON attendance (
                   subjectcode,
                   courcecode,
                   semoryear,
                   attendance_date
        );

-- ============================================================
-- Table: marks
-- ============================================================

CREATE TABLE marks (
                       courcecode VARCHAR(20) DEFAULT NULL,
                       semoryear INTEGER DEFAULT NULL,
                       subjectcode VARCHAR(20) DEFAULT NULL,
                       subjectname VARCHAR(100) DEFAULT NULL,
                       rollnumber VARCHAR(50) DEFAULT NULL,
                       theorymarks INTEGER DEFAULT NULL,
                       practicalmarks INTEGER DEFAULT NULL,

                       CONSTRAINT unique_marks
                           UNIQUE (
                                   courcecode,
                                   semoryear,
                                   subjectcode,
                                   rollnumber
                               ),

                       CONSTRAINT fk_marks_student
                           FOREIGN KEY (rollnumber)
                               REFERENCES students (rollnumber)
                               ON DELETE CASCADE,

                       CONSTRAINT fk_marks_subject
                           FOREIGN KEY (subjectcode)
                               REFERENCES subject (subjectcode)
                               ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_marks_rollnumber
    ON marks (rollnumber);

CREATE INDEX idx_marks_subjectcode
    ON marks (subjectcode);


COMMIT;

