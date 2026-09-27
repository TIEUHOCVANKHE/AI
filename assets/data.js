// Dữ liệu người dùng cung cấp: lớp 3 có 17 em, lớp 4 có 22 em, lớp 5 có 23 em; null = ô trống.
const SOURCE_DATA = {
  "3A4": {
    "grade": 3,
    "identityKey": "stt",
    "rosterRevision": "2026-09-26-17",
    "source": "Bảng tổng hợp 17 học sinh do người dùng xác nhận ngày 26/09/2026",
    "subjects": {
      "TOAN": [
        {
          "stt": 1,
          "name": "Nguyễn Bảo An",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 2,
          "name": "Lưu Phương Anh",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 3,
          "name": "Nguyễn Gia Bảo",
          "scores": [
            5,
            10
          ]
        },
        {
          "stt": 4,
          "name": "Đỗ Ngọc Châu",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 5,
          "name": "Phùng Thảo Chi",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 6,
          "name": "Đinh Thành Công",
          "scores": [
            6,
            10
          ]
        },
        {
          "stt": 7,
          "name": "Nguyễn Quang Dũng",
          "scores": [
            5,
            10
          ]
        },
        {
          "stt": 8,
          "name": "Lưu Tiến Đạt",
          "scores": [
            8,
            8
          ]
        },
        {
          "stt": 9,
          "name": "Nguyễn Hương Giang",
          "scores": [
            6,
            10
          ]
        },
        {
          "stt": 10,
          "name": "Nguyễn Bảo Hân",
          "scores": [
            6,
            10
          ]
        },
        {
          "stt": 11,
          "name": "Đinh Huy Hoàng",
          "scores": [
            6,
            10
          ]
        },
        {
          "stt": 12,
          "name": "Nguyễn Minh Khang",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 13,
          "name": "Nguyễn Anh Khoa",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 14,
          "name": "Lê Viết Tùng Lâm",
          "scores": [
            8,
            8
          ]
        },
        {
          "stt": 15,
          "name": "Nguyễn Vũ Phương Nam",
          "scores": [
            5,
            10
          ]
        },
        {
          "stt": 16,
          "name": "Nguyễn Như Ngọc",
          "scores": [
            6,
            10
          ]
        },
        {
          "stt": 17,
          "name": "Nguyễn Minh Nhật",
          "scores": [
            6,
            10
          ]
        }
      ],
      "TIENG_VIET": [
        {
          "stt": 1,
          "name": "Nguyễn Bảo An",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 2,
          "name": "Lưu Phương Anh",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 3,
          "name": "Nguyễn Gia Bảo",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 4,
          "name": "Đỗ Ngọc Châu",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 5,
          "name": "Phùng Thảo Chi",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 6,
          "name": "Đinh Thành Công",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 7,
          "name": "Nguyễn Quang Dũng",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 8,
          "name": "Lưu Tiến Đạt",
          "scores": [
            8,
            8
          ]
        },
        {
          "stt": 9,
          "name": "Nguyễn Hương Giang",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 10,
          "name": "Nguyễn Bảo Hân",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 11,
          "name": "Đinh Huy Hoàng",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 12,
          "name": "Nguyễn Minh Khang",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 13,
          "name": "Nguyễn Anh Khoa",
          "scores": [
            6,
            7
          ]
        },
        {
          "stt": 14,
          "name": "Lê Viết Tùng Lâm",
          "scores": [
            6,
            6
          ]
        },
        {
          "stt": 15,
          "name": "Nguyễn Vũ Phương Nam",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 16,
          "name": "Nguyễn Như Ngọc",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 17,
          "name": "Nguyễn Minh Nhật",
          "scores": [
            6,
            9
          ]
        }
      ]
    }
  },
  "4": {
    "grade": 4,
    "className": "4A6",
    "identityKey": "stt",
    "rosterRevision": "2026-09-27-22",
    "source": "Bảng tổng hợp 22 học sinh do người dùng cung cấp ngày 27/09/2026",
    "subjects": {
      "TOAN": [
        {
          "stt": 1,
          "name": "Đinh Hoài An",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 2,
          "name": "Nguyễn Phương Anh",
          "scores": [
            6,
            8
          ]
        },
        {
          "stt": 3,
          "name": "Nguyễn Thục Anh",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 4,
          "name": "Trương Gia Bảo",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 5,
          "name": "Nguyễn Thùy Chinh",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 6,
          "name": "Nguyễn Văn Đức",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 7,
          "name": "Nguyễn Hương Giang",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 8,
          "name": "Lưu Thị Thu Hà",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 9,
          "name": "Lê Trung Hiếu",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 10,
          "name": "Nguyễn Ngọc Thu Huyền",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 11,
          "name": "Trương Thanh Huyền",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 12,
          "name": "Nguyễn Gia Linh",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 13,
          "name": "Nguyễn Phương Linh",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 14,
          "name": "Nguyễn Ngọc Mai",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 15,
          "name": "Lê Minh Ngọc",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 16,
          "name": "Trần Ánh Ngọc",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 17,
          "name": "Nguyễn Thảo Nhi",
          "scores": [
            9,
            8
          ]
        },
        {
          "stt": 18,
          "name": "Trương Thanh Phong",
          "scores": [
            6,
            10
          ]
        },
        {
          "stt": 19,
          "name": "Trần Minh Thiện",
          "scores": [
            7,
            10
          ]
        },
        {
          "stt": 20,
          "name": "Nguyễn Thanh Toàn",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 21,
          "name": "Lưu Bảo Trang",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 22,
          "name": "Lưu Tường Vy",
          "scores": [
            5,
            10
          ]
        }
      ],
      "TIENG_VIET": [
        {
          "stt": 1,
          "name": "Đinh Hoài An",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 2,
          "name": "Nguyễn Phương Anh",
          "scores": [
            7,
            7
          ]
        },
        {
          "stt": 3,
          "name": "Nguyễn Thục Anh",
          "scores": [
            7,
            7
          ]
        },
        {
          "stt": 4,
          "name": "Trương Gia Bảo",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 5,
          "name": "Nguyễn Thùy Chinh",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 6,
          "name": "Nguyễn Văn Đức",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 7,
          "name": "Nguyễn Hương Giang",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 8,
          "name": "Lưu Thị Thu Hà",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 9,
          "name": "Lê Trung Hiếu",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 10,
          "name": "Nguyễn Ngọc Thu Huyền",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 11,
          "name": "Trương Thanh Huyền",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 12,
          "name": "Nguyễn Gia Linh",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 13,
          "name": "Nguyễn Phương Linh",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 14,
          "name": "Nguyễn Ngọc Mai",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 15,
          "name": "Lê Minh Ngọc",
          "scores": [
            5,
            7
          ]
        },
        {
          "stt": 16,
          "name": "Trần Ánh Ngọc",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 17,
          "name": "Nguyễn Thảo Nhi",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 18,
          "name": "Trương Thanh Phong",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 19,
          "name": "Trần Minh Thiện",
          "scores": [
            5,
            8
          ]
        },
        {
          "stt": 20,
          "name": "Nguyễn Thanh Toàn",
          "scores": [
            6,
            8
          ]
        },
        {
          "stt": 21,
          "name": "Lưu Bảo Trang",
          "scores": [
            6,
            8
          ]
        },
        {
          "stt": 22,
          "name": "Lưu Tường Vy",
          "scores": [
            7,
            9
          ]
        }
      ]
    }
  },
  "5A3": {
    "grade": 5,
    "identityKey": "stt",
    "rosterRevision": "2026-09-27-23",
    "source": "Bảng tổng hợp 23 học sinh do người dùng cung cấp ngày 27/09/2026",
    "subjects": {
      "TOAN": [
        {
          "stt": 1,
          "name": "Nguyễn Quỳnh Anh",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 2,
          "name": "Dương Đức Bảo",
          "scores": [
            6,
            7
          ]
        },
        {
          "stt": 3,
          "name": "Nguyễn Gia Bảo",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 4,
          "name": "Lê Xuân Bình",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 5,
          "name": "Nguyễn Thùy Dung",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 6,
          "name": "Nguyễn Tiến Dũng",
          "scores": [
            9,
            9
          ]
        },
        {
          "stt": 7,
          "name": "Nguyễn Anh Duy",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 8,
          "name": "Phùng Tiến Đạt",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 9,
          "name": "Đinh Minh Đức",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 10,
          "name": "Nguyễn Hương Giang",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 11,
          "name": "Nguyễn Mạnh Hùng",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 12,
          "name": "Lê Quốc Hưng",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 13,
          "name": "Nguyễn Gia Hưng",
          "scores": [
            6,
            8
          ]
        },
        {
          "stt": 14,
          "name": "Nguyễn Chí Khang",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 15,
          "name": "Nguyễn Minh Khang",
          "scores": [
            6,
            10
          ]
        },
        {
          "stt": 16,
          "name": "Nguyễn Trung Kiên",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 17,
          "name": "Nguyễn Hoàng Bảo Lâm",
          "scores": [
            5,
            9
          ]
        },
        {
          "stt": 18,
          "name": "Lê Vĩ Lập",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 19,
          "name": "Nguyễn Phương Linh",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 20,
          "name": "Nguyễn Ngọc Ly",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 21,
          "name": "Nguyễn Khắc Hoàng Nam",
          "scores": [
            10,
            9
          ]
        },
        {
          "stt": 22,
          "name": "Nguyễn Thành Nam",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 23,
          "name": "Đinh Trọng Nghĩa",
          "scores": [
            10,
            9
          ]
        }
      ],
      "TIENG_VIET": [
        {
          "stt": 1,
          "name": "Nguyễn Quỳnh Anh",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 2,
          "name": "Dương Đức Bảo",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 3,
          "name": "Nguyễn Gia Bảo",
          "scores": [
            6,
            8
          ]
        },
        {
          "stt": 4,
          "name": "Lê Xuân Bình",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 5,
          "name": "Nguyễn Thùy Dung",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 6,
          "name": "Nguyễn Tiến Dũng",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 7,
          "name": "Nguyễn Anh Duy",
          "scores": [
            7,
            8
          ]
        },
        {
          "stt": 8,
          "name": "Phùng Tiến Đạt",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 9,
          "name": "Đinh Minh Đức",
          "scores": [
            6,
            8
          ]
        },
        {
          "stt": 10,
          "name": "Nguyễn Hương Giang",
          "scores": [
            6,
            8
          ]
        },
        {
          "stt": 11,
          "name": "Nguyễn Mạnh Hùng",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 12,
          "name": "Lê Quốc Hưng",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 13,
          "name": "Nguyễn Gia Hưng",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 14,
          "name": "Nguyễn Chí Khang",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 15,
          "name": "Nguyễn Minh Khang",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 16,
          "name": "Nguyễn Trung Kiên",
          "scores": [
            6,
            9
          ]
        },
        {
          "stt": 17,
          "name": "Nguyễn Hoàng Bảo Lâm",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 18,
          "name": "Lê Vĩ Lập",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 19,
          "name": "Nguyễn Phương Linh",
          "scores": [
            7,
            9
          ]
        },
        {
          "stt": 20,
          "name": "Nguyễn Ngọc Ly",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 21,
          "name": "Nguyễn Khắc Hoàng Nam",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 22,
          "name": "Nguyễn Thành Nam",
          "scores": [
            8,
            9
          ]
        },
        {
          "stt": 23,
          "name": "Đinh Trọng Nghĩa",
          "scores": [
            8,
            9
          ]
        }
      ]
    }
  }
};
