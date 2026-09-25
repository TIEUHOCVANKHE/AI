// Imported from the two original Markdown documents in assets/documents. Scores here describe the source survey; they do not update the gradebook.
const REMEDIAL_DATA = {
  "classId": "5A3",
  "sourceRound": 0,
  "usage": "Mỗi học sinh làm đúng phần mang tên mình. Giáo viên có thể chia thành 2 buổi/tuần, mỗi buổi 20–25 phút. Với bài sai, không cho làm lại ngay đáp án cũ mà yêu cầu học sinh nói/viết quy tắc hoặc dấu hiệu nhận dạng dạng bài trước.",
  "context": "Căn cứ: bảng điểm lần 1 và bài làm khảo sát đã chấm của học sinh.  \nPhạm vi Toán: hỗn số - số thập phân; tỉ số phần trăm; bài toán tìm hai số khi biết tổng và hiệu; diện tích tam giác; phép tính số thập phân; diện tích hình hộp chữ nhật.  \nPhạm vi Tiếng Việt: trạng ngữ - chủ ngữ - vị ngữ; nghĩa gốc/nghĩa chuyển; từ đồng nghĩa; câu ghép dùng cặp kết từ *nếu…thì*; viết đoạn văn tả người.",
  "notice": "Lưu ý: Nhận xét chỉ phản ánh những gì bài khảo sát này cho thấy, không phải đánh giá toàn diện năng lực học sinh. Các nội dung được quy chiếu theo các mạch kiến thức tương ứng trong bộ Kết nối tri thức lớp 5. Tên “Nguyễn Mạnh Dũng” ở bảng Toán và “Nguyễn Anh Dũng” ở bảng Tiếng Việt có dấu hiệu không thống nhất, cần đối chiếu danh sách gốc.",
  "guidance": [
    "Nhóm cần củng cố nền Toán (điểm 5–6): học theo trạm 15 phút, mỗi trạm một dạng; dùng phiếu có ví dụ mẫu và bài tương tự.",
    "Nhóm Toán 7–8: tập trung lỗi cục bộ, bài vận dụng nhiều bước và thói quen kiểm tra đáp số/đơn vị.",
    "Nhóm Toán 9–10: tăng bài vận dụng tổng hợp, đổi đơn vị và giải thích cách làm.",
    "Tiếng Việt: tách 2 mảng: (1) luyện từ và câu; (2) viết đoạn. Mỗi đoạn viết nên có bước tự soát 4 tiêu chí: đúng yêu cầu, đủ ý, câu rõ, chính tả/dấu câu."
  ],
  "followup": {
    "TOAN": [
      "Viết 3 4/10 dưới dạng số thập phân.",
      "18 là bao nhiêu phần trăm của 45?",
      "Tổng hai số là 64, hiệu là 12. Tìm hai số.",
      "Tam giác có đáy 14 cm, chiều cao 6 cm. Tính diện tích.",
      "Tính: 37,6 - 18,45; 2,75 × 6; 15,6 : 4.",
      "Một bể dài 4 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích bốn thành và đáy."
    ],
    "TIENG_VIET": [
      "Xác định TN, CN, VN: “Buổi sáng, học sinh lớp 5 chăm chỉ đọc sách trong thư viện.”",
      "Chỉ ra câu có từ “chân” mang nghĩa gốc: chân bàn / chân núi / đau chân / chân tường.",
      "Viết 2 từ đồng nghĩa với “chăm chỉ”, 2 từ gần nghĩa với “vui vẻ”.",
      "Đặt một câu ghép có cặp kết từ nếu…thì.",
      "Viết đoạn 7–9 câu tả một người bạn, có ít nhất 1 câu ghép và 2 từ gợi tả."
    ]
  },
  "students": {
    "Nguyễn Quỳnh Anh": {
      "TOAN": {
        "sourceName": "Nguyễn Quỳnh Anh",
        "score": 7,
        "comment": "Nhầm công thức diện tích tam giác (chọn 40 cm² thay vì 20 cm²), còn sai phép trừ số thập phân và bài diện tích bể/đơn vị. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 2",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          },
          {
            "label": "Bài 3",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Quỳnh Anh",
        "score": 6,
        "comment": "Chưa phân biệt chắc nghĩa gốc/nghĩa chuyển của từ “chân”. Viết đoạn có ý nhưng còn dài dòng, dấu câu và liên kết câu cần gọn hơn. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Dương Đức Bảo": {
      "TOAN": {
        "sourceName": "Dương Đức Bảo",
        "score": 6,
        "comment": "Chưa chắc đổi hỗn số sang số thập phân, tỉ số phần trăm, bài toán tổng–hiệu và diện tích tam giác; phép nhân số thập phân còn sai. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Viết dưới dạng số thập phân: 3 7/10; 5 25/100. 2) Viết 4,6 dưới dạng hỗn số."
          },
          {
            "label": "Bài 2",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 3",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 4",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Dương Đức Bảo",
        "score": 6,
        "comment": "Còn nhầm nghĩa gốc của từ “chân”; phần từ đồng nghĩa và câu ghép cần dùng từ chính xác, đoạn văn nên chia câu rõ hơn. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 3",
            "text": "Ghép thành câu có cặp kết từ nếu…thì: (trời mưa / em mang áo mưa); (em chăm đọc sách / vốn từ phong phú); (em bị ốm / em xin phép nghỉ học)."
          },
          {
            "label": "Bài 4",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Gia Bảo": {
      "TOAN": {
        "sourceName": "Nguyễn Gia Bảo",
        "score": 5,
        "comment": "Sai ở đổi hỗn số, tỉ số phần trăm và diện tích tam giác; phép nhân 2,5 × 4 còn chưa vững. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Viết dưới dạng số thập phân: 3 7/10; 5 25/100. 2) Viết 4,6 dưới dạng hỗn số."
          },
          {
            "label": "Bài 2",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Gia Bảo",
        "score": 6,
        "comment": "Ngữ pháp cơ bản chưa thật chắc; cần luyện nghĩa gốc/nghĩa chuyển và chỉnh câu văn tả người cho mạch lạc, hạn chế lặp. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          }
        ]
      }
    },
    "Lê Xuân Bình": {
      "TOAN": {
        "sourceName": "Lê Xuân Bình",
        "score": 5,
        "comment": "Lỗ hổng chủ yếu ở các câu khái niệm: hỗn số–số thập phân, phần trăm, tổng–hiệu và diện tích tam giác. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Viết dưới dạng số thập phân: 3 7/10; 5 25/100. 2) Viết 4,6 dưới dạng hỗn số."
          },
          {
            "label": "Bài 2",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 3",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 4",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Lê Xuân Bình",
        "score": 7,
        "comment": "Khá hơn phần câu; cần nâng chất lượng đoạn tả người bằng chi tiết tiêu biểu, câu chuyển ý và kiểm tra chính tả/dấu câu. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Thùy Dung": {
      "TOAN": {
        "sourceName": "Nguyễn Thùy Dung",
        "score": 5,
        "comment": "Các phép tính thập phân cơ bản làm khá hơn phần trắc nghiệm; cần củng cố phần trăm, tổng–hiệu và công thức diện tích tam giác. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 4",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Thùy Dung",
        "score": 8,
        "comment": "Bài ở mức tốt; cần tiếp tục rèn đoạn văn tả người có bố cục rõ, chọn chi tiết ngoại hình–tính cách thay vì liệt kê. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Mạnh Dũng": {
      "TOAN": {
        "sourceName": "Nguyễn Mạnh Dũng / Nguyễn Anh Dũng",
        "score": 6,
        "comment": "Ở bài Toán, phần tính toán cơ bản khá ổn nhưng nhiều câu khái niệm chọn sai: hỗn số, phần trăm, tổng–hiệu, diện tích tam giác. Cần đối chiếu lại họ tên giữa hai bảng điểm. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Viết dưới dạng số thập phân: 3 7/10; 5 25/100. 2) Viết 4,6 dưới dạng hỗn số."
          },
          {
            "label": "Bài 2",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 3",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 4",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ],
        "nameNote": "Tài liệu ghi chung hai tên. Nội dung môn này được gắn theo đúng họ tên có trong danh sách môn học; hai hồ sơ vẫn tách riêng."
      }
    },
    "Nguyễn Anh Dũng": {
      "TIENG_VIET": {
        "sourceName": "Nguyễn Mạnh Dũng / Nguyễn Anh Dũng",
        "score": 7,
        "comment": "Ở bài Tiếng Việt, câu điều kiện có chỗ chưa hợp logic; cần luyện quan hệ nếu–thì và diễn đạt câu ghép. Tên học sinh trong hai bảng điểm khác nhau, nên đối chiếu danh sách gốc. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Ghép thành câu có cặp kết từ nếu…thì: (trời mưa / em mang áo mưa); (em chăm đọc sách / vốn từ phong phú); (em bị ốm / em xin phép nghỉ học)."
          }
        ],
        "nameNote": "Tài liệu ghi chung hai tên. Nội dung môn này được gắn theo đúng họ tên có trong danh sách môn học; hai hồ sơ vẫn tách riêng."
      }
    },
    "Nguyễn Tiến Dũng": {
      "TOAN": {
        "sourceName": "Nguyễn Tiến Dũng",
        "score": 9,
        "comment": "Nền tảng tốt; chỉ còn lỗi cục bộ ở phép tính/ghi kết quả. Cần luyện kiểm tra lại dấu phẩy và bước tính trước khi nộp. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Tiến Dũng",
        "score": 8,
        "comment": "Khá chắc; còn nguy cơ nhầm nghĩa gốc/nghĩa chuyển của “chân”. Đoạn văn cần tăng câu nêu cảm xúc và liên kết. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          }
        ]
      }
    },
    "Nguyễn Anh Duy": {
      "TOAN": {
        "sourceName": "Nguyễn Anh Duy",
        "score": 8,
        "comment": "Hiểu phần lớn kiến thức; cần tăng độ chắc ở bài tổng–hiệu, diện tích tam giác hoặc phép tính thập phân để tránh mất điểm do chọn đáp án. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 2",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 3",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Anh Duy",
        "score": 7,
        "comment": "Cần củng cố nghĩa gốc/nghĩa chuyển và dùng từ đồng nghĩa đúng sắc thái; đoạn văn hơi ngắn, cần thêm chi tiết minh họa. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 3",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Tiến Đạt": {
      "TOAN": {
        "sourceName": "Nguyễn Tiến Đạt",
        "score": 6,
        "comment": "Chưa chắc phần trăm, bài toán tổng–hiệu và diện tích tam giác; thao tác tính thập phân tốt hơn phần nhận biết công thức. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 4",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Tiến Đạt",
        "score": 7,
        "comment": "Còn nhầm nghĩa gốc/nghĩa chuyển; từ đồng nghĩa đôi lúc dùng chưa tự nhiên. Cần luyện câu ngắn, đúng dấu câu. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 3",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Phùng Tiến Đạt": {
      "TOAN": {
        "sourceName": "Phùng Tiến Đạt",
        "score": 6,
        "comment": "Sai tập trung ở phần trăm, tổng–hiệu và diện tích tam giác; cần chuyển từ học thuộc đáp án sang nhận diện dạng toán và công thức. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Phùng Tiến Đạt",
        "score": 8,
        "comment": "Mức khá; cần chắc hơn nghĩa gốc/nghĩa chuyển và tăng tính cụ thể trong đoạn tả người. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Đinh Minh Đức": {
      "TOAN": {
        "sourceName": "Đinh Minh Đức",
        "score": 7,
        "comment": "Cơ bản biết đặt tính; cần củng cố tỉ số phần trăm, diện tích tam giác và bài diện tích xung quanh/đáy của hình hộp chữ nhật. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 3",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Đinh Minh Đức",
        "score": 6,
        "comment": "Cần củng cố nghĩa gốc/nghĩa chuyển, dùng từ và chính tả; đoạn văn có ý nhưng còn lặp từ, câu kéo dài. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Hương Giang": {
      "TOAN": {
        "sourceName": "Nguyễn Hương Giang",
        "score": 7,
        "comment": "Cần chắc hơn phần trăm, bài tổng–hiệu, diện tích tam giác; nên luyện giải thích vì sao chọn công thức trước khi tính. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Hương Giang",
        "score": 6,
        "comment": "Cần luyện đủ cấu trúc cặp kết từ nếu…thì và phân biệt nghĩa gốc/nghĩa chuyển. Đoạn văn cần sửa dấu câu và liên kết. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Ghép thành câu có cặp kết từ nếu…thì: (trời mưa / em mang áo mưa); (em chăm đọc sách / vốn từ phong phú); (em bị ốm / em xin phép nghỉ học)."
          },
          {
            "label": "Bài 3",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Mạnh Hùng": {
      "TOAN": {
        "sourceName": "Nguyễn Mạnh Hùng",
        "score": 6,
        "comment": "Lỗ hổng ở phần trăm, tổng–hiệu và diện tích tam giác; cần luyện đọc đề và phân biệt dữ kiện tổng, hiệu, đáy, chiều cao. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Mạnh Hùng",
        "score": 6,
        "comment": "Nhầm nghĩa gốc/nghĩa chuyển; phần viết có nội dung nhưng cần câu văn chính xác hơn, tránh diễn đạt khẩu ngữ. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Gia Huy": {
      "TOAN": {
        "sourceName": "Nguyễn Gia Huy",
        "score": 6,
        "comment": "Còn nhầm ở phần trăm, tổng–hiệu và diện tích tam giác; cần luyện thêm phép tính thập phân và bài toán hình hộp chữ nhật. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 4",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Gia Huy",
        "score": 5,
        "comment": "Điểm thấp nhất ở Tiếng Việt; cần ôn từ loại/chức năng câu, từ đồng nghĩa, câu ghép nếu–thì và đặc biệt là viết đoạn có mở–thân–kết, đúng chính tả. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Gạch chân trạng ngữ, khoanh chủ ngữ, đóng khung vị ngữ trong 3 câu: “Buổi chiều, chúng em đọc sách ở thư viện.”; “Trên sân trường, các bạn lớp 5 chơi cầu lông.”; “Sau giờ học, Minh giúp mẹ quét nhà.”"
          },
          {
            "label": "Bài 2",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 3",
            "text": "Ghép thành câu có cặp kết từ nếu…thì: (trời mưa / em mang áo mưa); (em chăm đọc sách / vốn từ phong phú); (em bị ốm / em xin phép nghỉ học)."
          },
          {
            "label": "Bài 4",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Lê Quốc Hưng": {
      "TOAN": {
        "sourceName": "Lê Quốc Hưng",
        "score": 6,
        "comment": "Cần củng cố đổi hỗn số, phần trăm và diện tích bể; bài hình không gian còn dễ nhầm giữa diện tích xung quanh và diện tích cần quét. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Viết dưới dạng số thập phân: 3 7/10; 5 25/100. 2) Viết 4,6 dưới dạng hỗn số."
          },
          {
            "label": "Bài 2",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 3",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Lê Quốc Hưng",
        "score": 8,
        "comment": "Bài khá; cần tiếp tục củng cố nghĩa gốc/nghĩa chuyển và luyện đoạn tả người có chi tiết tiêu biểu, tránh kể lan man. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Gia Hưng": {
      "TOAN": {
        "sourceName": "Nguyễn Gia Hưng",
        "score": 6,
        "comment": "Phần tính khá ổn nhưng kiến thức khái niệm chưa chắc: hỗn số, phần trăm, tổng–hiệu và diện tích tam giác. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Viết dưới dạng số thập phân: 3 7/10; 5 25/100. 2) Viết 4,6 dưới dạng hỗn số."
          },
          {
            "label": "Bài 2",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 3",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 4",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Gia Hưng",
        "score": 8,
        "comment": "Bài khá; nên rèn sắc thái từ đồng nghĩa, nghĩa gốc/nghĩa chuyển và viết câu liên kết tự nhiên hơn. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 3",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Chí Khang": {
      "TOAN": {
        "sourceName": "Nguyễn Chí Khang",
        "score": 5,
        "comment": "Sai nhiều câu nhận biết và bài diện tích bể; cần ôn theo từng dạng ngắn, đặc biệt phần trăm, tam giác và hình hộp chữ nhật. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 3",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Chí Khang",
        "score": 7,
        "comment": "Nắm khá ngữ pháp cơ bản; cần tăng chất lượng đoạn tả người, dùng câu chuyển ý và dấu câu chính xác. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Gạch chân trạng ngữ, khoanh chủ ngữ, đóng khung vị ngữ trong 3 câu: “Buổi chiều, chúng em đọc sách ở thư viện.”; “Trên sân trường, các bạn lớp 5 chơi cầu lông.”; “Sau giờ học, Minh giúp mẹ quét nhà.”"
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Minh Khang": {
      "TOAN": {
        "sourceName": "Nguyễn Minh Khang",
        "score": 6,
        "comment": "Cần củng cố hỗn số–số thập phân, phần trăm và diện tích tam giác; phép tính nên đi kèm ước lượng để tự phát hiện sai. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Viết dưới dạng số thập phân: 3 7/10; 5 25/100. 2) Viết 4,6 dưới dạng hỗn số."
          },
          {
            "label": "Bài 2",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 4",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Minh Khang",
        "score": 6,
        "comment": "Còn nhầm nghĩa gốc/nghĩa chuyển; từ đồng nghĩa đôi lúc chưa đúng. Đoạn văn cần rõ ý và ít lỗi diễn đạt hơn. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          }
        ]
      }
    },
    "Trương Gia Khánh": {
      "TOAN": {
        "sourceName": "Trương Gia Khánh",
        "score": 7,
        "comment": "Mức khá nhưng còn lẫn một số khái niệm và phép tính; ưu tiên phần trăm, diện tích tam giác và kiểm tra phép nhân/chia thập phân. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 3",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Trương Gia Khánh",
        "score": 7,
        "comment": "Có lỗ hổng từ đồng nghĩa: từng dùng từ trái nghĩa cho “vui vẻ”. Cần luyện nhóm từ theo sắc thái và viết đoạn đủ ý. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Trung Kiên": {
      "TOAN": {
        "sourceName": "Nguyễn Trung Kiên",
        "score": 8,
        "comment": "Phép tính khá tốt; điểm mất chủ yếu ở bài diện tích bể/hình hộp chữ nhật và một số câu chọn công thức. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Trung Kiên",
        "score": 6,
        "comment": "Cần củng cố nghĩa gốc/nghĩa chuyển và mở rộng vốn từ. Đoạn văn còn chung chung, nên có dẫn chứng về tính cách người bạn. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          }
        ]
      }
    },
    "Nguyễn Hoàng Bảo Lâm": {
      "TOAN": {
        "sourceName": "Nguyễn Hoàng Bảo Lâm",
        "score": 5,
        "comment": "Cần ôn lại từ nền: hỗn số, phần trăm, tổng–hiệu, diện tích tam giác và diện tích hình hộp chữ nhật; tránh dùng công thức máy móc. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Viết dưới dạng số thập phân: 3 7/10; 5 25/100. 2) Viết 4,6 dưới dạng hỗn số."
          },
          {
            "label": "Bài 2",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 3",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 4",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Hoàng Bảo Lâm",
        "score": 7,
        "comment": "Còn nhầm nghĩa gốc/nghĩa chuyển; câu ghép đôi lúc thiếu/không rõ cặp kết từ. Viết khá nhưng cần gọt câu. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Ghép thành câu có cặp kết từ nếu…thì: (trời mưa / em mang áo mưa); (em chăm đọc sách / vốn từ phong phú); (em bị ốm / em xin phép nghỉ học)."
          }
        ]
      }
    },
    "Lê Vĩ Lập": {
      "TOAN": {
        "sourceName": "Lê Vĩ Lập",
        "score": 7,
        "comment": "Nắm khá phần tính; cần củng cố tỉ số phần trăm và diện tích tam giác để tăng độ chính xác. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Lê Vĩ Lập",
        "score": 8,
        "comment": "Bài khá tốt; nên rèn dùng từ đồng nghĩa chính xác theo ngữ cảnh và làm đoạn văn sinh động hơn bằng chi tiết. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Phương Linh": {
      "TOAN": {
        "sourceName": "Nguyễn Phương Linh",
        "score": 7,
        "comment": "Cần củng cố phần trăm, bài tổng–hiệu và diện tích tam giác; phép tính cơ bản tương đối ổn. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 4",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Phương Linh",
        "score": 7,
        "comment": "Ngữ pháp khá; cần tăng độ chính xác của từ đồng nghĩa và tổ chức đoạn tả người theo trình tự rõ. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Lê Xuân Lộc": {
      "TOAN": {
        "sourceName": "Lê Xuân Lộc",
        "score": 8,
        "comment": "Khá tốt; nên tập trung vào một vài câu khái niệm còn nhầm và luyện trình bày bài hình hộp chữ nhật rõ công thức, đơn vị. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Lê Xuân Lộc",
        "score": 7,
        "comment": "Cần củng cố nghĩa gốc/nghĩa chuyển; các phần khác khá. Đoạn văn cần thêm chi tiết cụ thể và câu kết nêu cảm xúc. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          }
        ]
      }
    },
    "Nguyễn Ngọc Ly": {
      "TOAN": {
        "sourceName": "Nguyễn Ngọc Ly",
        "score": 6,
        "comment": "Phép tính thập phân và bài bể khá ổn; còn nhầm bài tổng–hiệu và diện tích tam giác. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 2",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 3",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          },
          {
            "label": "Bài 4",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Ngọc Ly",
        "score": 8,
        "comment": "Nắm tốt nhiều yêu cầu; cần chú ý trình bày, dấu câu và tránh câu quá dài trong đoạn tả người. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Hoài Nam": {
      "TOAN": {
        "sourceName": "Nguyễn Hoài Nam",
        "score": 9,
        "comment": "Nền tảng rất khá; lỗi chính là diện tích tam giác, có dấu hiệu quên chia 2. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Hoài Nam",
        "score": 7,
        "comment": "Còn nhầm nghĩa gốc/nghĩa chuyển và từ đồng nghĩa “vui vẻ”; câu nếu–thì chưa thật trọn. Viết đoạn còn ngắn và ít chi tiết. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 3",
            "text": "Ghép thành câu có cặp kết từ nếu…thì: (trời mưa / em mang áo mưa); (em chăm đọc sách / vốn từ phong phú); (em bị ốm / em xin phép nghỉ học)."
          },
          {
            "label": "Bài 4",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Khắc Hoàng Nam": {
      "TOAN": {
        "sourceName": "Nguyễn Khắc Hoàng Nam",
        "score": 10,
        "comment": "Bài làm đạt mức chắc; chưa thấy lỗ hổng rõ trong phạm vi đề. Nên chuyển sang bài vận dụng tổng hợp và bài có dữ kiện đổi đơn vị. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 3",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Khắc Hoàng Nam",
        "score": 8,
        "comment": "Bài khá chắc; cần nâng chất lượng viết bằng lựa chọn chi tiết tiêu biểu, câu chuyển ý và từ ngữ gợi tả. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Thành Nam": {
      "TOAN": {
        "sourceName": "Nguyễn Thành Nam",
        "score": 6,
        "comment": "Sai ở phần trăm, tổng–hiệu và diện tích tam giác; phần tính và bài bể tốt hơn, cần nối đúng công thức với dạng bài. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "1) Tổng hai số là 46, hiệu là 8. Tìm hai số. 2) Tổng là 75, hiệu là 15."
          },
          {
            "label": "Bài 3",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 4",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Thành Nam",
        "score": 8,
        "comment": "Còn nhầm nghĩa gốc/nghĩa chuyển; các phần còn lại khá. Nên luyện câu ghép ngắn, đúng quan hệ logic. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Ghép thành câu có cặp kết từ nếu…thì: (trời mưa / em mang áo mưa); (em chăm đọc sách / vốn từ phong phú); (em bị ốm / em xin phép nghỉ học)."
          }
        ]
      }
    },
    "Đinh Trọng Nghĩa": {
      "TOAN": {
        "sourceName": "Đinh Trọng Nghĩa",
        "score": 10,
        "comment": "Bài làm rất chắc trong phạm vi khảo sát. Nên luyện bài nâng cao: phần trăm nhiều bước, diện tích ghép và hình hộp chữ nhật biến đổi dữ kiện. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) 15 trong 60 chiếm bao nhiêu phần trăm? 2) Lớp có 40 bạn, 18 bạn nữ. Tính tỉ số phần trăm số bạn nữ."
          },
          {
            "label": "Bài 2",
            "text": "Bể dài 5 m, rộng 3 m, cao 2 m, không có nắp. Tính diện tích cần quét sơn mặt trong gồm bốn thành và đáy."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Đinh Trọng Nghĩa",
        "score": 8,
        "comment": "Bài khá chắc; nên mở rộng vốn từ đồng nghĩa và luyện viết đoạn tả người có hình ảnh, cảm xúc, tránh lặp cấu trúc. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Tìm 3 từ đồng nghĩa với “chăm chỉ” và 3 từ gần nghĩa với “vui vẻ”; đặt mỗi nhóm 1 câu để thấy sắc thái dùng từ."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    },
    "Nguyễn Khánh Ngọc": {
      "TOAN": {
        "sourceName": "Nguyễn Khánh Ngọc",
        "score": 8,
        "comment": "Còn sai diện tích tam giác và phép nhân số thập phân; các phần khác khá ổn. Hướng xử lý: cho em làm bài ngắn theo từng dạng, yêu cầu ghi công thức hoặc nêu lí do chọn phép tính trước khi tính; sau mỗi 4–5 bài có 1 bài tổng hợp để kiểm tra khả năng nhận dạng dạng toán.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "1) Tính diện tích tam giác đáy 12 cm, cao 7 cm. 2) Tam giác có diện tích 36 cm², đáy 9 cm. Tìm chiều cao."
          },
          {
            "label": "Bài 2",
            "text": "1) 46,8 - 17,35; 2) 3,25 × 8; 3) 14,4 : 6. Đặt tính và thử lại bằng phép tính ngược."
          }
        ]
      },
      "TIENG_VIET": {
        "sourceName": "Nguyễn Khánh Ngọc",
        "score": 7,
        "comment": "Còn nhầm nghĩa gốc/nghĩa chuyển; đoạn văn có nội dung nhưng cần thêm chi tiết về tính cách/hoạt động và câu kết. Hướng xử lý: luyện theo chu trình “nhận diện → giải thích → đặt câu/viết đoạn”, ưu tiên sửa trực tiếp lỗi dùng từ, quan hệ câu, dấu câu và một đoạn văn ngắn mỗi tuần.",
        "exercises": [
          {
            "label": "Bài 1",
            "text": "Chọn câu từ “chân” mang nghĩa gốc và giải thích: chân bàn / chân núi / đau chân / chân tường. Sau đó tự đặt 2 câu: 1 nghĩa gốc, 1 nghĩa chuyển."
          },
          {
            "label": "Bài 2",
            "text": "Viết đoạn 7–9 câu tả một người bạn: 2 câu ngoại hình, 3 câu tính cách/việc làm có dẫn chứng, 1–2 câu kỉ niệm, 1 câu cảm nghĩ. Sau khi viết, tự khoanh 3 dấu câu và gạch 2 từ bị lặp để sửa."
          }
        ]
      }
    }
  }
};
