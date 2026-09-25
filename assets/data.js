// Dữ liệu gốc: bảng tổng hợp người dùng cung cấp; null = ô trống.
const SOURCE_DATA = {
  "3A4": {
    "grade": 3,
    "subjects": {
      "TOAN": [
        {
          "name": "Đinh Thế An",
          "scores": [
            5,
            8
          ]
        },
        {
          "name": "Nguyễn Bảo An",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Lưu Phương Anh",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Ngọc Anh",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Nguyễn Gia Bảo",
          "scores": [
            5,
            10
          ]
        },
        {
          "name": "Đỗ Ngọc Châu",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Phùng Thảo Chi",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Đinh Thành Công",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Nguyễn Quang Dũng",
          "scores": [
            5,
            10
          ]
        },
        {
          "name": "Lưu Tiến Đạt",
          "scores": [
            5,
            10
          ]
        },
        {
          "name": "Phạm Doãn Minh Đạt",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Hương Giang",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Nguyễn Bảo Hân",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Đinh Huy Hoàng",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Nguyễn Minh Khang",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Nguyễn Anh Khoa",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Nguyễn Đăng khoa",
          "scores": [
            5,
            10
          ]
        },
        {
          "name": "Lê Viết Tùng Lâm",
          "scores": [
            8,
            8
          ]
        },
        {
          "name": "Nguyễn Vũ Phương Nam",
          "scores": [
            5,
            10
          ]
        },
        {
          "name": "Nguyễn Như Ngọc",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Trương Bảo Ngọc",
          "scores": [
            8,
            10
          ]
        },
        {
          "name": "Nguyễn Minh Nhật",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Lê Nhã Uyên",
          "scores": [
            5,
            10
          ]
        },
        {
          "name": "Nguyễn Phương Thảo",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Trương Thu Thảo",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Nguyễn Đức Toàn",
          "scores": [
            5,
            10
          ]
        },
        {
          "name": "Nguyễn Anh Tú",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Đinh Nhật Vy",
          "scores": [
            6,
            10
          ]
        }
      ],
      "TIENG_VIET": [
        {
          "name": "Đinh Thế An",
          "scores": [
            5,
            8
          ]
        },
        {
          "name": "Nguyễn Bảo An",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lưu Phương Anh",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Ngọc Anh",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Gia Bảo",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Đỗ Ngọc Châu",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Phùng Thảo Chi",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Đinh Thành Công",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Quang Dũng",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Lưu Tiến Đạt",
          "scores": [
            8,
            8
          ]
        },
        {
          "name": "Phạm Doãn Minh Đạt",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Hương Giang",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Bảo Hân",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Đinh Huy Hoàng",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Minh Khang",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Nguyễn Anh Khoa",
          "scores": [
            6,
            7
          ]
        },
        {
          "name": "Nguyễn Đăng khoa",
          "scores": [
            5,
            8
          ]
        },
        {
          "name": "Lê Viết Tùng Lâm",
          "scores": [
            6,
            6
          ]
        },
        {
          "name": "Nguyễn Vũ Phương Nam",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Nguyễn Như Ngọc",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Trương Bảo Ngọc",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Minh Nhật",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Phương Thảo",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Trương Thu Thảo",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Đức Toàn",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Cẩm Tú",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Trần Nhã Uyên",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Đinh Nhật Vy",
          "scores": [
            8,
            9
          ]
        }
      ]
    }
  },
  "4": {
    "grade": 4,
    "subjects": {
      "TOAN": [
        {
          "name": "Đinh Hoài An",
          "scores": [
            9,
            9
          ]
        },
        {
          "name": "Nguyễn Phương Anh",
          "scores": [
            5,
            8
          ]
        },
        {
          "name": "Nguyễn Thục Anh",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Trương Gia Bảo",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Thùy Chinh",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Văn Đức",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Hương Giang",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lưu Thị Thu Hà",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Lê Trung Hiếu",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Nguyễn Ngọc Thu Huyền",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Trương Thanh Huyền",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lê Tuấn Khang",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Gia Linh",
          "scores": [
            null,
            9
          ]
        },
        {
          "name": "Nguyễn Phương Linh",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Nguyễn Ngọc Mai",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Lê Minh Ngọc",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Ánh Ngọc",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Trần Ánh Ngọc",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Nguyễn Thảo Nhi",
          "scores": [
            9,
            8
          ]
        },
        {
          "name": "Trương Thanh Phong",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Trần Minh Thiện",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Nguyễn Anh Thư",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Trương Anh Thư",
          "scores": [
            4,
            8
          ]
        },
        {
          "name": "Nguyễn Thanh Toàn",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Lưu Bảo Trang",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lưu Tường Vy",
          "scores": [
            5,
            10
          ]
        },
        {
          "name": "Nguyễn Thảo Vy",
          "scores": [
            7,
            10
          ]
        },
        {
          "name": "Nguyễn Trà My",
          "scores": [
            7,
            10
          ]
        }
      ],
      "TIENG_VIET": [
        {
          "name": "Đinh Hoài An",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Nguyễn Phương Anh",
          "scores": [
            6,
            8
          ]
        },
        {
          "name": "Nguyễn Thục Anh",
          "scores": [
            7,
            7
          ]
        },
        {
          "name": "Trương Gia Bảo",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Thùy Chinh",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Văn Đức",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Hương Giang",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lưu Thị Thu Hà",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lê Trung Hiếu",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Ngọc Thu Huyền",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Trương Thanh Huyền",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lê Tuấn Khang",
          "scores": [
            6,
            7
          ]
        },
        {
          "name": "Nguyễn Gia Linh",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Phương Linh",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Ngọc Mai",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Lê Minh Ngọc",
          "scores": [
            5,
            7
          ]
        },
        {
          "name": "Nguyễn Ánh Ngọc",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Trần Ánh Ngọc",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Thảo Nhi",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Trương Thanh Phong",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Trần Minh Thiện",
          "scores": [
            5,
            8
          ]
        },
        {
          "name": "Nguyễn Anh Thư",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Trương Anh Thư",
          "scores": [
            8,
            8
          ]
        },
        {
          "name": "Nguyễn Thanh Toàn",
          "scores": [
            6,
            8
          ]
        },
        {
          "name": "Lưu Bảo Trang",
          "scores": [
            6,
            8
          ]
        },
        {
          "name": "Lưu Tường Vy",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Thảo Vy",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Trà My",
          "scores": [
            8,
            9
          ]
        }
      ]
    }
  },
  "5A3": {
    "grade": 5,
    "subjects": {
      "TOAN": [
        {
          "name": "Nguyễn Quỳnh Anh",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Dương Đức Bảo",
          "scores": [
            6,
            7
          ]
        },
        {
          "name": "Nguyễn Gia Bảo",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Lê Xuân Bình",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Nguyễn Thùy Dung",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Nguyễn Mạnh Dũng",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Tiến Dũng",
          "scores": [
            9,
            9
          ]
        },
        {
          "name": "Nguyễn Anh Duy",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Tiến Đạt",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Phùng Tiến Đạt",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Đinh Minh Đức",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Hương Giang",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Mạnh Hùng",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Gia Huy",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Lê Quốc Hưng",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Gia Hưng",
          "scores": [
            6,
            8
          ]
        },
        {
          "name": "Nguyễn Chí Khang",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Nguyễn Minh Khang",
          "scores": [
            6,
            10
          ]
        },
        {
          "name": "Trương Gia Khánh",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Trung Kiên",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Hoàng Bảo Lâm",
          "scores": [
            5,
            9
          ]
        },
        {
          "name": "Lê Vĩ Lập",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Phương Linh",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lê Xuân Lộc",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Ngọc Ly",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Hoài Nam",
          "scores": [
            9,
            9
          ]
        },
        {
          "name": "Nguyễn Khắc Hoàng Nam",
          "scores": [
            10,
            9
          ]
        },
        {
          "name": "Nguyễn Thành Nam",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Đinh Trọng Nghĩa",
          "scores": [
            10,
            9
          ]
        },
        {
          "name": "Nguyễn Khánh Ngọc",
          "scores": [
            8,
            9
          ]
        }
      ],
      "TIENG_VIET": [
        {
          "name": "Nguyễn Quỳnh Anh",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Dương Đức Bảo",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Gia Bảo",
          "scores": [
            6,
            8
          ]
        },
        {
          "name": "Lê Xuân Bình",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Thùy Dung",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Anh Dũng",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Tiến Dũng",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Anh Duy",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Tiến Đạt",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Phùng Tiến Đạt",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Đinh Minh Đức",
          "scores": [
            6,
            8
          ]
        },
        {
          "name": "Nguyễn Hương Giang",
          "scores": [
            6,
            8
          ]
        },
        {
          "name": "Nguyễn Mạnh Hùng",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Gia Huy",
          "scores": [
            5,
            8
          ]
        },
        {
          "name": "Lê Quốc Hưng",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Gia Hưng",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Chí Khang",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Minh Khang",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Trương Gia Khánh",
          "scores": [
            7,
            8
          ]
        },
        {
          "name": "Nguyễn Trung Kiên",
          "scores": [
            6,
            9
          ]
        },
        {
          "name": "Nguyễn Hoàng Bảo Lâm",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lê Vĩ Lập",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Phương Linh",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Lê Xuân Lộc",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Ngọc Ly",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Hoài Nam",
          "scores": [
            7,
            9
          ]
        },
        {
          "name": "Nguyễn Khắc Hoàng Nam",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Thành Nam",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Đinh Trọng Nghĩa",
          "scores": [
            8,
            9
          ]
        },
        {
          "name": "Nguyễn Khánh Ngọc",
          "scores": [
            7,
            8
          ]
        }
      ]
    }
  }
};
