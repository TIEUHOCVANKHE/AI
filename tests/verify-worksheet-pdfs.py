"""Check each exported page against every supplied sentence, including the last exercise."""
import json
import re
import unicodedata
from pathlib import Path
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
source = (root / 'assets/remedial-data.js').read_text()
data = json.loads(source.split('const REMEDIAL_DATA = ', 1)[1].strip().removesuffix(';'))


def normalized(text):
    return re.sub(r'\s+', '', unicodedata.normalize('NFC', text)).replace('**', '')


for group in data['classes'].values():
    pdf = root / 'output/pdf' / ('Phieu_bai_tap_' + group['label'] + '.pdf')
    reader = PdfReader(pdf)
    records = list(group['students'].values())
    assert len(reader.pages) == len(records), (group['label'], len(reader.pages))
    for page, record in zip(reader.pages, records):
        assert abs(float(page.mediabox.width) - 595.28) < 1 and abs(float(page.mediabox.height) - 841.89) < 1, 'Expected A4 portrait'
        text = normalized(page.extract_text())
        parts = [record['name'], record['assessment'], record['focus']]
        parts += [subject['comment'] for subject in record['subjects'].values()]
        parts += [exercise['text'] for subject in record['subjects'].values() for exercise in subject['exercises']]
        for part in parts:
            assert normalized(part) in text, (group['label'], record['stt'], part)
        assert 'Bàitậpdogiáoviênbổsung' not in text
    print(group['label'], len(records), 'A4 pages: all student names, comments and exercises intact.')
