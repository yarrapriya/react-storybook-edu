//Questions

//question_id -> Unique
//content_hash_id -> Unique
//[question_id, content_hash_id] -> Unique

//1. FIB
const fibSample = {
  question_id: 1,
  title: 'Fill in the Blanks',
  question_type: 1,
  question_content: {
    fib_content_model: {
      common_question_content: {
        elements: [
          {
            text_type: {
              text: 'The capital of France is ___________.',
            },
          },
        ],
        time: 60,
        marks: [10],
        solution: [],
        ans_explanation: [],
        hint: [],
      },
      correct: ['Paris'],
    },
  },
  question_text: 'The capital of France is _______.',
  learning_outcomes: [],
  teacher_id: 123456789,
  question_meta: {
    class: [],
    board: [],
    subject: [],
    book: [],
    contextualization: 0,
    level: '',
  },
  created_on: {
    seconds: 1625443200,
    nanos: 0,
  },
  created_by: 987654321,
  modified_on: {
    seconds: 1625443200,
    nanos: 0,
  },
  modified_by: 987654321,
};

//2.True-False
const tfSample = {
  question_id: 2,
  title: 'True or False',
  question_type: 5,
  question_content: {
    tf_content_model: {
      common_question_content: {
        elements: [
          {
            text_type: {
              text: 'The sun rises in the west.',
            },
          },
        ],
        time: 30,
        marks: [5],
        solution: [],
        ans_explanation: [],
        hint: [],
      },
      correct: 2,
    },
  },
  question_text: 'The sun rises in the west.',
  learning_outcomes: [],
  teacher_id: 123456789,
  question_meta: {
    class: [],
    board: [],
    subject: [],
    book: [],
    contextualization: 0,
    level: '',
  },
  created_on: {
    seconds: 1625443200,
    nanos: 0,
  },
  created_by: 987654321,
  modified_on: {
    seconds: 1625443200,
    nanos: 0,
  },
  modified_by: 987654321,
};

//MCQ_S
const mcsSingleSample = {
  question_id: 3,
  title: 'Multiple Choice',
  question_type: 3,
  question_content: {
    mcq_single_content_model: {
      common_question_content: {
        elements: [
          {
            text_type: {
              text: 'What is the capital of Germany?',
            },
          },
        ],
        time: 45,
        marks: [8],
        solution: [],
        ans_explanation: [],
        hint: [],
      },
      options: [
        {
          text_option: {
            option_text: 'Berlin',
            correct_incorrect_explanation_text: 'Correct answer!',
          },
        },
        {
          text_option: {
            option_text: 'Paris',
            correct_incorrect_explanation_text:
              'Incorrect answer. Berlin is the correct answer.',
          },
        },
        {
          text_option: {
            option_text: 'Rome',
            correct_incorrect_explanation_text:
              'Incorrect answer. Berlin is the correct answer.',
          },
        },
        {
          text_option: {
            option_text: 'London',
            correct_incorrect_explanation_text:
              'Incorrect answer. Berlin is the correct answer.',
          },
        },
      ],
      correct: 'Berlin',
    },
  },
  question_text: 'What is the capital of Germany?',
  learning_outcomes: [],
  teacher_id: 123456789,
  question_meta: {
    class: [],
    board: [],
    subject: [],
    book: [],
    contextualization: 0,
    level: '',
  },
  created_on: {
    seconds: 1625443200,
    nanos: 0,
  },
  created_by: 987654321,
  modified_on: {
    seconds: 1625443200,
    nanos: 0,
  },
  modified_by: 987654321,
};

