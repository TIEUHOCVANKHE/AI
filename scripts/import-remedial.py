"""Import the supplied Markdown verbatim, validating class + STT + name."""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'assets/documents'


def js_data(file, constant):
    return json.loads(file.read_text().split('const ' + constant + ' = ', 1)[1].strip().removesuffix(';'))


def normalize(text):
    return unicodedata.normalize('NFC', text).strip()


def parse_document(file):
    result = {}
    text = file.read_text()
    for label, body in re.findall(r'^# Lớp (.+)\n([\s\S]*?)(?=^# Lớp |\Z)', text, re.M):
        class_id = {'4A6': '4'}.get(label.strip(), label.strip())
        assert class_id not in result, 'Duplicate class'
        records = {}
        for number, name, content in re.findall(r'^## (\d+)\. (.+)\n([\s\S]*?)(?=^## |\Z)', body, re.M):
            stt = str(int(number))
            assert stt not in records, 'Duplicate STT'
            records[stt] = {'name': name.strip(), 'body': content}
        result[class_id] = {'label': label.strip(), 'students': records}
    return result


source = js_data(ROOT / 'assets/data.js', 'SOURCE_DATA')
previous = js_data(ROOT / 'assets/remedial-data.js', 'REMEDIAL_DATA')
comments = parse_document(DOCS / 'nhan_xet_3_lop_ca_nhan.md')
exercises = parse_document(DOCS / 'bai_tap_ca_nhan_3_lop.md')
assert set(comments) == set(exercises) == set(source)
classes = {}
subjects = {'Toán': 'TOAN', 'Tiếng Việt': 'TIENG_VIET'}
for class_id, group in comments.items():
    roster = {str(row['stt']): row['name'] for row in source[class_id]['subjects']['TOAN']}
    assert set(roster) == set(group['students']) == set(exercises[class_id]['students'])
    students = {}
    for stt, name in roster.items():
        comment = group['students'][stt]
        practice = exercises[class_id]['students'][stt]
        assert normalize(name) == normalize(comment['name']) == normalize(practice['name']), (class_id, stt, name)
        fields = dict(re.findall(r'^\*\*(.+?):\*\* (.+?)\s*$', comment['body'], re.M))
        assert set(fields) == {'Toán', 'Tiếng Việt', 'Đánh giá chung', 'Trọng tâm cần bồi dưỡng'}
        record = {'stt': int(stt), 'name': name, 'assessment': fields['Đánh giá chung'], 'focus': fields['Trọng tâm cần bồi dưỡng'], 'subjects': {}}
        assert record['assessment'] in ['Hoàn thành tốt', 'Hoàn thành', 'Cần hỗ trợ']
        for label, content in re.findall(r'^### (.+)\n([\s\S]*?)(?=^### |\Z)', practice['body'], re.M):
            sub = subjects[label.strip()]
            items = re.findall(r'^(\d+)\. (.+)$', content, re.M)
            assert items and [int(n) for n, _ in items] == list(range(1, len(items) + 1))
            assert not re.sub(r'^\d+\. .+$', '', content, flags=re.M).strip(), 'Unexpected exercise content'
            record['subjects'][sub] = {'comment': fields[label.strip()], 'exercises': [{'label': 'Bài ' + n, 'text': text.strip()} for n, text in items]}
        assert set(record['subjects']) == set(subjects.values())
        students[stt] = record
    classes[class_id] = {'label': group['label'], 'students': students}

data = {'revision': 'three-classes-2026-09-27', 'sourceRound': 0, 'classes': classes,
        'notice': 'Nhận xét phản ánh bài khảo sát lần 1, không thay thế đánh giá chính thức của giáo viên.',
        'followupClassId': '5A3', 'followup': previous['followup']}
target = ROOT / 'assets/remedial-data.js'
target.write_text('// Imported from the two supplied documents; keyed by class and fixed STT.\nconst REMEDIAL_DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
for class_id, group in classes.items():
    records = group['students'].values()
    print(group['label'], len(group['students']), 'students,', sum(len(s['exercises']) for r in records for s in r['subjects'].values()), 'exercises')