//MCQ-M
const mcqMultipleSample = {
  question_id: 4,
  title: 'Multiple Choice Multiple Answer',
  question_type: 4,
  question_content: {
    mcq_multiple_content_model: {
      common_question_content: {
        elements: [
          {
            text_type: {
              text: 'Select the prime numbers from the following options:',
            },
          },
        ],
        time: 60,
        marks: [10],
        solution: [],
        ans_explanation: [],
        hint: [],
      },
      options: [
        {
          text_option: {
            option_text: '2',
            correct_incorrect_explanation_text:
              'Correct answer! 2 is a prime number.',
          },
        },
        {
          text_option: {
            option_text: '4',
            correct_incorrect_explanation_text:
              'Incorrect answer. 4 is not a prime number.',
          },
        },
        {
          text_option: {
            option_text: '7',
            correct_incorrect_explanation_text:
              'Correct answer! 7 is a prime number.',
          },
        },
        {
          text_option: {
            option_text: '9',
            correct_incorrect_explanation_text:
              'Incorrect answer. 9 is not a prime number.',
          },
        },
        {
          text_option: {
            option_text: '10',
            correct_incorrect_explanation_text:
              'Incorrect answer. 10 is not a prime number.',
          },
        },
      ],
      correct: ['2', '7'],
    },
  },
  question_text: 'Select the prime numbers from the following options:',
  learning_outcomes: [],
  teacher_id: 123456789,
  question_meta: {
    class: [],
    board: [],
    subject: [],
    book: [],
    contextualization: 0,
    level: '',
  },
  created_on: {
    seconds: 1625443200,
    nanos: 0,
  },
  created_by: 987654321,
  modified_on: {
    seconds: 1625443200,
    nanos: 0,
  },
  modified_by: 987654321,
};

//Content
//
const passageSample = {
  content_id: 123,
  title: 'Introduction to Space Exploration',
  description:
    'This chapter provides an introduction to space exploration and its significance in expanding our understanding of the universe.',
  poster_image_url: 'https://cdn.schoolnet.com/space_exploration_poster.jpg',
  content_type: 1,
  content: {
    passage_model: {
      Passage: [
        {
          heading_type: {
            heading: 'The Wonders of Space Exploration',
          },
        },
        {
          sub_heading_type: {
            sub_heading: 'Discovering New Planets',
          },
        },
        {
          text_type: {
            text: 'Space exploration has always been a fascinating subject for scientists and enthusiasts alike. The quest to discover new planets and understand the vastness of our universe has led to groundbreaking discoveries.',
          },
        },
        {
          text_left_type: {
            text_left:
              'The Hubble Space Telescope, launched in 1990, revolutionized our understanding of the cosmos. It captured breathtaking images of distant galaxies and provided valuable insights into the formation of stars and galaxies.',
          },
        },
        {
          text_center_type: {
            text_center:
              'One of the most exciting recent developments in space exploration is the discovery of exoplanets. These are planets that orbit stars outside our solar system. With advanced telescopes and detection methods, scientists have identified thousands of exoplanets, some of which may have conditions suitable for life.',
          },
        },
        {
          text_right_type: {
            text_right:
              "Space agencies around the world are planning ambitious missions to explore other planets and moons within our solar system. For example, NASA's Mars Rover missions have provided valuable data about the Red Planet's geological history and the potential for past life.",
          },
        },
        {
          table_type: {
            table: {
              title: 'Comparison of Planets',
              has_header: true,
              content: [
                {
                  row: 1,
                  column: 1,
                  text_type: {
                    text: 'Planet',
                  },
                },
                {
                  row: 1,
                  column: 2,
                  text_type: {
                    text: 'Distance from Sun',
                  },
                },
                {
                  row: 1,
                  column: 3,
                  text_type: {
                    text: 'Number of Moons',
                  },
                },
                {
                  row: 2,
                  column: 1,
                  text_type: {
                    text: 'Mercury',
                  },
                },
                {
                  row: 2,
                  column: 2,
                  text_type: {
                    text: '57.9 million km',
                  },
                },
                {
                  row: 2,
                  column: 3,
                  text_type: {
                    text: '0',
                  },
                },
                {
                  row: 3,
                  column: 1,
                  text_type: {
                    text: 'Earth',
                  },
                },
                {
                  row: 3,
                  column: 2,
                  text_type: {
                    text: '149.6 million km',
                  },
                },
                {
                  row: 3,
                  column: 3,
                  text_type: {
                    text: '1',
                  },
                },
                {
                  row: 4,
                  column: 1,
                  text_type: {
                    text: 'Mars',
                  },
                },
                {
                  row: 4,
                  column: 2,
                  text_type: {
                    text: '227.9 million km',
                  },
                },
                {
                  row: 4,
                  column: 3,
                  text_type: {
                    text: '2',
                  },
                },
              ],
            },
          },
        },
        {
          excerpt_type: {
            excerpt:
              'Space exploration has opened up new possibilities and expanded our understanding of the universe. From distant galaxies to the search for life on other planets, the discoveries made in space continue to inspire awe and curiosity.',
          },
        },
        {
          image_type: {
            image_url: 'https://cdn.schoolnet.com/image.jpg',
            image_title: 'Stunning Galaxy',
            image_description:
              'A breathtaking image of a distant galaxy captured by the Hubble Space Telescope.',
            credits: ['Image credits: NASA/ESA'],
          },
        },
        {
          video_type: {
            video_url: 'https://cdn.schoolnet.com/video.mp4',
            video_title: 'Journey to the Stars',
            video_description:
              'An educational video showcasing the wonders of the universe and the achievements of space exploration.',
            thumbnail: 'https://cdn.schoolnet.com/thumbnail.jpg',
            credits: ['Video credits: NASA'],
            sub_titles: [
              {
                start_time: {
                  seconds: 10,
                },
                end_time: {
                  seconds: 20,
                },
                total_duration: 10,
                lines: ['Narrator: Welcome to the journey through space.'],
              },
              {
                start_time: {
                  seconds: 30,
                },
                end_time: {
                  seconds: 40,
                },
                total_duration: 10,
                lines: ['Narrator: Explore the wonders of distant galaxies.'],
              },
            ],
          },
        },
        {
          audio_type: {
            audio_url: 'https://cdn.schoolnet.com/audio.mp3',
            audio_title: 'Sounds of the Universe',
            audio_description:
              'A captivating audio experience featuring recordings from space missions and celestial events.',
            thumbnail: 'https://cdn.schoolnet.com/thumbnail.jpg',
            credits: ['Audio credits: ESA'],
            sub_titles: [
              {
                start_time: {
                  seconds: 5,
                },
                end_time: {
                  seconds: 10,
                },
                total_duration: 5,
                lines: ['Narrator: Listen to the sounds of distant stars.'],
              },
              {
                start_time: {
                  seconds: 20,
                },
                end_time: {
                  seconds: 25,
                },
                total_duration: 5,
                lines: ['Narrator: Experience the cosmic symphony.'],
              },
            ],
          },
        },
        {
          external_resource_type: {
            file_type: 'FILE_TYPE_DOCUMENT',
            file_name: 'SpaceExploration.pdf',
            file_size_in_mb: 4,
            file_url: 'https://cdn.schoolnet.com/files/SpaceExploration.pdf',
            file_extension_type: 'FILE_EXTENSION_PDF',
          },
        },
      ],
    },
  },
  content_text:
    "Space exploration has always been a fascinating subject for scientists and enthusiasts alike. The quest to discover new planets and understand the vastness of our universe has led to groundbreaking discoveries. The Hubble Space Telescope, launched in 1990, revolutionized our understanding of the cosmos. It captured breathtaking images of distant galaxies and provided valuable insights into the formation of stars and galaxies. One of the most exciting recent developments in space exploration is the discovery of exoplanets. These are planets that orbit stars outside our solar system. With advanced telescopes and detection methods, scientists have identified thousands of exoplanets, some of which may have conditions suitable for life. Space agencies around the world are planning ambitious missions to explore other planets and moons within our solar system. For example, NASA's Mars Rover missions have provided valuable data about the Red Planet's geological history and the potential for past life. Space exploration has opened up new possibilities and expanded our understanding of the universe. From distant galaxies to the search for life on other planets, the discoveries made in space continue to inspire awe and curiosity.",
  learning_outcomes: [
    'Understand the concept of space exploration and its significance.',
    'Recognize the impact of the Hubble Space Telescope on our understanding of the cosmos.',
    'Learn about exoplanets and their potential for supporting life.',
    'Explore the missions and discoveries related to Mars exploration.',
    'Appreciate the broader implications and advancements resulting from space exploration.',
  ],
  teacher_id: 456,
  content_meta: {
    class: ['7'],
    board: ['CBSE', 'ICSE'],
    subject: ['Science'],
    book: ['Book 1'],
    contextualization: 2,
    level: 'Intermediate',
  },
  created_on: {
    seconds: 1625335200,
    nanos: 0,
  },
  created_by: 789,
  modified_on: {
    seconds: 1625335200,
    nanos: 0,
  },
  modified_by: 789,
};

const all = {
  status: 0,
  code: 'string',
  message: 'string',
  data: {
    resourceId: 'string',
    resourceVersion: 0,
    resourceContentId: 0,
    resourceContentData: {
      pageContent: [
        {
          pageNumber: 'string',
          contentIds: ['string'],
          questionIds: ['string'],
          instructionIds: [0],
          contentJson: [
            {
              content: {
                id: 0,
                contentId: 'string',
                title: 'string',
                description: 'string',
                posterImageUrl: 'string',
                contentType: 'CONTENT_TYPE_UNDEFINED',
                content: {
                  passageModel: {
                    elements: [
                      {
                        headingType: {
                          heading: 'string',
                        },
                        subHeadingType: {
                          subHeading: 'string',
                        },
                        textType: {
                          text: 'string',
                        },
                        textLeftType: {
                          textLeft: 'string',
                        },
                        textCenterType: {
                          textCenter: 'string',
                        },
                        textRightType: {
                          textRight: 'string',
                        },
                        tableType: {
                          table: {
                            title: 'string',
                            hasHeader: true,
                            content: [
                              {
                                row: 0,
                                column: 0,
                                textType: {
                                  text: 'string',
                                },
                                imageType: {
                                  imageUrl: 'string',
                                  imageTitle: 'string',
                                  imageDescription: 'string',
                                  credits: ['string'],
                                },
                              },
                            ],
                            mergedCells: [
                              {
                                start: {
                                  row: 0,
                                  column: 0,
                                },
                                end: {
                                  row: 0,
                                  column: 0,
                                },
                              },
                            ],
                          },
                        },
                        excerptType: {
                          excerpt: 'string',
                        },
                        imageType: {
                          imageUrl: 'string',
                          imageTitle: 'string',
                          imageDescription: 'string',
                          credits: ['string'],
                        },
                        videoType: {
                          videoUrl: 'string',
                          videoTitle: 'string',
                          videoDescription: 'string',
                          thumbnailImageUrl: 'string',
                          credits: ['string'],
                          subTitles: [
                            {
                              startTime: '2023-07-04T16:01:41.375Z',
                              endTime: '2023-07-04T16:01:41.375Z',
                              mediaTotalDuration: 0,
                              lines: ['string'],
                            },
                          ],
                        },
                        audioType: {
                          audioUrl: 'string',
                          audioTitle: 'string',
                          audioDescription: 'string',
                          thumbnailImageUrl: 'string',
                          credits: ['string'],
                          subTitles: [
                            {
                              startTime: '2023-07-04T16:01:41.375Z',
                              endTime: '2023-07-04T16:01:41.375Z',
                              mediaTotalDuration: 0,
                              lines: ['string'],
                            },
                          ],
                        },
                        externalResourceType: {
                          fileType: 'FILE_TYPE_UNKNOWN',
                          fileName: 'string',
                          fileSizeInMb: 0,
                          fileUrl: 'string',
                          fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                        },
                        generalTags: {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                          note: 'string',
                          ask: {
                            question: 'string',
                            answer: 'string',
                          },
                          say: 'string',
                          do: 'string',
                          explain: 'string',
                          discuss: 'string',
                          teacherNote: 'string',
                          teacherVideo: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          teacherImage: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                        },
                      },
                    ],
                  },
                  experimentModel: {
                    title: 'string',
                    aim: ['string'],
                    resourcesRequired: ['string'],
                    procedure: ['string'],
                    caution: ['string'],
                    conclusion: ['string'],
                    faq: ['string'],
                  },
                  contentVideoModel: {
                    video: {
                      videoUrl: 'string',
                      videoTitle: 'string',
                      videoDescription: 'string',
                      thumbnailImageUrl: 'string',
                      credits: ['string'],
                      subTitles: [
                        {
                          startTime: '2023-07-04T16:01:41.375Z',
                          endTime: '2023-07-04T16:01:41.375Z',
                          mediaTotalDuration: 0,
                          lines: ['string'],
                        },
                      ],
                    },
                  },
                  flashCardModel: {
                    cardFront: [
                      {
                        headingType: {
                          heading: 'string',
                        },
                        subHeadingType: {
                          subHeading: 'string',
                        },
                        textType: {
                          text: 'string',
                        },
                        textLeftType: {
                          textLeft: 'string',
                        },
                        textCenterType: {
                          textCenter: 'string',
                        },
                        textRightType: {
                          textRight: 'string',
                        },
                        tableType: {
                          table: {
                            title: 'string',
                            hasHeader: true,
                            content: [
                              {
                                row: 0,
                                column: 0,
                                textType: {
                                  text: 'string',
                                },
                                imageType: {
                                  imageUrl: 'string',
                                  imageTitle: 'string',
                                  imageDescription: 'string',
                                  credits: ['string'],
                                },
                              },
                            ],
                            mergedCells: [
                              {
                                start: {
                                  row: 0,
                                  column: 0,
                                },
                                end: {
                                  row: 0,
                                  column: 0,
                                },
                              },
                            ],
                          },
                        },
                        excerptType: {
                          excerpt: 'string',
                        },
                        imageType: {
                          imageUrl: 'string',
                          imageTitle: 'string',
                          imageDescription: 'string',
                          credits: ['string'],
                        },
                        videoType: {
                          videoUrl: 'string',
                          videoTitle: 'string',
                          videoDescription: 'string',
                          thumbnailImageUrl: 'string',
                          credits: ['string'],
                          subTitles: [
                            {
                              startTime: '2023-07-04T16:01:41.375Z',
                              endTime: '2023-07-04T16:01:41.375Z',
                              mediaTotalDuration: 0,
                              lines: ['string'],
                            },
                          ],
                        },
                        audioType: {
                          audioUrl: 'string',
                          audioTitle: 'string',
                          audioDescription: 'string',
                          thumbnailImageUrl: 'string',
                          credits: ['string'],
                          subTitles: [
                            {
                              startTime: '2023-07-04T16:01:41.375Z',
                              endTime: '2023-07-04T16:01:41.375Z',
                              mediaTotalDuration: 0,
                              lines: ['string'],
                            },
                          ],
                        },
                        externalResourceType: {
                          fileType: 'FILE_TYPE_UNKNOWN',
                          fileName: 'string',
                          fileSizeInMb: 0,
                          fileUrl: 'string',
                          fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                        },
                      },
                    ],
                    cardBack: [
                      {
                        headingType: {
                          heading: 'string',
                        },
                        subHeadingType: {
                          subHeading: 'string',
                        },
                        textType: {
                          text: 'string',
                        },
                        textLeftType: {
                          textLeft: 'string',
                        },
                        textCenterType: {
                          textCenter: 'string',
                        },
                        textRightType: {
                          textRight: 'string',
                        },
                        tableType: {
                          table: {
                            title: 'string',
                            hasHeader: true,
                            content: [
                              {
                                row: 0,
                                column: 0,
                                textType: {
                                  text: 'string',
                                },
                                imageType: {
                                  imageUrl: 'string',
                                  imageTitle: 'string',
                                  imageDescription: 'string',
                                  credits: ['string'],
                                },
                              },
                            ],
                            mergedCells: [
                              {
                                start: {
                                  row: 0,
                                  column: 0,
                                },
                                end: {
                                  row: 0,
                                  column: 0,
                                },
                              },
                            ],
                          },
                        },
                        excerptType: {
                          excerpt: 'string',
                        },
                        imageType: {
                          imageUrl: 'string',
                          imageTitle: 'string',
                          imageDescription: 'string',
                          credits: ['string'],
                        },
                        videoType: {
                          videoUrl: 'string',
                          videoTitle: 'string',
                          videoDescription: 'string',
                          thumbnailImageUrl: 'string',
                          credits: ['string'],
                          subTitles: [
                            {
                              startTime: '2023-07-04T16:01:41.375Z',
                              endTime: '2023-07-04T16:01:41.375Z',
                              mediaTotalDuration: 0,
                              lines: ['string'],
                            },
                          ],
                        },
                        audioType: {
                          audioUrl: 'string',
                          audioTitle: 'string',
                          audioDescription: 'string',
                          thumbnailImageUrl: 'string',
                          credits: ['string'],
                          subTitles: [
                            {
                              startTime: '2023-07-04T16:01:41.375Z',
                              endTime: '2023-07-04T16:01:41.375Z',
                              mediaTotalDuration: 0,
                              lines: ['string'],
                            },
                          ],
                        },
                        externalResourceType: {
                          fileType: 'FILE_TYPE_UNKNOWN',
                          fileName: 'string',
                          fileSizeInMb: 0,
                          fileUrl: 'string',
                          fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                        },
                      },
                    ],
                    hint: ['string'],
                  },
                  mindMapModel: {
                    mindMap: [
                      {
                        nodeId: 'string',
                        contentJson: 'string',
                        children: [{}],
                      },
                    ],
                  },
                },
                contentText: 'string',
                learningOutcomes: ['string'],
                teacherId: 'string',
                contentMeta: {
                  class: ['UNDEFINED'],
                  board: ['UNDEFINED'],
                  subject: ['UNDEFINED'],
                  book: ['string'],
                  contextualization: 'CONTEXT_UNDEFINED',
                  level: 'string',
                },
                createdOn: '2023-07-04T16:01:41.375Z',
                createdBy: 'string',
                modifiedOn: '2023-07-04T16:01:41.375Z',
                modifiedBy: 'string',
                videoSolutionOfQuestionId: 'string',
              },
              question: {
                id: 0,
                questionId: 'string',
                title: 'string',
                description: 'string',
                posterImageUrl: 'string',
                questionType: 'QUESTION_TYPE_UNDEFINED',
                question: {
                  fibContentModel: {
                    commonQuestionContent: {
                      elements: [
                        {
                          textType: {
                            text: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      time: 0,
                      marks: [0],
                      solution: [
                        {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      ansExplanation: ['string'],
                      hint: ['string'],
                      videoSolutionContentId: 'string',
                    },
                    correctAnswerInfo: [
                      {
                        blankPosition: 0,
                        correct: ['string'],
                      },
                    ],
                  },
                  tfContentModel: {
                    commonQuestionContent: {
                      elements: [
                        {
                          textType: {
                            text: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      time: 0,
                      marks: [0],
                      solution: [
                        {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      ansExplanation: ['string'],
                      hint: ['string'],
                      videoSolutionContentId: 'string',
                    },
                    correct: 'TF_ANSWER_UNDEFINED',
                  },
                  mcqSingleContentModel: {
                    commonQuestionContent: {
                      elements: [
                        {
                          textType: {
                            text: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      time: 0,
                      marks: [0],
                      solution: [
                        {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.375Z',
                                endTime: '2023-07-04T16:01:41.375Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      ansExplanation: ['string'],
                      hint: ['string'],
                      videoSolutionContentId: 'string',
                    },
                    options: [
                      {
                        textOption: {
                          optionText: 'string',
                          correctIncorrectExplanationText: 'string',
                        },
                        imageOption: {
                          image: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          correctIncorrectExplanationText: 'string',
                        },
                      },
                    ],
                    correct: 'string',
                  },
                  mcqMultipleContentModel: {
                    commonQuestionContent: {
                      elements: [
                        {
                          textType: {
                            text: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      time: 0,
                      marks: [0],
                      solution: [
                        {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      ansExplanation: ['string'],
                      hint: ['string'],
                      videoSolutionContentId: 'string',
                    },
                    options: [
                      {
                        textOption: {
                          optionText: 'string',
                          correctIncorrectExplanationText: 'string',
                        },
                        imageOption: {
                          image: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          correctIncorrectExplanationText: 'string',
                        },
                      },
                    ],
                    correct: ['string'],
                  },
                  longQuesContentModel: {
                    commonQuestionContent: {
                      elements: [
                        {
                          textType: {
                            text: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      time: 0,
                      marks: [0],
                      solution: [
                        {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      ansExplanation: ['string'],
                      hint: ['string'],
                      videoSolutionContentId: 'string',
                    },
                    correct: ['string'],
                  },
                  shortQuesContentModel: {
                    commonQuestionContent: {
                      elements: [
                        {
                          textType: {
                            text: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      time: 0,
                      marks: [0],
                      solution: [
                        {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      ansExplanation: ['string'],
                      hint: ['string'],
                      videoSolutionContentId: 'string',
                    },
                    correct: 'string',
                  },
                  mtfSingleQuesContentModel: {
                    commonQuestionContent: {
                      elements: [
                        {
                          textType: {
                            text: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      time: 0,
                      marks: [0],
                      solution: [
                        {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      ansExplanation: ['string'],
                      hint: ['string'],
                      videoSolutionContentId: 'string',
                    },
                    leftOptions: [
                      {
                        textOption: {
                          optionText: 'string',
                          correctIncorrectExplanationText: 'string',
                        },
                        imageOption: {
                          image: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          correctIncorrectExplanationText: 'string',
                        },
                      },
                    ],
                    rightOptions: [
                      {
                        textOption: {
                          optionText: 'string',
                          correctIncorrectExplanationText: 'string',
                        },
                        imageOption: {
                          image: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          correctIncorrectExplanationText: 'string',
                        },
                      },
                    ],
                    correctResponseIndices: [
                      {
                        leftOptionIndex: 0,
                        rightOptionIndex: 0,
                      },
                    ],
                  },
                  arrangeQuestionContentModel: {
                    commonQuestionContent: {
                      elements: [
                        {
                          textType: {
                            text: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      time: 0,
                      marks: [0],
                      solution: [
                        {
                          headingType: {
                            heading: 'string',
                          },
                          subHeadingType: {
                            subHeading: 'string',
                          },
                          textType: {
                            text: 'string',
                          },
                          textLeftType: {
                            textLeft: 'string',
                          },
                          textCenterType: {
                            textCenter: 'string',
                          },
                          textRightType: {
                            textRight: 'string',
                          },
                          tableType: {
                            table: {
                              title: 'string',
                              hasHeader: true,
                              content: [
                                {
                                  row: 0,
                                  column: 0,
                                  textType: {
                                    text: 'string',
                                  },
                                  imageType: {
                                    imageUrl: 'string',
                                    imageTitle: 'string',
                                    imageDescription: 'string',
                                    credits: ['string'],
                                  },
                                },
                              ],
                              mergedCells: [
                                {
                                  start: {
                                    row: 0,
                                    column: 0,
                                  },
                                  end: {
                                    row: 0,
                                    column: 0,
                                  },
                                },
                              ],
                            },
                          },
                          excerptType: {
                            excerpt: 'string',
                          },
                          imageType: {
                            imageUrl: 'string',
                            imageTitle: 'string',
                            imageDescription: 'string',
                            credits: ['string'],
                          },
                          videoType: {
                            videoUrl: 'string',
                            videoTitle: 'string',
                            videoDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          audioType: {
                            audioUrl: 'string',
                            audioTitle: 'string',
                            audioDescription: 'string',
                            thumbnailImageUrl: 'string',
                            credits: ['string'],
                            subTitles: [
                              {
                                startTime: '2023-07-04T16:01:41.376Z',
                                endTime: '2023-07-04T16:01:41.376Z',
                                mediaTotalDuration: 0,
                                lines: ['string'],
                              },
                            ],
                          },
                          externalResourceType: {
                            fileType: 'FILE_TYPE_UNKNOWN',
                            fileName: 'string',
                            fileSizeInMb: 0,
                            fileUrl: 'string',
                            fileExtensionType: 'FILE_EXTENSION_UNKNOWN',
                          },
                        },
                      ],
                      ansExplanation: ['string'],
                      hint: ['string'],
                      videoSolutionContentId: 'string',
                    },
                  },
                },
                questionText: 'string',
                learningOutcomes: ['string'],
                teacherId: 'string',
                questionMeta: {
                  class: ['UNDEFINED'],
                  board: ['UNDEFINED'],
                  subject: ['UNDEFINED'],
                  contextualization: 'QUESTION_CONTEXT_UNDEFINED',
                  difficultyLevel: 'DIFFICULTY_LEVEL_UNDEFINED',
                },
                createdOn: '2023-07-04T16:01:41.376Z',
                createdBy: 'string',
                modifiedOn: '2023-07-04T16:01:41.376Z',
                modifiedBy: 'string',
              },
              instruction: {
                resourceTeacherInstructionId: 0,
                resourceId: 'string',
                instructionContent: {
                  elements: [
                    {
                      note: 'string',
                      ask: {
                        question: 'string',
                        answer: 'string',
                      },
                      say: 'string',
                      do: 'string',
                      explain: 'string',
                      discuss: 'string',
                      teacherNote: 'string',
                      teacherVideo: {
                        videoUrl: 'string',
                        videoTitle: 'string',
                        videoDescription: 'string',
                        thumbnailImageUrl: 'string',
                        credits: ['string'],
                        subTitles: [
                          {
                            startTime: '2023-07-04T16:01:41.376Z',
                            endTime: '2023-07-04T16:01:41.376Z',
                            mediaTotalDuration: 0,
                            lines: ['string'],
                          },
                        ],
                      },
                      teacherImage: {
                        imageUrl: 'string',
                        imageTitle: 'string',
                        imageDescription: 'string',
                        credits: ['string'],
                      },
                    },
                  ],
                },
                teacherId: 'string',
                createdOn: '2023-07-04T16:01:41.376Z',
                createdBy: 'string',
                modifiedOn: '2023-07-04T16:01:41.376Z',
                modifiedBy: 'string',
              },
            },
          ],
        },
      ],
    },
  },
};
